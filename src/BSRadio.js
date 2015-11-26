
class BSRadio extends BSCheckbox{
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
