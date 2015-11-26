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
            if (obj instanceof BSObject || obj instanceof jQuery) {
                obj.append(this._$elem);
            } else {
                throw "Error: BSObject can only be appended to other BSObjects or jQuery objects";
            }
        }
    }, {
        key: "prependTo",
        value: function prependTo(obj) {
            if (obj instanceof BSObject || obj instanceof jQuery) {
                obj.prepend(this._$elem);
            } else {
                throw "Error: BSObject can only be prepended to other BSObjects or jQuery objects";
            }
        }
    }, {
        key: "append",
        value: function append() {
            this._$elem.append(this._$elem, arguments);
            return this;
        }
    }, {
        key: "prepend",
        value: function prepend() {
            this._$elem.prepend(this._$elem, arguments);
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
    }, {
        key: "$",
        get: function get() {
            return this._$elem;
        }
    } ]);
    return BSObject;
}();

var BSButton = function(_BSObject) {
    _inherits(BSButton, _BSObject);
    function BSButton() {
        var type = arguments.length <= 0 || arguments[0] === undefined ? "button" : arguments[0];
        _classCallCheck(this, BSButton);
        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BSButton).call(this));
        _this._type = null;
        _this._disabled = false;
        _this._clickHandler = function() {};
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
        _this._type = type;
        var options = {
            "class": "btn btn-default"
        };
        if (_this._type == "input") {
            options.type = secondary;
        } else if (_this._type === "a") {
            options.href = secondary;
            options.role = "button";
        }
        _this._$elem = $("<" + _this._type + "/>", options);
        _this._$elem.click(function(event) {
            if (!this._disabled) {
                this._clickHandler(event);
            }
        });
        return _this;
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
}(BSObject);

var BSFormInput = function(_BSObject2) {
    _inherits(BSFormInput, _BSObject2);
    function BSFormInput() {
        _classCallCheck(this, BSFormInput);
        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSFormInput).call(this));
        _this2._$input = null;
        _this2._$label = null;
        _this2._$helpBlock = null;
        _this2._$elem = $("<div/>", {
            id: _this2._uid
        });
        return _this2;
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
        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSInput).call(this));
        _this3._type;
        var typeRegexp = /(text|password|datetime|datetime-local|date|month|time|week|number|email|url|search|tel|color)/;
        if (!typeRegexp.test(type)) {
            type = "text";
        }
        _this3._type = type;
        _this3._$elem.addClass("form-group");
        _this3._$input = $("<input/>", {
            id: _this3._uid + "-input",
            type: _this3._type,
            "class": "form-control"
        });
        _this3._$label = $("<label/>", {
            id: _this3._uid + "-label",
            "for": _this3._uid + "-input"
        });
        _this3._$elem.append(_this3._$label, _this3._$input);
        return _this3;
    }
    return BSInput;
}(BSFormInput);

var BSCheckbox = function(_BSFormInput2) {
    _inherits(BSCheckbox, _BSFormInput2);
    function BSCheckbox(type) {
        _classCallCheck(this, BSCheckbox);
        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(BSCheckbox).call(this));
        _this4._$labelText;
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
        _this4._$elem.addClass(classText);
        _this4._$input = $("<input/>", {
            id: _this4._uid + "-input",
            type: type
        });
        _this4._$label = $("<label/>", {
            id: _this4._uid + "-label",
            "for": _this4._uid + "-input"
        });
        _this4._$labelText = $("<span/>");
        _this4._$label.append(_this4._$input, _this4._$labelText);
        _this4._$elem.append(_this4._$label);
        return _this4;
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