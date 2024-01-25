import * as fs from 'node:fs/promises';

export const createFile = async (path) => {
    try {
        const fileExist = await fs.open(path, 'r');
        fileExist.close();
        return console.log(`The file ${path} alrealdy exists.`);
    } catch (error) {
        const newFile = await fs.open(path,'w');
        console.log("File successfuly created")
        newFile.close()
    }
}

export const deleteFile = async (path) => {
    try {
        await fs.unlink(path);
        console.log(`File on path ${path} successfully deleted`)
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('No such file exists at path ' + path);
            return
        }
        
        console.log(error)
    }
}


export const renameFile = async (oldPath, newPath) => {
    try {
        await fs.rename(oldPath, newPath);
        console.log(`File succesfully renamed from ${oldPath} to ${newPath}`)
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('No such file exists at path ' + oldPath);
            return
        }

        console.log(error)
    }
}

let addedContent;

export const appendFile = async (path, content) => {
    if (addedContent == content) return

    try {
       await fs.appendFile(path, content);
       addedContent = content;
    } catch (error) {   
        console.log(error)
    }
}