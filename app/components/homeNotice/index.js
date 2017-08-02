import Component from '../../utils/Component';
import homeStore from '../../store/HomeStore';
import observer from "../../utils/observer";

@observer({
    list: homeStore.news
})
export default class HomeNotice extends Component {
    constructor() {
        super();
        this.data = {
            currentIndex: 1
        };
        this.events = {
            clickHandler: (ev)=> {
                homeStore.news.push({
                    "documentId": "9045c76b8fe2442986320d32e9fcc9d0",
                    "documentTitle": "春节放假公告111111111"
                })
            }
        };
        this.timer = null;
        this.delay = 3000;
    }

    onShow() {
        if (this.store.list && this.store.list.length > 1) {
            this.timer = setInterval(()=> {
                let index = this.data.currentIndex + 1;
                if (index >= this.store.list.length) {
                    index = 0;
                }
                this.setData({
                    currentIndex: index
                });
            }, this.delay);
        }
    }

    onHide() {
        if (this.store.list && this.store.list.length > 1) {
            clearInterval(this.timer);
        }
    }
}