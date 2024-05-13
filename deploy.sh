# !/usr/bin/env sh
###
 # @Author: zhangkaipeng
 # @LastEditTime: 2022-12-02 10:48:59
 # @LastEditors: 章凯鹏
 # @Description:
###

# 忽略错误
set -e

# 构建
yarn build

# 进入待发布的目录
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
git push -f https://gitee.com/z-k-p/docs.git master:dev

# 打包推送完成之后退出dist
cd ..

# 删除dist文件夹
rm -rf dist