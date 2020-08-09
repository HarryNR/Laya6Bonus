import { ui } from "./../ui/layaMaxUI";
import Event = Laya.Event;
import Point = Laya.Point;
import Handler = laya.utils.Handler;
import { LbxQipan } from "../game/LbxQipan";
import { Qipan, QipanKuang, BianKuang } from "../game/QipanKuang";
import { FKConfig } from "../game/FKConfig";
import { CommonUnitis } from "../game/CommonUnitis";


/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI  extends ui.GameSceneUI {
    // /**设置单例的引用方式，方便其他类引用 */
    // static instance: GameUI;
    /**当前游戏积分字段 */
    private _score: number;


    private lbxQipan: LbxQipan;

    private drapPoint: Point = new Point();
    private drapBox: laya.ui.Box;



    private checkFrameList = [];
    private checkFKlist = [];

    private curFKLen: number;


    constructor() {
        super();
        // GameUI.instance = this;
        //关闭多点触控，否则就无敌了
        Laya.MouseManager.multiTouchEnabled = false;

    }

    onEnable(): void {
        //点击提示文字，开始游戏
        this.lbxQipan = LbxQipan.Default;
        this.lbxQipan.init(this.box_qipan, this.box_bian);
        this.GameStart();
    }


    public GameStart() {
        //初始化历史最高分
        //GameSound.playBG();
        this.lbl_history_score.text = localStorage.getItem("HistoryScore") || "0";
        this.lbl_score.text = "0";
        this.InitUI();
    }

    private InitUI() {
        this.scor.visible = false;
        this.boxOver.visible = false;
        this.box_drag.removeChildren();
        for (let i = 0; i < this.lbxQipan.frameList.length; i++) {
            this.lbxQipan.frameList[i].isHaveFK = false;
        }
        //生成可放置方块
        for (let i = 0; i < 3; i++) {
            this.createLbxKuang(this["box" + i]);
        }
        this.checkIsLose();
    }

    //生成方块
    private newOneK(randomIndex: number): laya.ui.Image {
        let img: laya.ui.Image = new laya.ui.Image();
        img.skin = "lbx/pics/color_" + randomIndex + ".png";
        return img;
    }

    //生成方块
    private createLbxKuang(box: laya.ui.Box, point: Point = null): laya.ui.Box {
        let qiPan: Qipan = new Qipan();
        var config = FKConfig.Default.getTheConfig();
        //随机样子
        var randomStyle = Math.floor(Math.random() * (config.length - 1))
        var posList: Point[] = config[randomStyle];
        //随机 1-4
        let randomIndex: number = Math.floor(Math.random() * 6 + 1);

        var sumX = 0, countX = 0, sumY = 0, countY = 0;

        if (point) {
            box.x = point.x;
            box.y = point.y;
        }
        box.removeChildren();
        let node: laya.ui.Box = new laya.ui.Box();
        node.name = "node";
        node.tag = posList;

        for (var index = 0; index < posList.length; index++) {
            var pos = posList[index];
            var kuai = this.newOneK(randomIndex);

            node.addChild(kuai);
            kuai.x = pos.x;
            kuai.y = pos.y;
            sumY = kuai.y;


        }


        box.addChild(node);
        node.x = (box.width - node.width) * .5;
        node.y = (box.height - node.height) * .5 + (sumY > 0 ? 0 : Math.abs(sumY)) * 0.5;



        box.scale(0.7, 0.7);
        for (let childKuai of node._children) {
            let kuaiPos = CommonUnitis.localToGlobal2(childKuai);	//new Point(childKuai.x + box.x, childKuai.y + box.y);
            qiPan.kuangPoint = kuaiPos;
        }

        box.tag = qiPan;
        return box;

    }

    //检测是不是输了
    private checkIsLose() {
        //如果正在消除中，那就不判断输赢，因为消除后会再判断
        // if (this.isDeleting) return;

        var count = 0
        for (var i = 0; i < 3; i++) {
            var node: laya.ui.Box = this["box" + i].getChildByName("node");// cc.find('Canvas/getNewFK' + (i + 1))
            // var script = node.getComponent('NewLBXKuai')
            if (this.checkSelfIsLose(node)) {
                //console.log("方块" + (i + 1) + "已经无处安放")
                count++
                node.alpha = .2;
                //关闭鼠标事件
                this["box" + i].off(laya.events.Event.MOUSE_DOWN, this, this.onMouseDown);
            }
            else {
                //console.log("方块" + (i + 1) + "可以安放")
                node.alpha = 1;
                this["box" + i].once(laya.events.Event.MOUSE_DOWN, this, this.onMouseDown);
            }

        }

        if (count == 3) {
            //如果3个都不能放置，则显示输	
            //向服务器发送保存分数的消息
            Laya.timer.once(2000, this, this.sendSaveScore, []);
        }
    }
    //保存分数
    private sendSaveScore(score: string) {
        console.log(">>>>", this.lbl_score.text);
        // this.callControl(ControlName.sendMiniGameSaveScore, parseInt(this.view.lbl_score.text));
    }

    //分数保存结果
    public miniGameSaveScoreResult(data: any): void {
        if (data.resCode == 0) {
            this.lbl_history_score.text = "" + data.maxScore;
            //Debug.Default.log("最高分数是" + data.maxScore, "本周最高分数是" + data.m_score); //最高分 //保存成功
            this.txt_over.text = "你已经输了\n\n当前得分:" + this.lbl_score.text + "\n历史最高:" + data.maxScore;
            //显示失败界面
            // GameSound.playOver();
            this.boxOver.visible = true;
            this.btn_restart.once(Laya.Event.CLICK, this, this.onClick, [true]);
            this.btn_return.once(Laya.Event.CLICK, this, this.onClick, [false]);
        } else {
            //保存失败
        }
    }
    //结束时选择结果
    private onClick(isRevive: boolean, event: Laya.Event) {
        if (isRevive) {
            // this.callControl(ControlName.sendCminiGameChance);
        } else {
            //不续命
            // this.view.box_game_over.visible = false;
            // this.view.box_drag.removeChildren();
            // com.common.CommonData.Default.lbxPage.show();
            // com.common.CommonData.Default.lbxPage.referenceRank();
        }
    }

    //请求续命结果
    public miniGameChanceResult(data: any): void {
        if (data.resCode == 0) {
            //续命
            this.boxOver.visible = false;
            this.InitUI();
        } else {
            // com.panels.MsgWin.Default.show("续命失败！");
            //游戏结束
            this.boxOver.visible = false;
            this.box_drag.removeChildren();
            // com.common.CommonData.Default.lbxPage.show();
            // com.common.CommonData.Default.lbxPage.referenceRank();
        }
    }

    //-----------获取玩家金币-------------
    public getItemInfoResult() {
        // com.common.CommonData.Default.LoginResult.m_gold = com.common.CommonData.Default.itemInfo.m_card2;
    }

    //检测自身是否已经无处可放
    private checkSelfIsLose(node: laya.ui.Box) {
        var canDropCount = 0
        var children: laya.ui.Image[] = node._children as laya.ui.Image[];

        //一个个格子放试一下能不能放
        for (var i = 0; i < this.lbxQipan.frameList.length; i++) {
            var frameNode: QipanKuang = this.lbxQipan.frameList[i] as QipanKuang;
            var srcPos: Point = new Point(frameNode.x, frameNode.y);

            var count = 1
            if (!frameNode.isHaveFK) {

                //这里做是否可以放的判断
                for (var j = 1; j < children.length; j++) {
                    var len = 27 //碰撞距离
                    var childPos: Point = new Point(srcPos.x + children[j].x, srcPos.y + children[j].y);
                    // this.box_qipan.tag

                    //碰撞检测
                    for (var k = 0; k < this.lbxQipan.frameList.length; k++) {
                        var tFrameNode = this.lbxQipan.frameList[k]
                        var dis = childPos.distance(tFrameNode.x, tFrameNode.y);
                        if (dis <= len && !tFrameNode.isHaveFK) {
                            count++; //可以放就要累加计数
                            break;
                        }
                    }

                }

                //如果数量相等就说明这个方块在这个格子是可以放下的
                if (count == children.length) {
                    canDropCount++
                }
            }
        }

        if (canDropCount == 0) {
            return true
        } else {
            return false
        }
    }

    /**
     * 加分
     * @param XCCount 消除的总数
     * @param isDropAdd 是否是放下的单纯加分
     */
    private addScore(XCCount: number, isDropAdd: boolean = false) {
        this.scoreJump(this.lbl_score, XCCount, isDropAdd, true);
        if (!isDropAdd) {
            if (XCCount != 0) {
                let score = 0;
                for (let i = 1; i <= XCCount; i++) {
                    score += 2 * i;
                }
                this.upscore(score + 1);
            }
        }
    }

    //计算加分的公式
    private getAddScoreCal(XCCount: number, isDropAdd: boolean = false): number {
        var x = XCCount + 1
        var addScoreCount = isDropAdd ? 1 : 2 * x// * x//数量的平方
        return addScoreCount;
    }
    private complete2(lbl: laya.ui.Label, addScoreCount: number) {
        this.lbl_score.text = (addScoreCount + Number(this.lbl_score.text)).toString();
    }

    private scoreJump(lbl: laya.ui.Label, XCCount: number, isDropAdd: boolean = false, isComplete: boolean = false): void {
        while (XCCount > 0 && isComplete) {
            XCCount--;
            isComplete = false;
            var addScoreCount = this.getAddScoreCal(XCCount, isDropAdd);
            this.lbl_score.text = (addScoreCount + Number(this.lbl_score.text)).toString();
            Laya.timer.once(50, this, this.scoreJump, [this.lbl_score, XCCount, isDropAdd, true]);
        }
    }

    private isCanDrap: boolean = false;

    //box的拖拽事件
    private onMouseDown(event: laya.events.Event) {
        let box: laya.ui.Box = event.target as laya.ui.Box;
        this.drapBox = box;
        this.drapBox.once(laya.events.Event.DRAG_START, this, this.onDragStart);
        this.drapBox.on(laya.events.Event.DRAG_MOVE, this, this.onDragMove);
        this.drapBox.once(laya.events.Event.DRAG_END, this, this.onDragEnd);
        this.drapBox.once(laya.events.Event.MOUSE_UP, this, this.onDragEnd);
        // let child: laya.ui.Image = box.getChildByName("node")._childs[0];
        // let pos:Point = child.localToGlobal(new Point(child.x,child.y));
        // //console.log(">>>点击前坐标",pos.x,pos.y);
        box.scale(1, 1);

        // let child2:laya.ui.Image = box.getChildByName("node")._childs[0];
        // let pos2:Point = child.localToGlobal(new Point(child2.x,child2.y));
        // //console.log(">>>点击后坐标",pos2.x,pos2.y);
        this.isCanDrap = true;
        box.startDrag();
    }

    private onDragStart(event: laya.events.Event) {
        let box: laya.ui.Box = this.drapBox;//= event.target as laya.ui.Box;
        this.drapPoint.x = box.x;
        this.drapPoint.y = box.y;
        this.curFKLen = (this.drapBox.getChildByName("node") as laya.ui.Box).numChildren;
    }

    private onDragMove(event: laya.events.Event) {

        this.checkCollision();

    }
    private onDragEnd(event: laya.events.Event) {
        if (!this.isCanDrap) return;
        let node: laya.ui.Box = this.drapBox.getChildByName("node") as laya.ui.Box;
        let childs: laya.ui.Image[] = node._children;
        if (this.dragNodes.length == childs.length) {

            let copyChilds: laya.ui.Image[] = [];
            for (let child of childs) {
                copyChilds.push(child);
            }
            node.removeChildren();
            for (let i = 0; i < this.dragNodes.length; i++) {
                // childs[i].removeSelf();
                this.box_drag.addChild(copyChilds[i]);
                copyChilds[i].name = "Drag" + this.dragNodes[i].FKindex;
                copyChilds[i].x = this.dragNodes[i].x;	//修正
                copyChilds[i].y = this.dragNodes[i].y;
                (this.box_bian.getChildByName("QipanBian" + this.dragNodes[i].FKindex) as laya.ui.Image).visible = false;
                // this.dragNodes[i]._childs[0].visible = false;
                this.dragNodes[i].isHaveFK = true;
                // //console.log(">>>dragNodes=>",this.dragNodes[i].x,this.dragNodes[i].y);
            }
            this.dragNodes = [];
            this.createLbxKuang(this.drapBox, this.drapPoint);
            this.checkXC();
        } else {
            if (this.drapBox.name == "box0")
                laya.utils.Tween.to(this.drapBox, { x: 790, y: 20, scaleX: 0.7, scaleY: 0.7 }, 200);
            else if (this.drapBox.name == "box1")
                laya.utils.Tween.to(this.drapBox, { x: 790, y: 255, scaleX: 0.7, scaleY: 0.7 }, 200);
            else if (this.drapBox.name == "box2")
                laya.utils.Tween.to(this.drapBox, { x: 790, y: 490, scaleX: 0.7, scaleY: 0.7 }, 200);
        }
        this.checkIsLose();
        this.isCanDrap = false;
        this.drapBox.off(laya.events.Event.DRAG_MOVE, this, this.onDragMove);

    }
    //加分飘字
    private upscore(pulsNum: number) {
        this.scor.alpha = 1;
        this.scor.y = 340;
        this.scor.scale(1, 1);
        this.scor.text = "+" + pulsNum;
        this.scor.visible = true;
        laya.utils.Tween.to(this.scor, { y: 240, alpha: 0.4, scaleX: 1.2, scaleY: 1.2 }, 1000, null, Handler.create(this, () => {
            this.scor.visible = false;
        }));
    }
    private checkXC() {
        //放下都加分
        this.addScore(this.curFKLen, true)

        this.upscore(this.curFKLen);
        //棋盘上已经有方块的标识集
        var haveFKIndexList = []
        for (var i = 0; i < this.lbxQipan.frameList.length; i++) {
            if (this.lbxQipan.frameList[i].isHaveFK) {
                //cc.log(this.lbxQipan.frameList[i].FKIndex)
                haveFKIndexList.push(this.lbxQipan.frameList[i].FKindex);
            }

        }

        haveFKIndexList.sort(function (a, b) { return a - b });	//正序排序，从小到大
        let xcList = []//要消除的方块列表
        var disList = FKConfig.Default.disList;
        for (let i = 0; i < disList.length; i++) {
            let oneXCList = disList[i];
            var intersectAry = CommonUnitis.get2AryIntersect(haveFKIndexList, oneXCList);	//获得两个数组交集
            if (intersectAry.length > 0) {
                var isXC = CommonUnitis.check2AryIsEqual(oneXCList, intersectAry);		//判断是否可以消除
                if (isXC) {
                    //console.log("消！！！");
                    xcList.push(oneXCList);
                    //播放消除声音
                }
            }
        }

        //消除表现
        var actionArr = [];
        var count = 0
        for (var i = 0; i < xcList.length; i++) {
            for (let j = 0; j < xcList[i].length; j++) {
                // this.box_drag.removeChildByName("Drag" + xcList[i][j]);
                let imgDrag: laya.ui.Image = this.box_drag.getChildByName("Drag" + xcList[i][j]) as laya.ui.Image;
                let Kuang: QipanKuang = this.box_qipan.getChildByName("QipanKuang" + xcList[i][j]) as QipanKuang;
                Kuang.isHaveFK = false;
                // let bian: laya.ui.Image = this.box_bian.getChildByName("QipanBian" + xcList[i][j]) as laya.ui.Image;
                // bian.visible = true;
                // Laya.Tween.to(bian, { scaleX: 1.5, scaleY: 1.5, alpha: 0.5, }, 4000,Laya.Ease.bounceIn,Laya.Handler.create(this,this.complete,[bian]),100);
                // .to(bian, { scaleX: 1, scaleY: 1, alpha: 1, visible: false }, 2000);	linearIn strongIn
                Laya.Tween.to(imgDrag, { scaleX: 1.5, scaleY: 1.5, alpha: 0.5, }, 1000, Laya.Ease.linearIn, Laya.Handler.create(this, this.complete, [imgDrag]), 100);
                count++;
            }
        }

        this.addScore(count);
    }

    /**
     * 缓动完成后的回调方法
     */
    private complete(bian: Laya.Image): void {
        bian.removeSelf();
    }


    private dragNodes: QipanKuang[] = [];
    //碰撞检测
    private checkCollision() {
        // for (let qiPan of this.lbxQipan.frameList) {
        // 	(this.box_bian.getChildByName("QipanBian" + qiPan.FKindex) as laya.ui.Image).visible = false;
        // 	// qiPan._childs[0].visible = false;
        // }
        for (let i = 0; i < this.lbxQipan.frameList.length; i++) {
            (this.box_bian.getChildByName("QipanBian" + i) as laya.ui.Image).visible = false;
        }
        let qiPan: Qipan = this.box_qipan.tag;
        this.dragNodes = [];

        for (let posBox of this.drapBox.tag.kuangPoints) {
            for (let posQipan of this.box_qipan.tag.kuangPoints) {
                let posBox1: Point = new Point((this.drapBox.x + posBox.x), (this.drapBox.y + posBox.y));
                //console.log(">>>>>posBox1=>", posBox1.x, posBox1.y, ">>>>posQipan=>", posQipan.x, posQipan.y);
                if (posBox1.distance(posQipan.x, posQipan.y) <= 35) {
                    let Kuang: QipanKuang = this.box_qipan.getChildByName("QipanKuang" + this.box_qipan.tag.getIndex(posQipan)) as QipanKuang;
                    if (Kuang.isHaveFK) {
                        this.dragNodes = [];
                        return;
                    }
                    this.dragNodes.push(Kuang);
                    // ._childs[0].visible = true;
                }
            }
            if (this.dragNodes.length <= 0) {
                return;
            }
        }
        if (this.dragNodes.length == this.drapBox.tag.kuangPoints.length) {
            for (let node of this.dragNodes) {
                (this.box_bian.getChildByName("QipanBian" + node.FKindex) as laya.ui.Image).visible = true;
                // node._childs[0].visible = true;
            }
        }
    }

    private getDistance(p1: Point, p2: Point) {
        var _x: number = Math.abs(p1.x - p2.x);
        var _y: number = Math.abs(p1.y - p2.y);
        return Math.sqrt(_x * _x + _y * _y);
    }


}