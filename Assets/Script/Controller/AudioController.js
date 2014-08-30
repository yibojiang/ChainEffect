#pragma strict
private static var instance : AudioController;
 
public static function Instance() : AudioController
{
    if (instance == null)
        instance =GameObject.FindObjectOfType(AudioController) as AudioController;
    return instance;
}
