//app.js
App({

  globalData:{
      goods_id:"",   //用来获取这个商品的编号呢 
      user_openid:"",
      user_info:{},
      user_name:"",
      user_ava:"",
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
  }
})
