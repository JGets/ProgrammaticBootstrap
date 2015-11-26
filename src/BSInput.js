
/**
* Representation of a &lt;input&gt; element
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

