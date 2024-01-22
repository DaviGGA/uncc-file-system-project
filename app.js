    import * as fs from 'node:fs/promises';

( async () => {

    const createFile = async (path) => {
       const file = await fs.appendFile(path,'');
    }

    const CREATE_FILE = "create a file"

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
            console.log(filePath)
        }
    })

    for await (const event of watcher) {
        const commandFileChanged = event.eventType === 'change'
        
        if (commandFileChanged) {
            commandFile.emit("change")
        }
    }

}) ()


