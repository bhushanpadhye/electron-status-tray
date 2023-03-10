const electron = require('electron');
const path = require('path');
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');
const { app, ipcMain } = electron;

let mainWindow;
let tray;
app.on('ready',() => {
    app.dock.hide();
    mainWindow = new MainWindow();
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'Win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname,'src','assets',iconName);

    tray = new TimerTray(iconPath, mainWindow);

});

ipcMain.on("timer:update", (event, timeLeft) => {
    tray.setTitle(timeLeft);
})