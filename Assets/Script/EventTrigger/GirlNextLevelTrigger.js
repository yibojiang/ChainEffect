#pragma strict
class GirlNextLevelTrigger extends EventTrigger{

	override function TriggerEvent():IEnumerator{

		Debug.Log("NextStage");

		CameraController.Instance().PixelTo(2,
			function(){
				Debug.Log("in");
			}, function(){
				Debug.Log("out"); 
			});

		super.TriggerEvent();

	}

	function Update(){
		if (Input.GetKeyDown(KeyCode.H)){
			CameraController.Instance().PixelTo(2,
			function(){
				Debug.Log("in");
			}, function(){
				Debug.Log("out"); 
			});			
		}
	}
}
