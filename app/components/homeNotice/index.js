import Component from '../../utils/Component';
import homeStore from '../../store/HomeStore';
import observer from "../../utils/observer";

@observer
export default class HomeNotice extends Component {
    render() {
        this.setData({
            list: homeStore.news
        })
    }

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
        if (homeStore.news && homeStore.news.length > 1) {
            this.timer = setInterval(()=> {
                let index = this.data.currentIndex + 1;
                if (index >= homeStore.news.length) {
                    index = 0;
                }
                this.setData({
                    currentIndex: index
                });
            }, this.delay);
        }
    }

    onHide() {
        if (homeStore.news && homeStore.news.length > 1) {
            clearInterval(this.timer);
        }
    }
}