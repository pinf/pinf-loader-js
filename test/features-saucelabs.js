
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
