// Pages/LostFound/LostFound.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:[],
    user_openid:'',
    list: [],
  },
  name_input: function (e) {
    var that = this;
    that.setData({
      name_input: e.detail.value,
    })
    console.log("查询的名字是", that.data.name_input)
  },
  choose_type1: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.zzumarket.com/select_LostType.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        type: '校园卡',
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          that.setData({
            list: res.data[0],
            modalName: null
          })
        }
        else {
          wx.showToast({
            title: '该分类暂无商品',
            icon: 'none',
          })
          that.setData({
            modalName: null,

          })
        }

      }
    })
  },
  choose_type2: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.zzumarket.com/select_LostType.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        type: '水卡',
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          that.setData({
            list: res.data[0],
            modalName: null
          })
        }
        else {
          wx.showToast({
            title: '该分类暂无商品',
            icon: 'none',
          })
          that.setData({
            modalName: null,

          })
        }

      }
    })
  },
  choose_type3: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.zzumarket.com/select_LostType.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        type: '测试',
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          that.setData({
            list: res.data[0],
            modalName: null
          })
        }
        else {
          wx.showToast({
            title: '该分类暂无商品',
            icon: 'none',
          })
          that.setData({
            modalName: null,

          })
        }

      }
    })
  },
  name_search: function (e) {           //通过名字来查询物品
    var that = this;
    wx.request({
      url: 'https://www.zzumarket.com/select_Lostname.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        name: this.data.name_input,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          that.setData({
            list: res.data[0],
            modalName: null
          })
        }
        else {
          wx.showToast({
            title: '该分类暂无商品',
            icon: 'none',
          })
          that.setData({
            modalName: null,

          })
        }

      }
    })
  },
  goto_LostPublic: function (e) {
    // 当点击 + 的时候，触发这个事件
    wx.navigateTo({        //
      url: '/public/LostPublic/LostPublic',
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({     /*查看用户是否已经授权登录 */
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              console.log("当前使用小程序的用户：",res.userInfo)
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
                  url: 'https://www.zzumarket.com/getopenid.php',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名
                  data: {
                    code: code,
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    getApp().globalData.user_openid = res.data;
                    console.log("当前使用小程序的用户的openid：", getApp().globalData.user_openid)
                  }
                })
              }
              else {
                console.log("获取用户登录态失败！");
              }
              var app = getApp();
              var openid = app.globalData.user_openid;
              console.log("用户的openid是", getApp().globalData.user_openid);
              /*console.log("用户的昵称是", getApp().globalData.user_info.nickName)
              console.log("用户的头像是", getApp().globalData.user_info.avatarUrl)*/

            }
          })


        }
        else {
          wx.showToast({
            title: '未授权',
            icon: "none"
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //console.log("当前时间戳为：" + timestamp);
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
    var time = M + '-' + D;
    this.setData({
      today: time,
    })

    wx.showToast({        //一个友好的提示，服务器访问完成后会关闭
      title: '加载中',
      icon: 'loading',
      duration: 100000
    })
    var a = new Date().getTime();
    var b = new Date();
    var t1 = new Date("2019/09/20 8:20:00")
    var t2 = new Date()
    console.log(new Date(t2 - t1).getTime() / 1000 / 60)
    //console.log(a/1000/60/60/24/365)
    var that = this;
    wx.request({
      url: 'https://www.zzumarket.com/select_Lost.php', //服务器调用php文件地址
      //url: 'http://www.zzumarket.com',
      data: {
        name: 'bob'//请求参数
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data[0])
        that.setData({
          list: res.data[0],        //将获取的数据赋给list数组
        })
        wx.hideToast()
      }
    }) 
  },
  goto_LostDetiles: function (e) {
    var that = this;
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '../../public/LostDetiles/LostDetiles?id=' + e.currentTarget.dataset.id + "&&openid=" + getApp().globalData.user_openid +"&&comment=" + e.currentTarget.dataset.comment,
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
    var app = getApp();
    console.log("编号 ：", e.currentTarget.dataset.id);
    console.log("名称 ：", e.currentTarget.dataset.name);
    console.log("类别 ：", e.currentTarget.dataset.type);
    console.log("价格 ：", e.currentTarget.dataset.money);
    console.log("电话 ：", e.currentTarget.dataset.people_phone);
    console.log("浏览 ：", e.currentTarget.dataset.see);
    app.globalData.goods_id = e.currentTarget.dataset.id;
    console.log("全局变量的值 goods_details已经变成：", app.globalData.goods_id)
    wx.request({
      url: 'https://www.zzumarket.com/LostSee_add.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        name: 'bob',//请求参数
        id: e.currentTarget.dataset.id,
        see: e.currentTarget.dataset.see,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("成功")
        console.log("浏览量已经更新为 ：", res.data);
      }
    })

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