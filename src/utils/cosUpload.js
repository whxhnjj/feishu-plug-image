import COS from 'cos-js-sdk-v5';
import { GetYunToken } from '@api/api/common.js';

let cosInstance = null;
let tokenData = null;

function pickFirstValidField(source, keys = []) {
  for (const key of keys) {
    const value = source?.[key];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return value;
    }
  }
  return '';
}

function normalizeToken(rawToken = {}) {
  return {
    secretId: pickFirstValidField(rawToken, ['secretId', 'SecretId', 'tmpSecretId', 'TmpSecretId']),
    secretKey: pickFirstValidField(rawToken, ['secretKey', 'SecretKey', 'tmpSecretKey', 'TmpSecretKey']),
    token: pickFirstValidField(rawToken, ['token', 'sessionToken', 'SecurityToken']),
    expiredTime: Number(pickFirstValidField(rawToken, ['expiredTime', 'ExpiredTime'])) || 0,
    bucket: pickFirstValidField(rawToken, ['bucket', 'Bucket']),
    region: pickFirstValidField(rawToken, ['region', 'Region']),
    domain: pickFirstValidField(rawToken, ['domain', 'Domain']),
    prefix: pickFirstValidField(rawToken, ['prefix', 'Prefix'])
  };
}

function validateTokenConfig(token) {
  const requiredFields = ['secretId', 'secretKey', 'token', 'bucket', 'region', 'domain', 'expiredTime'];
  const missingFields = requiredFields.filter(field => {
    const value = token?.[field];
    return value === '' || value === null || value === undefined || (field === 'expiredTime' && Number(value) <= 0);
  });
  if (missingFields.length > 0) {
    throw new Error(`COS 临时凭证缺少字段: ${missingFields.join(', ')}`);
  }
}

function cosPut(cos, params) {
  return new Promise((resolve, reject) => {
    cos.putObject(params, (err, data) => {
      if (err) {
        const detail = {
          code: err?.code || '',
          message: err?.message || '',
          requestId: err?.headers?.['x-cos-request-id'] || err?.requestId || '',
          statusCode: err?.statusCode || ''
        };
        reject(new Error(`COS 上传失败: ${JSON.stringify(detail)}`));
      }
      else resolve(data);
    });
  });
}

function initCOS(token) {
  return new COS({
    Protocol: 'https:',
    getAuthorization(options, callback) {
      callback({
        TmpSecretId: token.secretId,
        TmpSecretKey: token.secretKey,
        SecurityToken: token.token,
        ExpiredTime: token.expiredTime
      });
    }
  });
}

async function ensureToken() {
  if (!tokenData?.expiredTime || Date.now() + 30000 > Number(tokenData.expiredTime) * 1000) {
    const res = await GetYunToken();
    if (res?.code !== 200 || !res?.data) {
      throw new Error(res?.msg || '获取云存储临时凭证失败');
    }
    tokenData = normalizeToken(res.data);
    validateTokenConfig(tokenData);
    cosInstance = initCOS(tokenData);
  }
  return { cos: cosInstance, token: tokenData };
}

function buildObjectKey(file, token) {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;
  const fileName = file?.name || 'image.png';
  const ext = fileName.includes('.') ? fileName.slice(fileName.lastIndexOf('.') + 1) : 'png';
  const random = `${Date.now()}${Math.floor(Math.random() * 100000)}`;
  const rawPrefix = String(token?.prefix || '').replace(/^\/+/, '').replace(/\/+$/, '');
  const prefix = rawPrefix ? `${rawPrefix}/` : '';
  return `${prefix}feishu/${dateStr}/${random}.${ext}`;
}

function buildDomainUrl(domain, key) {
  const normalizedDomain = String(domain || '')
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/+$/, '');
  if (!normalizedDomain) {
    throw new Error('COS 域名为空，无法组装上传结果地址');
  }
  return `https://${normalizedDomain}/${key}`;
}

export async function uploadFileToCOS(file) {
  if (!(file instanceof File)) {
    throw new Error('上传参数不是文件对象');
  }
  const { cos, token } = await ensureToken();
  const key = buildObjectKey(file, token);
  await cosPut(cos, {
    Bucket: token.bucket,
    Region: token.region,
    Protocol: 'https:',
    Key: key,
    StorageClass: 'STANDARD',
    Body: file
  });
  return buildDomainUrl(token.domain, key);
}

export async function uploadFilesToCOS(files = []) {
  const results = [];
  for (const file of files) {
    const url = await uploadFileToCOS(file);
    results.push(url);
  }
  return results;
}
