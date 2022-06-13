import {readFile} from 'fs/promises';

export const readfile = async (current,path) => {
    const pathLength = path.split('\\').length;
    try {
        if (pathLength === 1) {
            const data = await readFile(`${current}/${path}`);
            console.log('\n' + data + '\n');
        } else {
            const data = await readFile(`${path}`);
            console.log('\n' + data + '\n');
        }
    }
    catch {
        console.error('Operation failed');
    }
}