// @ts-check

const vscode = require('vscode');

/**
 * Returns the html content for the webview
 * @param {vscode.Uri} uri path of the css file
 * @param {vscode.Uri} jsSrc path of the js file
 * @returns {string} html string
 */
function getWebviewContent(uri, jsSrc) {
  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite + React</title>
      <link rel="stylesheet" href=${uri}>
      </head>
      <body>
      <div id="root"></div>
      <script type="module" src=${jsSrc}></script>
    </body>
  </html>
  `
}


/**
 * function sets the title and finally returns the webview panel
 * @param {vscode.ExtensionContext} context vscode extension context
 * @param {string} title title of the webview panel
 * @param {string} data data to be rendered in the webview panel
 * @returns {vscode.WebviewPanel} returns the webview panel
 */
function displayblogsWebview(context, title, data) {
  console.log("displaying webview")
  const panel = vscode.window.createWebviewPanel(
    'blog',
    title,
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
    }
  );
  if (data) {
    panel.webview.html = data
    return panel
  }
  const cssPath = vscode.Uri.joinPath(context.extensionUri, 'webview-ui/screen-3/dist/assets/index.css')
  const cssSrc = panel.webview.asWebviewUri(cssPath);

  const jsPath = vscode.Uri.joinPath(context.extensionUri, 'webview-ui/screen-3/dist/assets/index.js')
  const jsSrc = panel.webview.asWebviewUri(jsPath);
  panel.webview.html = getWebviewContent(cssSrc, jsSrc);
  return panel
}




module.exports = {
  displayblogsWebview,
}