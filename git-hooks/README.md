# 利用git hooks维护代码规范
最近接触到[prettier](https://github.com/prettier/prettier)，了解过后觉得适用性和功能性都比原本eslint、stylelint的方案更为合适，所以决定改为采用prettier作为hooks脚本的核心。

[完整示例代码](http://git.dev.sh.ctripcorp.com/ccfu/git-hooks/tree/master)

[必须安装node.js才能进行下面的工作](https://nodejs.org/en/)

## js
### 可参考的js代码规范
[Google JavaScript 编码规范指南](http://alloyteam.github.io/JX/doc/specification/google-javascript.xml)

[JavaScript Standard Style ](https://standardjs.com/readme-zhcn.html)

[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

~~使用eslint检查js代码~~

根据制定的规范，利用eslint维护相应的代码规范。

实现流程：

~~1.安装~~

```
npm i eslint -g 
npm i eslint -D
//eslint-plugin-react -D//如果要支持react检查需要安装这个
```

~~2.配置~~

`eslint --init`会生成一个.eslintrc文件，里面写的是[验证规则](http://cn.eslint.org/docs/rules/)。

规则的错误级别：
```
"off"或0- 关闭规则
"warn"或1- 将规则作为警告（不影响退出代码）
"error"或2- 将规则转为错误（触发时退出代码为1）
```

~~3.执行~~

执行该命令会在命令行显示不符合规则的代码。
```
eslint filename.js
```

执行该命令会将报告生成 `eslint_report.html`文件。
```
eslint -f html filename.js > eslint_report.html
```

执行该命令可以在检查过程中自动修复[一些规则](http://cn.eslint.org/docs/rules/)
```
eslint filename.js --fix
```


## css
### 可参考的css代码规范
[Airbnb CSS / Sass 指南](https://github.com/Zhangjd/css-style-guide/)

~~使用stylelint检查css代码~~

考虑目前的css代码情况，以及[stylelint文档](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/cli.md)的稀烂，该工具可以考虑只在后续项目中使用。

实现流程：

~~1.安装~~

```
npm i stylelint -g
```

~~2.配置~~

stylelint与eslint有一点相似，也需要一个`.***rc`文件填写配置。但是没发现类似`stylelint --init`这样的命令。
手动创建一个.stylelintrc文件后,在里面填写[规则](https://stylelint.io/user-guide/rules/)。
开启规则方式大多以`true`与数字为主。

~~3.执行~~

执行该命令会在命令行显示不符合规则的代码。
```
stylelint filename.css
```

执行该命令会将报告生成 `stylelint_report.txt`文件。
```
stylelint -f string filename.js > stylelint_report.txt
```

执行该命令可以在检查过程中自动修复一些规则。
```
stylelint filename.css --fix
```
文档上说有这个命令，但是不像eslint对可修复的有标识，实测也没发现对哪个规则生效。


## commit message
[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

commit message的限制应该是在远程服务器利用git hooks或者其他方式限制，不在本文的实现范围内。在此提及只是觉得该项也应该列入规范之一。

## 使用prettier检查js、css代码
实现流程：

1.安装
```
npm i prettier -g
npm i prettier -D
```

2.配置

相较于eslint繁琐的规则，prettier的[规则](https://prettier.io/docs/en/options.html#content)相对来说要简单许多。

3.执行
```
prettier [opts] [filename ...]

prettier --tab-width 4 --use-tabs true --write folder/*
```
这里可能需要注意的是，prettier的write功能，其实是重写文件，如果重写可能出现的bug，他有一定的检验机制提醒，但是具体规则文档里没写，还需要实践摸索。

4.IDE集成

在[文档](https://github.com/prettier/prettier#editor-integration)里介绍将prettier集成到几种IDE的方式。

这里简单用webstrom做个例子：

进入`File | Settings | Tools`，这里既可以把prettier加入`File Watchers` 也可以加入`External Tools`中，个人觉得`External Tools`更加灵活。

选择`External Tools`后，点击`+`号,可以看到其中

name为工具名,

Program为运行prettier的cmd，你可以写其存放目录，也可以将其加入环境变量中，只写prettier,

Parameters是执行prettier时相应的命令参数,

Working directory为工作目录;

这里是我的配置

name  `prettier`

Program  `D:\Users\ccfu\AppData\Roaming\npm\prettier.cmd`

Parameters  `--write --tab-width 4 --use-tabs true $FilePathRelativeToProjectRoot$`

Working directory  `$ProjectFileDir$`

配置好后你就能在IDE里右键选择相应External Tools使用了，如果觉得麻烦，也可以在设置里的keymap设置使用相应工具的快捷键，将能取代IDE原本的代码格式化，并且功能更强大。


## git hooks
上面介绍了规范和工具，现在说说怎么利用git hooks实现在每次提交代码前帮你自动校验代码规则。

git hooks在`.git/hooks`文件夹中，有`pre-push pre-rebase`等几种，本质上只是生命周期的不同，这里只讨论`pre-commit`。

通过编写`pre-commit`脚本，可以实现在提交前执行一些工具，比如说eslint，如果不符合规范，将无法提交代码。

这里我写了该[pre-commit脚本](http://git.dev.sh.ctripcorp.com/ccfu/git-hooks/blob/master/pre-commit.sh)，其本质是在commit前使用了prettier进行代码格式化。

这样就在本地实现了利用git hooks配合工具维护代码规范的目的。

### hooks团队共享
`.git`目录是不会被clone下来的。

我的思路是编写一个[js脚本](http://git.dev.sh.ctripcorp.com/ccfu/git-hooks/blob/master/pre-commit.js)，执行该脚本将同步的[sh脚本](http://git.dev.sh.ctripcorp.com/ccfu/git-hooks/blob/master/pre-commit.sh)写入`.git/hooks/pre-commit.sh`中来达到同步更新的目的。

现在你可以将[示例](http://git.dev.sh.ctripcorp.com/ccfu/git-hooks/tree/master)fork下来，执行`npm run prect`生成pre-commit hooks。

修改一下js/css代码，然后commit，之后你会发现一些可能细微的错误和格式混乱的问题被自动修正了。




