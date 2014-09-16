;(function(ns, $) {

	var htmlTemlate = '\
		<h2>Result</h2>\
		<div class="result-button-container">\
			<button>Button text</button>\
		</div>';

	var defaults = { 
		buttonText: "Button text", 
		buttonStyle: {
			'border': 'solid #3181b4',
			'border-width': '1px',
			'border-radius': '4px',
			'font-family': 'MyriadPro-Bold',
			'font-size': '16px',
			'font-weight': 'bold',
			'background-color': '#37a1e4',
			'color': '#fff',
			'height': '45px',
			'max-width': '400px',
			'text-shadow': '0 1px rgba(0,0,0,.32)',
			'box-shadow': '0 1px 1px rgba(0,0,0,.19), inset 0 2px rgba(255,255,255,.58), inset 0 0 5px rgba(255,255,255,.38)',
			'background-image': 'linear-gradient(to bottom, rgba(255,255,255,.34), rgba(255,255,255,0))',
			'box-shadow': '0 1px 1px rgba(0,0,0,.19), inset 0 2px rgba(255,255,255,.5), inset 0 0 5px rgba(255,255,255,.31)',
			'outline': 'none'
		}
	};

	ns.ResultControls = function(holder, config) {
		this._holder = holder;
		this._config = $.extend({}, defaults, config);
		this._controls = { button: null };
		this._btnClass = 'default-button';
		this._callbacks = { css: [], html: [] };
		this._init();
	};

	ns.ResultControls.prototype = {

		onCssChanged: function (callback) { return ns.jstools.subscribe(this, this._callbacks.css, callback); },
		onHtmlChanged: function (callback) { return ns.jstools.subscribe(this, this._callbacks.html, callback); },
		raiseAllCallbacks: function() {
			this.setText(this._controls.button[0].innerHTML);
			this.setCss({});
		},

		setCss: function(changes) {
			var style = this._getButtonCssString(changes);
			ns.cssrules.remove('.' + this._btnClass);
			ns.cssrules.add('.' + this._btnClass, style.substring(1, style.length-1));
			ns.jstools.publish(this._callbacks.css, '.' + this._btnClass + style);
		},

		setText: function(value) {
			this._controls.button[0].innerHTML = value;
			ns.jstools.publish(this._callbacks.html, $.trim(this._controls.button.parent().html()));
		},

		_init: function() {
			this._holder.html(htmlTemlate);
			this._controls.button = this._holder.find('button').addClass(this._btnClass);
			var style = this._appendPrefixes(this._config.buttonStyle);
			ns.cssrules.add('.' + this._btnClass, style.substring(1,style.length-1));
			this._config.buttonStyle = this._convertFromStyleToObject(style);
		},

		_getButtonCssString: function(changes) {
			this._config.buttonStyle = $.extend({}, this._config.buttonStyle, changes);
			return this._appendPrefixes(this._config.buttonStyle);
		},

		_convertFromStyleToObject: function(styleStr) {
			if (styleStr.length < 5)
				return JSON.parse(styleStr);
			var fixed = styleStr.replace(/:/g, '":"').replace(/;/g, '","').replace('{', '{"').replace(',"}', '}')
			return JSON.parse(fixed);
		},

		_convertObjectToStyle: function(obj)
		{
			var retval = '{';
			for (prop in obj)
				if (obj.hasOwnProperty(prop))
					retval += prop + ':' + obj[prop] + ';';
			return retval + '}';
		},

		_appendPrefixes: function(styleObj) {
			var styleStr = this._convertObjectToStyle(styleObj);
			var fixed = ns.jstools.addPrefixes(styleStr);
		
			return fixed.length < 5 ? styleStr : fixed;
		}
	};

}(window.cssbutton, jQuery));