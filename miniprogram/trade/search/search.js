const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
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
    gridCol: 4,
    skin: false
  },
  goto_Search: function (e) {
    // 当点击 搜索 的时候，触发这个事件
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '/pages/Search/Search',
      success: function (res) {
        console.log(res);
      },

      fail: function () {
        //页面跳转失败!
      },
      complete: function () {
        //页面跳转成功!
      }
    })
  },
  goto_goods1: function (e) {
    // 当点击 搜索 的时候，触发这个事件
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '/pages/Search/Search',
      success: function (res) {
        console.log(res);
      },

      fail: function () {
        //页面跳转失败!
      },
      complete: function () {
        //页面跳转成功!
      }
    })
  },
  goto_goods7: function (e) {
    // 当点击 搜索 的时候，触发这个事件
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '/pages/Search/Search',
      success: function (res) {
        console.log(res);
      },

      fail: function () {
        //页面跳转失败!
      },
      complete: function () {
        //页面跳转成功!
      }
    })
  },
  goto_goods6: function (e) {
    // 当点击 搜索 的时候，触发这个事件
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '/pages/Search/Search',
      success: function (res) {
        console.log(res);
      },

      fail: function () {
        //页面跳转失败!
      },
      complete: function () {
        //页面跳转成功!
      }
    })
  },
  goto_goods2: function (e) {
    // 当点击 搜索 的时候，触发这个事件
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '/pages/Search/Search',
      success: function (res) {
        console.log(res);
      },

      fail: function () {
        //页面跳转失败!
      },
      complete: function () {
        //页面跳转成功!
      }
    })
  },
  goto_goods3: function (e) {
    // 当点击 搜索 的时候，触发这个事件
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '/pages/Search/Search',
      success: function (res) {
        console.log(res);
      },

      fail: function () {
        //页面跳转失败!
      },
      complete: function () {
        //页面跳转成功!
      }
    })
  },
  goto_goods4: function (e) {
    // 当点击 搜索 的时候，触发这个事件
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '/pages/Search/Search',
      success: function (res) {
        console.log(res);
      },

      fail: function () {
        //页面跳转失败!
      },
      complete: function () {
        //页面跳转成功!
      }
    })
  },
  goto_goods5: function (e) {
    // 当点击 搜索 的时候，触发这个事件
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '/pages/Search/Search',
      success: function (res) {
        console.log(res);
      },

      fail: function () {
        //页面跳转失败!
      },
      complete: function () {
        //页面跳转成功!
      }
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
  gridchange: function (e) {
    this.setData({
      gridCol: e.detail.value
    });
  },
  gridswitch: function (e) {
    this.setData({
      gridBorder: e.detail.value
    });
  },
  menuBorder: function (e) {
    this.setData({
      menuBorder: e.detail.value
    });
  },
  menuArrow: function (e) {
    this.setData({
      menuArrow: e.detail.value
    });
  },
  menuCard: function (e) {
    this.setData({
      menuCard: e.detail.value
    });
  },
  switchSex: function (e) {
    this.setData({
      skin: e.detail.value
    });
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
})