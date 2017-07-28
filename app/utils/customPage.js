export default function customPage(opt) {
    return function (TargetClass) {

        const onLoad = TargetClass.prototype.onLoad;
        const onShow = TargetClass.prototype.onShow;
        const onReady = TargetClass.prototype.onReady;
        const onHide = TargetClass.prototype.onHide;
        const onUnload = TargetClass.prototype.onUnload;
        let components = [];

        TargetClass.prototype.onLoad = function () {
            components = opt.declarations.map(Item=> {
                const item = new Item();
                item.onLoad && item.onLoad();
                return item;
            });
            onLoad && onLoad.call(this, ...arguments);
        };

        TargetClass.prototype.onShow = function () {
            components.map(item=> {
                item.onShow && item.onShow();
            });
            onShow && onShow.call(this, ...arguments);
        };

        TargetClass.prototype.onReady = function () {
            components.map(item=> {
                item.onReady && item.onReady();
            });
            onReady && onReady.call(this, ...arguments);
        };

        TargetClass.prototype.onHide = function () {
            components.map(item=> {
                item.onHide && item.onHide();
            });
            onHide && onHide.call(this, ...arguments);
        };

        TargetClass.prototype.onUnload = function () {
            components.map(item=> {
                item.onUnload && item.onUnload();
            });
            onUnload && onUnload.call(this, ...arguments);
        };

        const target = new TargetClass();
        if (!target.data) {
            target.data = {};
        }
        opt.declarations.map(item=> {
            target.data[item.name] = {};
        });
        TargetClass.instance = target;

        return TargetClass
    }
}