import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader } from "@babylonjs/core";
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
    // this is the default code from the playground:

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    SceneLoader.Append("/assets/", "ironforge.glb", scene, function (scene) {            
    });

    return scene;
};