const { app, BrowserWindow } = require('electron')
const fs = require('fs');

const isDev = !app.isPackaged;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 315,

    //hides electron menu bar
    autoHideMenuBar: true
  })


  if(isDev)
    win.loadURL('http://localhost:5173');
  else
    win.loadFile('dist/index.html')
}

app.whenReady().then(() => {

  //backend node processes here?

  createWindow()
})