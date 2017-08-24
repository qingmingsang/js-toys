const fs = require('fs');
const path = require('path');
const tinify = require('tinify');
const sizeOf = require('image-size');
const pinyin = require('pinyin');
const dir = './src';
const output = './dist';
/*须在tinypng.com上申请一个key,每个key每个月有500的限额,超出部分需要付费*/
tinify.key = 'Q24nyI4Hl23zA1an2SRkSUJmhyZRGezd';
//tinify.key = 'kiFnI8fLANQyApLKzgBvlKodP2WdHxcX';
//tinify.key = 'MMkxUOv7d9wkj_Vp38gI3R8lN8O72T7F';

function checkFile(filePath) {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }
}
checkFile(output);

let fileList = [];
function walk(p, fl) {
    let files = fs.readdirSync(p);
    files.forEach((file) => {
        let fp = path.join(p, file);
        let stats = fs.statSync(fp);
        if (stats.isDirectory()) {
            walk(fp, fl);
        } else {
            fileList.push(fp);
        }
    });
}
walk(dir, fileList);

fileList.forEach((file) => {
    let py = '';
    let tpy;
    let op = output;
    let dimensions = {};
    let pyArr = pinyin(file, {
        style: pinyin.STYLE_FIRST_LETTER
    });
    pyArr.forEach((fpy) => {
        py += fpy.join('');
    });
    tpy = path.basename(py);
    if (process.env.NODE_ENV != 'normal') {
        dimensions = sizeOf(file);
    }
    if (dimensions.width) {
        op = path.join(op, dimensions.width + '');
        checkFile(op);
        if (process.env.NODE_ENV == 'multiple') {
            //针对三种规格名称不同的情况，如果变动需要更改正则
            if (dimensions.width == 50) {
                tpy = tpy.replace(/^(.+)407(\..+)$/, '$1$2');
            }
            if (dimensions.width == 60) {
                tpy = tpy.replace(/^(.+)x(\..+)$/, '$1$2');
            }
        }
    }
    op = path.join(op, tpy);
    tinify.fromFile(file).toFile(op);
    console.log(`${file} -----> ${op}`);
});
console.log('---->完成<----');

