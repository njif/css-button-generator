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
		},

		parsePostResponse: function(data) {
			// TODO: implement this function later!
		},

		validEmail: function(email) {
			var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
			return pattern.test(email);
		},

		sendEmail: function(params) {
			if (!this.validEmail(params.email))
				return params.done({ error: true, message: 'Invalid email' });

			$.ajax({
				url: 'dist/php/email/send.php',
				type: 'POST',
				data: { email: params.email, html: params.html, css: params.css },
				success: function(data) {
					if (!params.done)
						return;
					params.done({ error: false, message: data.statusText});
				},
				error: function(data) {
					if (!params.done)
						return;
					params.done({ error: true, message: data.statusText + ' (error code: ' + data.status + ')'  });
				}
			});
		}
	},

	ns = namespace || window;

	ns.jstools = {
		subscribe: _private.addCallbackTo.bind(_private),
		unsubscribe: _private.deleteCallbackFrom.bind(_private),
		publish: _private.raiseCallbacks1Param.bind(_private),
		sendEmail: _private.sendEmail.bind(_private)
	};

}(window.cssbutton));