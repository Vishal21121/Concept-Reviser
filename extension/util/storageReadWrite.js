// @ts-check
const vscode = require('vscode');

/**
 * 
 * @param {vscode} vscode 
 * @param {vscode.Uri} fileUri 
 * @returns {Promise<string>} returns the text from the file
 */
const reader = async (vscode, fileUri) => {
    const data = await vscode.workspace.fs.readFile(fileUri);
    const text = new TextDecoder().decode(data);
    return text
}

/**
 * 
 * @param {vscode} vscode 
 * @param {vscode.ExtensionContext} context 
 * @param {string} filename 
 * @returns {Promise<string>} returns the text from the file
 */
const readFile = async (vscode, context, filename) => {
    const globalStorageUri = context.globalStorageUri;
    const fileUri = globalStorageUri.with({ path: `${globalStorageUri.path}/${filename}` });
    try {
        await vscode.workspace.fs.stat(fileUri);
        const text = await reader(vscode, fileUri)
        return text
    } catch (error) {
        if (error.code === 'FileNotFound') {
            await writeFile(vscode, context, [], filename)
            const text = reader(vscode, fileUri)
            return text
        }
    }

}

/**
 * 
 * @param {vscode} vscode 
 * @param {vscode.ExtensionContext} context 
 * @param {Array<Object>} value 
 * @returns {Promise<void>} returns the text from the file
 */

const writeFile = async (vscode, context, value, filename) => {
    const globalStorageUri = context.globalStorageUri;
    const fileUri = globalStorageUri.with({ path: `${globalStorageUri.path}/${filename}` });
    const data = Buffer.from(JSON.stringify(value), 'utf-8');
    await vscode.workspace.fs.writeFile(fileUri, data);
}

module.exports = {
    readFile,
    writeFile
}