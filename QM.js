var QM = (function () {
	/*
	 * QM()
	 * (string Selector,['click'etc],[function],['on'|'off'])
	 */
	var $ = function (Selector, Action, Func, Bind) {
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

(function ($) {
	/*
	 * QM.errorDetect()
	 * (any)
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
	$.errorDetect = function (data) {
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

(function ($) {
	/*
	 * QM.scrollToBottom()
	 * (function)
	 */
	function scrollToBottom(func) {
		var cHeight, sHeight, sTop;
		if (client.browser.firefox) {
			window.addEventListener('DOMMouseScroll', function (event) {
				if (event.detail) {
					if (document.compatMode == "BackCompat") {
						cHeight = document.body.clientHeight;
						sHeight = document.body.scrollHeight;
					} else {
						cHeight = document.documentElement.clientHeight;
						sHeight = document.documentElement.scrollHeight;
					}
					sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
					sTop = Math.ceil(sTop);
					if (sTop + cHeight == sHeight) {
						func();
					}
				}
			})
		} else {
			window.addEventListener('wheel', function (event) {
				if (event.wheelDelta < 0) {
					if (document.compatMode == "BackCompat") {
						cHeight = document.body.clientHeight;
						sHeight = document.body.scrollHeight;
					} else {
						cHeight = document.documentElement.clientHeight;
						sHeight = document.documentElement.scrollHeight;
					}
					sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
					sTop = Math.ceil(sTop);
					if (sTop + cHeight == sHeight) {
						func();
					}
				}
			})
		}
	}
	$.scrollToBottom = scrollToBottom;
	return $;
})(QM);

(function ($) {
	/*
	 * QM.loading()
	 * ()
	 * dom:
	 * 	<div class=" loadingMain ">
	 *  	<div class="loadingBar ">
     *            0
     *  	</div>
     * 	</div>
	 */
	var count = 0;
	$.loading = function () {
		var img = [].slice.call(document.getElementsByTagName("img"));
		var link = [].slice.call(document.getElementsByTagName("link"));
		//var script = [].slice.call(document.getElementsByTagName("script"));
		//var audio = [].slice.call(document.getElementsByTagName("audio"));
		var sources = img.concat(link);
		var l = sources.length;
		for (var i = 0; i < l; i++) {
			detection(sources[i], l);
		}
	}

	function detection(v, l) {
		v.onload = function () {
			++count;
			var percent = Math.floor(count / l * 100) + '%';
			$(".loadingBar").style.width = percent;
			$(".loadingBar").innerHTML = percent;
		}
		v.onerror = function () {
			++count;
			var percent = Math.floor(count / l * 100) + '%';
			$(".loadingBar").style.width = percent;
			$(".loadingBar").innerHTML = percent;
		}
		if (count == l) {
			$(".loadingMain").style.display = 'none';
		}
	}
	return $;
})(QM);

(function ($) {
	function touchLeft(Selector, func) {
		var startX;
		var startY;
		var touchMove = function (e) {
			var distanceX = startX - e.changedTouches[0].clientX;
			var distanceY = startY - e.changedTouches[0].clientY;
			if ((Math.abs(distanceX) > Math.abs(distanceY)) && distanceX > 10) {
				$(Selector, 'touchmove', touchMove, 'off');
				func();
			}
		}
		var touchStart = function (e) {
			startX = e.changedTouches[0].clientX;
			startY = e.changedTouches[0].clientY;
			$(Selector, 'touchmove', touchMove)
		}
		$(Selector, 'touchstart', touchStart);
	}
	function touchTop(Selector, func) {
		var startX;
		var startY;
		var touchMove = function (e) {
			var distanceX = startX - e.changedTouches[0].clientX;
			var distanceY = startY - e.changedTouches[0].clientY;
			if ((Math.abs(distanceY) > Math.abs(distanceX)) && distanceY > 10) {
				$(Selector, 'touchmove', touchMove, 'off');
				func();
			}
		}
		var touchStart = function (e) {
			startX = e.changedTouches[0].clientX;
			startY = e.changedTouches[0].clientY;
			$(Selector, 'touchmove', touchMove)
		}
		$(Selector, 'touchstart', touchStart);
	}
	$.touchTop = touchTop;
	$.touchLeft = touchLeft;
	return $;
})(QM);
