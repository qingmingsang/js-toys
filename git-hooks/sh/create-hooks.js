const fs = require('fs');
const path = require('path');
const input = (process.argv)[2];
const catalog = path.resolve('..', input);
const target = path.join(catalog, '.git/hooks/');
const targetFile = path.join(target, 'pre-commit');

if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
}
let preCommitFile = fs.readFileSync('./sh/pre-commit');
fs.writeFile(targetFile, preCommitFile, {
    encoding: 'utf8',
    mode: 0o777
}, (err) => {
    if (err) {
        throw err
    }
    console.log('文件重写成功');
});
