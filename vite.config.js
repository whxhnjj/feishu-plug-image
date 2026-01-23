import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { terser } from 'rollup-plugin-terser'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@msn': path.resolve(__dirname, './src/views'),
        '@components': path.resolve(__dirname, './src/components'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@store': path.resolve(__dirname, './src/stores'),
        '@layout': path.resolve(__dirname, './src/layout'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@router': path.resolve(__dirname, 'src/router'),
        '@util': path.resolve(__dirname, 'src/utils'),
      }
    },
    server: {
      port: '8000',
      host: true
    },
    build: {
      outDir: env.VITE_APP_FILE_NAME || 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: isProd ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        external: ['vue-demi'], // 添加这行
        plugins: [
          terser({
            compress: {
              drop_console: true,
            },
          }),
        ],
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/css/variables.scss" as *;` // 替换 @import
          // 使用别名时确保路径正确
        }
      }
    }
  }
})

