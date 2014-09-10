;(function(namespace) {

	var d = document,
	_private = {

		addCallbackTo: function (owner, callbacks, callback) {
			if (callback != null && typeof callback == 'function')
				callbacks.push(callback);
			if (callbacks.owner == null)
				callbacks.owner = owner;
			if (callbacks.maxIndex == null)
				callbacks.maxIndex = 1;
			if (callback != null)
				callback.callbackIndex = callbacks.maxIndex++;
			return owner;
		},

		deleteCallbackFrom: function (owner, callbacks, callback) {
			if (callback != null && typeof callback == 'function' || $Utils.isNullOrEmptyArray(callbacks))
			{
				var callbackIndex = callback.callbackIndex;
				if (callbackIndex > 0)
				{
					var newArr = [];
					for (var i = 0; i < callbacks.length; i++)
					{
						if (callbacks[i].callbackIndex != callbackIndex)
							newArr.push(callbacks[i]);
					}
					if (newArr.length != callbacks.length)
					{
						newArr.maxIndex = callbacks.maxIndex;
						return newArr;
					}
				}
			}
			return callbacks;
		},

		raiseCallbacks: function (callbacks, args) {
			if (args == null)
				args = [];

			for (var i = 0; i < callbacks.length; i++)
				callbacks[i].apply(callbacks.owner, args);
		},

		raiseCallbacks1Param: function (callbacks, param) {
			this.raiseCallbacks(callbacks, [param]);
		}
	},

	ns = namespace || window;

	ns.jstools = {
		subscribe: _private.addCallbackTo.bind(_private),
		unsubscribe: _private.deleteCallbackFrom.bind(_private),
		publish: _private.raiseCallbacks1Param.bind(_private)
	};

}(window.cssbutton));