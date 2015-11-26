
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

