#pragma strict

@script ExecuteInEditMode()

function Update (){
	//Debug.Log(renderer.receiveShadows);
	renderer.castShadows = true;
}