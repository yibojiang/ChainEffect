﻿#pragma strict

var target:Transform;

function Start () {

}

function Update () {
	if (target!=null){
		transform.position.x=target.position.x;
	}
}