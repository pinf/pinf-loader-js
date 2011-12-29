
var CONNECT_DISPATCH = require("connect-dispatch/dispatch"),
	JSGI = require("pinf-server/vendor/connect/middleware/jsgi"),
	PROGRAM_SERVER = require("pinf/program-server"),
	FILE = require("modules/file");

exports.main = function(options)
{
	if (!options.stacks)
	{
		module.print("\0red(" + "Serve this program by using the '--script serve' option for the 'commonjs' command! e.g. 'commonjs --script serve ./ -v ./'" + "\0)\n");
		return;
	}

    var CONNECT = options.stacks.connect.instance;

    options.stacks.connect.start(

        CONNECT.createServer(
    		CONNECT_DISPATCH({
              	
              	"/ui.*": JSGI.jsgi(
	                new PROGRAM_SERVER.JSGI({
	                    map: {
	                        "/ui.js": {
	                            programPath: FILE.dirname(module.id) + "/ui/program.json"
	                        }
	                    },
	                    trackRoutes: true
	                }).responder(null)
	            ),
	            
	            "/.*": CONNECT.static(FILE.dirname(module.id) + "/www", {
    	            maxAge: 0
    	        })  
        	})
        )
    );
}