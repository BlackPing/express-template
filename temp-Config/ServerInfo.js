module.exports = {
    ip: `127.0.0.1`,
    port: '3003',
    ViewPath: 'C:/IDE/NodeApp/pwa/dist/',
    RouterPath: './Server/Router/',
    setAPI: async function(app, url) { // Router Setting
        const fs = require('fs');
        const _path = require('path');
        const rootPath = _path.join(__dirname, '../');
        path = _path.join(rootPath, this.RouterPath);
        if(url != undefined) {
            path = _path.join(path, url);
        }

        fs.readdir(path, (err, fileList) => { //
            if(err) {
                throw err;
            } else {
                if(fileList.length === 0) {
                    return;
                } else {
                    let API_URL;
                    let RestAPI_URL;
                    let Router_JS;
                    console.log('# Detecting Directory:', fileList.length, '#');
                    for(let i = 0; i < fileList.length; i++) {
                        API_URL = path.substring(path.lastIndexOf('Router') + 6, path.length);
                        if(-1 === fileList[i].indexOf('.js')) { // js 파일이 아닐 경우 다시 디텍팅
                            this.setAPI(app, _path.join(API_URL, fileList[i]));
                        } else if(-1 < fileList[i].indexOf('.js')) { // js 파일이라면 라우팅 use
                            RestAPI_URL = `${url}/${fileList[i].substring(0, fileList[i].indexOf('.js'))}`;
                            RestAPI_URL = RestAPI_URL.replaceAll('\\', '/');
                            Router_JS = `.${RestAPI_URL}.js`;
                            Router_JS = Router_JS.replaceAll('\\', '/');
                            console.log('App Router ::', RestAPI_URL, ', File Load ::', Router_JS);
                            //console.log(_path.join(rootPath, this.RouterPath, Router_JS));
                            app.use(RestAPI_URL, require(_path.join(rootPath, this.RouterPath, Router_JS)));
                        }
                    }
                    // RestAPI Router
                    return;
                }
            }
        })
    }
}
