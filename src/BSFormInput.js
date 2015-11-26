
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

		// const typeRegexp = /(text|password|datetime|datetime-local|date|month|time|week|number|email|url|search|tel|color)/;
		// if(!typeRegexp.test(type)){
		// 	type = "text";
		// }
		// this._type = type;

		this._$elem = $("<div/>", {
			// 'class' : 'form-group'
		});

		// this._$input = $("<input/>", {
		// 	id : this._uid+"-input",
		// 	type : this._type,
		// 	'class' : "form-control"
		// });

		// this._$label = $("<label/>", {
		// 	id : this._uid+"-label",
		// 	'for' : this._uid+"-input"
		// });

		// this._$elem.append(
		// 	this._$label,
		// 	this._$input
		// );
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

