#pragma strict
class GoToLevel2Trigger extends EventTrigger{


	override function TriggerEvent():IEnumerator{
		super.TriggerEvent();

	}

	function PixelToNextLevel(){
		CameraController.Instance().PixelTo(1,
			function(){
				//Debug.Log("in");
				GameController.Instance().LoadScene(2);
			}, function(){
				//Debug.Log("out"); 
				//GameController.Instance().LoadScene(1);
			});
	}
}
