
/**
* 
*/
class BSCheckbox extends BSFormInput{
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

	label(){
		if(arguments.length > 0){
			this._$labelText.append.apply(this._$labelText, arguments);
		}
		else{
			return this._$labelText.html();
		}
	}
}
