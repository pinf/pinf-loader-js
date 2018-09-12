
const PATH = require("path");
const FS = require("fs-extra");
const EXPRESS = require("express");
const PUPPETEER = require("puppeteer");
const COLORS = require("colors");
const NODEMON = require('nodemon');


const ROOT_PATH = PATH.dirname(__dirname);
const PORT = process.env.PORT || 8080;


async function runDevWorkspace (url) {

    const browser = await PUPPETEER.launch({
        headless: false,
        devtools: false
    });

    const page = await browser.newPage();

    page.goto(url);

    page.on('console', function (msg) {
        console.log.apply(console, [
            COLORS.bold.magenta("BROWSER:")
        ].concat(msg.args().map(function (arg) {
            return COLORS.magenta(arg._remoteObject.value);
        })));
    });

    NODEMON({
        "watch": [
            PATH.join(__dirname, "../loader.js"),
            PATH.join(__dirname, "../features"),
            PATH.join(__dirname, "www/ui.js"),
            PATH.join(__dirname, "www/style.css"),
            PATH.join(__dirname, "www/index.html")
        ],        
        ext: 'js,json'
    });
    
    NODEMON.on('restart', function (files) {
        page.goto(url);
    });
}


exports.main = async function (options) {

    options = options || {};

    const app = EXPRESS();

    app.get(/^\/favicon.ico$/, function(req, res) {
        res.writeHead(204);
        res.end();
    });

    app.get(/^\/$/, function(req, res) {
        res.writeHead(302, {
            "Location": `http://127.0.0.1:${PORT}/workspace/www/`
        });
        res.end();
    });

    app.get(/^\/\.features.json$/, function (req, res, next) { 
        const featuresBaseDir = PATH.join(__dirname, "..", "features");
        const features = FS.readdirSync(featuresBaseDir).filter(function (filename) {
            return FS.statSync(PATH.join(featuresBaseDir, filename)).isFile();
        }).map(function (filename) {
            return filename.replace(/\.js$/, "");
        });
        FS.writeFile(PATH.join(__dirname, "www", ".features.json"), JSON.stringify(features, null, 4));

        res.writeHead(200, {
            "Content-Type": "application/javascript",
        });
        res.end(JSON.stringify(features, null, 4));
    });

    app.get(/^\/.*/, EXPRESS.static(ROOT_PATH, {
        dotfiles: 'allow'
    }));

    const server = await new Promise(function (resolve) {
        app.listen(PORT, resolve);
    });

    if (options.runDevWorkspace) {
        runDevWorkspace(`http://localhost:${PORT}/`).catch(function (err) {
            throw err;
        });
    }

    return {
        server: server,
        port: PORT
    };
}

if (require.main === module) {
    exports.main({
        runDevWorkspace: true
    }).catch(function (err) {
        console.error(err.stack);
        process.exit(1);
    });
}
