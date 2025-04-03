# [http-server](http://www.npmmirror.com/package/http-server/home)
- 一个快速启动的命令行开启本地服务的工具

## 1. 安装
```bash
pnpm add http-server -g
```

## 2. 使用 http-server

### 2.1 使用
```ts
/**
 * path : 要运行的文件路径(默认当前路径)
 * options : 服务运行配置项
 */
http - server[path][options]
```
- 在命令行中输入`http-server`来启动服务器。默认情况下，`http-server`将在当前的目录中提供`HTTP`服务
- 通过`-p [端口号]`指定运行的端口,默认`8080`端口

```bash
http-server -p 8080
```

### 2.2 npx启动
- 使用`npx工具`直接启动 `http-server`无需全局安装

```bash
npx http-server -p 8023
```

## 3. 本地移动端测试项目
::: warning 前提
使用`http-server`在移动设备测试本地项目,需保证移动设备与本机在同一局域网中
:::

1. `npm run build`打包生成`dist`(或其他名称,具体依据项目配置生成)目录
2. 在`dist`目录打开终端,运行`http-server`
3. 默认情况下,服务开启在 `8080`端口,复制服务地址(如:`http://192.168.31.211:8080`)
4. 利用[二维码生成网站](https://cli.im/text)将复制的服务地址生成二维码,移动设备扫码即可查看打包后的项目

## 4. 其他
[serve](https://github.com/vercel/serve) 是一个快速启动的命令行开启本地服务的工具,功能与`http-server`类似,但`serve`更加简单易用,适合小型项目快速启动服务