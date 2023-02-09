const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
    constructor() {
        super({
            width: 300,
            height: 500,
            frame: false,
            resizable: false,
            show: false,
            webPreferences: {
                contextIsolation:false,
                nodeIntegration: true,
                backgroundThrottling: false
            }
        });

        this.on('blur', this.onBlur.bind(this));
    }

    onBlur() {
        this.hide();
    }
}
module.exports = MainWindow;