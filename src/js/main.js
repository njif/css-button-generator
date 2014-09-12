;(function(ns, $) {

	var app = function() {
		this._controls = { options: null, result: null, code: null, mail: null };
		this._init();
	};

	app.prototype = {
		_init: function () {
			this._createControls();
			this._attachEvents();
			this._controls.result.raiseAllCallbacks();
		},

		_createControls: function() {
			this._controls.options = new ns.OptionsControls($('.options-block'));
			this._controls.result = new ns.ResultControls($('.result-block'));
			this._controls.code = new ns.CodeControls($('.generator-code'));
			this._controls.mail = new ns.MailControls($('.generator-mail'));
		},

		_attachEvents: function() {
			var controls = this._controls;

			controls.options
				.onCssChanged(function(changes) { 
					controls.result.setCss(changes); 
				})
				.onTextChanged(function(value) { 
					controls.result.setText(value); 
				});

			controls.result
				.onCssChanged(function(value) { 
					controls.code.css(value); 
				})
				.onHtmlChanged(function(value) { 
					controls.code.html(value); 
				});

			var text = this._getEmailText(controls.code.html(), controls.code.css());
			controls.mail.onSubmit(function(params) {
				params = $.extend({}, { html: controls.code.html(), css: controls.code.css()}, params);
				ns.jstools.sendEmail(params);
			});
		},

		_getEmailText: function(html, css) {
			return css + html; // TODO!
		}
	};

	new app();

}(window.cssbutton, jQuery));