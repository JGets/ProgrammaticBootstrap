
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
