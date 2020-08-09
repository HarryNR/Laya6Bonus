
import Point = laya.maths.Point;

export class QipanKuang extends laya.ui.Image {

    /**
     * 六边形的唯一标识 从0-59
     */
    private _FKindex: number;
    public set FKindex(value: number) { this._FKindex = value; }
    public get FKindex(): number { return this._FKindex; }

    /**
     * 表示这个方块是否已经发在棋盘上了
     */
    private _isHaveFK: boolean;
    public set isHaveFK(value: boolean) { this._isHaveFK = value; }
    public get isHaveFK(): boolean { return this._isHaveFK; }

    /**
     * 绝对坐标 X轴
     */
    private _localX: number;
    public set localX(value: number) { this._localX = value; }
    public get localX(): number { return this._localX; }

    /**
     * 绝对坐标 Y轴
     */
    private _localY: number;
    public set localY(value: number) { this._localY = value; }
    public get localY(): number { return this._localY; }

    constructor() {
        super();
        this.skin = "lbx/pics/kuang.png";
        this.alpha = 1;
    }
}

export class BianKuang extends laya.ui.Image {

    constructor() {
        super();
        this.skin = "lbx/pics/kuangLiang.png";
    }
}

export class Qipan {
    /**
     * 棋盘内置快坐标数组
     * 坐标为舞台的绝对坐标值
     */
    private _kuangPoints: Point[];
    public set kuangPoint(point: Point) {
        if (!this._kuangPoints) this._kuangPoints = [];
        this._kuangPoints.push(point);
    }
    public get kuangPoints(): Point[] {
        return this._kuangPoints;
    }

    public getIndex(point: Point): number {
        return this._kuangPoints.indexOf(point);
    }

    public getPoint(index: number): Point {
        return this._kuangPoints[index];
    }

    constructor() {
    }
}