

import Point = laya.maths.Point;
import Component = laya.ui.UIComponent;
import { ui } from "./../ui/layaMaxUI";

export class CommonUnitis {


    public static localToGlobal(obj: Component): Point {
        //递归判断
        return this.CalcLocalPoint(obj, new Point());
    }

    private static CalcLocalPoint(obj: Component, point: Point): Point {

        if (obj.parent) {
            point.x = point.x + obj.x;
            point.y = point.y + obj.y;
            let comp: Component = obj.parent as Component;
            this.CalcLocalPoint(comp, point);
        }
        return point;
    }

    public static localToGlobal2(obj: Component): Point {
        return this.CalcLocalPoint2(obj, new Point());
        // let point: Point = new Point();
        // let comp: Component = obj.parent as Component;
        // if (comp) {
        // 	point.x = point.x + obj.x;
        // 	point.y = point.y + obj.y;
        // 	this.CalcLocalPoint2(comp, point);
        // } else {
        // 	return point;
        // }

    }

    private static CalcLocalPoint2(obj: Component, point: Point): Point {
        // console.log(">>>",obj.parent);
        if (!(obj.parent instanceof ui.GameSceneUI)) {
            point.x = point.x + obj.x;
            point.y = point.y + obj.y;
            let comp: Component = obj.parent as Component;
            this.CalcLocalPoint2(comp, point);
        }
        return point;
    }

    public static get2AryIntersect(ary1: number[], ary2: number[]): number[] {
        var intersectAry = []
        for (var i = 0; i < ary1.length; i++) {
            for (var j = 0; j < ary2.length; j++) {
                if (ary2[j] == ary1[i]) {
                    intersectAry.push(ary2[j])
                }
            }
        }

        return intersectAry
    }

    public static check2AryIsEqual(ary1: number[], ary2: number[]) {
        for (var i = 0; i < ary1.length; i++) {
            if (ary2[i] != ary1[i]) {
                return false
            }
        }
        return true
    }

    constructor() {

    }
}