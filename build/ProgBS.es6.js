
/**
* Basic Bootstrap Object
* 
* @author John Gettings
*/
class BSObject{
	constructor(){
		this._$elem = null;

		//create a unique ID for this object
		this._uid = "pBS-"+Date.now()+"-"+Math.ceil(Math.random()*99999999999999999999);
	}

	/**
	* Appends this BSObject to the given object.
	* @param {(jQuery|BSContentObject)} obj - The object that this is to be appended to
	* @throws Will throw an error if obj is not a BSObject or jQuery object.
	*/
	appendTo(obj){
		if(obj instanceof BSContentObject || obj instanceof jQuery){
			obj.append(this._$elem);
		}
		else{
			throw "Error: BSObject can only be appended to BSContentObjects or jQuery objects";
		}		
	}

	/**
	* Prepends this BSObject to the given object.
	* @param {(jQuery|BSContentObject)} obj - The object that this is to be prepended to
	* @throws Will throw an error if obj is not a BSObject or jQuery object.
	*/
	prependTo(obj){
		if(obj instanceof BSContentObject || obj instanceof jQuery){
			obj.prepend(this._$elem);
		}
		else{
			throw "Error: BSObject can only be prepended to BSContentObjects or jQuery objects";
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
	get $(){
		return this._$elem;
	}
}

/**
* Basic Bootstrap Object
* 
* @extends BSObject
*/
class BSContentObject extends BSObject{
	constructor(){
		super();
	}


	/**
	* Appends the given arguments to the contents of this object
	* @param {...(string|jQuery|BSObject)} arg - The item(s) to append to this object.
	* @return {BSObject} This object
	*/
	append(){
		this._$elem.append.apply(this._$elem, arguments);
		return this;
	}

	/**
	* Prepends the given arguments to the contents of this object
	* @param {...(string|jQuery|BSObject)} arg - The item(s) to prepend to this object.
	* @return {BSObject} This object
	*/
	prepend(){
		this._$elem.prepend.apply(this._$elem, arguments);
		return this;
	}

	/**
	* Sets/Gets the HTML content of this object.
	* @param {string=} htmlStr - The HTML string to set.
	* @returns {(string|BSObject)}  If no parameter given, returns a string with the HTML 
	*	contents of this object. If a parameter is given, this object is returned.
	*/
	html(){
		if(arguments.length > 0){
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
	text(){
		if(arguments.length > 0){
			this._$elem.text(arguments[0]);
			return this;
		}
		return this._$elem.text();
	}
}

/**
* Button Object
* @extends BSObject
* @extends BSContentObject
*/
class BSButton extends BSContentObject {
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
	constructor(type = 'button'){
		super();

		this._type = null;	//set down below
		this._disabled = false;
		this._clickHandler = function(){};


		const typeRegexp = /^(button|a|input)(:.+)?$/;

		if(!typeRegexp.test(type)){
			type = 'button';
		}

		var secondary = null;
		if(type.indexOf(":") >= 0){
			s = type.split(":");
			type = s[0];
			secondary = s[1];

			if(type === "input" && secondary != null){
				if(!/(button|submit)/.test(secondary)){
					secondary = 'button';
				}
			}
			else if(type === "a" && secondary == null){
				secondary = "#";
			}
		}

		this._type = type;

		var options = {
			'class' : 'btn btn-default'
		};

		if(this._type == "input"){
			options.type = secondary;
		}
		else if(this._type === "a"){
			options.href = secondary;
			options.role = "button";
		}

		this._$elem = $("<"+this._type+"/>", options);

		this._$elem.click(function(event){
			if(!this._disabled){
				this._clickHandler(event);
			}
		});

	}

	/**
	* Sets the button size.
	* @param {string} size - The size to make the button. Acceptable values are: 'xs', 'sm', 'default', 'md' (equivalent to 'default'), and 'lg'
	* @returns {BSButon} This button object.
	*/
	setSize(size){
		const sizeRegex = /(xs|sm|default|md|lg)/;
		if(sizeRegex.test(size)){
			this._$elem.removeClass("btn-xs btn-sm btn-lg");
			if(size != "default" && size != "md"){
				this._$elem.addClass("btn-"+size);
			}
		}
		return this;
	}

	/**
	* Sets whether this button should be a block style button
	* @param {boolean} [block=false] - Boolean indicating whether the button should be block style
	* @returns {BSButton} This button object.
	*/
	setBlock(block = false){
		if(block){
			this._$elem.addClass("btn-block");
		}
		else{
			this._$elem.removeClass("btn-block");
		}
		return this;
	}

	/**
	* Sets whether this button should appear to be in an active state
	* @param {boolean} [active=false] - Boolean indicating whether the button should appear in active state.
	* @returns {BSButton} This button object.
	*/
	setActiveState(active = false){
		if(active){
			this._$elem.addClass("active");
		}
		else{
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
	disabled(){
		if(arguments.length > 0){
			//Setter
			var dis = arguments[0] === true; //force boolean
			if(dis != this._disabled){	//are we actually changing state?
				if(this._type == "a"){
					if(dis){
						this._$elem.addClass("disabled");
					}
					else{
						this._$elem.removeClass("disabled");
					}
				}
				else{
					this._$elem.prop("disabled", dis);
				}
				this._disabled = dis;
			}
			return this;
		}
		else{
			//Getter
			return this._disabled;
		}
	}

	/**
	* Sets the button's style
	* @param {string} style - The style to set. Acceptable values are: 'default', 'primary', 'success',' info', 'warning', 'danger', and 'link'.
	* @returns {BSButton} This button object.
	*/
	setStyle(style){
		const styles = ['default','primary','success','info','warning','danger','link'];
		if($.inArray(style, styles) >= 0){
			for(s in styles){
				this._$elem.removeClass("btn-"+s);
			}
			this._$elem.addClass("btn-"+style);
		}
		return this;
	}

	/**
	* Sets/triggers the button's click handler.<br/>
	* <strong>Note:</strong> When a button is disabled, the click handler set through this function will not be fired, even when this function is used to attempt and fire it.
	* @param {function} [fn] - The function to be set as the click handler.
	* @returns {BSButton} This button object.
	*/
	click(fn){
		if(typeof(fn) === "function"){
			this._clickHandler = fn;
		}
		else{
			this._$elem.click();
		}
		return this;
	}

}


/**
* Super-class encapsulating functionality for input elements.<br/>
* <br/>
* <strong>Note:</strong> This class should <em>never</em> be used for creating actual user interface elements. Only this classes' subclasses (such as BSInput or BSCheckbox) should be used.
*
* @extends BSObject
*/
class BSFormInput extends BSObject{
	/**
	* Creates an new BSFormInput object
	*/
	constructor(){
		super();
		// this._type;
		this._$input = null;
		this._$label = null;
		this._$helpBlock = null;

		this._$elem = $("<div/>", {
			id : this._uid
		});
	}

	/**
	* Sets/gets the label of this input element
	* @param {...(string|jQuery|BSButton)} label - Optional object(s) to set as the content of the label
	* @returns {(string|BSFormInput)} If no parameter(s) passed, a string containing the HTML of the label is returned. If one or
	*	more parameter is passed, this object is returned.
	*/
	label(){
		if(arguments.length > 0){
			this._$label.html("");
			this._$label.append.apply(this._$label, arguments);
			return this;
		}
		else{
			return this._$label.html();
		}
	}

	/**
	* Sets/gets the name of an input (ie. the name attribute).
	* @param {string} [name] - Optional string to be set as the name of the input.
	* @returns {(string|BSFormInput)} If no parameter given, the current name of the input is returned. If a paremeter is given,
	* 	this object is returned.
	*/
	name(){
		if(arguments.length > 0){
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
	placeholder(){
		if(arguments.length > 0){
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
	val(){
		if(arguments.length > 0){
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
	disabled(){
		if(arguments.length > 0){
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
	required(){
		if(arguments.length > 0){
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
	readonly(){
		if(arguments.length > 0){
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
	helpBlock(){
		if(this._$helpBlock == null){
			//We don't have a help-block yet, so we need to make one.
			var hbID = this._uid+"-help-block";
			this._$helpBlock = $("<span/>", {
				id : hbID,
				'class' : 'help-block'
			}).appendTo(this._$elem);
			this._$input.attr("aria-descripted-by", hbID);
		}
		if(arguments.length > 0){
			//Setter
			this._$helpBlock.append.apply(this._$helpBlock, arguments);
			return this;
		}
		else{
			//Getter
			return this._$helpBlock.html();
		}
	}
}


/**
* Representation of a &lt;input&gt; element
*
* @extends BSObject
* @extends BSFormInput
*/
class BSInput extends BSFormInput{
	/**
	* Creates a new BSInput object.
	* @param {string} [type="text"] - The input type. Acceptable values are: "text", "password", "datetime", 
	*	"datetime-local", "date", "month", "time", "week", "number", "email", "url", "search", "tel", and "color"
	*/
	constructor(type){
		super();
		this._type;
		
		const typeRegexp = /(text|password|datetime|datetime-local|date|month|time|week|number|email|url|search|tel|color)/;
		if(!typeRegexp.test(type)){
			type = "text";
		}
		this._type = type;

		this._$elem.addClass("form-group");

		this._$input = $("<input/>", {
			id : this._uid+"-input",
			type : this._type,
			'class' : "form-control"
		});

		this._$label = $("<label/>", {
			id : this._uid+"-label",
			'for' : this._uid+"-input"
		});

		this._$elem.append(
			this._$label,
			this._$input
		);
	}

	
}


/**
* Representation of a checkbox/radio input.
*
* @extends BSObject
* @extends BSFormInput
*/
class BSCheckbox extends BSFormInput{
	/**
	* Creates a new checkbox/radio input.
	* @param {string} [type="checkbox"] - The type of input to make. Acceptable values are "checkbox", "inline", "radio", "radio-inline".
	*/
	constructor(type){
		super();
		this._$labelText;

		const typeRegex = /(checkbox|inline|radio|radio-inline)/;
		if(!typeRegex.test(type)){
			type = "checkbox";
		}

		var inline = (type == "inline" || type == "radio-inline");
		if(type == "inline"){
			type = "checkbox";
		}
		else if(type == "radio-inline"){
			type = "radio";
		}

		var classText = type;
		if(inline){
			classText += "-inline";
		}

		this._$elem.addClass(classText);

		this._$input = $("<input/>", {
			id : this._uid+"-input",
			type : type,
			// 'class' : "form-control"
		});

		this._$label = $("<label/>", {
			id : this._uid+"-label",
			'for' : this._uid+"-input"
		});

		this._$labelText = $("<span/>");

		this._$label.append(this._$input, this._$labelText);

		this._$elem.append(this._$label);
	}

	/**
	* Sets/gets the label of this input element
	* @param {...(string|jQuery|BSButton)} label - Optional object(s) to set as the content of the label
	* @returns {(string|BSFormInput)} If no parameter(s) passed, a string containing the HTML of the label is returned. If one or
	*	more parameter is passed, this object is returned.
	*/
	label(){
		if(arguments.length > 0){
			this._$labelText.html("");
			this._$labelText.append.apply(this._$labelText, arguments);
			return this;
		}
		else{
			return this._$labelText.html();
		}
	}

	/**
	* Sets/gets whether this input is disabled. 
	* @param {boolean} [disabled] - Indicates whether the input should be set disabled
	* @returns {(boolean|BSCheckbox)} If params passed, this input is returned. If no params passed, the current disabled state is returned.
	*/ 
	disabled(){
		if(arguments.length > 0){
			var d = arguments[0] === true;
			super.disabled(d);
			if(d){
				this._$elem.addClass("disabled");
			}
			else{
				this._$elem.removeClass("disabled");
			}
			return this;
		}
		return super.disabled();
	}
}

/**
* Representation of a radio input.<br/>
* Really just syntactic sugar over BSCheckbox.
*
* @extends BSObject
* @extends BSFormInput
* @extends BSCheckbox
*/
class BSRadio extends BSCheckbox{
	/**
	* Creates a new Radio input
	* @param {string} [type="radio"] - The type of radio to make. Acceptable values are "radio" and "inline".
	*/
	constructor(type){
		if(type == "inline"){
			type = "radio-inline";
		}
		else{
			type = "radio";
		}
		super(type);
	}
}

/**
* Representation of a &lt;select&gt; element
*
* @extends BSObject
* @extends BSFormInput
*/
class BSSelect extends BSFormInput{
	/**
	*	
	*/
	constructor(isMultiple=false){
		super();
		
		this._optCount = 0;

		this._$elem.addClass("form-group");

		this._$input = $("<select/>", {
			id : this._uid+"-input",
			type : this._type,
			'class' : "form-control"
		});

		this._$label = $("<label/>", {
			id : this._uid+"-label",
			'for' : this._uid+"-input"
		});

		this._$elem.append(
			this._$label,
			this._$input
		);

		this.multiple(isMultiple);

	}

	multiple(isMultiple){
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
	addOption(value, label, props){
		var $opt = $("<option/>", {
			id : this._uid+"-option-"+this._optCount
		});
		this._optCount++;

		if(typeof(label) == "undefined"){
			label = value;
		}

		$opt.attr("value", value);
		$opt.html(label);

		if($.isArray(props)){
			for(var i = 0; i < props.length; i++){
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
	setOptions(arr){
		if($.isArray(arr)){
			this._$input.html("");

			for(var i = 0; i < arr.length; i++){
				var v = arr[i];
				if(typeof(v) === "object" && v.hasOwnProperty('value')){
					this.addOption(v.value, v.label, v.props);
				}
				else{
					this.addOption(v);
				}
			}
		}
		return this;
	}


}

/**
* Representation of a &lt;textarea&gt; element
*
* @extends BSObject
* @extends BSFormInput
*/
class BSTextArea extends BSFormInput{
	/**
	* Creates a new BSTextArea object.
	*/
	constructor(){
		super();

		this._$elem.addClass("form-group");

		this._$input = $("<textarea/>", {
			id : this._uid+"-input",
			rows : 3,
			'class' : "form-control"
		});

		this._$label = $("<label/>", {
			id : this._uid+"-label",
			'for' : this._uid+"-input"
		});

		this._$elem.append(
			this._$label,
			this._$input
		);
	}

	/**
	* Sets the rows attribute of the textarea
	* @param {number} [n=3] - The number of rows to show.
	*/
	rows(n=3){
		this._$label.attr("rows", n);
		return this;
	}
}

class BSForm extends BSObject{
	constructor(){
		super();

		this._$elem = $("<form/>", {
			"class" : "form",
			role : "form"
		});
	}

	append(){

	}

	prepend(){
		
	}
}
