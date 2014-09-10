;(function(ns, $) {

	var htmlTemlate = '\
		<div class="col-xs-12 col-sm-5 col-sm-push-1 col-md-4 col-md-push-2">\
			<textarea cols="34" rows="5" readonly></textarea>\
		</div>\
		<div class="col-xs-12 col-sm-5 col-sm-push-1 col-md-4 col-md-push-2">\
			<textarea cols="34" rows="5" readonly></textarea>\
		</div>';

	var defaults = {
		html: {
			placeholder: 'Html code'
		},

		css: {
			placeholder: 'Css code'
		}
	};

	ns.CodeControls = function(holder, config) {
		this._holder = holder;
		this._config = $.extend({}, defaults, config);
		this._controls = { html: null, css: null };
		this._init();
	};

	ns.CodeControls.prototype = {

		html: function(value) {
			if (value == null)
				return this._controls.html.val();
			this._controls.html.val(value);
		},

		css: function(value) {
			if (value == null)
				return this._controls.css.val();
			this._controls.css.val(value);
		},

		_init: function() {
			this._holder.html(htmlTemlate);
			this._initControls();
		},

		_initControls: function() {
			var textareas = this._holder.find('textarea');
			this._controls.html = textareas.eq(0).attr('placeholder', this._config.html.placeholder);
			this._controls.css = textareas.eq(1).attr('placeholder', this._config.css.placeholder);
		}
	};

}(window.cssbutton, jQuery));