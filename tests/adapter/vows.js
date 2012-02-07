
var VOWS = require("vows"),
	ASSERT = require("assert"),
	LOADER = require("sourcemint-platform-nodejs/loader");


VOWS.describe("Examples").addBatch(
{
	"All Examples":
	{
		topic: function()
		{
			var self = this;
			// TODO: Catch test errors and fail.
			return require("../examples").main({
				LOADER: LOADER
			}).then(function() {
				self.callback(true);
			}, function(err) {
				
console.log("error", err);
				self.callback(err);

			});
		},
		"result": function(status) {
			
			console.log("status", status);
			
//			assert.equal(1, true);
			
		}
	}
}).export(module);
