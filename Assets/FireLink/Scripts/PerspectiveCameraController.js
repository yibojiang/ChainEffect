#pragma strict

var target:Transform;

function Start () {

}

function LateUpdate () {
	if (target!=null){
		transform.position.x+=(target.position.x-transform.position.x)*Time.deltaTime*10;
	}
}