import HomeNotice from '../../components/homeNotice/index'
import customPage from '../../utils/customPage'
import observer from '../../utils/observer'
import homeStore from '../../store/HomeStore'

@observer({
    banner: homeStore.banner,
    newProduct: homeStore.newProduct,
    icon: homeStore.icon,
    special: homeStore.special
})
@customPage({
    declarations: [HomeNotice]
})
class Home {
    constructor() {
        this.data = {
            newTip: '我是page传过来的哦'
        }
    }

    onLoad() {
        console.log('Home-onLoad1');
    }
}

Page(Home.instance);