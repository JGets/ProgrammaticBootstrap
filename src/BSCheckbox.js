
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
