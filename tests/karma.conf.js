// Karma configuration
// Generated on Tue Sep 11 2018 11:21:24 GMT-0700 (Pacific Daylight Time)

module.exports = function (config) {

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '..',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],


        // list of files / patterns to load in the browser
        files: [
            'tests/features.js',
            'loader.js',
            {
                pattern: 'features/**/*.*',
                watched: true,
                served: false,
                included: false
            }
        ],


        // list of files / patterns to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'loader.js': ['coverage']            
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        coverageReporter: {
            type: 'html',
            dir: 'workspace/www/',
            reporters: [
                {
                    type: 'html',
                    subdir: 'coverage'
                }
            ],
            instrumenterOptions: {
                istanbul: {
                    noCompact: true
                }
            }
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'Firefox', 'Safari', 'ChromeHeadlessNoSandbox'],

        customLaunchers: {
            'ChromeHeadlessNoSandbox': {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: !config.watch,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,


        middleware: ['custom'],

        plugins: [
            'karma-mocha',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-safari-launcher',
            'karma-sauce-launcher',
            'karma-coverage',
            {
                'middleware:custom': [
                    'factory',
                    function (config) {

                        const PATH = require("path");
                        const FS = require("fs");
                        const SERVE_STATIC = require("serve-static");
                    
                        const wwwBaseDir = PATH.join(__dirname, "..");
                        const featuresBaseDir = PATH.join(wwwBaseDir, "features");
                        const wwwApp = SERVE_STATIC(wwwBaseDir);
                    
                        return function (req, res, next) {
                    
                            if (/^\/features\//.test(req.url)) {
                    
                                wwwApp(req, res, next);
                    
                            } else
                            if (/^\/features\.json/.test(req.url)) {
                    
                                const features = FS.readdirSync(featuresBaseDir).filter(function (filename) {
                                    return FS.statSync(PATH.join(featuresBaseDir, filename)).isFile();
                                }).map(function (filename) {
                                    return filename.replace(/\.js$/, "");
                                });
                    
                                res.writeHead(200, {
                                    "Content-Type": "application/javascript"
                                });
                    
                                res.end(JSON.stringify(features, null, 4));
                    
                            } else {
                                console.error("WARNING: No handler for URL:", req.url);
                                next();
                            }
                        }
                    }
                ]
            }
        ]    
    });

    if (process.env.TRAVIS) {

        config.set({
            browsers: ['ChromeHeadlessNoSandbox']
        });

    } else
    if (config.saucelabs) {
        // @see https://github.com/karma-runner/karma-sauce-launcher

        // @see https://saucelabs.com/platforms
        var customLaunchers = {
            osx_chrome: {
                base: 'SauceLabs',
                browserName: 'chrome',
                platform: 'macOS 10.13',
                version: '69.0',
                "extendedDebugging": true
            }
        };

        config.set({
            sauceLabs: {
                testName: 'pinf-loader Unit Tests'
            },
            customLaunchers: customLaunchers,
            browsers: Object.keys(customLaunchers),
            reporters: ['dots', 'saucelabs'],
            singleRun: true
        });
    }
}
