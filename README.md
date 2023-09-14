# typescript-exercise

## FAQ

### 1. tsc 命令的两种模式

- 直接执行 tsc 命令
  - 如果当前目录中存在 tsconfig.json 配置文件，就会按照配置编译
  - 如果当前目录中不存在 tsconfig.json 配置文件，会向上寻找配置文件，然后按照配置编译
- tsc 命令指定一个入口文件，编译选项不会从 tsconfig.json 配置文件中获取，只能通过命令行参数指定编译选项；入口文件中引入了哪些文件，也会被一起编译

### 2. tsconfig.json 的作用

- 目录中存在 tsconfig.json 配置文件，编辑器就会认为该目录是一个 TypeScript 项目，会根据该配置文件中的配置进行类型检查
- tsc 进行编译时，会读取 tsconfig.json 配置

### 3. tsconfig.json 中的 ts-node 选项

webpack 通过 require 根目录的 webpack.config.ts 文件获取配置，因为安装了 ts-node 包的原因，require 内部会先将 ts 编译为 js，但是 webpack 是遵循 CommonJS 规范的，因此需要告知 ts-node 将 ts 编译成符合 CommonJS 规范的 js
