import Component from '../Component';
import homeStore from '../../store/HomeStore';
import {observable, autorun} from "../../store/mobx.umd.min";
import observer from "../../decorator/observer";

setTimeout(()=> {
    homeStore.todos[0].completed = false;
    homeStore.todos[2] = {title: "睡午觉", completed: false};
}, 2000);

export default class HomeNotice extends Component {
    data = {
        items: ['要放假了，呜哈哈', '放啥假，回来工作，好好工作~'],
        currentIndex: 0
    };

    events = {
        aa: (ev)=> {
            console.log(ev);
        },
        bb: ()=> {
            console.log('bb');
        }
    };

    constructor() {
        super();
        this.render();

        this.timer = null;
        this.delay = 3000;
    }

    onShow() {
        if (this.data.items && this.data.items.length > 1) {
            this.timer = setInterval(()=> {
                let index = this.data.currentIndex + 1;
                if (index >= this.data.items.length) {
                    index = 0;
                }
                this.setData({
                    currentIndex: index
                });
            }, this.delay);
        }
    }

    onHide() {
        if (this.data.items && this.data.items.length > 1) {
            clearInterval(this.timer);
        }
    }
}