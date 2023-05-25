import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, SceneLoader, ActionManager, ExecuteCodeAction } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

export default class App {
    engine: Engine;
    scene: Scene;

    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas)
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
        this.scene = createScene(this.engine, this.canvas)

    }

    debug(debugOn: boolean = true) {
        if (debugOn) {
            this.scene.debugLayer.show({ overlay: true });
        } else {
            this.scene.debugLayer.hide();
        }
    }

    run() {
        this.debug(true);
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}

var createScene = function (engine: Engine, canvas: HTMLCanvasElement) {

    var scene = new Scene(engine);

    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());

    camera.attachControl(canvas, true);

    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    let character: any ;
    SceneLoader.ImportMeshAsync(null, "assets/", "ironforge.glb", scene, function (scene) {            
    });
    SceneLoader.ImportMeshAsync(null, "assets/", "dwarf.glb", scene).then((result) => {
        character = result.meshes[0];
    });

    scene.actionManager = new ActionManager(scene);

    let inputMap: any = {};
    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keyup";
    }));

    scene.onBeforeRenderObservable.add(() => {
        updateFromKeyboard(inputMap, character);
    });

    return scene;
};

const updateFromKeyboard = (inputMap: any, player: any) => {
    if (inputMap["z"]) {
        player.position(new Vector3(1,-1,5))

    } else if (inputMap["ArrowDown"]) {

    } 

    if (inputMap["ArrowLeft"]) {


    } else if (inputMap["ArrowRight"]) {

    }
}