import Point = laya.maths.Point;
import { QipanKuang, Qipan } from "./QipanKuang";
import { FKConfig } from "./FKConfig";
import { CommonUnitis } from "./CommonUnitis";

export class LbxQipan {
    private liubianxingH = 28;		//六边形宽的一半
    private liubianxingA = 32.5;	//六边形高的一半

    private posList: any[];
    private _frameList: QipanKuang[] = [];	//保存生成的图片节点
    public get frameList(): QipanKuang[] { return this._frameList }

    private box_qipan: laya.ui.Box;
    private box_bian: laya.ui.Box;


    private static _default: LbxQipan;
    public static get Default(): LbxQipan {
        if (this._default == null)
            this._default = new LbxQipan();
        return this._default;
    }

    private constructor() {
        this.posList = FKConfig.Default.posList;
    }

    public init(box_qipan: laya.ui.Box, box_bian: laya.ui.Box) {
        this.box_qipan = box_qipan; this.box_bian = box_bian;
        //生成棋盘
        // box_qipan.removeChildren();
        if (box_qipan.numChildren > 60) return;
        let tagQipan: Qipan = new Qipan();
        for (let i = 0, index = 0; i < this.posList.length; i++) {
            let count: number = this.posList[i].count;
            let pos: Point = this.posList[i].srcPos;
            for (let j = 0; j < count; j++) {
                let img: QipanKuang = new QipanKuang();
                img.name = "QipanKuang" + index;
                box_qipan.addChild(img);
                this._frameList.push(img);
                img.x = pos.x - (j * this.liubianxingH);
                img.y = pos.y + (j * this.liubianxingA * 1.5);
                img.localX = img.x + box_qipan.x;
                img.localY = img.y + box_qipan.y;
                let localPos: Point = CommonUnitis.localToGlobal(img);
                tagQipan.kuangPoint = localPos;

                let imgBian: laya.ui.Image = new laya.ui.Image();
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
            let lbx: QipanKuang = box_qipan.getChildAt(i) as QipanKuang;
            let pos: Point = new Point();
            pos.x = lbx.x;
            pos.y = lbx.y;
            var point: Point = lbx.localToGlobal(pos);
            // //console.log(">>>", lbx.name, lbx.x, lbx.y, " 绝对坐标=>", lbx.localX, lbx.localY);
        }
    }	//end init method



}