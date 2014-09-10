;(function(ns) {

	ns.CssRule = function(key, value, keyPrefixes, valuePrefixes) {
		this._key = key;
		this._value = value;
		this._keyPrefixes = keyPrefixes || [];
		this._valuePrefixes = valuePrefixes || [];
	};

	ns.CssRule.prototype = {

		key: function() {
			return this._key;
		},

		value: function(val) {
			if (val == null)
				return this._value;
			this._value = val;
			this._string = null;
		},

		toString: function() {
			if (this._string)
				return this._string;
			this._string = this._createRuleString();
			return this._string;
		},

		_createRuleString: function() {
			var i, str = '';
			
			for (i = 0; i < kf.length; i++)
				str += '	' + kf[i] + this._key + ': ' + v + ';\n';

			for (i = 0; i < this._valuePrefixes.length; i++)
				str += '	' + this._valuePrefixes[i] + this._key + ': ' + this._value + ';\n';

			str += '	' + this._key + ': ' + this._value + ';\n';

			this._string = str;

			return str;
		}
	};

}(window.cssbutton));