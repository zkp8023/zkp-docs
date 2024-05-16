## .gitignore文件不生效原因
> 在开发过程中，我们会在 .gitignore 文件中添加一些忽略项，然而当我们push到远程的时候会出现一个问题,那就是我们在 .gitignore 添加的文件仍然push到了远程。

**错误原因**:
-----
我们首次将项目push到远程的时候,没有创建 .gitignore 文件。之后我们想创建 .gitignore 文件并添加忽略项时,发现并不会起作用. 这是因为在项目第一次push 之前已经将项目的所有文件在本地进行了缓存(commit)或者说是所有的项目已经被跟踪(track)纳入版本管理中。所以我们再添加忽略项的时候没有作用

**解决办法：**
----
### 1. 清除所有的本地缓存
```bash
    1. git rm -r --cached .

    2. git add .

    3. git commit -m "update .gitignore"

    4. git push origin 远程分支名
```

### 2. 清除不需要跟踪的文件(不想要再远程仓库出现的文件)
```bash
   1. git rm -r --cached  `fileName`不需要跟踪的文件名

   2. git add .

   3. git commit -m "update .gitignore"

   4. git push origin 远程分支名
```
