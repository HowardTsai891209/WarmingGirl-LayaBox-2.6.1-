(function () {
    'use strict';

    class Point extends Laya.Script {
        constructor() {
            super();
        }
        decideWeapon(rotation) {
            rotation %= 360;
            if (rotation >= 150 && rotation <= 210) {
                console.log(1);
                return;
            }
            else if (rotation >= 90 && rotation <= 150) {
                console.log(2);
                return;
            }
            else if (rotation >= 30 && rotation <= 90) {
                console.log(3);
                return;
            }
            else if (rotation >= 330 || rotation <= 30) {
                console.log(4);
                return;
            }
            else if (rotation >= 270 && rotation <= 330) {
                console.log(5);
                return;
            }
            else if (rotation >= 210 && rotation <= 270) {
                console.log(6);
                return;
            }
        }
    }

    class Spin extends Laya.Scene {
        constructor() {
            super();
            this.rotateSpeed = 20;
            Spin.instance = this;
        }
        createChildren() {
            super.createChildren();
            this.loadScene("WeaponSpin");
        }
        onAwake() {
            Laya.timer.frameLoop(1, this, this.SpinFn);
            this._point = this.getComponent(Point);
        }
        onEnable() {
            this.spinWheel.on(Laya.Event.CLICK, this, this.StopFn);
        }
        SpinFn() {
            this.pointer.rotation += this.rotateSpeed;
        }
        StopFn() {
            this.spinWheel.off(Laya.Event.CLICK, this, this.StopFn);
            Laya.timer.loop(50, this, function () {
                this.rotateSpeed *= 0.95;
                if (this.rotateSpeed <= 0.1) {
                    Laya.timer.clear(this, this.SpinFn);
                    this._point.decideWeapon(this.pointer.rotation);
                    return;
                }
            });
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Scripts/Spin.ts", Spin);
            reg("Scripts/Point.ts", Point);
        }
    }
    GameConfig.width = 1920;
    GameConfig.height = 1080;
    GameConfig.scaleMode = "exactfit";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "WeaponSpin.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
