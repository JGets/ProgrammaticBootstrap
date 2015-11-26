"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* Basic Bootstrap Object
* 
* @author John Gettings
*/

var BSObject = (function () {
	function BSObject() {
		_classCallCheck(this, BSObject);

		this._$elem = null;

		//create a unique ID for this object
		this._uid = "pBS-" + Date.now() + "-" + Math.ceil(Math.random() * 99999999999999999999);
	}

	/**
 * Appends this BSObject to the given object.
 * @param {(jQuery|BSObject)} obj - The object that this is to be appended to
 * @throws Will throw an error if obj is not a BSObject or jQuery object.
 */

	_createClass(BSObject, [{
		key: "appendTo",
		value: function appendTo(obj) {
			if (obj instanceof BSObject || obj instanceof jQuery) {
				obj.append(this._$elem);
			} else {
				throw "Error: BSObject can only be appended to other BSObjects or jQuery objects";
			}
		}

		/**
  * Prepends this BSObject to the given object.
  * @param {(jQuery|BSObject)} obj - The object that this is to be prepended to
  * @throws Will throw an error if obj is not a BSObject or jQuery object.
  */

	}, {
		key: "prependTo",
		value: function prependTo(obj) {
			if (obj instanceof BSObject || obj instanceof jQuery) {
				obj.prepend(this._$elem);
			} else {
				throw "Error: BSObject can only be prepended to other BSObjects or jQuery objects";
			}
		}

		// /**
		// * Sets/Gets the value of an attribute
		// */
		// attr(){
		// 	if(arguments.length > 1){
		// 		this._$elem.attr(arguments[0], arguments[1]);
		// 		return this;
		// 	}
		// 	return this._$elem.attr(arguments[0]);
		// }

		// prop(){
		// 	if(arguments.length > 1){
		// 		this._$elem.prop(arguments[0], arguments[1]);
		// 		return this;
		// 	}
		// 	return this._$elem.prop(arguments[0]);
		// }

		/**
  * Accessor of this object's root jQuery element.
  * @returns {jQuery} This object's root jQuery element.
  */

	}, {
		key: "$",
		get: function get() {
			return this._$elem;
		}
	}]);

	return BSObject;
})();

/**
* Basic Bootstrap Object
* 
* @extends BSObject
*/

var BSContentObject = (function (_BSObject) {
	_inherits(BSContentObject, _BSObject);

	function BSContentObject() {
		_classCallCheck(this, BSContentObject);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(BSContentObject).call(this));
	}

	/**
 * Appends the given arguments to the contents of this object
 * @param {...(string|jQuery|BSObject)} arg - The item(s) to append to this object.
 * @return {BSObject} This object
 */

	_createClass(BSContentObject, [{
		key: "append",
		value: function append() {
			this._$elem.append(this._$elem, arguments);
			return this;
		}

		/**
  * Prepends the given arguments to the contents of this object
  * @param {...(string|jQuery|BSObject)} arg - The item(s) to prepend to this object.
  * @return {BSObject} This object
  */

	}, {
		key: "prepend",
		value: function prepend() {
			this._$elem.prepend(this._$elem, arguments);
			return this;
		}

		/**
  * Sets/Gets the HTML content of this object.
  * @param {string=} htmlStr - The HTML string to set.
  * @returns {(string|BSObject)}  If no parameter given, returns a string with the HTML 
  *	contents of this object. If a parameter is given, this object is returned.
  */

	}, {
		key: "html",
		value: function html() {
			if (arguments.length > 0) {
				this._$elem.html(arguments[0]);
				return this;
			}
			return this._$elem.html();
		}

		/**
  * Sets/Gets the text content of this object.
  * @param {string=} str - The text string to set.
  * @returns {(string|BSObject)}  If no parameter given, returns a string with the text 
  *	contents of this object. If a parameter is given, this object is returned.
  */

	}, {
		key: "text",
		value: function text() {
			if (arguments.length > 0) {
				this._$elem.text(arguments[0]);
				return this;
			}
			return this._$elem.text();
		}
	}]);

	return BSContentObject;
})(BSObject);

