;({
	initialize: function () {		
		var resultBtn = $('.result-button');
		this.initDefaults(resultBtn);
		this.initControls(resultBtn);
		this.attachEvents();
	},

	initDefaults: function(resultBtn) {
		this._default = {
			radius: resultBtn.css('border-radius').split("px")[0],
			width: resultBtn.css('border-width').split("px")[0],
			text: resultBtn.html()
		};
	},

	initControls: function(resultBtn)
	{
		this.controls = {
			result: resultBtn,
			radius: $('#slider-border-radius').slider({ range: "min", value: this._default.radius, min: 0, max: 20 }),
			size: $('#slider-border-size').slider({ range: "min", value: this._default.width, min: 0, max: 20 }),
			text: $('#buttonText').val(this._default.text)
		};
	},

	attachEvents: function() {
		this.controls.radius.on('slide', $.proxy(this.onRadiusChange, this));
		this.controls.size.on('slide', $.proxy(this.onSizeChange, this));
		this.controls.text
			.on('focus', $.proxy(this.onTextFocus, this))
			.on('blur', $.proxy(this.onTextBlur, this))
			.on('keyup', $.proxy(this.onTextChange, this));
	},

	onTextFocus: function() {
		if (this.controls.text.val() != this._default.text)
			return;
		
		this.controls.text.val('');
		this.controls.result[0].innerHTML = '';
	},

	onTextBlur: function() {
		if (this.controls.text.val() != '')
			return;

		this.controls.text.val(this._default.text);
		this.controls.result[0].innerHTML = this._default.text;
	},

	onTextChange: function(ev) {
		this.controls.result[0].innerHTML = this.controls.text.val();
	},

	onRadiusChange: function(ev, ui) {
		this.controls.result.css('border-radius', ui.value);		
	},

	onSizeChange: function(ev, ui) {
		this.controls.result.css('border-width', ui.value);
	}
}).initialize();
