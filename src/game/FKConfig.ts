import Point = laya.maths.Point;

export class FKConfig {

    private liubianxingH = 28;
    private liubianxingA = 32.5;

    private a = 28;
    private h = 32;

    private static _default: FKConfig;
    public static get Default(): FKConfig {
        if (this._default == null)
            return new FKConfig();
        return this._default;
    }

    public getTheConfig(): any[] {

        var a = 32.5;
        var h = 28;
        var configLists = [
            //一个
            [new Point(0, 0)],
            //两个
            [new Point(0, 0), new Point(h * 2, 0)], //横摆
            [new Point(0, 0), new Point(h, a * 1.5)], //斜摆1
            [new Point(0, 0), new Point(h, -a * 1.5)], //斜摆2
            //三个
            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 4, 0)], //横摆

            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, a * 1.5)], //横摆1
            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, -a * 1.5)], //横摆2
            [new Point(0, 0), new Point(h * 2, 0), new Point(h, a * 1.5)], //堆1
            [new Point(0, 0), new Point(h * 2, 0), new Point(h, -a * 1.5)], //堆2

            [new Point(0, 0), new Point(h, a * 1.5), new Point(h * 3, a * 1.5)], //斜摆1
            [new Point(0, 0), new Point(h, a * 1.5), new Point(h * 2, a * 3)], //斜摆2
            [new Point(0, 0), new Point(h, a * 1.5), new Point(0, a * 3)], //斜摆3

            [new Point(0, 0), new Point(h, -a * 1.5), new Point(h * 3, -a * 1.5)], //斜下摆1
            [new Point(0, 0), new Point(h, -a * 1.5), new Point(h * 2, -a * 3)], //斜下摆2
            [new Point(0, 0), new Point(h, -a * 1.5), new Point(0, -a * 3)], //斜下摆3
            //四个
            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 4, 0), new Point(h * 6, 0)], //横摆1
            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 4, 0), new Point(h * 5, a * 1.5)], //横摆2
            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 4, 0), new Point(h * 5, -a * 1.5)], //横摆3
            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 4, 0), new Point(h * 3, a * 1.5)], //横摆4
            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 4, 0), new Point(h * 3, -a * 1.5)], //横摆5

            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, a * 1.5), new Point(h, a * 1.5)], //斜上摆1
            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, a * 1.5), new Point(h * 2, a * 3)], //斜上摆2
            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, a * 1.5), new Point(h * 4, a * 3)], //斜上摆3
            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, a * 1.5), new Point(h * 5, a * 1.5)], //斜上摆4

            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, -a * 1.5), new Point(h, -a * 1.5)], //斜下摆1
            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, -a * 1.5), new Point(h * 2, -a * 3)], //斜下摆2
            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, -a * 1.5), new Point(h * 4, -a * 3)], //斜下摆3
            [new Point(0, 0), new Point(h * 2, 0), new Point(h * 3, -a * 1.5), new Point(h * 5, -a * 1.5)], //斜下摆4

            [new Point(0, 0), new Point(h * 2, 0), new Point(h, -a * 1.5), new Point(-h, -a * 1.5)], //下堆1
            [new Point(0, 0), new Point(h * 2, 0), new Point(h, -a * 1.5), new Point(0, -a * 3)], //下堆2
            [new Point(0, 0), new Point(h * 2, 0), new Point(h, -a * 1.5), new Point(h * 2, -a * 3)], //下堆3

            [new Point(0, 0), new Point(h, -a * 1.5), new Point(h * 2, -a * 3), new Point(h * 3, -a * 4.5)], //斜扛1
            [new Point(0, 0), new Point(-h, -a * 1.5), new Point(-h * 2, -a * 3), new Point(-h * 3, -a * 4.5)], //斜扛2

        ]

        return configLists
    }

    //位置表
    private _posList = [
        {//第一行的位置信息
            count: 5,
            srcPos: new laya.maths.Point(0, 0)
        },
        {//第二行的位置信息
            count: 6,
            srcPos: new Point(2 * this["liubianxingH"], 0)   //56 , 0
        },
        {//第三行的位置信息
            count: 7,
            srcPos: new Point(2 * this["liubianxingH"] * 2, 0) //112,0
        },
        {//第四行的位置信息
            count: 8,
            srcPos: new Point(2 * this["liubianxingH"] * 3, 0) //168,0
        },
        {//第五行的位置信息
            count: 9,
            srcPos: new Point(2 * this["liubianxingH"] * 4, 0)//224,0
        },
        {//第六行的位置信息
            count: 8, //252,-48.75
            srcPos: new Point(2 * this["liubianxingH"] * 4 + this["liubianxingH"], (3 * this["liubianxingA"]) / 2)
        },
        {//第七行的位置信息
            count: 7, //280,-97.5
            srcPos: new Point(2 * this["liubianxingH"] * 4 + this["liubianxingH"] * 2, (3 * this["liubianxingA"] * 2) / 2)
        },
        {//第八行的位置信息
            count: 6, //308,-146.25
            srcPos: new Point(2 * this["liubianxingH"] * 4 + this["liubianxingH"] * 3, (3 * this["liubianxingA"] * 3) / 2)
        },
        {//第九行的位置信息
            count: 5, //336,-195
            srcPos: new Point(2 * this["liubianxingH"] * 4 + this["liubianxingH"] * 4, (3 * this["liubianxingA"] * 4) / 2)
        },
    ];

    public get posList(): any[] {
        return this._posList;
    }

    //满足消除的条件
    public get disList(): number[][] {
        return [
            //一个方向
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15, 16, 17],
            [18, 19, 20, 21, 22, 23, 24, 25],
            [26, 27, 28, 29, 30, 31, 32, 33, 34],
            [35, 36, 37, 38, 39, 40, 41, 42],
            [43, 44, 45, 46, 47, 48, 49],
            [50, 51, 52, 53, 54, 55],
            [56, 57, 58, 59, 60],

            //另一个方向
            [26, 35, 43, 50, 56],
            [18, 27, 36, 44, 51, 57],
            [11, 19, 28, 37, 45, 52, 58],
            [5, 12, 20, 29, 38, 46, 53, 59],
            [0, 6, 13, 21, 30, 39, 47, 54, 60],
            [1, 7, 14, 22, 31, 40, 48, 55],
            [2, 8, 15, 23, 32, 41, 49],
            [3, 9, 16, 24, 33, 42],
            [4, 10, 17, 25, 34],

            //横向
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
    //定义可以被消除的数组


    private constructor() {

    }

}