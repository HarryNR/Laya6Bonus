(function () {
	'use strict';

	var Scene = Laya.Scene;
	var REG = Laya.ClassUtils.regClass;
	var ui;
	(function (ui) {
	    class GameSceneUI extends Scene {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("GameScene");
	        }
	    }
	    ui.GameSceneUI = GameSceneUI;
	    REG("ui.GameSceneUI", GameSceneUI);
	})(ui || (ui = {}));

	class QipanKuang extends laya.ui.Image {
	    constructor() {
	        super();
	        this.skin = "lbx/pics/kuang.png";
	        this.alpha = 1;
	    }
	    set FKindex(value) { this._FKindex = value; }
	    get FKindex() { return this._FKindex; }
	    set isHaveFK(value) { this._isHaveFK = value; }
	    get isHaveFK() { return this._isHaveFK; }
	    set localX(value) { this._localX = value; }
	    get localX() { return this._localX; }
	    set localY(value) { this._localY = value; }
	    get localY() { return this._localY; }
	}
	class BianKuang extends laya.ui.Image {
	    constructor() {
	        super();
	        this.skin = "lbx/pics/kuangLiang.png";
	    }
	}
	class Qipan {
	    constructor() {
	    }
	    set kuangPoint(point) {
	        if (!this._kuangPoints)
	            this._kuangPoints = [];
	        this._kuangPoints.push(point);
	    }
	    get kuangPoints() {
	        return this._kuangPoints;
	    }
	    getIndex(point) {
	        return this._kuangPoints.indexOf(point);
	    }
	    getPoint(index) {
	        return this._kuangPoints[index];
	    }
	}

	var Point = laya.maths.Point;
	class FKConfig {
	    constructor() {
	        this.liubianxingH = 28;
	        this.liubianxingA = 32.5;
	        this.a = 28;
	        this.h = 32;
	        this._posList = [
	            {
	                count: 5,
	                srcPos: new laya.maths.Point(0, 0)
	            },
	            {
	                count: 6,
	                srcPos: new Point(2 * this["liubianxingH"], 0)
	            },
	            {
	                count: 7,
	                srcPos: new Point(2 * this["liubianxingH"] * 2, 0)
	            },
	            {
	                count: 8,
	                srcPos: new Point(2 * this["liubianxingH"] * 3, 0)
	            },
	            {
	                count: 9,
	                srcPos: new Point(2 * this["liubianxingH"] * 4, 0)
	            },
	            {
	                count: 8,
	                srcPos: new Point(2 * this["liubianxingH"] * 4 + this["liubianxingH"], (3 * this["liubianxingA"]) / 2)
	            },
	            {
	                count: 7,
	                srcPos: new Point(2 * this["liubianxingH"] * 4 + this["liubianxingH"] * 2, (3 * this["liubianxingA"] * 2) / 2)
	            },
	            {
	                count: 6,
	                srcPos: new Point(2 * this["liubianxingH"] * 4 + this["liubianxingH"] * 3, (3 * this["liubianxingA"] * 3) / 2)
	            },
	            {
	                count: 5,
	                srcPos: new Point(2 * this["liubianxingH"] * 4 + this["liubianxingH"] * 4, (3 * this["liubianxingA"] * 4) / 2)
	            },
	        ];
	    }
	    static get Default() {
	        if (this._default == null)
	            return new FKConfig();
	        return this._default;
	    }
	    getTheConfig() {
	        var a = 32.5;
	        var h = 28;
	        var configLists = [
	            [new Point(0, 0)],
	            [new Point(0, 0), new Point(h * 2, 0)],
	            [new Point(0, 0), new Point(h, a * 1.5)],
	            [new Point(0, 0), new Point(h, -a * 1.5)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 4, 0)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, a * 1.5)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, -a * 1.5)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h, a * 1.5)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h, -a * 1.5)],
	            [new Point(0, 0), new Point(h, a * 1.5), new Point(h * 3, a * 1.5)],
	            [new Point(0, 0), new Point(h, a * 1.5), new Point(h * 2, a * 3)],
	            [new Point(0, 0), new Point(h, a * 1.5), new Point(0, a * 3)],
	            [new Point(0, 0), new Point(h, -a * 1.5), new Point(h * 3, -a * 1.5)],
	            [new Point(0, 0), new Point(h, -a * 1.5), new Point(h * 2, -a * 3)],
	            [new Point(0, 0), new Point(h, -a * 1.5), new Point(0, -a * 3)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 4, 0), new Point(h * 6, 0)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 4, 0), new Point(h * 5, a * 1.5)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 4, 0), new Point(h * 5, -a * 1.5)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 4, 0), new Point(h * 3, a * 1.5)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 4, 0), new Point(h * 3, -a * 1.5)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, a * 1.5), new Point(h, a * 1.5)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, a * 1.5), new Point(h * 2, a * 3)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, a * 1.5), new Point(h * 4, a * 3)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, a * 1.5), new Point(h * 5, a * 1.5)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, -a * 1.5), new Point(h, -a * 1.5)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, -a * 1.5), new Point(h * 2, -a * 3)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, -a * 1.5), new Point(h * 4, -a * 3)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, -a * 1.5), new Point(h * 5, -a * 1.5)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h, -a * 1.5), new Point(-h, -a * 1.5)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h, -a * 1.5), new Point(0, -a * 3)],
	            [new Point(0, 0), new Point(h * 2, 0), new Point(h, -a * 1.5), new Point(h * 2, -a * 3)],
	            [new Point(0, 0), new Point(h, -a * 1.5), new Point(h * 2, -a * 3), new Point(h * 3, -a * 4.5)],
	            [new Point(0, 0), new Point(-h, -a * 1.5), new Point(-h * 2, -a * 3), new Point(-h * 3, -a * 4.5)],
	        ];
	        return configLists;
	    }
	    get posList() {
	        return this._posList;
	    }
	    get disList() {
	        return [
	            [0, 1, 2, 3, 4],
	            [5, 6, 7, 8, 9, 10],
	            [11, 12, 13, 14, 15, 16, 17],
	            [18, 19, 20, 21, 22, 23, 24, 25],
	            [26, 27, 28, 29, 30, 31, 32, 33, 34],
	            [35, 36, 37, 38, 39, 40, 41, 42],
	            [43, 44, 45, 46, 47, 48, 49],
	            [50, 51, 52, 53, 54, 55],
	            [56, 57, 58, 59, 60],
	            [26, 35, 43, 50, 56],
	            [18, 27, 36, 44, 51, 57],
	            [11, 19, 28, 37, 45, 52, 58],
	            [5, 12, 20, 29, 38, 46, 53, 59],
	            [0, 6, 13, 21, 30, 39, 47, 54, 60],
	            [1, 7, 14, 22, 31, 40, 48, 55],
	            [2, 8, 15, 23, 32, 41, 49],
	            [3, 9, 16, 24, 33, 42],
	            [4, 10, 17, 25, 34],
	            [0, 5, 11, 18, 26],
	            [1, 6, 12, 19, 27, 35],
	            [2, 7, 13, 20, 28, 36, 43],
	            [3, 8, 14, 21, 29, 37, 44, 50],
	            [4, 9, 15, 22, 30, 38, 45, 51, 56],
	            [10, 16, 23, 31, 39, 46, 52, 57],
	            [17, 24, 32, 40, 47, 53, 58],
	            [25, 33, 41, 48, 54, 59],
	            [34, 42, 49, 55, 60],
	        ];
	    }
	}

	var Point$1 = laya.maths.Point;
	class CommonUnitis {
	    static localToGlobal(obj) {
	        return this.CalcLocalPoint(obj, new Point$1());
	    }
	    static CalcLocalPoint(obj, point) {
	        if (obj.parent) {
	            point.x = point.x + obj.x;
	            point.y = point.y + obj.y;
	            let comp = obj.parent;
	            this.CalcLocalPoint(comp, point);
	        }
	        return point;
	    }
	    static localToGlobal2(obj) {
	        return this.CalcLocalPoint2(obj, new Point$1());
	    }
	    static CalcLocalPoint2(obj, point) {
	        if (!(obj.parent instanceof ui.GameSceneUI)) {
	            point.x = point.x + obj.x;
	            point.y = point.y + obj.y;
	            let comp = obj.parent;
	            this.CalcLocalPoint2(comp, point);
	        }
	        return point;
	    }
	    static get2AryIntersect(ary1, ary2) {
	        var intersectAry = [];
	        for (var i = 0; i < ary1.length; i++) {
	            for (var j = 0; j < ary2.length; j++) {
	                if (ary2[j] == ary1[i]) {
	                    intersectAry.push(ary2[j]);
	                }
	            }
	        }
	        return intersectAry;
	    }
	    static check2AryIsEqual(ary1, ary2) {
	        for (var i = 0; i < ary1.length; i++) {
	            if (ary2[i] != ary1[i]) {
	                return false;
	            }
	        }
	        return true;
	    }
	    constructor() {
	    }
	}

	var Point$2 = laya.maths.Point;
	class LbxQipan {
	    constructor() {
	        this.liubianxingH = 28;
	        this.liubianxingA = 32.5;
	        this._frameList = [];
	        this.posList = FKConfig.Default.posList;
	    }
	    get frameList() { return this._frameList; }
	    static get Default() {
	        if (this._default == null)
	            this._default = new LbxQipan();
	        return this._default;
	    }
	    init(box_qipan, box_bian) {
	        this.box_qipan = box_qipan;
	        this.box_bian = box_bian;
	        if (box_qipan.numChildren > 60)
	            return;
	        let tagQipan = new Qipan();
	        for (let i = 0, index = 0; i < this.posList.length; i++) {
	            let count = this.posList[i].count;
	            let pos = this.posList[i].srcPos;
	            for (let j = 0; j < count; j++) {
	                let img = new QipanKuang();
	                img.name = "QipanKuang" + index;
	                box_qipan.addChild(img);
	                this._frameList.push(img);
	                img.x = pos.x - (j * this.liubianxingH);
	                img.y = pos.y + (j * this.liubianxingA * 1.5);
	                img.localX = img.x + box_qipan.x;
	                img.localY = img.y + box_qipan.y;
	                let localPos = CommonUnitis.localToGlobal(img);
	                tagQipan.kuangPoint = localPos;
	                let imgBian = new laya.ui.Image();
	                imgBian.name = "QipanBian" + index;
	                imgBian.skin = "lbx/pics/kuangLiang.png";
	                imgBian.visible = false;
	                box_bian.addChild(imgBian);
	                imgBian.pos(img.x - 14, img.y - 10);
	                img.FKindex = index;
	                index++;
	            }
	        }
	        box_qipan.tag = tagQipan;
	        for (let i = 0; i < box_qipan.numChildren; i++) {
	            let lbx = box_qipan.getChildAt(i);
	            let pos = new Point$2();
	            pos.x = lbx.x;
	            pos.y = lbx.y;
	            var point = lbx.localToGlobal(pos);
	        }
	    }
	}

	var Point$3 = Laya.Point;
	var Handler = laya.utils.Handler;
	class GameUI extends ui.GameSceneUI {
	    constructor() {
	        super();
	        this.drapPoint = new Point$3();
	        this.checkFrameList = [];
	        this.checkFKlist = [];
	        this.isCanDrap = false;
	        this.dragNodes = [];
	        Laya.MouseManager.multiTouchEnabled = false;
	    }
	    onEnable() {
	        this.lbxQipan = LbxQipan.Default;
	        this.lbxQipan.init(this.box_qipan, this.box_bian);
	        this.GameStart();
	    }
	    GameStart() {
	        this.lbl_history_score.text = localStorage.getItem("HistoryScore") || "0";
	        this.lbl_score.text = "0";
	        this.InitUI();
	    }
	    InitUI() {
	        this.scor.visible = false;
	        this.boxOver.visible = false;
	        this.box_drag.removeChildren();
	        for (let i = 0; i < this.lbxQipan.frameList.length; i++) {
	            this.lbxQipan.frameList[i].isHaveFK = false;
	        }
	        for (let i = 0; i < 3; i++) {
	            this.createLbxKuang(this["box" + i]);
	        }
	        this.checkIsLose();
	    }
	    newOneK(randomIndex) {
	        let img = new laya.ui.Image();
	        img.skin = "lbx/pics/color_" + randomIndex + ".png";
	        return img;
	    }
	    createLbxKuang(box, point = null) {
	        let qiPan = new Qipan();
	        var config = FKConfig.Default.getTheConfig();
	        var randomStyle = Math.floor(Math.random() * (config.length - 1));
	        var posList = config[randomStyle];
	        let randomIndex = Math.floor(Math.random() * 6 + 1);
	        var sumX = 0, countX = 0, sumY = 0, countY = 0;
	        if (point) {
	            box.x = point.x;
	            box.y = point.y;
	        }
	        box.removeChildren();
	        let node = new laya.ui.Box();
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
	            let kuaiPos = CommonUnitis.localToGlobal2(childKuai);
	            qiPan.kuangPoint = kuaiPos;
	        }
	        box.tag = qiPan;
	        return box;
	    }
	    checkIsLose() {
	        var count = 0;
	        for (var i = 0; i < 3; i++) {
	            var node = this["box" + i].getChildByName("node");
	            if (this.checkSelfIsLose(node)) {
	                count++;
	                node.alpha = .2;
	                this["box" + i].off(laya.events.Event.MOUSE_DOWN, this, this.onMouseDown);
	            }
	            else {
	                node.alpha = 1;
	                this["box" + i].once(laya.events.Event.MOUSE_DOWN, this, this.onMouseDown);
	            }
	        }
	        if (count == 3) {
	            Laya.timer.once(2000, this, this.sendSaveScore, []);
	        }
	    }
	    sendSaveScore(score) {
	        console.log(">>>>", this.lbl_score.text);
	    }
	    miniGameSaveScoreResult(data) {
	        if (data.resCode == 0) {
	            this.lbl_history_score.text = "" + data.maxScore;
	            this.txt_over.text = "你已经输了\n\n当前得分:" + this.lbl_score.text + "\n历史最高:" + data.maxScore;
	            this.boxOver.visible = true;
	            this.btn_restart.once(Laya.Event.CLICK, this, this.onClick, [true]);
	            this.btn_return.once(Laya.Event.CLICK, this, this.onClick, [false]);
	        }
	        else {
	        }
	    }
	    onClick(isRevive, event) {
	        if (isRevive) {
	        }
	        else {
	        }
	    }
	    miniGameChanceResult(data) {
	        if (data.resCode == 0) {
	            this.boxOver.visible = false;
	            this.InitUI();
	        }
	        else {
	            this.boxOver.visible = false;
	            this.box_drag.removeChildren();
	        }
	    }
	    getItemInfoResult() {
	    }
	    checkSelfIsLose(node) {
	        var canDropCount = 0;
	        var children = node._children;
	        for (var i = 0; i < this.lbxQipan.frameList.length; i++) {
	            var frameNode = this.lbxQipan.frameList[i];
	            var srcPos = new Point$3(frameNode.x, frameNode.y);
	            var count = 1;
	            if (!frameNode.isHaveFK) {
	                for (var j = 1; j < children.length; j++) {
	                    var len = 27;
	                    var childPos = new Point$3(srcPos.x + children[j].x, srcPos.y + children[j].y);
	                    for (var k = 0; k < this.lbxQipan.frameList.length; k++) {
	                        var tFrameNode = this.lbxQipan.frameList[k];
	                        var dis = childPos.distance(tFrameNode.x, tFrameNode.y);
	                        if (dis <= len && !tFrameNode.isHaveFK) {
	                            count++;
	                            break;
	                        }
	                    }
	                }
	                if (count == children.length) {
	                    canDropCount++;
	                }
	            }
	        }
	        if (canDropCount == 0) {
	            return true;
	        }
	        else {
	            return false;
	        }
	    }
	    addScore(XCCount, isDropAdd = false) {
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
	    getAddScoreCal(XCCount, isDropAdd = false) {
	        var x = XCCount + 1;
	        var addScoreCount = isDropAdd ? 1 : 2 * x;
	        return addScoreCount;
	    }
	    complete2(lbl, addScoreCount) {
	        this.lbl_score.text = (addScoreCount + Number(this.lbl_score.text)).toString();
	    }
	    scoreJump(lbl, XCCount, isDropAdd = false, isComplete = false) {
	        while (XCCount > 0 && isComplete) {
	            XCCount--;
	            isComplete = false;
	            var addScoreCount = this.getAddScoreCal(XCCount, isDropAdd);
	            this.lbl_score.text = (addScoreCount + Number(this.lbl_score.text)).toString();
	            Laya.timer.once(50, this, this.scoreJump, [this.lbl_score, XCCount, isDropAdd, true]);
	        }
	    }
	    onMouseDown(event) {
	        let box = event.target;
	        this.drapBox = box;
	        this.drapBox.once(laya.events.Event.DRAG_START, this, this.onDragStart);
	        this.drapBox.on(laya.events.Event.DRAG_MOVE, this, this.onDragMove);
	        this.drapBox.once(laya.events.Event.DRAG_END, this, this.onDragEnd);
	        this.drapBox.once(laya.events.Event.MOUSE_UP, this, this.onDragEnd);
	        box.scale(1, 1);
	        this.isCanDrap = true;
	        box.startDrag();
	    }
	    onDragStart(event) {
	        let box = this.drapBox;
	        this.drapPoint.x = box.x;
	        this.drapPoint.y = box.y;
	        this.curFKLen = this.drapBox.getChildByName("node").numChildren;
	    }
	    onDragMove(event) {
	        this.checkCollision();
	    }
	    onDragEnd(event) {
	        if (!this.isCanDrap)
	            return;
	        let node = this.drapBox.getChildByName("node");
	        let childs = node._children;
	        if (this.dragNodes.length == childs.length) {
	            let copyChilds = [];
	            for (let child of childs) {
	                copyChilds.push(child);
	            }
	            node.removeChildren();
	            for (let i = 0; i < this.dragNodes.length; i++) {
	                this.box_drag.addChild(copyChilds[i]);
	                copyChilds[i].name = "Drag" + this.dragNodes[i].FKindex;
	                copyChilds[i].x = this.dragNodes[i].x;
	                copyChilds[i].y = this.dragNodes[i].y;
	                this.box_bian.getChildByName("QipanBian" + this.dragNodes[i].FKindex).visible = false;
	                this.dragNodes[i].isHaveFK = true;
	            }
	            this.dragNodes = [];
	            this.createLbxKuang(this.drapBox, this.drapPoint);
	            this.checkXC();
	        }
	        else {
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
	    upscore(pulsNum) {
	        this.scor.alpha = 1;
	        this.scor.y = 340;
	        this.scor.scale(1, 1);
	        this.scor.text = "+" + pulsNum;
	        this.scor.visible = true;
	        laya.utils.Tween.to(this.scor, { y: 240, alpha: 0.4, scaleX: 1.2, scaleY: 1.2 }, 1000, null, Handler.create(this, () => {
	            this.scor.visible = false;
	        }));
	    }
	    checkXC() {
	        this.addScore(this.curFKLen, true);
	        this.upscore(this.curFKLen);
	        var haveFKIndexList = [];
	        for (var i = 0; i < this.lbxQipan.frameList.length; i++) {
	            if (this.lbxQipan.frameList[i].isHaveFK) {
	                haveFKIndexList.push(this.lbxQipan.frameList[i].FKindex);
	            }
	        }
	        haveFKIndexList.sort(function (a, b) { return a - b; });
	        let xcList = [];
	        var disList = FKConfig.Default.disList;
	        for (let i = 0; i < disList.length; i++) {
	            let oneXCList = disList[i];
	            var intersectAry = CommonUnitis.get2AryIntersect(haveFKIndexList, oneXCList);
	            if (intersectAry.length > 0) {
	                var isXC = CommonUnitis.check2AryIsEqual(oneXCList, intersectAry);
	                if (isXC) {
	                    xcList.push(oneXCList);
	                }
	            }
	        }
	        var actionArr = [];
	        var count = 0;
	        for (var i = 0; i < xcList.length; i++) {
	            for (let j = 0; j < xcList[i].length; j++) {
	                let imgDrag = this.box_drag.getChildByName("Drag" + xcList[i][j]);
	                let Kuang = this.box_qipan.getChildByName("QipanKuang" + xcList[i][j]);
	                Kuang.isHaveFK = false;
	                Laya.Tween.to(imgDrag, { scaleX: 1.5, scaleY: 1.5, alpha: 0.5, }, 1000, Laya.Ease.linearIn, Laya.Handler.create(this, this.complete, [imgDrag]), 100);
	                count++;
	            }
	        }
	        this.addScore(count);
	    }
	    complete(bian) {
	        bian.removeSelf();
	    }
	    checkCollision() {
	        for (let i = 0; i < this.lbxQipan.frameList.length; i++) {
	            this.box_bian.getChildByName("QipanBian" + i).visible = false;
	        }
	        let qiPan = this.box_qipan.tag;
	        this.dragNodes = [];
	        for (let posBox of this.drapBox.tag.kuangPoints) {
	            for (let posQipan of this.box_qipan.tag.kuangPoints) {
	                let posBox1 = new Point$3((this.drapBox.x + posBox.x), (this.drapBox.y + posBox.y));
	                if (posBox1.distance(posQipan.x, posQipan.y) <= 35) {
	                    let Kuang = this.box_qipan.getChildByName("QipanKuang" + this.box_qipan.tag.getIndex(posQipan));
	                    if (Kuang.isHaveFK) {
	                        this.dragNodes = [];
	                        return;
	                    }
	                    this.dragNodes.push(Kuang);
	                }
	            }
	            if (this.dragNodes.length <= 0) {
	                return;
	            }
	        }
	        if (this.dragNodes.length == this.drapBox.tag.kuangPoints.length) {
	            for (let node of this.dragNodes) {
	                this.box_bian.getChildByName("QipanBian" + node.FKindex).visible = true;
	            }
	        }
	    }
	    getDistance(p1, p2) {
	        var _x = Math.abs(p1.x - p2.x);
	        var _y = Math.abs(p1.y - p2.y);
	        return Math.sqrt(_x * _x + _y * _y);
	    }
	}

	class GameConfig {
	    constructor() {
	    }
	    static init() {
	        var reg = Laya.ClassUtils.regClass;
	        reg("script/GameUI.ts", GameUI);
	    }
	}
	GameConfig.width = 1280;
	GameConfig.height = 720;
	GameConfig.scaleMode = "showall";
	GameConfig.screenMode = "horizontal";
	GameConfig.alignV = "middle";
	GameConfig.alignH = "center";
	GameConfig.startScene = "GameScene.scene";
	GameConfig.sceneRoot = "";
	GameConfig.debug = false;
	GameConfig.stat = false;
	GameConfig.physicsDebug = false;
	GameConfig.exportSceneToJson = false;
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
	        if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
	            Laya.enableDebugPanel();
	        if (GameConfig.stat)
	            Laya.Stat.show();
	        Laya.alertGlobalError = true;
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
