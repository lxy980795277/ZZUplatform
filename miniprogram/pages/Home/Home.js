// pages/Home/Home.js
Page({
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://www.zzumarket.com/111.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://www.zzumarket.com/111.jpg'
    }, {
      id: 2,
      type: 'image',
        url: 'https://www.zzumarket.com/111.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://www.zzumarket.com/111.jpg'
    }, {
      id: 4,
      type: 'image',
        url: 'https://www.zzumarket.com/111.jpg'
    }, {
      id: 5,
      type: 'image',
        url: 'https://www.zzumarket.com/111.jpg'
    }, {
      id: 6,
      type: 'image',
        url: 'https://www.zzumarket.com/111.jpg'
    }],

    day:0,        //当前年月日
    year:0,
    month:'',
    mask:false,

  },
  goto_course: function (e) {
    wx.navigateTo({
      url: '../../pages/test/test',
    })
  },
  goto_goods:function(e){
    wx.navigateTo({
      url: '../../trade/jiaoyi/jiaoyi',
    })
  },
  goto_buy: function (e) {
    wx.navigateTo({
      url: '../../trade/qiugou/qiugou',
    })
  },
  goto_map:function(e){
    wx.navigateTo({
      url: '../../others/map/map'
    })
  },
  goto_lostfound:function(e){
    wx.navigateTo({
      url: '../../service/LostFound/LostFound',
    })
  },
  goto_publish: function (e) {
    var that = this;
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
             /* wx.navigateTo({
                url: '../../public/describe/describe',
              })*/
              that.setData({
                mask:true,
              })
            }
          })
          wx.login({
            //获取code
            success: function (res) {
              console.log('login success')
              var code = res.code; //返回code
              var appId = '...';
              var secret = '...';
              if (code) {
                wx.request({
                  url: 'https://www.zzumarket.com/getopenid_2.php',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名
                  data: {
                    code: code,
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log("获取用户登录态成功！");
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

            },
            fail:function(err){
              console.log(err)
            }
            
          })

        }
      }
    })
    
    
  },
  goto_say:function(e){
    wx.navigateTo({
      url: '../../service/say/say',
    })
  },
  goto_goodadd:function(e){
    wx.navigateTo({
      url: '../../public/describe/describe',
    })
    this.setData({
      mask:false,
    })
  },
  goto_goodsale:function(e){
    wx.navigateTo({
      url: '../../public/describe/describe',
    })
    this.setData({
      mask: false,
    })
  },



 
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },


  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  hidemask:function(e){
    this.setData({
      mask:false,
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
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

    var month = "";
    if(M==1){
      month='Jan';
    }
    else if(M==2){
      month = 'Feb';
    }
    else if (M == 3) {
      month = 'Mar';
    }
    else if (M == 4) {
      month = 'Apr';
    }
    else if (M == 5) {
      month = 'May';
    }
    else if (M == 6) {
      month = 'Jun';
    }
    else if (M == 7) {
      month = 'Jul';
    }
    else if (M == 8) {
      month = 'Aug';
    }
    else if (M == 9) {
      month = 'Sep';
    }
    else if (M == 10) {
      month = 'Oct';
    }
    else if (M == 11) {
      month = 'Nov';
    }
    else if (M == 12) {
      month = 'Dev';
    }
    this.setData({
      today: time,
      day:D,
      month:month,
      year:Y
    })
    var a = new Date().getTime();
    var b = new Date();
    var t1 = new Date("2019/09/20 8:20:00")
    var t2 = new Date()
    console.log(new Date(t2 - t1).getTime() / 1000 / 60)
    //console.log(a/1000/60/60/24/365)
    var that = this;
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
                  url: 'https://www.zzumarket.com/getopenid_2.php',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名
                  data: {
                    code: code,
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    getApp().globalData.user_openid = res.data;
                    console.log("获取用户登录态成功！");
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