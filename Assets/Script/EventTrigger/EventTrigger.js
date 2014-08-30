#pragma strict
var triggerDestroy:boolean;

function TriggerEvent():IEnumerator{
	if (triggerDestroy){
		Destroy(this.gameObject);
	}
}