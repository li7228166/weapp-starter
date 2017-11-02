/**
 * Created by Administrator on 2017/3/29.
 */
import {autorun} from "../utils/mobx.umd.min";
export default function observer(TargetClass) {
    let Target = null;
    if (typeof TargetClass === 'function') {
        Target = TargetClass.prototype;
    } else if (typeof TargetClass === 'object') {
        Target = TargetClass;
    }

    let autorunFn = null;
    const onLoad = Target.onLoad;
    const onUnload = Target.onUnload;
    Target.onLoad = function () {
        onLoad && onLoad.call(this, ...arguments);
        autorunFn = Target.render && autorun(()=> {
                Target.render.call(this);
                console.info(`${TargetClass.name} render`);
            });
    };
    Target.onUnload = function () {
        autorunFn && autorunFn();
        onUnload && onUnload.call(this, ...arguments);
    };
}