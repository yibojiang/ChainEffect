#pragma strict
class GirlNextSceneTrigger extends EventTrigger{

	var sceneIndex:int;
	override function TriggerEvent():IEnumerator{

		Debug.Log("NextStage");

		PixelToNextLevel();

		super.TriggerEvent();

	}

	function PixelToNextLevel(){
		CameraController.Instance().PixelTo(1,
			function(){
				//Debug.Log("in");
				GameController.Instance().LoadScene(sceneIndex);
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
