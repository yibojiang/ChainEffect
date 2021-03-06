﻿#pragma strict

var flipDir:int;
var body:Transform;
var bodyParts:Transform[];

var alive:boolean;
var normalDir:int=1;

var maxWalkSpeed:float=20;

var vel:Vector3;
var HP:float;
var maxHP:float;
var hurtForce:float=200;

var waveGenerator:WaterWaveGenerator;
function Walk(){
	if (waveGenerator!=null){
		waveGenerator.GenerateWave();	
	}
}

function SetDir(_dir:int){
	
	flipDir=_dir % 2;
	if (body==null){
		return;
	}
	
	//body.localEulerAngles.y=180*GetFlipRotateFactor();
	body.localScale.x=GetFlipDir();
	UpdateDepth();
}

function UpdateDepth(){


	var i:int;
	for (i=0;i<bodyParts.Length;i++){
		bodyParts[i].transform.localPosition.z=-Mathf.Abs(bodyParts[i].transform.localPosition.z)*GetFlipDir();
	}
}


function GetFlipRotateFactor():int{

	if (GetFlipDir()>0 ){
		return 0;
	}
	else{
		return 1;
	}
}

function GetFlipDir():int{
	if (flipDir % 2==0){
		return 1*normalDir;
	}
	else{
		return -1*normalDir;
	}
}

function Flip(){

	flipDir+=1;
	flipDir=flipDir % 2;
	
	if (body==null){
		return;
	}
	
	//body.localEulerAngles.y=180*GetFlipRotateFactor();
	body.localScale.x=GetFlipDir();
	UpdateDepth();
}

function SetRenderQueue(_renderQueue:int){
	
	var i:int;
	for (i=0;i<bodyParts.Length;i++){
		if (bodyParts[i].gameObject.renderer!=null){
			bodyParts[i].gameObject.renderer.material.renderQueue=_renderQueue;	
		}
		
	}
}

function Awake(){
	if (body!=null){
		bodyParts=body.gameObject.GetComponentsInChildren.<Transform>(true);
	}
}


function Start () {
	HP=maxHP;
}

function Update () {
	if (alive){
		if (vel.x>0){
			if (GetFlipDir()<0){
				SetDir(0);	
			}
			
		}
		else if (vel.x<0){

			if (GetFlipDir()>0){
				SetDir(1);
			}
		}

		if (Mathf.Abs(vel.x)>maxWalkSpeed ){
			vel.x=maxWalkSpeed*GetFlipDir();
		}

		transform.position+=vel*Time.deltaTime;

	}
}

function Die(){
	alive=false;
	Debug.Log(gameObject.name+" :Die");
	this.gameObject.GetComponent(Collider2D).enabled=false;
	this.gameObject.GetComponent(Rigidbody2D).Sleep();
}