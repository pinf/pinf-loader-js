
var VOWS = require("vows"),
	ASSERT = require("assert");


VOWS.describe("Tests").addBatch(
{
	"All Examples":
	{
		topic: function()
		{
			var self = this;
			require("../examples").main().then(function() {
				self.callback(true);
			}, function(err) {
				// NOTE: If this fires and `err` instanceof Error `vows` will fail this test.
				self.callback(err);
			});
		},
		"all examples worked": function(status)
		{
			ASSERT.equal(status, true);
		}
	}
}).export(module);
