
var features = null;

describe("Features", function () {

    it("Init", function (done) {

        window.fetch('/features.json?t=' + Date.now()).then(function (response) {
            return response.json();
        }).then(function (data) {

            features = data;
            done();
        });        
    });

    it('Setup', function () {
        
        describe("features", function () {
    
            features.forEach(function (name) {

                it(name, function (done) {

                    var welcomeMessageLogged = false;
                    var re1 = new RegExp('\\/features\\/' + name);
                    var re2 = new RegExp('Hello from ' + name);

                    function logToOutput (moduleObj, arguments) {

                        //console.log("log", moduleObj.bundle, arguments[0]);
                        
                        if (re1.test(moduleObj.bundle) && re2.test(arguments[0])) {
                            welcomeMessageLogged = true;
                        }
                    }

                    PINF.sandbox("../../features/" + name + ".js", {
                        onInitModule: function (moduleInterface, moduleObj) {
                            moduleObj.require.API = {
                                FETCH: function (uri) {
                                    return window.fetch(uri).then(function (response) {
                                        return response.text();
                                    });
                                }
                            };
                            moduleInterface.log = function () {
                                logToOutput(moduleObj, arguments);
                            };
                            moduleInterface.logForModule = function (moduleObj, arguments) {
                                logToOutput(moduleObj, arguments);
                            };
                        }
                    }, function (sandbox) {
                        try {
                            return Promise.resolve(sandbox.main({})).then(function () {

                                if (!welcomeMessageLogged) {
                                    throw new Error("Expected welcome message was not logged!");
                                }

                                done();
                            }).catch(done);
                        } catch(err) {
                            return done(err);
                        }
                    }, done);
                });            
            });
        });
    });
});
