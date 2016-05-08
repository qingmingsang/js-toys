var QM = (function() {
	/*
	 * QM()
	 * (string Selector,['click'etc],[function],['on'|'off'])
	 */
	var $ = function(Selector, Action, Func, Bind) {
		if (Action) {
			var i = 0;
			var picker = document.querySelectorAll(Selector);
			if (Bind !== 'off') {
				while (i < picker.length) {
					picker[i].addEventListener(Action, Func);
					++i;
				}
			} else {
				while (i < picker.length) {
					picker[i].removeEventListener(Action, Func);
					++i;
				}
			}
		} else {
			return document.querySelectorAll(Selector)[0];
		}
	}
	return $;
})();
(function($) {
	/*
	 * QM.errorDetect()
	 */

	function stringDetect(str) {
		var errorData = ['null', 'false', 'error', '0', 'undefined', 'NaN', '[]', '{}', ''];
		for (var i = 0; i < errorData.length; i++) {
			if (str === errorData[i]) {
				return false;
			}
		}
		return str;
	}

	function objectDetect(obj) {
		if (obj === null || (obj instanceof Array && obj.length === 0) || (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0)) {
			return false;
		} else {
			return obj;
		}
	}
	$.errorDetect = function(data) {
		switch (typeof data) {
			case 'string':
				return stringDetect(data);
			case 'object':
				return objectDetect(data);
			default:
				return data;
		}
	}
	return $;
})(QM);