import {copyFile} from 'fs/promises'

export const filecopy = async (currentDir, source, destination) => {
    const sourceLength = source.split('\\').length;
    const destionationLength = destination.split('\\').length;
    const splittedPathToFile = source.split('\\');
            
    try {
        if (sourceLength === 1) {
            await copyFile(`${currentDir}/${source}`, `${currentDir}/${destination}/${source}`);
            console.log('\x1b[33mFile copied\x1b[0m');
        } else if (destionationLength === 1 && sourceLength > 1) {
            await copyFile(`${source}`, `${currentDir}/${destination}/${splittedPathToFile[sourceLength - 1]}`);
            console.log('\x1b[33mFile copied\x1b[0m');
        } else {
            await copyFile(`${source}`, `${destination}/${splittedPathToFile[sourceLength - 1]}`);
            console.log('\x1b[33mFile copied\x1b[0m');
        }
    } catch (error) {
        console.log('Operation failed', error);
    }
}