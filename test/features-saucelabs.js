
const SERVER = require("../workspace/server");
const GRUNT = require("grunt");


describe("features-saucelabs", function() {

    it("grunt-saucelabs", function(done) {

        this.timeout(60 * 15 * 1000);

        return SERVER.main(function(err, info) {
            if (err) return done(err);

            if (process.env.TRAVIS) {
                console.log("Using SAUCE_USERNAME: ", process.env.SAUCE_USERNAME);
            }

            GRUNT.initConfig({
                "saucelabs-mocha": {
                    all: {
                        options: {
                            username: process.env.SAUCE_USERNAME || '',
                            key: process.env.SAUCE_ACCESS_KEY || '',
                            testname: 'github.com/pinf/pinf-loader-js',
                            tags: ['master'],
                            build: process.env.TRAVIS_JOB_ID || "manual",
                            public: true,
                            "record-screenshots": false,
                            urls: [
                                "http://localhost:" + info.port + "/workspace/www/test.html"
                            ],
                            concurrency: 3,
                            browsers: [
                                {
                                    browserName: 'iphone',
                                    platform: 'OS X 10.8',
                                    version: '6',
                                    'device-orientation': 'portrait'
                                },
                                {
                                    browserName: 'iphone',
                                    platform: 'OS X 10.6',
                                    version: '4',
                                    'device-orientation': 'portrait'
                                },
                                {
                                    browserName: 'ipad',
                                    platform: 'OS X 10.8',
                                    version: '6',
                                    'device-orientation': 'portrait'
                                },
                                {
                                    browserName: 'ipad',
                                    platform: 'OS X 10.6',
                                    version: '4',
                                    'device-orientation': 'portrait'
                                },
/*                                
                                {
                                    browserName: 'android',
                                    platform: 'Linux',
                                    version: '4.0',
                                    'device-type': 'tablet',
                                    'device-orientation': 'portrait'
                                },
                                {
                                    browserName: 'android',
                                    platform: 'Linux',
                                    version: '4.0',
                                    'device-orientation': 'portrait'
                                },
*/
                                {
                                    browserName: 'firefox',
                                    platform: 'OS X 10.6',
                                    version: '25'
                                },
                                {
                                    browserName: 'firefox',
                                    platform: 'OS X 10.6',
                                    version: '4'
                                },
                                {
                                    browserName: 'firefox',
                                    platform: 'Linux',
                                    version: '24'
                                },
                                {
                                    browserName: 'firefox',
                                    platform: 'Linux',
                                    version: '4'
                                },
                                {
                                    browserName: 'firefox',
                                    platform: 'Windows 8',
                                    version: '25'
                                },
                                {
                                    browserName: 'firefox',
                                    platform: 'Windows 8',
                                    version: '4.0'
                                },
                                {
                                    browserName: 'firefox',
                                    platform: 'Windows 7',
                                    version: '3.6'
                                },
                                {
                                    browserName: 'chrome',
                                    platform: 'OS X 10.8',
                                    version: '27'
                                },
                                {
                                    browserName: 'chrome',
                                    platform: 'Linux',
                                    version: '28'
                                },
                                {
                                    browserName: 'chrome',
                                    platform: 'Windows 8',
                                    version: '27'
                                },
                                {
                                    browserName: 'internet explorer',
                                    platform: 'Windows 8.1',
                                    version: '11'
                                },
                                {
                                    browserName: 'internet explorer',
                                    platform: 'Windows 8',
                                    version: '10'
                                },
                                {
                                    browserName: 'internet explorer',
                                    platform: 'Windows 7',
                                    version: '9'
                                },
                                {
                                    browserName: 'internet explorer',
                                    platform: 'Windows XP',
                                    version: '6'
                                },
                                {
                                    browserName: 'opera',
                                    platform: 'Linux',
                                    version: '12'
                                },
                                {
                                    browserName: 'opera',
                                    platform: 'Windows 7',
                                    version: '12'
                                },
                                {
                                    browserName: 'safari',
                                    platform: 'OS X 10.8',
                                    version: '6'
                                },
                                {
                                    browserName: 'safari',
                                    platform: 'Windows 7',
                                    version: '5'
                                }
                            ]
                        }
                    }
                }
            });

            GRUNT.loadNpmTasks("grunt-saucelabs");

            GRUNT.registerInitTask('default', function() {
                GRUNT.task.run(["saucelabs-mocha"]);
            });
            return GRUNT.tasks(['default'], {
                debug: true
            }, function(err) {
                if (err) return done(err);
                return info.server.close(function() {
                    return done(null);
                });
            });
        });
    });

});
