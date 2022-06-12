import { lsDir } from './lsDir.js';

export const chDir = async (currentDir, path) => {
    const list = await lsDir(currentDir);
    const dir = String(path.split(' ').slice(-1));
    if (list.includes(dir)) {
        return `${currentDir}\\${dir}`
    }
    return `There is no such directory, please enter the correct directory name\n`;
}