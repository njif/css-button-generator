;(function(ns, $) {

	var htmlTemlate = '\
		<label class="col-sm-4 control-label"></label>\
		<div class="col-sm-8">\
			<input type="text" class="form-control input-sm">\
		</div>';

	var defaults = { label: "Text", text: "Text" };

	var OptionsText = function(holder, settings) {
		this._config = $.extend({}, defaults, settings);
		this._holder = holder;
		this._controls = { label: null, text: null };
		this._callbacks = { changed: [] };
		this._init();
	};

	OptionsText.prototype = {

		onChange: function (callback) { return ns.jstools.subscribe(this, this._callbacks.changed, callback); },

		_init: function ()
		{
			this._holder.html(htmlTemlate);
			this._initControls();
		},

		_initControls: function() {
			this._controls.label = this._holder.find('label').html(this._config.label);
			this._controls.text = this._holder.find('input')
				.attr('palceholder',  this._config.text)
				.val(this._config.text)
				.on('focus', $.proxy(this._onTextFocus, this))
				.on('blur', $.proxy(this._onTextBlur, this))
				.on('keyup', $.proxy(this._onTextChange, this));
		},

		_onTextChange: function(ev) {
			var val = this._controls.text.val();
			ns.jstools.publish(this._callbacks.changed, val);
		},

		_onTextFocus: function() {
			if (this._controls.text.val() != this._config.text)
				return;
			
			this._controls.text.val('');
			ns.jstools.publish(this._callbacks.changed, '');
		},

		_onTextBlur: function() {
			if (this._controls.text.val() != '')
				return;

			this._controls.text.val(this._config.text);
			ns.jstools.publish(this._callbacks.changed, this._config.text);
		}
	};

    ns.OptionsText = OptionsText;

})(window.cssbutton, jQuery);


