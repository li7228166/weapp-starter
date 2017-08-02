import homeStore from '../../store/HomeStore'


Page({
    data: {},
    aaa: function () {
        console.log(123);
        homeStore.addBanner()
    },
    onLoad: function () {

    }
});