/**
* Button Object
* @extends BSObject
* @extends BSContentObject
*/

var BSButton = (function (_BSContentObject) {
	_inherits(BSButton, _BSContentObject);

	/**
 * Creates a new button object.<br/>
 * When a button is created, you can control the DOM element type, namely &lt;button&gt;, &lt;a&gt;, or &lt;input&gt;.<br/>
 * <br/>
 * For anchor types, use the 'a:[hrefValue]', where [hrefValue] is the value to use in the anchor's href attribute. 
 * If the ':[hrefValue]' is ommited, '#' is used by default.<br/>
 * <br/>
 * For input types, use 'input:[type]' where [type] is one of 'button' or 'submit'. If the [type] is ommitted, 'button' is used by default.
 *
 * @param {string} [type="button"] - The type of button to make. Acceptable values are 'button', 'a', and 'input'. 
 */

	function BSButton() {
		var type = arguments.length <= 0 || arguments[0] === undefined ? 'button' : arguments[0];

		_classCallCheck(this, BSButton);

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSButton).call(this));

		_this2._type = null; //set down below
		_this2._disabled = false;
		_this2._clickHandler = function () {};

		var typeRegexp = /^(button|a|input)(:.+)?$/;

		if (!typeRegexp.test(type)) {
			type = 'button';
		}

		var secondary = null;
		if (type.indexOf(":") >= 0) {
			s = type.split(":");
			type = s[0];
			secondary = s[1];

			if (type === "input" && secondary != null) {
				if (!/(button|submit)/.test(secondary)) {
					secondary = 'button';
				}
			} else if (type === "a" && secondary == null) {
				secondary = "#";
			}
		}

		_this2._type = type;

		var options = {
			'class': 'btn btn-default'
		};

		if (_this2._type == "input") {
			options.type = secondary;
		} else if (_this2._type === "a") {
			options.href = secondary;
			options.role = "button";
		}

		_this2._$elem = $("<" + _this2._type + "/>", options);

		_this2._$elem.click(function (event) {
			if (!this._disabled) {
				this._clickHandler(event);
			}
		});

		return _this2;
	}

	/**
 * Sets the button size.
 * @param {string} size - The size to make the button. Acceptable values are: 'xs', 'sm', 'default', 'md' (equivalent to 'default'), and 'lg'
 * @returns {BSButon} This button object.
 */

	_createClass(BSButton, [{
		key: "setSize",
		value: function setSize(size) {
			var sizeRegex = /(xs|sm|default|md|lg)/;
			if (sizeRegex.test(size)) {
				this._$elem.removeClass("btn-xs btn-sm btn-lg");
				if (size != "default" && size != "md") {
					this._$elem.addClass("btn-" + size);
				}
			}
			return this;
		}

		/**
  * Sets whether this button should be a block style button
  * @param {boolean} [block=false] - Boolean indicating whether the button should be block style
  * @returns {BSButton} This button object.
  */

	}, {
		key: "setBlock",
		value: function setBlock() {
			var block = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			if (block) {
				this._$elem.addClass("btn-block");
			} else {
				this._$elem.removeClass("btn-block");
			}
			return this;
		}

		/**
  * Sets whether this button should appear to be in an active state
  * @param {boolean} [active=false] - Boolean indicating whether the button should appear in active state.
  * @returns {BSButton} This button object.
  */

	}, {
		key: "setActiveState",
		value: function setActiveState() {
			var active = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			if (active) {
				this._$elem.addClass("active");
			} else {
				this._$elem.removeClass("active");
			}
			return this;
		}

		/**
  * Sets/Gets whether this button object is disabled.<br/>
  * <strong>Note:</strong> a disabled button will <em>not</em> fire the button's click handler.
  * @param {boolean} [disabled] - Optional parameter to set the disabled state of the button.
  * @returns {(boolean|BSButton)} If a parameter is passed, this BSButton object is returned. If no parameter is passed, 
  * 	a boolean representing whether the button is disabled is returned.
  */

	}, {
		key: "disabled",
		value: function disabled() {
			if (arguments.length > 0) {
				//Setter
				var dis = arguments[0] === true; //force boolean
				if (dis != this._disabled) {
					//are we actually changing state?
					if (this._type == "a") {
						if (dis) {
							this._$elem.addClass("disabled");
						} else {
							this._$elem.removeClass("disabled");
						}
					} else {
						this._$elem.prop("disabled", dis);
					}
					this._disabled = dis;
				}
				return this;
			} else {
				//Getter
				return this._disabled;
			}
		}

		/**
  * Sets the button's style
  * @param {string} style - The style to set. Acceptable values are: 'default', 'primary', 'success',' info', 'warning', 'danger', and 'link'.
  * @returns {BSButton} This button object.
  */

	}, {
		key: "setStyle",
		value: function setStyle(style) {
			var styles = ['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'];
			if ($.inArray(style, styles) >= 0) {
				for (s in styles) {
					this._$elem.removeClass("btn-" + s);
				}
				this._$elem.addClass("btn-" + style);
			}
			return this;
		}

		/**
  * Sets/triggers the button's click handler.<br/>
  * <strong>Note:</strong> When a button is disabled, the click handler set through this function will not be fired, even when this function is used to attempt and fire it.
  * @param {function} [fn] - The function to be set as the click handler.
  * @returns {BSButton} This button object.
  */

	}, {
		key: "click",
		value: function click(fn) {
			if (typeof fn === "function") {
				this._clickHandler = fn;
			} else {
				this._$elem.click();
			}
			return this;
		}
	}]);

	return BSButton;
})(BSContentObject);

