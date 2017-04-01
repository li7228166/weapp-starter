App({
    /**
     * 当小程序初始化完成以后会触发，且只触发一次
     */
    onLaunch () {
        console.log(' ========== onLaunch ========== ')
    },
    /**
     * 当小程序从前台进入后台时会触发
     */
    onShow () {
        console.log(' ========== onShow ========== ')
    },
    /**
     * 当小程序从前台进入后台时会触发
     */
    onHide () {
        console.log(' ========== onHide ========== ')
    }
});
