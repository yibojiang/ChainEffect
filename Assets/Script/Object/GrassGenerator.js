#pragma strict
import System.Collections.Generic;

var grassPrefab:Grass;

var width:float=5;
var height:float=4;
var heightOffset:float=0;

var count:int=10;

var fragmentCount:int=5;

var grassList:List.<Grass>;

var frequent:float=10;

var topColor:Color;
var downColor:Color;

var offset:float;

var startWidth:float;
var endWidth:float;

var mutiplier:float;

function Start () {

	//var startPos:Vector3=transform.position-Vector3(width/2,0,0);
	var interval:float=width/(count+1);
	var i:int;
	for (i=0;i<count;i++){

		var grass:Grass=Instantiate(grassPrefab);
		grass.transform.parent=this.transform;
		grass.transform.localPosition=i*Vector3(interval,0,0);
		grassList.Add(grass);

		grass.heightOffset=Random.Range(-heightOffset,heightOffset);

	}

}	

function Update () {
	var i:int;
	var j:int;


	for(i = 0; i < grassList.Count; i++) {
		grassList[i].line.SetVertexCount(fragmentCount);
		for (j=0;j<fragmentCount;j++){
			var factor:float=j*1.0/fragmentCount;
			var pos : Vector3 = Vector3(mutiplier*factor*factor*(offset+Mathf.Sin(i + Time.time*frequent) ) ,j * (grassList[i].heightOffset+height)/fragmentCount, 0);
			grassList[i].line.SetPosition(j, pos);	
			grassList[i].line.SetColors( downColor,topColor);
			grassList[i].line.SetWidth(startWidth,endWidth);
		}
		
	}
}