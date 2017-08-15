"use strict"

module.exports = {
  "rules": {
	//禁止重复字体名
    "font-family-no-duplicate-names":true,
	//禁止空换行
	"no-empty-source":true,
	//缩进
	"indentation":4,
	//不允许额外的分号
	"no-extra-semicolons":true,
	//不允许//注释符
	"no-invalid-double-slash-comments":true,
	//限制嵌套层数，主要给css预编译器用
	"max-nesting-depth":4
  }
}
