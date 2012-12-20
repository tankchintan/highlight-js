/*

highlight v3

Highlights arbitrary terms.

<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/
!function($) {
	$.fn.highlight = function(pat) {
		//Based on Underscore's implementation for isArray method.
		var _isArrayInner = Array.isArray ||
		function(obj) {
			return toString.call(obj) == '[object Array]';
		};

		function isArray(obj) {
			return _isArrayInner(obj);
		};

		function innerHighlight(node, pat) {
			var skip = 0;
			if (node.nodeType == 3) {
				var isPatternArray = isArray(pat);
				if (!isPatternArray) {
					pat = [pat];
				}
				var patternCount = pat.length;
				for (var ii = 0; ii < patternCount; ii++) {
					var currentTerm = pat[ii].toUpperCase();
					var pos = node.data.toUpperCase().indexOf(currentTerm);
					if (pos >= 0) {
						var spannode = document.createElement('span');
						spannode.className = 'highlight';
						var middlebit = node.splitText(pos);
						var endbit = middlebit.splitText(currentTerm.length);
						var middleclone = middlebit.cloneNode(true);
						spannode.appendChild(middleclone);
						middlebit.parentNode.replaceChild(spannode, middlebit);
						skip = 1;
					}
				}
			} else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
				for (var i = 0; i < node.childNodes.length; ++i) {
					i += innerHighlight(node.childNodes[i], pat);
				}
			}
			return skip;
		}
		return this.each(function() {
			innerHighlight(this, pat);
		});
	};

	$.fn.removeHighlight = function() {
		return this.find("span.highlight").each(function() {
			this.parentNode.firstChild.nodeName;
			with(this.parentNode) {
				replaceChild(this.firstChild, this);
				normalize();
			}
		}).end();
	};
}(window.jQuery);