/**
* Super-class encapsulating functionality for input elements.<br/>
* <br/>
* <strong>Note:</strong> This class should <em>never</em> be used for creating actual user interface elements. Only this classes' subclasses (such as BSInput or BSCheckbox) should be used.
*
* @extends BSObject
*/

var BSFormInput = (function (_BSObject2) {
	_inherits(BSFormInput, _BSObject2);

	/**
 * Creates an new BSFormInput object
 */

	function BSFormInput() {
		_classCallCheck(this, BSFormInput);

		// this._type;

		var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSFormInput).call(this));

		_this3._$input = null;
		_this3._$label = null;
		_this3._$helpBlock = null;

		_this3._$elem = $("<div/>", {
			id: _this3._uid
		});
		return _this3;
	}

	/**
 * Sets/gets the label of this input element
 * @param {...(string|jQuery|BSButton)} label - Optional object(s) to set as the content of the label
 * @returns {(string|BSFormInput)} If no parameter(s) passed, a string containing the HTML of the label is returned. If one or
 *	more parameter is passed, this object is returned.
 */

	_createClass(BSFormInput, [{
		key: "label",
		value: function label() {
			if (arguments.length > 0) {
				this._$label.html("");
				this._$label.append.apply(this._$label, arguments);
				return this;
			} else {
				return this._$label.html();
			}
		}

		/**
  * Sets/gets the name of an input (ie. the name attribute).
  * @param {string} [name] - Optional string to be set as the name of the input.
  * @returns {(string|BSFormInput)} If no parameter given, the current name of the input is returned. If a paremeter is given,
  * 	this object is returned.
  */

	}, {
		key: "name",
		value: function name() {
			if (arguments.length > 0) {
				this._$input.attr("name", arguments[0]);
				return this;
			}
			return this._$input.attr("name");
		}

		/**
  * Sets/gets the placeholder of an input (ie. the placeholder attribute).
  * @param {string} [placeholder] - Optional string to be set as the placeholder of the input.
  * @returns {(string|BSFormInput)} If no parameter given, the current placeholder of the input is returned. If a paremeter is given,
  * 	this object is returned.
  */

	}, {
		key: "placeholder",
		value: function placeholder() {
			if (arguments.length > 0) {
				this._$input.attr("placeholder", arguments[0]);
				return this;
			}
			return this._$input.attr("placeholder");
		}

		/**
  * Sets/gets the value of an input.
  * @param {(string|number)} val - Optional parameter to be set as the value of this input.
  * @return {(string|string[]|BSFormInput)} If no parameter passed, the current value(s) of this input are returned. If a param is passed,
  * 	this input object is returned.
  */

	}, {
		key: "val",
		value: function val() {
			if (arguments.length > 0) {
				// this._$input.val.apply(this._$input, arguments);
				this._$input.val(arguments[0]);
				return this;
			}
			return this._$input.val();
		}

		/**
  * Sets/gets whether this input is disabled. 
  * @param {boolean} [disabled] - Indicates whether the input should be set disabled
  * @returns {(boolean|BSFormInput)} If params passed, this input is returned. If no params passed, the current disabled state is returned.
  */

	}, {
		key: "disabled",
		value: function disabled() {
			if (arguments.length > 0) {
				this._$input.prop("disabled", arguments[0]);
				return this;
			}
			return this._$input.prop("disabled");
		}

		/**
  * Sets/gets whether this input is required. 
  * @param {boolean} [required] - Indicates whether the input should be set required
  * @returns {(boolean|BSFormInput)} If params passed, this input is returned. If no params passed, the current required state is returned.
  */

	}, {
		key: "required",
		value: function required() {
			if (arguments.length > 0) {
				this._$input.prop("required", arguments[0]);
				return this;
			}
			return this._$input.prop("required");
		}

		/**
  * Sets/gets whether this input is readonly. 
  * @param {boolean} [required] - Indicates whether the input should be set readonly
  * @returns {(boolean|BSFormInput)} If params passed, this input is returned. If no params passed, the current readonly state is returned.
  */

	}, {
		key: "readonly",
		value: function readonly() {
			if (arguments.length > 0) {
				this._$input.prop("readonly", arguments[0]);
				return this;
			}
			return this._$input.prop("readonly");
		}

		/**
  * Gets/Sets the contents of the helpblock
  * @param {...(string|jQuery|BSObject)} elem - The item(s) to set as the content of this input's help block.
  * @returns {(string|BSFormInput)} If no params passed, the html of the help-block's contents is returned. If param(s) are passed,
  * 	this input object is returned.
  */

	}, {
		key: "helpBlock",
		value: function helpBlock() {
			if (this._$helpBlock == null) {
				//We don't have a help-block yet, so we need to make one.
				var hbID = this._uid + "-help-block";
				this._$helpBlock = $("<span/>", {
					id: hbID,
					'class': 'help-block'
				}).appendTo(this._$elem);
				this._$input.attr("aria-descripted-by", hbID);
			}
			if (arguments.length > 0) {
				//Setter
				this._$helpBlock.append.apply(this._$helpBlock, arguments);
				return this;
			} else {
				//Getter
				return this._$helpBlock.html();
			}
		}
	}]);

	return BSFormInput;
})(BSObject);

