"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('copyFileLine.copyWithLocation', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const selection = editor.selection;
        if (selection.isEmpty) {
            vscode.window.showInformationMessage('请先选择要复制的代码');
            return;
        }
        const document = editor.document;
        const selectedText = document.getText(selection);
        const fileName = document.fileName;
        const startLine = selection.start.line + 1;
        const endLine = selection.end.line + 1;
        let locationInfo;
        if (startLine === endLine) {
            locationInfo = `${fileName}:${startLine}`;
        }
        else {
            locationInfo = `${fileName}:${startLine}-${endLine}`;
        }
        vscode.env.clipboard.writeText(locationInfo).then(() => {
            vscode.window.showInformationMessage(`已复制位置信息: ${locationInfo}`);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map