import {
    readdir
} from 'fs/promises'

export const lsDir = async (path) => {
    try {
        const res = [];
        const data = await readdir(path);
        for (const file of data)
            res.push(file);
        return res;
    } catch (error) {
        console.error(error);
    }
}