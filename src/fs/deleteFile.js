import {
    unlink
} from 'fs/promises';

export const deleteFile = async (current, path) => {
    const pathLength = path.split('\\').length;
    try {
        if (pathLength === 1) {
            await unlink(`${current}/${path}`);
            console.log("\x1b[33mFile deleted\x1b[0m" + '\n\n');
        } else {
            await unlink(`${path}`);
            console.log("\x1b[33mFile deleted\x1b[0m" + '\n\n');
        }
    } catch (error) {
        console.error('Operation failed', error);
    }
}