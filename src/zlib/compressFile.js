import {
    createBrotliCompress
} from 'zlib';
import {
    createReadStream,
    createWriteStream
} from 'fs';

export const compressFile = (current, source, destination) => {
    const sourceLength = source.split('\\').length;
    const destionationLength = destination.split('\\').length;
    const brotliZip = createBrotliCompress();
    try {
        if (sourceLength === 1) {
            const read = createReadStream(`${current}/${source}`)
            const write = createWriteStream(`${current}/${destination}`);
            const stream = read.pipe(brotliZip).pipe(write);
            stream.on('finish', () => {
                console.log('\x1b[33mDone Compressing\x1b[0m');
            })
        } else if (destionationLength === 1 && sourceLength > 1) {
            const read = createReadStream(`${source}`)
            const write = createWriteStream(`${current}/${destination}`);
            const stream = read.pipe(brotliZip).pipe(write);
            stream.on('finish', () => {
                console.log('\x1b[33mDone Compressing\x1b[0m');
            })
        } else {
            const read = createReadStream(source)
            const write = createWriteStream(`${current}/${destination}`);
            const stream = read.pipe(brotliZip).pipe(write);
            stream.on('finish', () => {
                console.log('\x1b[33mDone Compressing\x1b[0m');
            })
        }
    } catch (error) {
        console.error('Operation failed', error);
    }


}