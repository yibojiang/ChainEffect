#pragma strict
var waterWaverPrefab:GameObject;
var toggle:float;
var interval:float;

function Start () {

}

function GenerateWave(){
	Instantiate(waterWaverPrefab,transform.position,Quaternion.identity);
	//yield WaitForSeconds(0.5);
	//Instantiate(waterWaverPrefab,transform.position,Quaternion.identity);
}

/*
function Update () {
	toggle+=Time.deltaTime;
	if (toggle>interval){
		toggle-=interval;
		Instantiate(waterWaverPrefab,transform.position,Quaternion.identity);
	}
}

*/
