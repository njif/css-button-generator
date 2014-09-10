;(function(ns, $) {

	var htmlTemlate = '\
		<h2>Options</h2>\
		<form class="form-horizontal" role="form">\
			<div class="form-group"></div>\
			<div class="form-group"></div>\
			<div class="form-group form-group-sm"></div>\
		</form>';

	var defaults = { borderRadius: 4, borderWidth: 1, inputText: "Button text" };

	ns.OptionsControls = function(holder, config) {
		this._holder = holder;
		this._config = $.extend({}, defaults, config);
		this._callbacks = { css: [], text: [] };
		this._controls = { borderRadius: null, borderWidth: null, inputText: null };
		this._init();
	};

	ns.OptionsControls.prototype = {

		onCssChanged: function (callback) { return ns.jstools.subscribe(this, this._callbacks.css, callback); },
		onTextChanged: function (callback) { return ns.jstools.subscribe(this, this._callbacks.text, callback); },

		_init: function() {
			this._holder.html(htmlTemlate);
			this._createControls(this._controls);
			this._attachEvents(this._controls);
		},

		_createControls: function(c) {
			var fg = this._holder.find('.form-group');
			c.borderRadius = new ns.OptionsSlider(fg.eq(0), 'Border radius', { value: defaults.borderRadius } );
			c.borderWidth = new ns.OptionsSlider(fg.eq(1), 'Border size', { value: defaults.borderWidth, max: 10 } );
			c.inputText = new ns.OptionsText(fg.eq(2), { label: 'Text', text: this._config.inputText })//$('#buttonText').val(this._config.inputText);
		},

		_attachEvents: function(c) {
			var cbcss = this._callbacks.css,
				cbtext = this._callbacks.text;
			c.borderRadius.onChange(function(value) { ns.jstools.publish(cbcss, { 'border-radius': value }); });
			c.borderWidth.onChange(function(value) { ns.jstools.publish(cbcss, { 'border-width': value }); });
			c.inputText.onChange(function(value) { ns.jstools.publish(cbtext, value); });
		}
	};

}(window.cssbutton, jQuery));