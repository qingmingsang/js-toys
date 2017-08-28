# 本地svg转iconfont工具
[项目地址](http://git.dev.sh.ctripcorp.com/ccfu/svg2icon/tree/master)

## 使用方式
将svg文件放入`src/svg`目录中。

执行`gulp`或`npm start`。

打开`dist/index.html`查看。

## 注意点
可以自定义fontName,可以修改src中的css和html模板自定义类名与demo样式。

svg使用clipPath裁剪出来的svg有的无法正确识别转换。