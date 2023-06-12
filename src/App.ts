import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, SceneLoader, ActionManager, ExecuteCodeAction, KeyboardEventTypes } from "@babylonjs/core";

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

    var camera = new FreeCamera("camera1", new Vector3(788.8, 502.2, -5094.9), scene);
    camera.keysUp.push(87); // Z = 90 forward
    camera.keysDown.push(65); // S = 83 back
    camera.keysLeft.push(83); // Q = 81 left
    camera.keysRight.push(68); // D = 68 right

    camera.setTarget(Vector3.Zero());

    camera.attachControl(canvas, true);

    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    let character: any ;
    SceneLoader.ImportMeshAsync(null, "assets/", "ironforge.glb", scene);

    for(let pos_x = 32; pos_x < 34; pos_x++){
        for(let pos_y = 41; pos_y < 43; pos_y++){
            SceneLoader.ImportMeshAsync(null, "assets/", "adt_" + pos_x + "_" + pos_y + ".glb", scene).then((result) => { 
                console.log(result.meshes[0].position);   
            });
        }
    }

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
        updateFromKeyboard(inputMap);
    });

    return scene;
};

const updateFromKeyboard = (inputMap: any) => {
    if (inputMap["z"]) {

    } else if (inputMap["ArrowDown"]) {

    } 

    if (inputMap["ArrowLeft"]) {


    } else if (inputMap["ArrowRight"]) {

    }
}
