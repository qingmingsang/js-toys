#!/usr/bin/env node

const execSync = require('child_process').execSync;
let files;
try {
    files = execSync(`git diff --cached --name-only`);
    let str = files + '';
    if (str) {
        let arr = str.split('\n');
        arr.forEach((v) => {
            if (/\.jsx*$/.test(v)) {
                execSync(`eslint -f html ${v} --fix > eslint_report.html`);
            } else if (/\.css$/.test(v)) {
                execSync(`stylelint -f string ${v} --fix > stylelint_report.txt`);
            }
        });
        process.exit(0);
    }
} catch (err) {
    throw(err);
    process.exit(1);
}