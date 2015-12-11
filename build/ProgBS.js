/*The MIT License (MIT)

Copyright (c) 2015 John Gettings

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/
"use strict";

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _typeof(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var BSObject = function() {
    function BSObject() {
        _classCallCheck(this, BSObject);
        this._$elem = null;
        this._uid = "pBS-" + Date.now() + "-" + Math.ceil(Math.random() * 1e20);
    }
    _createClass(BSObject, [ {
        key: "appendTo",
        value: function appendTo(obj) {
            if (obj instanceof BSContentObject || obj instanceof jQuery) {
                obj.append(this._$elem);
            } else {
                throw "Error: BSObject can only be appended to BSContentObjects or jQuery objects";
            }
        }
    }, {
        key: "prependTo",
        value: function prependTo(obj) {
            if (obj instanceof BSContentObject || obj instanceof jQuery) {
                obj.prepend(this._$elem);
            } else {
                throw "Error: BSObject can only be prepended to BSContentObjects or jQuery objects";
            }
        }
    }, {
        key: "$",
        get: function get() {
            return this._$elem;
        }
    } ]);
    return BSObject;
}();

var BSContentObject = function(_BSObject) {
    _inherits(BSContentObject, _BSObject);
    function BSContentObject() {
        _classCallCheck(this, BSContentObject);
        return _possibleConstructorReturn(this, Object.getPrototypeOf(BSContentObject).call(this));
    }
    _createClass(BSContentObject, [ {
        key: "append",
        value: function append() {
            this._$elem.append.apply(this._$elem, arguments);
            return this;
        }
    }, {
        key: "prepend",
        value: function prepend() {
            this._$elem.prepend.apply(this._$elem, arguments);
            return this;
        }
    }, {
        key: "html",
        value: function html() {
            if (arguments.length > 0) {
                this._$elem.html(arguments[0]);
                return this;
            }
            return this._$elem.html();
        }
    }, {
        key: "text",
        value: function text() {
            if (arguments.length > 0) {
                this._$elem.text(arguments[0]);
                return this;
            }
            return this._$elem.text();
        }
    } ]);
    return BSContentObject;
}(BSObject);

var BSButton = function(_BSContentObject) {
    _inherits(BSButton, _BSContentObject);
    function BSButton() {
        var type = arguments.length <= 0 || arguments[0] === undefined ? "button" : arguments[0];
        _classCallCheck(this, BSButton);
        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSButton).call(this));
        _this2._type = null;
        _this2._disabled = false;
        _this2._clickHandler = function() {};
        var typeRegexp = /^(button|a|input)(:.+)?$/;
        if (!typeRegexp.test(type)) {
            type = "button";
        }
        var secondary = null;
        if (type.indexOf(":") >= 0) {
            s = type.split(":");
            type = s[0];
            secondary = s[1];
            if (type === "input" && secondary != null) {
                if (!/(button|submit)/.test(secondary)) {
                    secondary = "button";
                }
            } else if (type === "a" && secondary == null) {
                secondary = "#";
            }
        }
        _this2._type = type;
        var options = {
            "class": "btn btn-default"
        };
        if (_this2._type == "input") {
            options.type = secondary;
        } else if (_this2._type === "a") {
            options.href = secondary;
            options.role = "button";
        }
        _this2._$elem = $("<" + _this2._type + "/>", options);
        _this2._$elem.click(function(event) {
            if (!this._disabled) {
                this._clickHandler(event);
            }
        });
        return _this2;
    }
    _createClass(BSButton, [ {
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
    }, {
        key: "disabled",
        value: function disabled() {
            if (arguments.length > 0) {
                var dis = arguments[0] === true;
                if (dis != this._disabled) {
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
                return this._disabled;
            }
        }
    }, {
        key: "setStyle",
        value: function setStyle(style) {
            var styles = [ "default", "primary", "success", "info", "warning", "danger", "link" ];
            if ($.inArray(style, styles) >= 0) {
                for (s in styles) {
                    this._$elem.removeClass("btn-" + s);
                }
                this._$elem.addClass("btn-" + style);
            }
            return this;
        }
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
    } ]);
    return BSButton;
}(BSContentObject);

var BSFormInput = function(_BSObject2) {
    _inherits(BSFormInput, _BSObject2);
    function BSFormInput() {
        _classCallCheck(this, BSFormInput);
        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSFormInput).call(this));
        _this3._$input = null;
        _this3._$label = null;
        _this3._$helpBlock = null;
        _this3._$elem = $("<div/>", {
            id: _this3._uid
        });
        return _this3;
    }
    _createClass(BSFormInput, [ {
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
    }, {
        key: "name",
        value: function name() {
            if (arguments.length > 0) {
                this._$input.attr("name", arguments[0]);
                return this;
            }
            return this._$input.attr("name");
        }
    }, {
        key: "placeholder",
        value: function placeholder() {
            if (arguments.length > 0) {
                this._$input.attr("placeholder", arguments[0]);
                return this;
            }
            return this._$input.attr("placeholder");
        }
    }, {
        key: "val",
        value: function val() {
            if (arguments.length > 0) {
                this._$input.val(arguments[0]);
                return this;
            }
            return this._$input.val();
        }
    }, {
        key: "disabled",
        value: function disabled() {
            if (arguments.length > 0) {
                this._$input.prop("disabled", arguments[0]);
                return this;
            }
            return this._$input.prop("disabled");
        }
    }, {
        key: "required",
        value: function required() {
            if (arguments.length > 0) {
                this._$input.prop("required", arguments[0]);
                return this;
            }
            return this._$input.prop("required");
        }
    }, {
        key: "readonly",
        value: function readonly() {
            if (arguments.length > 0) {
                this._$input.prop("readonly", arguments[0]);
                return this;
            }
            return this._$input.prop("readonly");
        }
    }, {
        key: "helpBlock",
        value: function helpBlock() {
            if (this._$helpBlock == null) {
                var hbID = this._uid + "-help-block";
                this._$helpBlock = $("<span/>", {
                    id: hbID,
                    "class": "help-block"
                }).appendTo(this._$elem);
                this._$input.attr("aria-descripted-by", hbID);
            }
            if (arguments.length > 0) {
                this._$helpBlock.append.apply(this._$helpBlock, arguments);
                return this;
            } else {
                return this._$helpBlock.html();
            }
        }
    } ]);
    return BSFormInput;
}(BSObject);

var BSInput = function(_BSFormInput) {
    _inherits(BSInput, _BSFormInput);
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
            "class": "form-control"
        });
        _this4._$label = $("<label/>", {
            id: _this4._uid + "-label",
            "for": _this4._uid + "-input"
        });
        _this4._$elem.append(_this4._$label, _this4._$input);
        return _this4;
    }
    return BSInput;
}(BSFormInput);

var BSCheckbox = function(_BSFormInput2) {
    _inherits(BSCheckbox, _BSFormInput2);
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
        _this5._$label = $("<label/>", {
            id: _this5._uid + "-label",
            "for": _this5._uid + "-input"
        });
        _this5._$labelText = $("<span/>");
        _this5._$label.append(_this5._$input, _this5._$labelText);
        _this5._$elem.append(_this5._$label);
        return _this5;
    }
    _createClass(BSCheckbox, [ {
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
    } ]);
    return BSCheckbox;
}(BSFormInput);

var BSRadio = function(_BSCheckbox) {
    _inherits(BSRadio, _BSCheckbox);
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
}(BSCheckbox);

var BSSelect = function(_BSFormInput3) {
    _inherits(BSSelect, _BSFormInput3);
    function BSSelect() {
        var isMultiple = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
        _classCallCheck(this, BSSelect);
        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSSelect).call(this));
        _this7._optCount = 0;
        _this7._$elem.addClass("form-group");
        _this7._$input = $("<select/>", {
            id: _this7._uid + "-input",
            type: _this7._type,
            "class": "form-control"
        });
        _this7._$label = $("<label/>", {
            id: _this7._uid + "-label",
            "for": _this7._uid + "-input"
        });
        _this7._$elem.append(_this7._$label, _this7._$input);
        _this7.multiple(isMultiple);
        return _this7;
    }
    _createClass(BSSelect, [ {
        key: "multiple",
        value: function multiple(isMultiple) {
            isMultiple = isMultiple === true;
            this._$input.prop("multiple", isMultiple);
            return this;
        }
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
    }, {
        key: "setOptions",
        value: function setOptions(arr) {
            if ($.isArray(arr)) {
                this._$input.html("");
                for (var i = 0; i < arr.length; i++) {
                    var v = arr[i];
                    if ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v.hasOwnProperty("value")) {
                        this.addOption(v.value, v.label, v.props);
                    } else {
                        this.addOption(v);
                    }
                }
            }
            return this;
        }
    } ]);
    return BSSelect;
}(BSFormInput);

var BSTextArea = function(_BSFormInput4) {
    _inherits(BSTextArea, _BSFormInput4);
    function BSTextArea() {
        _classCallCheck(this, BSTextArea);
        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSTextArea).call(this));
        _this8._$elem.addClass("form-group");
        _this8._$input = $("<textarea/>", {
            id: _this8._uid + "-input",
            rows: 3,
            "class": "form-control"
        });
        _this8._$label = $("<label/>", {
            id: _this8._uid + "-label",
            "for": _this8._uid + "-input"
        });
        _this8._$elem.append(_this8._$label, _this8._$input);
        return _this8;
    }
    _createClass(BSTextArea, [ {
        key: "rows",
        value: function rows() {
            var n = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];
            this._$label.attr("rows", n);
            return this;
        }
    } ]);
    return BSTextArea;
}(BSFormInput);

var BSForm = function(_BSObject3) {
    _inherits(BSForm, _BSObject3);
    function BSForm() {
        _classCallCheck(this, BSForm);
        var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSForm).call(this));
        _this9._$elem = $("<form/>", {
            "class": "form",
            role: "form"
        });
        return _this9;
    }
    _createClass(BSForm, [ {
        key: "append",
        value: function append() {}
    }, {
        key: "prepend",
        value: function prepend() {}
    } ]);
    return BSForm;
}(BSObject);