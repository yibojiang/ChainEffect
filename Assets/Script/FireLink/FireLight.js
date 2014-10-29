#pragma strict


var fireLight:Light;
var frequent:float=10;
var power:float=0.3;

var originPos:float;
function Start () {
	originPos=fireLight.transform.position.z;
}

function Update () {
	fireLight.transform.position.z=originPos+Random.Range(0,power);//power*Mathf.Sin(frequent*Time.time);
}