/**
* Representation of a &lt;input&gt; element
*
* @extends BSObject
* @extends BSFormInput
*/

var BSInput = (function (_BSFormInput) {
	_inherits(BSInput, _BSFormInput);

	/**
 * Creates a new BSInput object.
 * @param {string} [type="text"] - The input type. Acceptable values are: "text", "password", "datetime", 
 *	"datetime-local", "date", "month", "time", "week", "number", "email", "url", "search", "tel", and "color"
 */

	function BSInput(type) {
		_classCallCheck(this, BSInput);

		var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSInput).call(this));

		_this4._type;

		var typeRegexp = /(text|password|datetime|datetime-local|date|month|time|week|number|email|url|search|tel|color)/;
		if (!typeRegexp.test(type)) {
			type = "text";
		}
		_this4._type = type;

		_this4._$elem.addClass("form-group");

		_this4._$input = $("<input/>", {
			id: _this4._uid + "-input",
			type: _this4._type,
			'class': "form-control"
		});

		_this4._$label = $("<label/>", {
			id: _this4._uid + "-label",
			'for': _this4._uid + "-input"
		});

		_this4._$elem.append(_this4._$label, _this4._$input);
		return _this4;
	}

	return BSInput;
})(BSFormInput);

/**
* Representation of a checkbox/radio input.
*
* @extends BSObject
* @extends BSFormInput
*/

