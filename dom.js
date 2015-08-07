var DOM = (function () {
	
	// Constructor
	function DOM(selector, context) {

		if (selector instanceof Array) {
			this.elements = selector;
		} else if (selector === document) {
			this.elements = [document];
		} else {
			this.elements = toArray((context || document).querySelectorAll(selector));
		}

	}

	/**
	 * Private helper methods
	 */
	
	// predicate to detect if a variable has been defined
	var isDefined = function (variable) {
		return typeof variable !== 'undefined';
	};
	
	// Convert a NodeList into an ordinary array
	var toArray = function (nodeList) {
		return Array.prototype.slice.call(nodeList);
	}
	
	// Convenience variable
	var fn = DOM.prototype;
	
	/**
	 * Public helper methods
	 */
	// Loop through all the elements
	fn.each = function (fn) {
		for (var i = 0; i < this.elements.length; ++i) {
			fn(this.elements[i], i);
		}
		return this;
	}
	
	// Query search in context to the current nodes
	fn.find = function (selector) {
		var elements = [];
		this.each(function (el) {
			console.log(toArray(el.querySelectorAll(selector)));
			elements = elements.concat(toArray(el.querySelectorAll(selector)));
		});
		return new DOM(elements);
	}
	
	/**
	 * DOM Manipulation
	 */
	 
	// Set the value of all the elements
	// return value of first element if no param
	fn.value = function (valueToSet) {
		if (isDefined(valueToSet)) {
			this.each(function (el) {
				el.value = valueToSet;
			});
			return this;
		}
		return this.elements[0].value;
	}
	
	// Set an attribute of all the elements
	// return attribute value of first element if no param
	fn.attribute = function (attribute, valueToSet) {
		if (isDefined(valueToSet)) {
			this.each(function (el) {
				el.setAttribute(attribute, valueToSet);
			});
			return this;
		}
		return this.elements[0].getAttribute(attribute);
	}
	
	// Set the html of all the elements
	// return html of the first element if no param
	fn.html = function (valueToSet) {
		if (isDefined(valueToSet)) {
			this.each(function (el) {
				el.innerHTML = valueToSet;
			});
			return this;
		}
		return this.elements[0].innerHTML;
	}
	
	// Append html or a Node to the elements
	fn.append = function (valueToAppend) {

		if (typeof valueToAppend === 'string') {
			this.each(function (el) {
				el.innerHTML += valueToAppend;
			});
			return this;
		}

		this.each(function (el) {
			el.appendChild(valueToAppend.cloneNode(true));
		});
		return this;
	}
	
	// Prepend html or a Node to the elements
	fn.prepend = function (valueToPrepend) {

		if (typeof valueToPrepend === 'string') {

			this.each(function (el) {
				el.innerHTML = valueToPrepend + el.innerHTML;
			});

			return this;
		}

		this.each(function (el) {
			el.insertBefore(valueToPrepend.cloneNode(true), el.firstChild);
		});
		return this;
	}

	/**
	 * Events
	 */
	
	// Add an event to element(s)
	fn.on = function (eventType, fn, capture) {
		this.each(function (el) {
			if (el.addEventListener) {
				el.addEventListener(eventType, fn, !!capture);
			} else if (el.attachEvent) {
				el.attachEvent("on" + eventType, fn);
			}
		});
		return this;
	};
	
	// Remove an event from element(s)
	fn.off = function (eventType, fn, capture) {
		this.each(function (el) {
			if (el.removeEventListener) {
				el.removeEventListener(eventType, fn, !!capture);
			} else if (el.detachEvent) {
				el.detachEvent("on" + eventType, fn);
			}
		});
		return this;
	};
	
	// Wrapper method for detecting the DOM is ready to use
	fn.ready = function(fn) {
		return this.on('DOMContentLoaded', fn);
	}	
	
	return function (selector, context) {
		return new DOM(selector, context);
	};

})();

