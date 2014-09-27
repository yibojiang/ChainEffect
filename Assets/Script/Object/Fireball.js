#pragma strict
class Fireball extends Entity{
	var life:float;
	var lifeTime:float=1.5;

	var explosionPrefab:GameObject;

	function Update(){
		life+=Time.deltaTime;
		if (life>lifeTime){
			Explode();
		}
		super.Update();
	}

	function Explode(){
		Instantiate(explosionPrefab,transform.position,Quaternion.identity);
		Destroy(this.gameObject);
	}

}
