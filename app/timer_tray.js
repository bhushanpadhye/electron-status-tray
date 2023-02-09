const electron = require('electron');
const { app, Menu } = require("electron");

const { Tray } = electron;

class TimerTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);
        this.mainWindow = mainWindow;
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));
        this.setToolTip('Timer App');

    }

    onClick(event, bounds) {
        const { x, y } = bounds;
        const { width, height } = this.mainWindow.getBounds();
        if(this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            const yPosition = process.platform === 'darwin' ? y : (y-height);
            this.mainWindow.setBounds({
                x: x - (width/2) ,
                y: yPosition,
                height,
                width
            })
            this.mainWindow.show();
        }
    }

    onRightClick() {
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ])

        this.popUpContextMenu(contextMenu);
    }

}

module.exports = TimerTray;