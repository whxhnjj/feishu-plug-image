// // 配置管理
// const config = {
//     development: import.meta.env.VITE_APP_API,
//     production: generateProductionUrl()
// };

// // 生成生产环境URL
// function generateProductionUrl() {
//     const domain = document.domain;
//     const hasWWW = domain.startsWith('www.');

//     if (hasWWW) {
//         const rootDomain = domain.replace('www.', '');
//         return `//api.${rootDomain}`;
//     }

//     return `//api.${domain}`;
// }

// // 导出基础URL
// const baseUrl = import.meta.env.MODE === 'production'
//     ? config.production
//     : config.development;

export default 'https://server-feishu.feiyushuju.com';