
/**
* Representation of a &lt;textarea&gt; element
*
* @extends BSObject
* @extends BSFormInput
*/
class BSTextArea extends BSFormInput{
	/**
	* Creates a new BSTextArea object.
	*/
	constructor(){
		super();

		this._$elem.addClass("form-group");

		this._$input = $("<textarea/>", {
			id : this._uid+"-input",
			rows : 3,
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

	/**
	* Sets the rows attribute of the textarea
	* @param {number} [n=3] - The number of rows to show.
	*/
	rows(n=3){
		this._$label.attr("rows", n);
		return this;
	}
}
