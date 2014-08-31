#pragma strict
class GotoNextSceneTrigger extends EventTrigger{

	var sceneIndex:int;
	override function TriggerEvent():IEnumerator{
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
}
