/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui {
    export class GameSceneUI extends Scene {
		public box_qipan:Laya.Box;
		public box_bian:Laya.Box;
		public box_drag:Laya.Box;
		public box0:Laya.Box;
		public box1:Laya.Box;
		public box2:Laya.Box;
		public lbl_history_score:Laya.Label;
		public lbl_score:Laya.Label;
		public boxOver:Laya.Box;
		public txt_over:Laya.Label;
		public btn_restart:Laya.Button;
		public btn_return:Laya.Button;
		public scor:laya.display.Text;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("GameScene");
        }
    }
    REG("ui.GameSceneUI",GameSceneUI);
}