#pragma strict

var line:LineRenderer;
var radius:float;
var maxRadius:float=10;
var vertexCount:int=10;
var col:Color;

var speed:float=2;

@script ExecuteInEditMode()
function Start () {

}

function Update () {

	line.SetVertexCount(vertexCount);

	if (radius<maxRadius){
		//Debug.Log(radius);
		radius+=speed*Time.deltaTime;
	}
	else{
		//radius=0;
		Destroy(this.gameObject);
	}
	var i:int;
	for(i=0;i<vertexCount;i++){
		var rad:float=i*2*Mathf.PI/(vertexCount-1);
		var pos:Vector3;
		pos.x=radius*Mathf.Cos(rad);
		pos.z=radius*Mathf.Sin(rad);
		line.SetPosition(i,pos);
		
		col.a=1-radius/maxRadius;
		line.SetColors(col,col);
	}
}