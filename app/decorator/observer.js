/**
 * Created by Administrator on 2017/3/29.
 */
import {observable, autorun} from "../store/mobx.umd.min";
export default function observer() {
    return function (TargetClass) {
        let instance;
        autorun(() => {
            instance = new TargetClass();
            TargetClass.instance = instance;
            console.log(111);
        });
        return instance;
    }
}