//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    iconList: [{
      icon: 'camera',
      color: 'red',
      badge: 120,
      name: '电子产品'
    }, {
      icon: 'evaluate',
      color: 'orange',
      badge: 1,
      name: '美妆护肤'
    }, {
      icon: 'clothes',
      color: 'yellow',
      badge: 0,
      name: '服饰'
    }, {
      icon: 'read',
      color: 'olive',
      badge: 22,
      name: '文具图书'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '美食'
    }, {
      icon: 'goods',
      color: 'blue',
      badge: 0,
      name: '暂时未知'
    }, {
      icon: 'more',
      color: 'purple',
      badge: 0,
      name: '其他'
    }],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})
