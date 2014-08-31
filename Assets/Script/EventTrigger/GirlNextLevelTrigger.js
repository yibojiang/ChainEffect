#pragma strict
class GirlNextLevelTrigger extends EventTrigger{

	override function TriggerEvent():IEnumerator{

		Debug.Log("NextStage");

		

		super.TriggerEvent();

	}

	function PixelToNextLevel(){
		CameraController.Instance().PixelTo(1,
			function(){
				//Debug.Log("in");
				GameController.Instance().LoadScene(1);
			}, function(){
				//Debug.Log("out"); 
				//GameController.Instance().LoadScene(1);
			});
	}

	/*
	function Update(){
		if (Input.GetKeyDown(KeyCode.H)){
			PixelToNextLevel();
		}
	}
	*/
}