var BSCheckbox = (function (_BSFormInput2) {
	_inherits(BSCheckbox, _BSFormInput2);

	/**
 * Creates a new checkbox/radio input.
 * @param {string} [type="checkbox"] - The type of input to make. Acceptable values are "checkbox", "inline", "radio", "radio-inline".
 */

	function BSCheckbox(type) {
		_classCallCheck(this, BSCheckbox);

		var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSCheckbox).call(this));

		_this5._$labelText;

		var typeRegex = /(checkbox|inline|radio|radio-inline)/;
		if (!typeRegex.test(type)) {
			type = "checkbox";
		}

		var inline = type == "inline" || type == "radio-inline";
		if (type == "inline") {
			type = "checkbox";
		} else if (type == "radio-inline") {
			type = "radio";
		}

		var classText = type;
		if (inline) {
			classText += "-inline";
		}

		_this5._$elem.addClass(classText);

		_this5._$input = $("<input/>", {
			id: _this5._uid + "-input",
			type: type
		});

		// 'class' : "form-control"
		_this5._$label = $("<label/>", {
			id: _this5._uid + "-label",
			'for': _this5._uid + "-input"
		});

		_this5._$labelText = $("<span/>");

		_this5._$label.append(_this5._$input, _this5._$labelText);

		_this5._$elem.append(_this5._$label);
		return _this5;
	}

	/**
 * Sets/gets the label of this input element
 * @param {...(string|jQuery|BSButton)} label - Optional object(s) to set as the content of the label
 * @returns {(string|BSFormInput)} If no parameter(s) passed, a string containing the HTML of the label is returned. If one or
 *	more parameter is passed, this object is returned.
 */

	_createClass(BSCheckbox, [{
		key: "label",
		value: function label() {
			if (arguments.length > 0) {
				this._$labelText.html("");
				this._$labelText.append.apply(this._$labelText, arguments);
				return this;
			} else {
				return this._$labelText.html();
			}
		}

		/**
  * Sets/gets whether this input is disabled. 
  * @param {boolean} [disabled] - Indicates whether the input should be set disabled
  * @returns {(boolean|BSCheckbox)} If params passed, this input is returned. If no params passed, the current disabled state is returned.
  */

	}, {
		key: "disabled",
		value: function disabled() {
			if (arguments.length > 0) {
				var d = arguments[0] === true;
				_get(Object.getPrototypeOf(BSCheckbox.prototype), "disabled", this).call(this, d);
				if (d) {
					this._$elem.addClass("disabled");
				} else {
					this._$elem.removeClass("disabled");
				}
				return this;
			}
			return _get(Object.getPrototypeOf(BSCheckbox.prototype), "disabled", this).call(this);
		}
	}]);

	return BSCheckbox;
})(BSFormInput);

/**
* Representation of a radio input.<br/>
* Really just syntactic sugar over BSCheckbox.
*
* @extends BSObject
* @extends BSFormInput
* @extends BSCheckbox
*/

var BSRadio = (function (_BSCheckbox) {
	_inherits(BSRadio, _BSCheckbox);

	/**
 * Creates a new Radio input
 * @param {string} [type="radio"] - The type of radio to make. Acceptable values are "radio" and "inline".
 */

	function BSRadio(type) {
		_classCallCheck(this, BSRadio);

		if (type == "inline") {
			type = "radio-inline";
		} else {
			type = "radio";
		}
		return _possibleConstructorReturn(this, Object.getPrototypeOf(BSRadio).call(this, type));
	}

	return BSRadio;
})(BSCheckbox);

/**
* Representation of a &lt;select&gt; element
*
* @extends BSObject
* @extends BSFormInput
*/

