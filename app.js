import * as fs from 'node:fs/promises';

import { 
    createFile, 
    deleteFile,
    appendFile, 
    renameFile 
} from './operations.js';

( async () => {

    const CREATE_FILE = "create file";
    const DELETE_FILE = "delete file";
    const RENAME_FILE = "rename file";
    const APPEND_FILE = "append file";

    const watcher = fs.watch('./command.txt');
    const commandFile = await fs.open('./command.txt', 'r')

    commandFile.on("change", async () => {
        const fileSize = (await commandFile.stat()).size;
        const buffer = Buffer.alloc(fileSize);
        const offset = 0;
        const length = buffer.byteLength;
        const position = 0;


        await commandFile.read(
            buffer,
            offset,
            length,
            position
        )
        
        const command = buffer.toString('utf-8');

        if (command.includes(CREATE_FILE)) {
            const filePath = command.substring(CREATE_FILE.length + 1);
            createFile(filePath)
        }

        if (command.includes(DELETE_FILE)) {
            const filePath = command.substring(DELETE_FILE.length + 1);
            deleteFile(filePath)
        }

        if (command.includes(RENAME_FILE)) {
            const _idx = command.indexOf(" to ");
            
            const oldPath = command.substring(RENAME_FILE.length + 1, _idx);
            const newPath = command.substring(_idx + 4);
            
            renameFile(oldPath,newPath);
        }

        if (command.includes(APPEND_FILE)) {
            const contentFlagIndex = command.indexOf(" content ")
            
            const filePath = command.substring(APPEND_FILE.length + 1, contentFlagIndex);
            const content = command.substring(contentFlagIndex + (" content ").length);

            appendFile(filePath, content);
        }
    })

    for await (const event of watcher) {
        const commandFileChanged = event.eventType === 'change' 
        if (commandFileChanged) {
            commandFile.emit("change")
        }
    }

}) ()


