
/**
* Basic Bootstrap Object
* 
* @author John Gettings
*/
class BSObject{
	constructor(){
		this._$elem = null;
		this._uid = "pBS-"+Date.now()+"-"+Math.ceil(Math.random()*99999999999999999999);
		console.log(this._uid);
	}

	/**
	* Appends this BSObject to the given object.
	* @param {(jQuery|BSObject)} obj - The object that this is to be appended to
	* @throws Will throw an error if obj is not a BSObject or jQuery object.
	*/
	appendTo(obj){
		if(obj instanceof BSObject || obj instanceof jQuery){
			obj.append(this._$elem);
		}
		else{
			throw "Error: BSObject can only be appended to other BSObjects or jQuery objects";
		}		
	}

	/**
	* Prepends this BSObject to the given object.
	* @param {(jQuery|BSObject)} obj - The object that this is to be prepended to
	* @throws Will throw an error if obj is not a BSObject or jQuery object.
	*/
	prependTo(obj){
		if(obj instanceof BSObject || obj instanceof jQuery){
			obj.prepend(this._$elem);
		}
		else{
			throw "Error: BSObject can only be prepended to other BSObjects or jQuery objects";
		}
	}

	/**
	* Appends the given arguments to the contents of this object
	* @param {...(string|jQuery|BSObject)} arg - The item(s) to append to this object.
	* @return {BSObject} This object
	*/
	append(){
		this._$elem.append(this._$elem, arguments);
		return this;
	}

	/**
	* Prepends the given arguments to the contents of this object
	* @param {...(string|jQuery|BSObject)} arg - The item(s) to prepend to this object.
	* @return {BSObject} This object
	*/
	prepend(){
		this._$elem.prepend(this._$elem, arguments);
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
	*/
	get $(){
		return this._$elem;
	}
}
