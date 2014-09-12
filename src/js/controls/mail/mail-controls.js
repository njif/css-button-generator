;(function(ns, $) {

	var htmlTemlate = '\
		<form role="form">\
			<div class="form-group">\
				<input type="email" class="form-control input-sm email-input" required>\
				<input type="submit" class="email-submit">\
				<p class="message"></p>\
			</div>\
		</form>';

	var defaults = {
		emailText: "mail",
		submitText: "Submit"
	};

	ns.MailControls = function(holder, config) {
		this._holder = holder;
		this._config = $.extend({}, defaults, config);
		this._controls = { email: null, submit: null, message: null };
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
			this._controls.submit = inputs.filter('[type=submit]').val(this._config.submitText).on('click', $.proxy(this._onSubmit, this));		
			this._controls.message = this._holder.find('.message');
		},

		_valid: function(email) {
			return email != '';
		},

		_onSubmit: function(e) {
			e.preventDefault();
			var email = this._controls.email.val(),
				controls = this._controls;
			if (!this._valid(email)) {
				controls.message.addClass('bg-danger').removeClass('bg-success').html('Invalid email').show();
				controls.email.addClass('has-error');
				return false;
			};
			controls.message.hide().html('');
			controls.email.removeClass('has-error').addClass('has-success');
			controls.message.removeClass('bg-danger bg-success').html('').hide();
			ns.jstools.publish(this._callbacks.submit, { email: email, done: $.proxy(this._onDone, this) });
		},

		_onDone: function(response) {
			if (response.error = true)
				this._controls.message.addClass('bg-danger').removeClass('bg-success');
			else
				this._controls.message.addClass('bg-success').removeClass('bg-danger');

			this._controls.message.html(response.message).show();
		}
	};

}(window.cssbutton, jQuery));