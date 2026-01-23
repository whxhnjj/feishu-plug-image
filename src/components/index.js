const modules = import.meta.glob('./*/**/*.vue', { eager: true })
const map = {}

Object.keys(modules).forEach(file => {
  // 提取文件名作为组件名称（去掉路径和扩展名）
  const modulesName = file
    .replace('./', '')             // 去掉相对路径前缀
    .replace('.vue', '')           // 去掉文件扩展名
    .split('/').pop()              // 只取最后的文件名部分（例如，totalInfo.vue）
  map[modulesName] = modules[file].default
})

const globalComponents = {
  ...map,
}

export default globalComponents
