export default function CustomPage(opt) {
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
            onLoad && onLoad();
        };

        TargetClass.prototype.onShow = function () {
            components.map(item=> {
                item.onShow && item.onShow();
            });
            onShow && onShow();
        };

        TargetClass.prototype.onReady = function () {
            components.map(item=> {
                item.onReady && item.onReady();
            });
            onReady && onReady();
        };

        TargetClass.prototype.onHide = function () {
            components.map(item=> {
                item.onHide && item.onHide();
            });
            onHide && onHide();
        };

        TargetClass.prototype.onUnload = function () {
            components.map(item=> {
                item.onUnload && item.onUnload();
            });
            onUnload && onUnload();
        };

        const target = new TargetClass();
        opt.declarations.map(item=> {
            target.data[item.name] = {};
        });
        TargetClass.instance = target;
    }
}