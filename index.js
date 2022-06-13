import {
    argv,
    stdout as output,
    stdin as input
} from 'node:process';
import {
    homedir
} from 'node:os';
import readline from 'node:readline';
import {
    upDir
} from './src/dir/upDir.js'
import {
    lsDir
} from './src/dir/lsDir.js';
import {
    chDir
} from './src/dir/cdDir.js';
import {
    readfile
} from './src/fs/readfile.js';
import {
    addFile
} from './src/fs/addfile.js';
import {
    renameFile
} from './src/fs/renameFile.js'
import {
    filecopy
} from './src/fs/copyfile.js';
import {
    moveFile
} from './src/fs/moveFile.js';
import {
    deleteFile
} from './src/fs/deleteFile.js';
import {
    getOSParams
} from './src/getOsParams.js';
import {
    calculateHash
} from './src/calcHash.js'
import {compressFile} from './src/zlib/compressFile.js'
import {decompressFile} from './src/zlib/decompress.js'

let user = null;
let currentDir = homedir();

const file_manager = readline.createInterface({
    input,
    output
})

const init = async () => {
    if (argv.length < 3) {
        console.log('Please, enter "npm run start -- --username your_name" for correct work in file manager');
        file_manager.close()
    }

    argv.forEach((prop, index) => {
        if (/^--username/.test(prop)) {
            user = argv[++index];
            console.log(`\x1b[31m Welcome to the File Manager, ${user}! \x1b[0m\n`);
            console.log(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n`);
        }
    })

    file_manager.on('line', async line => {
        if (line === '.exit') {
            output.write(`Thank you for using File Manager, ${user}!`);
            file_manager.pause();
        } else if (line === 'up') {
            currentDir = upDir(currentDir);
            output.write(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n\n`);
        } else if (line === 'ls') {
            const data = await lsDir(currentDir);
            console.log(data);
            output.write('\n');
            output.write(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n\n`);
        } else if (/^cd\s\w*/.test(line)) {
            const result = await chDir(currentDir, line);
            currentDir = result;
            output.write(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n\n`);
        } else if (/^cat\s\w*/.test(line)) {
            let path = line.slice(4);
            readfile(currentDir, path);
            output.write(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n\n`);
        } else if (/^add\s\w*/.test(line)) {
            let filename = line.slice(4);
            addFile(currentDir, filename);
            output.write(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n\n`);
        } else if (/^rn\s\w*/.test(line)) {
            let [pathToFile, filename] = line.slice(3).split(' ');
            renameFile(currentDir, pathToFile, filename);
            output.write(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n\n`);
        } else if (/^cp\s\w*/.test(line)) {
            let [pathToFile, destination] = line.slice(3).split(' ');
            filecopy(currentDir, pathToFile, destination);
            output.write(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n\n`);
        } else if (/^mv\s\w*/.test(line)) {
            let [pathToFile, destination] = line.slice(3).split(' ');
            moveFile(currentDir, pathToFile, destination);
            output.write(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n\n`);
        } else if (/^rm\s\w*/.test(line)) {
            let path = line.slice(3);
            deleteFile(currentDir, path);
            output.write(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n\n`);
        } else if (/^os\s\w*/.test(line)) {
            let path = line.slice(3);
            getOSParams(path)
            output.write(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n\n`);
        } else if (/^hash\s\w*/.test(line)) {
            let path = line.slice(5);
            calculateHash(currentDir, path)
            output.write(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n\n`);
        } else if (/^compress\s\w*/.test(line)) {
            let [pathToFile, destination] = line.slice(9).split(' ');
            compressFile(currentDir, pathToFile, destination);
            output.write(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n\n`);
        } else if (/^decompress\s\w*/.test(line)) {
            let [pathToFile, destination] = line.slice(11).split(' ');
            decompressFile(currentDir, pathToFile, destination);
            output.write(`\x1b[35m You are currently in ${currentDir} \x1b[0m\n\n`);
        } else {
            console.log('\x1b[34m Invalid input\x1b[0m\n');
        }

    })

    file_manager.on('SIGINT', () => {
        output.write(`\x1b[36m Thank you for using File Manager, ${user}!\x1b[0m`);
        file_manager.pause()
    })
}

init();
