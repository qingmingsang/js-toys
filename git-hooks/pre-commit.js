const fs = require('fs');
if (!fs.existsSync('.git/hooks/')) {
    fs.mkdirSync('.git/hooks/');
}
let preCommitFile = fs.readFileSync('./pre-commit.sh');
fs.writeFile('.git/hooks/pre-commit', preCommitFile, {
    encoding: 'utf8',
    mode: 0o777
}, (err) => {
    if (err) {
        throw err
    }
    console.log('文件重写成功');
});
