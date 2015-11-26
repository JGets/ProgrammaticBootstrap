
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
