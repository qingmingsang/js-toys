```
--print-width <int>
```
单行最大长度

```
--tab-width <int>
```
缩进空格数

```
--use-tabs <bool>
```
末尾加分号。
true - 在每个语句的末尾添加一个分号。
false - 只能在可能引入ASI故障的行的开始处添加分号。
默认为true。

```
--no-bracket-spacing <bool>
```
在对象文字中的括号之间打印空格。
默认为true。
```
true{ foo: bar } false{foo: bar}
```

```
--no-config
```
不查找配置文件。将使用默认设置。

```
cli-override（默认）
```
CLI选项优先于配置文件
