# 图片压缩工具
[项目地址](https://github.com/qingmingsang/QM.js/tree/master/compress-image)


1. 自动将文件名的中文转为拼音并提取首字母，自动命名。
2. 自动根据文件尺寸分类输出目录。


## 使用方法
`npm start`

执行定制化处理

`npm run custom`

不分类输出处理

`npm run normal`

## 注意点
自动命名因为汉语拼音有多音字，可能会有识别不正确的问题需要自己注意，如 `自行车`会识别为`zhc`。
