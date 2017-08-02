### 项目特征：
- 支持Babel编译
- 支持less预处理器
- 支持mobx状态管理库
- 支持组件化开发
- 支持实时编译
- 支持图片、图标字体等资源的压缩编译

### 项目说明：

该项目是微信小程序的开发框架，支持ES6的写法以及修饰器语法糖，鉴于微信官方目前还没有对小程序实现组件化的支持（期待吧，这毕竟是趋势），所以这里支持了组件化开发，同时为该starter内部封装了[mobx](https://suprise.gitbooks.io/mobx-cn/content/fp.html)这个简单、高扩展的状态管理库以便于快速发开weapp应用，感兴趣的同学可以试试

### 预置命令
#### 开发
```
$ npm start
```

请使用微信开发工具或者egretWing新建项目根目录指向dist目录，进行调试开发

#### 发布
```
$ npm run build
```
提交小程序前，请进行build以便对项目进行压缩优化等操作


### 使用
pages目录为小程序页面目录，所有的页面都请放在该目录下面，例如Home页面
*pages/home/index.js*
```
import customPage from '../../utils/customPage'

@customPage()
class Home {
    onLoad() {
        console.log('Home-onLoad');
    }
}

Page(Home.instance);
```

#### 使用其他组件
*pages/home/index.js*
> 这里需要注意的是，含有js逻辑的组件必须在customPage的declarations参数中进行注册，例如下面的HomeNotice

```
import customPage from '../../utils/customPage'
import HomeNotice from '../../components/homeNotice/index'

@customPage({
    declarations: [HomeNotice]
})
class Home {
	constructor() {
        this.data={
			banner : {
				"id": "1",
				"img": "http://www.baidu.cm/logo.png"
			},
			news : [{
				"id": "1",
				"title": "春节放假公告"
			}],
			newsTip:'我是page页面定义的哦'
		}
    }
    onLoad() {
        console.log('Home-onLoad');
    }
}

Page(Home.instance);
```

*pages/home/index.html*
> 因为HomeNotice含有js逻辑代码，所以这里需要默认传入data="{{...HomeNotice}}"属性,HomeNotice为组件类名

```
<view class="container">
    <import src="../../components/homeBanner/index.wxml"/>
    <import src="../../components/homeNotice/index.wxml"/>

	<!--这里传入的数据只可再组件的html文件中使用，暂无法再组件的js逻辑中调用-->
    <template is="HomeBanner" data={{items:banner}}/>
    <template is="HomeNotice" data="{{...HomeNotice, items:news, tip:newsTip}}"/>
</view>
```

*components/homeNotice/index.js*
> 需要从Component进行继承

```
import Component from '../../utils/Component';

export default class HomeNotice extends Component {
    constructor() {
        super();
        this.data = {
            currentIndex: 1
        };
        this.events = {
            clickHandler: (ev)=> {
                console.log('组件的自定义事件')
            }
        };
    }

    onShow() {
        console.log('component onShow')
    }

    onHide() {
        console.log('component onHide')
    }
}
```

*components/homeNotice/index.html*
> 主要注意的是，&lt;template name="HomeNotice"&gt; 这里的name值必须和组件类名一致

```
<template name="HomeNotice">
    <view class="homeNotice">
        <view class="label" catchtap="clickHandler">商城公告</view>
        <view class="items">
            <block wx:for="{{items}}" wx:for-index="i" wx:key="item.productId">
                <navigator class="link {{currentIndex==i?'active':''}}" url="../product/index?title=navigate"
                           hover-class="navigator-hover">
                    {{item.documentTitle}}-{{tip}}
                </navigator>
            </block>
        </view>
    </view>
</template>
```


#### 使用mobx状态管理库
*pages/home/index.js*
> 同理组件如果使用mobx也和下面的方法一样，这里就不一一列举了

```
...
import observer from '../../utils/observer'

@observer({
    banner: homeStore.banner,
    news: homeStore.news
})
@customPage({
    declarations: [HomeNotice]
})
class Home {
	constructor() {
        this.data={}; //就不需要再定义observer中的初始数据了
    }
	onLoad() {
        ...
		console.log(this.store.banner); //可以通过this.store访问observer中定义的对象
    }
	...
}
...
```

*pages/home/index.html*
```
<view class="container">
    ...
	<!--html中可以直接访问observer中定义的对象-->
    <template is="HomeBanner" data={{items:banner}}/>
    ...
</view>
```

*store/HomeStore.js*

```
import {observable, autorun, action} from "../utils/mobx.umd.min";

class HomeStore {
    @observable banner;
    @observable news;
    constructor(content) {
        this.banner = {
			"id": "1",
			"img": "http://www.baidu.cm/logo.png"
		};
        this.news = [{
			"id": "1",
			"title": "春节放假公告"
		}];
    }
    @action
    addNews() {
        this.banner.push({
			"id": "2",
			"title": "春节放假公告22"
		})
    }
}

const homeStore = new HomeStore();
export default homeStore;
```


具体的效果如下，感兴趣的同学可以copy下该项目，自己跑一下

![](app/assets/images/weapp-starter-preview.jpg)