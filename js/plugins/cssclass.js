;(function(ns) {

	var CssClass = function() {
		this._map = {};
	};

	CssClass.prototype = {
		add: function(className, cssRules) {
			this._map[className] = cssRules;
			return this;
		},
		get: function(className) {
			return this._map[className];
		},

		toString: function(className) {
			var rules = this.get(className);
			if (!rules)
				return '';
			var str = '';
			for (var prop in rules)
				if (rules.hasOwnProperty(prop))
					str += '   ' + prop + ': ' + rules[prop] + ';\n';
			return str;
		}
	};

	ns.CssClass = CssClass;

}(window.cssbutton));