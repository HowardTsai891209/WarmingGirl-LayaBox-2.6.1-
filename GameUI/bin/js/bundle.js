(function () {
    'use strict';

    class HealthBar extends Laya.Script {
        constructor() {
            super();
            this.playerHealth = 100;
        }
        playerHP(damage) {
            GameUI.instance.currentHP.text = this.playerHealth.toString();
            this.showHealth();
        }
        showHealth() {
            if (!GameUI.instance.preload)
                return;
            this.arrEnd = parseInt((this.playerHealth / 10).toString());
            if (this.playerHealth <= 0) {
                console.log("死亡");
                this.playerHealth = 0;
                GameUI.instance.healthArr[0].visible = false;
                return;
            }
            for (this.arrStart = 0; this.arrStart < this.arrEnd; this.arrStart++) {
                GameUI.instance.healthArr[this.arrStart].visible = true;
            }
            for (this.arrStart = 9; this.arrStart > this.arrEnd; this.arrStart--) {
                GameUI.instance.healthArr[this.arrStart].visible = false;
            }
        }
    }

    class Timer extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.second = 5;
            this.minute = 0;
        }
        timer() {
            Laya.timer.loop(1000, this, this.count);
        }
        count() {
            this.second -= 1;
            if (this.second < 10) {
                GameUI.instance.minute.text = "0" + this.minute.toString();
                GameUI.instance.second.text = "0" + this.second.toString();
                if (this.second < 0) {
                    this.second = 59;
                    this.minute -= 1;
                    GameUI.instance.minute.text = "0" + this.minute.toString();
                    GameUI.instance.second.text = this.second.toString();
                }
            }
            else if (this.second >= 10) {
                GameUI.instance.minute.text = "0" + this.minute.toString();
                GameUI.instance.second.text = this.second.toString();
            }
            if (this.second <= 0 && this.minute <= 0) {
                console.log("time");
                Laya.timer.clear(this, this.count);
            }
        }
    }

    class GameUI extends Laya.Scene {
        constructor() {
            super();
            this.preload = false;
            GameUI.instance = this;
        }
        createChildren() {
            super.createChildren();
            this.loadScene("GameUI");
        }
        loadHealth() {
            this.healthArr = [GameUI.instance.health0,
                GameUI.instance.health1,
                GameUI.instance.health2,
                GameUI.instance.health3,
                GameUI.instance.health4,
                GameUI.instance.health5,
                GameUI.instance.health6,
                GameUI.instance.health7,
                GameUI.instance.health8,
                GameUI.instance.health9,];
            this.preload = true;
        }
        onAwake() {
            this.loadHealth();
            this._health = this.getComponent(HealthBar);
            this._time = this.getComponent(Timer);
            this._time.timer();
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Scripts/GameUI.ts", GameUI);
            reg("Scripts/HealthBar.ts", HealthBar);
            reg("Scripts/Timer.ts", Timer);
        }
    }
    GameConfig.width = 1920;
    GameConfig.height = 1080;
    GameConfig.scaleMode = "exactfit";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "GameUI.scene";
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
