/**
 * Created by Administrator on 2017/3/29.
 */
import {
    observable,
    autorun,
    isObservable,
    isObservableArray,
    isObservableObject,
    isObservableMap,
    isObservableValue,
    toJS
} from "../utils/mobx.umd.min";

export default function observer(store) {
    return function wrapper(TargetClass) {
        const onLoad = TargetClass.prototype.onLoad;
        const onUnload = TargetClass.prototype.onUnload;

        TargetClass.prototype.store = {};
        TargetClass.prototype.onLoad = function () {
            this.autorun = autorun(()=> {
                if (store) {
                    console.warn('render');
                    var obj = {};
                    for (var key in store) {
                        obj[key] = toJS(store[key]);
                    }
                    this.store = obj;
                    this.setData(this.state);
                }
            });
            onLoad && onLoad.call(this, ...arguments);
        };

        TargetClass.prototype.onUnload = function () {
            this.autorun();
            onUnload && onUnload.call(this, ...arguments);
        };

        return TargetClass
    }
}