import {
    createHash
} from 'node:crypto'
import {
    readFile
} from 'node:fs/promises'

export const calculateHash = async (currentdir, path) => {
    const pathLength = path.split('\\').length;
    try {
        if (pathLength === 1) {
            const data = await readFile(`${currentdir}/${path}`);
            const hash = createHash('sha256').update(data).digest('hex');
            console.log(hash + '\n\n');
        } else {
            const data = await readFile(`${path}`);
            const hash = createHash('sha256').update(data).digest('hex');
            console.log(hash + '\n\n');
        }
    } catch {
        console.error('Operation failed');
    }
};