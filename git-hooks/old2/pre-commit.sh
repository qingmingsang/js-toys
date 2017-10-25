#!/usr/bin/env node

const execSync = require('child_process').execSync;
let files;
try {
    files = execSync(`git diff --cached --name-only`);
    let str = files + '';
    if (str) {
        let arr = str.split('\n');
        arr.forEach((v) => {
            if (/\.(jsx*|css)$/.test(v)) {
                execSync(`prettier --no-config --print-width 120 --tab-width 4 --write ${v}`);
            }
        });
        execSync(`git add .`);
        process.exit(0);
    }
} catch (err) {
    throw (err);
    process.exit(1);
}