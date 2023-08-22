const fs = require('fs');
const { resolve } = require('path');

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output2.txt', textOut);
// console.log('File written');

const readFilePro = async filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    });
};

const writeFilePro = async (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, 'utf-8', (err) => {
            if (err) reject(err);
            resolve();
        });
    })
};



// Async
(async () => {
    let textContent = '';
    readFilePro('./txt/start.txt')
    .then(data => {
        console.log('Filename retrieved.')
        return readFilePro(`./txt/${data}.txt`);
    })
    .then(data => {
        console.log('Contents 1 retrieved');
        textContent = data;
        return readFilePro('./txt/append.txt')
    })
    .then(data => {
        console.log('Contents 2 retrieved');
        textContent = `${textContent}\n${data}`;
        return writeFilePro('./txt/final.txt', textContent);
    })
    .then(() => {
        console.log('File written');
    })
    .catch(err => {
        throw err;
    })
})()