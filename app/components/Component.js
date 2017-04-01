import deepAssign from '../utils/deep-assign';

export default class Component {
    constructor() {
        let pages = getCurrentPages();
        this.name = this.constructor.name;
        this.currentPage = pages[pages.length - 1];
    }

    render() {
        //合并data
        this.currentPage.setData({
            [this.name]: this.data
        });
        this.data = this.currentPage.data[this.name];

        //附加events
        let newEvents = {};
        for (let key in this.events) {
            newEvents[`${this.name}_${key}`] = this.events[key];
        }
        Object.assign(this.currentPage, newEvents);
    }

    setData(obj) {
        this.currentPage.setData({
            [this.name]: deepAssign({}, this.data, obj)
        });
        this.data = this.currentPage.data[this.name];
    }
}