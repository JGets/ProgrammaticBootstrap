
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
