import {readdir, writeFile} from 'fs/promises'

export const addFile = async (currentdir, filename) => {
    try {
        console.log('start');
        await readdir(`${currentdir}`).then(data => {
           if (data.includes(filename)) console.error('This file already exists');
        })
        await writeFile(`${currentdir}/${filename}`, '');
        console.log('\x1b[33mFile created\x1b[0m');
    }
    catch (error) {
        console.error('Operation failed', error);
    }
}