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

  goto_goods1: function (e) {
    var app = getApp();
    var id = app.globalData.user_openid;
    if(id!=""){
      console.log("已经获取到OPENID，允许发布")
      wx.navigateTo({        //跳转到发布
        url: '/public/describe/describe',
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
    }
    else{
      wx.showToast({
        title: '请您先授权！',
        icon:"none"
      })
    }
    
  },
  goto_goods7: function (e) {
    var app = getApp();
    var id = app.globalData.user_openid;
    
    if (id != "") {
      console.log("已经获取到OPENID，允许发布")
      wx.navigateTo({        //跳转到发布
        url: '/public/describe/describe',
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
    }
    else {
      wx.showToast({
        title: '请您先授权！',
        icon: "none"
      })
    }
  },
  goto_goods6: function (e) {
    var app = getApp();
    var id = app.globalData.user_openid;
    if (id != "") {
      console.log("已经获取到OPENID，允许发布")
      wx.navigateTo({        //跳转到发布
        url: '/public/describe/describe',
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
    }
    else {
      wx.showToast({
        title: '请您先授权！',
        icon: "none"
      })
    }
  },
  goto_goods2: function (e) {
    var app = getApp();
    var id = app.globalData.user_openid;
    if (id != "") {
      console.log("已经获取到OPENID，允许发布")
      wx.navigateTo({        //跳转到发布
        url: '/public/describe/describe',
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
    }
    else {
      wx.showToast({
        title: '请您先授权！',
        icon: "none"
      })
    }
  },
  goto_goods3: function (e) {
    var app = getApp();
    var id = app.globalData.user_openid;
    if (id != "") {
      console.log("已经获取到OPENID，允许发布")
      wx.navigateTo({        //跳转到发布
        url: '/public/describe/describe',
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
    }
    else {
      wx.showToast({
        title: '请您先授权！',
        icon: "none"
      })
    }
  },
  goto_goods4: function (e) {
    var app = getApp();
    var id = app.globalData.user_openid;
    if (id != "") {
      console.log("已经获取到OPENID，允许发布")
      wx.navigateTo({        //跳转到发布
        url: '/public/describe/describe',
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
    }
    else {
      wx.showToast({
        title: '请您先授权！',
        icon: "none"
      })
    }
  },
  goto_goods5: function (e) {
    var app = getApp();
    var id = app.globalData.user_openid;
    if (id != "") {
      console.log("已经获取到OPENID，允许发布")
      wx.navigateTo({        //跳转到发布
        url: '/public/describe/describe',
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
    }
    else {
      wx.showToast({
        title: '请您先授权！',
        icon: "none"
      })
    }
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
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },

  onLoad:function(options){
    
    wx.getSetting({     /*查看用户是否已经授权登录 */
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              console.log(res.userInfo)
              getApp().globalData.user_info = res.userInfo;
              getApp().globalData.user_name = userInfo.nickName;
              getApp().globalData.user_ava = userInfo.avatarUrl;

            }
          })
          wx.login({
            //获取code
            success: function (res) {
              var code = res.code; //返回code
              var appId = '...';
              var secret = '...';
              if (code) {
                wx.request({
                  url: 'http://www.zzumarket.com/getopenid.php',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名
                  data: {
                    code: code,
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    getApp().globalData.user_openid = res.data;
                  }
                })
              }
              else {
                console.log("获取用户登录态失败！");
              }
              var app = getApp();
              var openid = app.globalData.user_openid;
              console.log("用户的openid是", app.globalData.user_openid)
              /*console.log("用户的昵称是", getApp().globalData.user_info.nickName)
              console.log("用户的头像是", getApp().globalData.user_info.avatarUrl)*/

            }
          })

        }
      }
    })
  },
  onShow:function(){
    
    
    
  }
})