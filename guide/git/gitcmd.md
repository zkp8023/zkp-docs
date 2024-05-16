# git 常用命令

## shell 和 vim 操作

```shell
# 获取当前所在路径
pwd
# 创建目录(文件夹)
mkdir [文件夹名]
# 创建文件
touch [文件名]
# 在指定文件夹中创建文件
touch /文件夹名/要创建的文件名
# 删除文件
rm [文件名]
# 删除文件夹
rm -rf [文件夹名]
# 查看当前文件夹里有哪些内容
ll 或者 ls
# 查看隐藏内容
ls -la
# 查看当前目录里的某个目录中的内容
ll -la(加上-la显示隐藏文件) [当前目录下的某个文件名]
# 查看文件中的详细内容(仅查看)
cat [文件名称]
# vim查看当前文件内容(可修改)
vim [文件名称]
```

## 配置

Git 的设置文件为.gitconfig，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。

```bash
# 显示当前的Git配置
git config --list
# 显示全局配置 (用户名,邮箱,别名等)
git config --global --list
# 例:
user.name=章凯鹏
user.email=329690239@qq.com
alias.ck=checkout

# 编辑Git配置文件(可直接修改用户信息,命令别名等...)
git config -e [--global]

# 设置提交代码时的用户信息
git config [--global] user.name "[name]"
git config [--global] user.email "[email address]"

# 配置命令别名
git config --global alias.自定义命令 git后面的指令
# 使用方式:
git ck      等同于 git checkout

# 取消配置项
git config [--global] --unset <key>

# 取消命令别名 (或者直接使用上面的编辑配置命令来修改全局配置 git config -e [--global],删掉相应的别名 )
git config --global --unset alias.ck  取消ck别名
git config --global --unset user.name 取消git用户名配置

# 删除所有命令别名
git config --global --remove-section alias
```

## 初始化

```bash
# 在当前目录新建一个Git代码库
git init

# 新建一个目录，将其初始化为Git代码库
git init [project-name]

# 下载一个项目和它的整个代码历史
git clone [url]
```

## 克隆
```bash
# 克隆整个分支
git clone [repository_url]

# 克隆并指定本地目录名称
git clone [repository_url] [local_directory_name]

# 克隆指定分支
git clone -b [branch_name] [repository_url]

# 克隆指定分支并指定本地目录
git clone -b [branch_name] [repository_url] [local_directory_name]

# 克隆指定标签
git clone --branch [tag_name] [repository_url]

```

## 添加

```bash
# 添加指定文件到暂存区
git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
git add [dir]

# 添加当前目录的所有文件到暂存区
git add .

```

## 提交

```bash
# 提交暂存区到仓库区
git commit -m [message]------->[message:提交信息]

# 提交暂存区的指定文件到仓库区
git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
git commit -a

# 提交时显示所有diff信息
git commit -v

# 使用一次新的commit，替代上一次提交# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
git commit --amend [file1] [file2] ...
```

## 撤销
`git reset` : 默认 `git reset --mixed [ HEAD~number 或 第一次commit hash ]`
```bash

--soft：撤销上一次提交，并将工作目录和暂存区恢复到上一次提交的状态。不会丢弃修改或新增的文件.
        [--soft仅撤销提交,所修改的代码依然是提交过后的状态,工作区与暂存区显示无变化,之前的修改已保存]

--mixed：撤销上一次提交，并将工作目录恢复到上一次提交的状态，但暂存区不会受到影响。这个选项是 git reset 的默认选项。
        [--mixed在撤销提交的同时,将代码恢复到暂存区(既git add .命令之后的状态)]

--hard：撤销上一次提交，并将工作目录、暂存区和 stash 都恢复到上一次提交的状态。任何修改、新增或暂存的更改都将被丢弃。
        [直接回复到某个提交之前的状态,代码修改会丢失]

--merge：撤销上一次提交，并将工作目录和暂存区更新到上一次提交的状态。如果存在冲突，会尝试自动合并冲突。

--keep：撤销上一次提交，并将工作目录和暂存区更新到上一次提交的状态。如果存在冲突，会尝试自动合并冲突，并保留解决冲突后的文件。

```

## 分支

```bash
# 列出所有本地分支
git branch

# 列出所有远程分支
git branch -r

# 列出所有本地分支和远程分支
git branch -a

# 新建一个分支，但依然停留在当前分支
git branch [branch-name]

# 新建一个分支，并切换到该分支
git checkout -b [branch]

# 切换到指定分支，并更新工作区
git checkout [branch-name]

# 切换到上一个分支
git checkout -

# 合并指定分支到当前分支
git merge [branch]

# 重命名分支
git branch -m oldbranch newbranch

# 删除本地分支 当分支中含有未合并的变更时，Git会阻止这一次删除操作。
git branch -d [branch-name]

# 强制删除指定分支，即便其中含有未合并的变更
git branch -D [branch-name]

# 删除远程分支
git push origin --delete [branch-name]
git branch -dr [remote/branch]
```

## 合并

```bash
# 将branchName合并到当前所在分支,会产生提交记录
git merge [branchName]

# 合并到当前分支,不生产提交记录
git merge [branchName] --no-commit
```

## 远程同步

```bash
# 克隆远程仓库
git clone [url] [文件别名(克隆完成后的文件夹名称)]

# 下载远程仓库的所有变动(只是抓取,并不会自动merge)
git fetch [remote]

# 拉取远程仓库的变化(git pull = git featch + git merge)
git pull

# 拉取远程仓库代码,不生成提交记录
git pull --no-commit

# 显示远程仓库地址
git remote -v

# 显示某个远程仓库的信息(包括所有分支以及仓库地址)
git remote show [远程仓库名(一般为origin)]
```

## 推送本地分支代码到远程分支:

#### 1.首次推送代码到远程关联仓库:

```bash
git push -u origin master
```

#### 2.再次推送到关联仓库:

```bash
git push
```

#### 3.推送到指定的远程分支:

如果你本地的分支名称和远程名称相同，则使用以下命令：

```bash
git push origin branchName
```

如果本地的分支跟远程的分支不一样，则指定本地和远程的分支的名称：

```bash
git push origin localBranchName:remoteBranchName
```

#### 4.拉取远程指定分支代码

```shell
git pull origin remoteBranchName:localBranchName
```

## 查看当前文件的修改记录

```shell
# 查看fileName文件的修改记录
# 格式: 提交id 提交人 提交时间 实际代码
git blame [fileName]

# 查看文件指定行的修改记录
# 查看fileName文件的第n1 到 n2 行的修改记录
git blame -L n1,n2 [fileName]

#  git blame -L 10,13 hello.txt  (查看hello.txt文件10到13行的修改记录)
# 提交id前的^代表当前行并未修改
^364e229 (章凯鹏 2022-11-13 10:02:20 +0800 10) hello 123
^364e229 (章凯鹏 2022-11-13 10:02:20 +0800 11) hello 123
^364e229 (章凯鹏 2022-11-13 10:02:20 +0800 12) hello 123
f563afd2 (章凯鹏 2022-11-13 10:03:00 +0800 13) 5555

```
