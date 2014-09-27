#pragma strict
import System.Collections.Generic;
var lightening:Lightening;

var energy:float;


var ltnlist:List.<Lightening>;

var speed:float;

var spawnInterval:float;

var width:float;


var toggle:float;
var interval:float;

function Start () {

}

function GenerateLightening(_pos:Vector3,_energy:float,_dir:Vector2){
	var l:Lightening=Instantiate(lightening);
	l.transform.parent=transform;
	l.transform.localPosition=Vector3.zero;
	l.energy=_energy;
	l.lg=this;
	l.Emit(_pos);
	l.dir=_dir;
	l.speed=speed;
	l.spawnInterval=spawnInterval;
	var lwidth:float=_energy;
	lwidth=Mathf.Clamp(lwidth,0.05,0.1);
	lwidth*=width;
	l.line.SetWidth(lwidth,lwidth);
	ltnlist.Add(l);

	//Debug.Log("generate dir: "+_dir);
}

function Update () {

	//var tmpDir:Vector2=Vector2(Random.value-0.5,-1);
	var tmpDir:Vector2=Vector2(-1,Random.value-0.5);

	toggle+=Time.deltaTime;
	if (toggle>interval){
		toggle-=interval;
		//GenerateLightening(Vector3(Random.Range(-8,8),0,0),energy,tmpDir);
		GenerateLightening(Vector3(20,Random.Range(-5,5),0),energy,tmpDir);
	}

	if (Input.GetKeyDown(KeyCode.L)){

		/*
		var i:int;
		for (i=0;i<ltnlist.Count;i++){
			Destroy(ltnlist[i].gameObject);

		}
		ltnlist.Clear();

		var tmpDir:Vector2=Vector2(Random.value-0.5,-1);
		Debug.Log(tmpDir);
		tmpDir.Normalize();
		Debug.Log("normalized: "+tmpDir.normalized);
		*/

		tmpDir=Vector2(Random.value-0.5,-1);
		GenerateLightening(Vector3(Random.Range(-5,5),0,0),energy,tmpDir);
	}

}