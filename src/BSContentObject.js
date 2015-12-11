
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
