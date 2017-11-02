export default function customPage(opt = {}) {
    opt.declarations = opt.declarations || [];
    return function (TargetClass) {
        const filterFnNames = ['constructor', 'onLoad', 'onShow', 'onReady', 'onHide', 'onUnload'];
        const names = Object.getOwnPropertyNames(TargetClass.prototype);
        let components = [];
        let target = new TargetClass();

        //构建基础object
        let page = {
            data: target.data || {},
            onLoad: function () {
                components = opt.declarations.map(Item=> {
                    const item = new Item();
                    item.onLoad && item.onLoad(...arguments);
                    return item;
                });
                target.onLoad && target.onLoad.call(this, ...arguments);
            },
            onShow: function () {
                components.map(item=> {
                    item.onShow && item.onShow(...arguments);
                });
                target.onShow && target.onShow.call(this, ...arguments);
            },
            onReady: function () {
                components.map(item=> {
                    item.onReady && item.onReady(...arguments);
                });
                target.onReady && target.onReady.call(this, ...arguments);
            },
            onHide: function () {
                components.map(item=> {
                    item.onHide && item.onHide(...arguments);
                });
                target.onHide && target.onHide.call(this, ...arguments);
            },
            onUnload: function () {
                components.map(item=> {
                    item.onUnload && item.onUnload(...arguments);
                });
                target.onUnload && target.onUnload.call(this, ...arguments);
            }
        };

        //合并组件data
        opt.declarations.map(item=> {
            page.data[item.name] = {};
        });

        //合并原型链上的方法
        for (let key in names) {
            if (filterFnNames.indexOf(names[key]) > -1 || page[names[key]]) {
                continue;
            }
            page[names[key]] = function () {
                TargetClass.prototype[names[key]].call(this, ...arguments)
            }
        }

        Page(page);
    }
}