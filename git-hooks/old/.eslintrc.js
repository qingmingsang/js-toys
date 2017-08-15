module.exports = {
    "env": {
        "browser": true
    },
    "rules": {
        // 禁止不必要的分号
        'no-extra-semi': 2,
        // 强制使用一致的换行风格
        'linebreak-style': [2, 'windows'],
        // 缩进，4个空格
        'indent': ['error', 4, {'SwitchCase': 1}],
        // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
        'comma-dangle': [2, 'never'],
        // 在块级作用域外访问块内定义的变量是否报错提示
        'block-scoped-var': 0,
        // 控制逗号在行尾出现还是在行首出现
        'comma-style': [2, 'last']
    }
};