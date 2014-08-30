#pragma strict
var speedFactor:float;
var objs:ScrollingObj[];
var scene:Scene;


function Awake(){
	objs=this.gameObject.GetComponentsInChildren.<ScrollingObj>(true);
}

