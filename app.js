    import * as fs from 'node:fs/promises';

( async () => {
    const watcher = fs.watch('./command.txt');
    const commandFile = await fs.open('./command.txt', 'r')

    for await (const event of watcher) {
        const commandFileChanged = event.eventType === 'change'
        
        if (commandFileChanged) {
            console.log("Command file was changed")

            const fileSize = (await commandFile.stat()).size;
            const buffer = Buffer.alloc(fileSize);
            const offset = 0;
            const length = buffer.byteLength;
            const position = 0;


            const content = await commandFile.read(
                buffer,
                offset,
                length,
                position
            )
            
            console.log(content)
        }
    }

}) ()


