import deepAssign from '../utils/deep-assign';

export default class Component {
    constructor() {
        let pages = getCurrentPages();
        this.name = this.constructor.name;
        this.currentPage = pages[pages.length - 1];
    }

    set data(obj) {
        this._data = obj;
        this.setData({})
    }

    get data() {
        return this._data;
    }

    set events(obj) {
        let newEvents = {};
        for (let key in obj) {
            newEvents[`${this.name}_${key}`] = obj[key];
        }
        Object.assign(this.currentPage, newEvents);
    }

    setData(obj) {
        this.currentPage.setData({
            [this.name]: deepAssign({}, this._data || {}, obj)
        });
        this._data = this.currentPage.data[this.name];
    }
}