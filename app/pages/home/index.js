import HomeNotice from '../../components/homeNotice/index'
import customPage from '../../utils/customPage'
import observer from '../../utils/observer'
import homeStore from '../../store/HomeStore'

@observer
@customPage({
    declarations: [HomeNotice]
})
class Home {
    render() {
        this.setData({
            banner: homeStore.banner,
            newProduct: homeStore.newProduct,
            icon: homeStore.icon,
            special: homeStore.special
        })
    }

    constructor() {
        this.data = {
            newTip: '我是page传过来的哦'
        }
    }

    onLoad() {
        console.log('Home-onLoad1');
    }
}