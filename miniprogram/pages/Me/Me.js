// pages/Me/Me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:'',
    windowWidth: '',
    starCount: '1.6k',
    forksCount: 108,
    visitTotal: "2.4k",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      
      success: function (res) {
        console.log(res);
        // 屏幕宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        that.setData({
          windowHeight:  res.windowHeight,

          windowWidth:  res.windowWidth

        })
      }
    })


    

    
    
  },
  ocr:function(e){
    wx.navigateTo({        //
      url: '/myinformation/mywallet/mywallet',
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
  goto_fun1: function (e) {
    // 当点击 我的钱包 的时候，触发这个事件
    wx.navigateTo({        //
      url: '/myinformation/mywallet/mywallet',
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
  goto_fun2: function (e) {
    // 当点击 我的积分 的时候，触发这个事件
    wx.navigateTo({        //
      url: '/myinformation/myintegral/myintegral',
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
  goto_fun3: function (e) {
    // 当点击 我的收藏 的时候，触发这个事件
    wx.navigateTo({        //
      url: '/myinformation/mycollect/mycollect',
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goto_Set: function (e) {
    // 当点击 设置 的时候，触发这个事件
    wx.navigateTo({        //跳转到设置界面
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
  goto_Myhelp1: function (e) {
    // 当点击 我的发布 的时候，触发这个事件
    wx.navigateTo({        //跳转到发布界面
      url: '/myinformation/mypublic/mypublic',
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
  goto_Myhelp2: function (e) {
    // 当点击 订单 的时候，触发这个事件
    wx.navigateTo({        //跳转到订单界面
      url: '/myinformation/myorder/myorder',
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
  goto_Myhelp3: function (e) {
    // 当点击 积分 的时候，触发这个事件
    wx.navigateTo({        //跳转到积分界面
      url: '/myinformation/myintegral/myintegral',
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
  goto_Myhelp4: function (e) {
    // 当点击 消息 的时候，触发这个事件
    wx.navigateTo({        //跳转到消息界面
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
  goto_Platformhelp1: function (e) {
    // 当点击 客服 的时候，触发这个事件
    wx.navigateTo({        //跳转到客服界面
      url: '/myinformation/customer_server/customer_server',
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
  goto_Platformhelp2: function (e) {
    // 当点击 帮助与反馈 的时候，触发这个事件
    wx.navigateTo({        //跳转到帮助与反馈界面
      url: '/myinformation/suggestion/suggestion',
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
  goto_Platformhelp3: function (e) {
    // 当点击 关于我们 的时候，触发这个事件
    wx.navigateTo({        //跳转到关于我们界面
      url: '/myinformation/about_us/about_us',
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
  goto_Platformhelp4: function (e) {
    // 当点击 加入我们 的时候，触发这个事件
    wx.navigateTo({        //跳转到加入我们的界面
      url: '/myinformation/join_us/join_us',
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})