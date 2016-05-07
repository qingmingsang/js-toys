var QM = (function() {
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