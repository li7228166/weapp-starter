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
    onLoad() {
        console.log('Home-onLoad');
    }
}

Page(Home.instance);