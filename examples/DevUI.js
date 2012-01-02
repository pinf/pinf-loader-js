
require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		var Q = require("./lib/q"),
			JSDUMP = require("./lib/jsdump");

		exports.main = function()
		{
			jQuery("HEAD").append('<link rel="stylesheet" href="' + require.uri("./style.css").join("") + '">');

		    Q.when(Q.all([
				"01-HelloWorld",
				"02-ReturnExports",
				"03-SpecifyMain",
				"04-PackageLocalDependencies",
				"05-CrossPackageDependencies",
				"07-JsonModule",
				"08-TextModule",
				"09-ResourceURI",
				"10-NamedBundle",
				"11-LoadBundle",
				"12-Sandbox",
				"Avoid-NestedBundles",
				"Avoid-SplitBundles"
			].map(function(name) {
				var result = Q.defer();
				require.sandbox("../../examples/" + name + ".js", function(sandbox)
				{
					sandbox.main();
					result.resolve();
				}, {
					onInitModule: function(moduleInterface)
					{
						moduleInterface.log = function()
						{
							var args = [],
								i;
							for (i in arguments) {
								args.push(arguments[i]);
							}
							jQuery("#output").append([
								"<div><div class=\"from\">",
								moduleInterface.id,
								"</div><div class=\"message\">",
								args.join(", "),
								"</div></div>"
							].join(""));
						}
					}
				});
				return result.promise;
		    })), function()
			{
				jQuery("#report").html(JSDUMP.parse(sourcemint.getReport()));

				jQuery.get("../../loader.min.js", function(data) {
					jQuery("#loader-min").html(data);
				});

				jQuery.get("loader.min.js.gz-size", function(data) {
					jQuery("#loader-min-size").html(data);
				});
			});			
		}
	});


	// @credit https://github.com/kriskowal/q
	require.memoize("/lib/q.js", function(require, exports, module)
	{
		(function(k,c){typeof define==="function"?define(function(c,e,q){k(c,e,q)}):typeof exports==="object"?k(require,exports,module):Q=k(c,{},{})})(function(k,c,G,e){function q(a){return a}function n(){var a=[],b,d=r(f.prototype);d.promiseSend=function(){var d=j.call(arguments);a?a.push(d):l(function(){b.promiseSend.apply(b,d)})};d.valueOf=function(){return a?d:b.valueOf()};var c=function(d){if(a)return b=h(d),t.call(a,function(a,d){l(function(){b.promiseSend.apply(b,d)})},e),a=e,b};return{promise:u(d),
		resolve:c,reject:function(a){return c(i(a))}}}function f(a,b,d){b===e&&(b=function(a){return i("Promise does not support operation: "+a)});var c=r(f.prototype);c.promiseSend=function(d,c){var x=j.call(arguments,2),e;try{e=a[d]?a[d].apply(a,x):b.apply(a,[d].concat(x))}catch(f){e=i(f)}return(c||q)(e)};if(d)c.valueOf=d;return u(c)}function s(a){return a&&typeof a.promiseSend==="function"}function y(a){a=o(a);return a===e||a===z?!1:!!a.promiseRejected}function i(a){return f({when:function(b){return b?
		b(a):i(a)}},function(){return i(a)},function(){var b=r(i.prototype);b.promiseRejected=!0;b.reason=a;return b})}function h(a){return s(a)?a:a&&typeof a.then==="function"?f({},function(b){return b!=="when"?g(a,function(a){return h(a).promiseSend.apply(e,arguments)}):(b=n(),a.then(b.resolve,b.reject),b.promise)}):f({when:function(){return a},get:function(b){return a[b]},put:function(b,d){return a[b]=d},del:function(b){return delete a[b]},post:function(b,d){return a[b].apply(a,d)},apply:function(b,d){return a.apply(b,
		d)},viewInfo:function(){for(var b=a,d={};b;)Object.getOwnPropertyNames(b).forEach(function(a){d[a]||(d[a]=typeof b[a])}),b=Object.getPrototypeOf(b);return{type:typeof a,properties:d}},keys:function(){return H(a)}},e,function(){return a})}function A(a,b){a=h(a);return b?f({viewInfo:function(){return b}},function(b){var c=j.call(arguments);return p.apply(e,[a].concat(c))},function(){return o(a)}):p(a,"viewInfo")}function g(a,b,d){function c(a){try{return b?b(a):a}catch(d){return i(d)}}function e(a){try{return d?
		d(a):i(a)}catch(b){return i(b)}}var f=n(),g=!1;l(function(){h(a).promiseSend("when",function(a){g||(g=!0,f.resolve(h(a).promiseSend("when",c,e)))},function(a){g||(g=!0,f.resolve(e(a)))})});return f.promise}function m(a){return function(b){var d=j.call(arguments,1);return p.apply(e,[b,a].concat(d))}}function p(a,b){var d=n(),c=j.call(arguments,2),a=h(a);l(function(){a.promiseSend.apply(a,[b,d.resolve].concat(c))});return d.promise}function v(a){return g(a,function(a){var d=a.length,c=[];if(d===0)return h(c);
		var f=n();t.call(a,function(a,b,e){g(b,function(a){c[e]=a;--d===0&&f.resolve(c)},f.reject)},e);return f.promise})}var l;try{l=k("event-queue").enqueue}catch(I){if(typeof MessageChannel!=="undefined"){var B=new MessageChannel,w={},C=w;B.port1.onmessage=function(){var a=w.next,b=a.task;w=a;b()};l=function(a){C=C.next={task:a};B.port2.postMessage()}}else l=function(a){setTimeout(a,0)}}var k=function(a,b,d){a[b]||(a[b]=d);return a[b]},u=k(Object,"freeze",q),r=k(Object,"create",function(a){var b=function(){};
		b.prototype=a;return new b}),H=k(Object,"keys",function(a){var b=[],d;for(d in a)b.push(d);return b}),t=Array.prototype.reduce||function(a,b){var d=0,c=this.length;if(arguments.length==1){do{if(d in this){b=this[d++];break}if(++d>=c)throw new TypeError;}while(1)}for(;d<c;d++)d in this&&(b=a(b,this[d],d));return b},j=Array.prototype.slice,z=null,o=function(a){return a===e||a===z?a:a.valueOf()};c.enqueue=c.nextTick=l;c.defer=n;c.makePromise=f;f.prototype.then=function(a,b){return g(this,a,b)};t.call("when,send,get,put,del,post,invoke,keys,apply,call,all,wait,join,fail,fin,spy,view,viewInfo,end".split(","),
		function(a,b){f.prototype[b]=function(){return c[b].apply(c,[this].concat(j.call(arguments)))}},e);f.prototype.toSource=function(){return this.toString()};f.prototype.toString=function(){return"[object Promise]"};u(f.prototype);c.isPromise=s;c.isResolved=function(a){return!s(o(a))};c.isFulfilled=function(a){return!s(o(a))&&!y(a)};c.isRejected=y;c.reject=i;i.prototype=r(f.prototype,{constructor:{value:i}});c.ref=h;c.master=c.def=function(a){return f({isDef:function(){}},function(b){var d=j.call(arguments);
		return p.apply(e,[a].concat(d))},function(){return o(a)})};c.viewInfo=A;c.view=function(a){return A(a).when(function(b){var d;d=b.type==="function"?function(){return D(a,e,arguments)}:{};var c=b.properties||{};Object.keys(c).forEach(function(b){c[b]==="function"&&(d[b]=function(){return E(a,b,arguments)})});return h(d)})};c.when=g;c.async=function(a){return function(){var b=function(a,b){var f;try{f=d[a](b)}catch(h){return Object.prototype.toString.call(h)==="[object StopIteration]"?h.value:i(h)}return g(f,
		c,e)},d=a.apply(this,arguments),c=b.bind(b,"send"),e=b.bind(b,"throw");return c()}};c.Method=m;c.send=p;c.get=m("get");c.put=m("put");c.del=m("del");var E=c.post=m("post");c.invoke=function(a,b){var d=j.call(arguments,2);return E(a,b,d)};var D=c.apply=m("apply");c.call=function(a,b){var d=j.call(arguments,2);return D(a,b,d)};c.keys=m("keys");c.all=v;c.wait=function(a){return v(arguments).get(0)};c.join=function(){var a=j.call(arguments),b=a.pop();return v(a).then(function(a){return b.apply(e,a)})};
		c.fail=function(a,b){return g(a,e,b)};c.spy=c.fin=function(a,b){return g(a,function(a){return g(b(),function(){return a})},function(a){return g(b(),function(){return i(a)})})};c.end=function(a){g(a,e,function(a){l(function(){throw a;})})};for(var F in c)h[F]=c[F];return G.exports=h});		
	});


	// @credit http://flesler.blogspot.com/2008/05/jsdump-pretty-dump-of-any-javascript.html
	require.memoize("/lib/jsdump.js", function(require, exports, module)
	{
		/**
		 * jsDump
		 * Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
		 * Licensed under BSD (http://www.opensource.org/licenses/bsd-license.php)
		 * Date: 5/15/2008
		 * @projectDescription Advanced and extensible data dumping for Javascript.
		 * @version 1.0.0
		 * @author Ariel Flesler
		 */
		var jsDump;

		function quote( str ){
			return '"' + str.toString().replace(/"/g, '\\"') + '"';
		};
		function literal( o ){
			return o + '';	
		};
		function join( pre, arr, post ){
			var s = jsDump.separator(),
				base = jsDump.indent();
				inner = jsDump.indent(1);
			if( arr.join )
				arr = arr.join( ',' + s + inner );
			if( !arr )
				return pre + post;
			return [ pre, inner + arr, base + post ].join(s);
		};
		function array( arr ){
			var i = arr.length,	ret = Array(i);					
			this.up();
			while( i-- )
				ret[i] = this.parse( arr[i] );				
			this.down();
			return join( '[', ret, ']' );
		};

		var reName = /^function (\w+)/;

		return jsDump = {
			parse:function( obj, type ){//type is used mostly internally, you can fix a (custom)type in advance
				var	parser = this.parsers[ type || this.typeOf(obj) ];
				type = typeof parser;			

				return type == 'function' ? parser.call( this, obj ) :
					   type == 'string' ? parser :
					   this.parsers.error;
			},
			typeOf:function( obj ){
				var type = typeof obj,
					f = 'function';//we'll use it 3 times, save it
				return type != 'object' && type != f ? type :
					!obj ? 'null' :
					obj.exec ? 'regexp' :// some browsers (FF) consider regexps functions
					obj.getHours ? 'date' :
					obj.scrollBy ?  'window' :
					obj.nodeName == '#document' ? 'document' :
					obj.nodeName ? 'node' :
					obj.item ? 'nodelist' : // Safari reports nodelists as functions
					obj.callee ? 'arguments' :
					obj.call || obj.constructor != Array && //an array would also fall on this hack
						(obj+'').indexOf(f) != -1 ? f : //IE reports functions like alert, as objects
					'length' in obj ? 'array' :
					type;
			},
			separator:function(){
				return this.multiline ?	this.HTML ? '<br />' : '\n' : this.HTML ? '&nbsp;' : ' ';
			},
			indent:function( extra ){// extra can be a number, shortcut for increasing-calling-decreasing
				if( !this.multiline )
					return '';
				var chr = this.indentChar;
				if( this.HTML )
					chr = chr.replace(/\t/g,'   ').replace(/ /g,'&nbsp;');
				return Array( this._depth_ + (extra||0) ).join(chr);
			},
			up:function( a ){
				this._depth_ += a || 1;
			},
			down:function( a ){
				this._depth_ -= a || 1;
			},
			setParser:function( name, parser ){
				this.parsers[name] = parser;
			},
			// The next 3 are exposed so you can use them
			quote:quote, 
			literal:literal,
			join:join,
			//
			_depth_: 1,
			// This is the list of parsers, to modify them, use jsDump.setParser
			parsers:{
				window: '[Window]',
				document: '[Document]',
				error:'[ERROR]', //when no parser is found, shouldn't happen
				unknown: '[Unknown]',
				'null':'null',
				undefined:'undefined',
				'function':function( fn ){
					var ret = 'function',
						name = 'name' in fn ? fn.name : (reName.exec(fn)||[])[1];//functions never have name in IE
					if( name )
						ret += ' ' + name;
					ret += '(';

					ret = [ ret, this.parse( fn, 'functionArgs' ), '){'].join('');
					return join( ret, this.parse(fn,'functionCode'), '}' );
				},
				array: array,
				nodelist: array,
				arguments: array,
				object:function( map ){
					var ret = [ ];
					this.up();
					for( var key in map )
						ret.push( this.parse(key,'key') + ': ' + this.parse(map[key]) );
					this.down();
					return join( '{', ret, '}' );
				},
				node:function( node ){
					var open = this.HTML ? '&lt;' : '<',
						close = this.HTML ? '&gt;' : '>';

					var tag = node.nodeName.toLowerCase(),
						ret = open + tag;

					for( var a in this.DOMAttrs ){
						var val = node[this.DOMAttrs[a]];
						if( val )
							ret += ' ' + a + '=' + this.parse( val, 'attribute' );
					}
					return ret + close + open + '/' + tag + close;
				},
				functionArgs:function( fn ){//function calls it internally, it's the arguments part of the function
					var l = fn.length;
					if( !l ) return '';				

					var args = Array(l);
					while( l-- )
						args[l] = String.fromCharCode(97+l);//97 is 'a'
					return ' ' + args.join(', ') + ' ';
				},
				key:quote, //object calls it internally, the key part of an item in a map
				functionCode:'[code]', //function calls it internally, it's the content of the function
				attribute:quote, //onode calls it internally, it's an html attribute value
				string:quote,
				date:quote,
				regexp:literal, //regex
				number:literal,
				'boolean':literal
			},
			DOMAttrs:{//attributes to dump from nodes, name=>realName
				id:'id',
				name:'name',
				'class':'className'
			},
			HTML:false,//if true, entities are escaped ( <, >, \t, space and \n )
			indentChar:'   ',//indentation unit
			multiline:true //if true, items in a collection, are separated by a \n, else just a space.
		};
	});

});
