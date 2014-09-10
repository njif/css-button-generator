;(function(ns, $) {

	var htmlTemlate = '\
			<label class="control-label col-sm-4"></label>\
			<div class="control-holder col-sm-8">\
				<div class="options-slider"></div>\
			</div>';

	var defaults = { label: "", slider: { range: "min",  value: 0, min: 0, max: 20 } };

	var OptionsSlider = function(holder, label, settings) {
		this._config = $.extend({}, defaults.slider, settings);
		this._label = label || defaults.label;
		this._holder = holder;
		this._controls = { label: null, slider: null };
		this._callbacks = { changed: [] };
		this._init();
	};

	OptionsSlider.prototype = {

		onChange: function (callback) { return ns.jstools.subscribe(this, this._callbacks.changed, callback); },

		_init: function ()
		{	 
			this._holder.html(htmlTemlate);
			this._initControls();
		},

		_initControls: function() {
			this._controls.label = this._holder.find('label').html(this._label);

			var changed = this._callbacks.changed;

			this._controls.slider = this._holder.find('.options-slider')
				.slider(this._config)
				.on('slide', function(ev, ui) { 
					ns.jstools.publish(changed, ui.value + 'px'); 
				});
		}
	};

	ns.OptionsSlider = OptionsSlider;

})(window.cssbutton, jQuery);