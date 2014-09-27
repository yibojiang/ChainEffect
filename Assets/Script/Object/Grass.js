#pragma strict

var line:LineRenderer;

var heightOffset:float;

function Awake(){
	line=this.GetComponent(LineRenderer) as LineRenderer;
}
