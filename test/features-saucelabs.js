
const SERVER = require("../workspace/server");
const GRUNT = require("grunt");


describe("features-saucelabs", function() {

    it("grunt-saucelabs", function(done) {

        this.timeout(60 * 15 * 1000);

        return SERVER.main(function(err, info) {
            if (err) return done(err);

            console.log("process.env.TRAVIS", process.env.TRAVIS);

            if (process.env.TRAVIS) {
                console.log("process.env.SAUCE_USERNAME", process.env.SAUCE_USERNAME);
            }

            GRUNT.initConfig({
                "saucelabs-mocha": {
                    all: {
                        options: {
                            username: process.env.SAUCE_USERNAME || '',
                            key: process.env.SAUCE_ACCESS_KEY || '',
                            urls: [
                                "http://localhost:" + info.port + "/workspace/www/test.html"
                            ],
                            concurrency: 3,
                            testname: 'github.com/pinf/pinf-loader-js',
                            browsers: [
                                {
                                    browserName: 'firefox'
                                },
                                {
                                    browserName: 'chrome'
                                },
                                {
                                    browserName: 'internet explorer'
                                },
                                {
                                    browserName: 'opera'
                                },
                                {
                                    browserName: 'safari'
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
