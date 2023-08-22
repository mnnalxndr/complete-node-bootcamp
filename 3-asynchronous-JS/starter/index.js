const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject("File not found 😥");
            resolve(data);
        });
    });
}

const writeFilePro = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, err => {
            if (err) reject('Could not write file');
            resolve('success');
        });
    });
}

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        
        const res1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        
        const res2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        
        const res3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([res1, res2, res3]);

        const imgs = all.map(el => el.body.message)

        console.log(imgs);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Random dog image saved to file!');
    } catch (err) {
        console.log(err);
        throw(err);
    }
    return '2: READY';
}

(async () => {
    try {
        console.log('1: Start getDogPics');
        const x = await getDogPic();
        console.log(x);
        console.log('3: End getDogPics');
    } catch (err) {
        console.log('ERROR');
    }
})();


/*
readFilePro(`${__dirname}/dog.txt`)
.then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
})
.then(res => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
})
.then(() => {
    console.log('Random dog image saved to file!');
})
.catch(err => {
    console.log(err.message);
});
*/
