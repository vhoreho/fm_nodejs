import {
    rename
} from 'fs/promises'

export const renameFile = async (currentDir, oldPath, newFilename) => {
    const pathLength = oldPath.split('\\').length;
    try {
        if (pathLength === 1) {
            await rename(`${currentDir}/${oldPath}`, `${currentDir}/${newFilename}`);
            console.log('\x1b[33mFile renamed\x1b[0m');
        } else {
            await rename(`${oldPath}`, `${newFilename}`);
            console.log('\x1b[33mFile renamed\x1b[0m');
        }
    } catch (error) {
        console.log('Operation failed', error);
    }
}