
const PATH = require("path");
const FS = require("fs-extra");
const EXPRESS = require("express");
const BUILD = require("../scripts/build");

const ROOT_PATH = PATH.dirname(__dirname);
const PORT = 8080;


exports.main = function(callback) {

    var app = EXPRESS();

    app.get(/^\/$/, function(req, res) {
        res.writeHead(302, {
            "Location": "http://127.0.0.1:" + PORT + "/workspace/www/"
        });
        res.end();
    });
    app.get(/^\/loader.js$/, function(req, res) {
        res.setHeader("Content-Type", "text/javascript");
        res.end(BUILD.getRawSource());
    });
    app.get(/^\/loader.stripped.js$/, function(req, res) {
        res.setHeader("Content-Type", "text/plain");
        res.end(BUILD.getStrippedSource());
    });
    app.get(/^\/loader.min.js/, function(req, res, next) {
        res.setHeader("Content-Type", "text/plain");
        return BUILD.getMinifiedSource(function(err, source) {
            if (err) return next(err);
            res.end(source);
        });
    });
    app.get(/^\/loader.min.js.gz/, function(req, res, next) {
        res.setHeader("Content-Type", "application/x-javascript");
        res.setHeader("Content-Encoding", "gzip");
        return BUILD.getMinifiedSource(function(err) {
            if (err) return next(err);
            var raw = FS.createReadStream(ROOT_PATH + "/loader.min.js.gz");
            res.writeHead(200, {
                "content-encoding": "gzip"
            });
            raw.pipe(res);
        });
    });
    app.get(/^\/.*/, EXPRESS.static(ROOT_PATH));

    var server = app.listen(PORT);

    console.log("Open browser to: http://localhost:" + PORT + "/");

    return callback(null, {
        server: server,
        port: PORT
    });
}

if (require.main === module) {
    exports.main(function(err) {
        if (err) {
            console.error(err.stack);
            process.exit(1);
        }
    });
}