var BSSelect = (function (_BSFormInput3) {
	_inherits(BSSelect, _BSFormInput3);

	/**
 *	
 */

	function BSSelect() {
		var isMultiple = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

		_classCallCheck(this, BSSelect);

		var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSSelect).call(this));

		_this7._optCount = 0;

		_this7._$elem.addClass("form-group");

		_this7._$input = $("<select/>", {
			id: _this7._uid + "-input",
			type: _this7._type,
			'class': "form-control"
		});

		_this7._$label = $("<label/>", {
			id: _this7._uid + "-label",
			'for': _this7._uid + "-input"
		});

		_this7._$elem.append(_this7._$label, _this7._$input);

		_this7.multiple(isMultiple);

		return _this7;
	}

	_createClass(BSSelect, [{
		key: "multiple",
		value: function multiple(isMultiple) {
			isMultiple = isMultiple === true;

			this._$input.prop("multiple", isMultiple);

			return this;
		}

		/**
  * Adds an option to the end of the select
  * @param {(string|number|boolean)} value - The value of the option
  * @param {(string|number|boolean)} [label] - The label to use. If no label provided, value will be used instead. 
  * @param {string[]} props - An array of properties to be applied to the option (ex. selected, disabled)
  * @returns {BSSelect} This select object.
  */

	}, {
		key: "addOption",
		value: function addOption(value, label, props) {
			var $opt = $("<option/>", {
				id: this._uid + "-option-" + this._optCount
			});
			this._optCount++;

			if (typeof label == "undefined") {
				label = value;
			}

			$opt.attr("value", value);
			$opt.html(label);

			if ($.isArray(props)) {
				for (var i = 0; i < props.length; i++) {
					$opt.prop(props[i], true);
				}
			}

			this._$input.append($opt);

			return this;
		}

		/**
  * Sets all the options in the select. This will remove all current options.<br/>
  *<br/>
  * This method takes a mixed array as it's only parameter. The elements of the array must be a (string|number|boolean), which will be
  * used as the value & label of that option, or an Object with a 'value' property, and optional 'label', and 'props' properties. Any objects
  * without a 'value' property will be ignored.
  * @param {Array.<*>} arr - An array of values to use.
  * @returns {BSSelect} This select object.
  */

	}, {
		key: "setOptions",
		value: function setOptions(arr) {
			if ($.isArray(arr)) {
				this._$input.html("");

				for (var i = 0; i < arr.length; i++) {
					var v = arr[i];
					if ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v.hasOwnProperty('value')) {
						this.addOption(v.value, v.label, v.props);
					} else {
						this.addOption(v);
					}
				}
			}
			return this;
		}
	}]);

	return BSSelect;
})(BSFormInput);

/**
* Representation of a &lt;textarea&gt; element
*
* @extends BSObject
* @extends BSFormInput
*/

var BSTextArea = (function (_BSFormInput4) {
	_inherits(BSTextArea, _BSFormInput4);

	/**
 * Creates a new BSTextArea object.
 */

	function BSTextArea() {
		_classCallCheck(this, BSTextArea);

		var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSTextArea).call(this));

		_this8._$elem.addClass("form-group");

		_this8._$input = $("<textarea/>", {
			id: _this8._uid + "-input",
			rows: 3,
			'class': "form-control"
		});

		_this8._$label = $("<label/>", {
			id: _this8._uid + "-label",
			'for': _this8._uid + "-input"
		});

		_this8._$elem.append(_this8._$label, _this8._$input);
		return _this8;
	}

	/**
 * Sets the rows attribute of the textarea
 * @param {number} [n=3] - The number of rows to show.
 */

	_createClass(BSTextArea, [{
		key: "rows",
		value: function rows() {
			var n = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

			this._$label.attr("rows", n);
			return this;
		}
	}]);

	return BSTextArea;
})(BSFormInput);

var BSForm = (function (_BSObject3) {
	_inherits(BSForm, _BSObject3);

	function BSForm() {
		_classCallCheck(this, BSForm);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(BSForm).call(this));
	}

	_createClass(BSForm, [{
		key: "append",
		value: function append() {}
	}, {
		key: "prepend",
		value: function prepend() {}
	}]);

	return BSForm;
})(BSObject);
