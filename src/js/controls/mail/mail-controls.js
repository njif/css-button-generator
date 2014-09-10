;(function(ns, $) {

	var htmlTemlate = '\
		<form role="form">\
			<div class="form-group">\
				<input type="email" class="form-control input-sm email-input">\
				<input type="submit" class="email-submit">\
			</div>\
		</form>';

	var defaults = {
		emailText: "mail",
		submitText: "Submit"
	};

	ns.MailControls = function(holder, config) {
		this._holder = holder;
		this._config = $.extend({}, defaults, config);
		this._controls = { email: null, submit: null };
		this._callbacks = { submit: [] };
		this._init();
	};

	ns.MailControls.prototype = {

		onSubmit: function (callback) { return ns.jstools.subscribe(this, this._callbacks.submit, callback); },

		_init: function() {
			this._holder.html(htmlTemlate);
			this._initControls();
		},

		_initControls: function() {
			var inputs = this._holder.find('input');
			this._controls.email = inputs.filter('[type=email]').attr('placeholder', this._config.emailText);
			this._controls.submit = inputs.filter('[type=submit]').val(this._config.submitText);
		}
	};

}(window.cssbutton, jQuery));