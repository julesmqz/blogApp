const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu , ipcMain } = electron;

let mainWindow;
let sizing = {
    mini: {width: 350, height: 200 },
    small: {width: 600, height: 400 },
    big: {width: 1000, height: 800 },
    largeVertical: {width: 300, height: 700 },
}

// Listen for the app to be ready

app.on('ready', function () {
    mainWindow = new BrowserWindow({ title: 'JH App' ,show:false});

    mainWindow.maximize();

    //Load Html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'html/main.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.show();

    // Quit app when main window is closed

    mainWindow.on('close', function () {
        app.quit();
    })

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
});

// Function create add Window
function createWindow(view,size) {
    let options = {};
    options = sizing[size] || {};
    
    options.show = false;
    wdw = new BrowserWindow(options);
    
    if( size == 'full'){
        wdw.maximize();
    }

    //Load Html into window
    wdw.loadURL(url.format({
        pathname: path.join(__dirname, 'html/'+view+'.html'),
        protocol: 'file',
        slashes: true
    }));

    wdw.show();

    wdw.on('close', function () {
        wdw = null;
    });

    // garbage collector

}

// Catch load view events
ipcMain.on('load:view',function(e,options){
    if( options.view ){
        
        if( options.size.indexOf('self') > -1 ){
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'html/'+options.view+'.html'),
                protocol: 'file',
                slashes: true
            }));
            if( options.size == 'self-full'){
                mainWindow.maximize();
            }
        }else{
            createWindow(options.view,options.size);
        }
        
    }
});

// Catch load view events
ipcMain.on('add:tag',function(e,options){
    if( options ){
        mainWindow.webContents.send('add:tag',options);
    }
});

// Menu template
const mainMenuTemplate = [
    {
        label: 'Archivo',
        submenu: [{
            label: 'Nuevo',
            accelerator: process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
            click() {
                createWindow('add','small');
            }
        }, {
            label: 'Editar'
        },
        {
            label: 'Agregar entrada a slider'
        },
        {
            label: 'Salir',
            accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click() {
                app.quit()
            }
        }]

    }, {
        label: 'Social',
        submenu: [{
            label: 'Footer instagram'
        }]
    }
];

if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Herramientas',
        submenu: [{
            label: 'Developer Console',
            accelerator: process.platform == 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        },
        {
            label: 'Refrescar',
            accelerator: process.platform == 'darwin' ? 'Command+R' : 'Ctrl+R',
            click(item, focusedWindow) {
                focusedWindow.reload();
            }
        }]
    });
}