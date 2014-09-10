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
			'outline': 'none'
		}
	};

	ns.ResultControls = function(holder, config) {
		this._holder = holder;
		this._config = $.extend({}, defaults, config);
		this._controls = { button: null };
		this._btnClass = 'default-button';
		this._style = null;
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
			var css = this._getButtonCssString(changes);
			ns.cssrules.remove('.' + this._btnClass);
			ns.cssrules.add('.' + this._btnClass, css);
			ns.jstools.publish(this._callbacks.css, '.' + this._btnClass + ' {\n' + css + '}');
		},

		setText: function(value) {
			this._controls.button[0].innerHTML = value;
			ns.jstools.publish(this._callbacks.html, $.trim(this._controls.button.parent().html()));
		},

		_getButtonCssString: function(changes) {
			this._config.buttonStyle = $.extend({}, this._config.buttonStyle, changes);
			this._style.add(this._btnClass, this._config.buttonStyle);
			return this._style.toString(this._btnClass);
		},

		_init: function() {
			this._holder.html(htmlTemlate);
			this._controls.button = this._holder.find('button').addClass(this._btnClass);
			this._style = new ns.CssClass().add(this._btnClass,this._config.buttonStyle);
			ns.cssrules.add('.' + this._btnClass, this._style.toString(this._btnClass));
		}
	};

}(window.cssbutton, jQuery));