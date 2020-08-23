// fur_search_login/lessons/lessons.js
const util = require('../../utils/util.js')
const rsa = require('password.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: "",
    type:"primary",
    code:"", 
  },


  input_id: function(e) {
    this.setData({
      mobile: e.detail.value
    });
  },
  input_pwd: function(e) {
    this.setData({
      code: e.detail.value
    });
  },
  
  btnSend: function() {
    if (util.isNullOrEmpty(this.data.mobile)) {
      util.toast('请输入学号');
      return
    } else if (!util.isMobile(this.data.mobile)) {
      util.toast('请输入完整的学号');
      return
    }
    setTimeout(() => {
      this.doLoop(60)
    }, 500)
  },
  login: function(e) {
    let loginCode = e.detail.value.smsCode;
    let id = e.detail.value.mobile;
    // console.log("用户的学号是"+id);
    // console.log("用户的密码是"+loginCode);
    const N = "5598e3b75d21a2989274e222fa59ab07d829faa29b544e3a920c4dd287aed9302a657280c23220a35ae985ba157400e0502ce8e44570a1513bf7146f372e9c842115fb1b86def80e2ecf9f8e7a586656d12b27529f487e55052e5c31d0836b2e8c01c011bca911d983b1541f20b7466c325b4e30b4a79652470e88135113c9d9";
    const E = "10001";
    rsa.prototype.setPublic(N, E);
    let rsa_pwd = rsa.prototype.encrypt('' + loginCode);  //该密码为rsa加密后密码
    // console.log(rsa_pwd)

    //使用php脚本调用服务器爬虫python程序发送request请求判断学号密码是否正确
    var that = this;
    wx.request({
      url: ('https://www.zzumarket.com/verify_pwd.php'),
      data:{
        id: id,
        pwd: rsa_pwd,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {  //此处res.date为1则账号密码正确，0错误
        if(res.data == 0){
          console.log('密码错误')
          wx.showToast({
            title: '学号或密码错误',
            icon: 'none',
            duration: 2000
          })
          }else{
            var app = getApp()
            app.globalData.login_stat = 1
            app.globalData.user_id = id
            app.globalData.user_pwd = rsa_pwd
            app.globalData.name = res.data
            console.log(app.globalData.name)
            console.log('密码正确')
            wx.showToast({
              title: '登陆成功~',
            })
            setTimeout(function () {
              wx.switchTab({
                url: '../../pages/Home/Home',
                // success: function (e) {
                //   var page = getCurrentPages().pop();
                //   if (page == undefined || page == null) return;
                //   page.onLoad();
                // } 
            })
            }, 2000) 

            
          }
      },
      fail: function () {
        wx.showToast({
          title: '服务器请求失败',
          icon: 'none',
          duration: 2000
        })
        console.log("服务器请求失败!")
      },
    })


  },
  protocol: function() {
    wx.showToast({
      title: '敬请期待~',
      icom:'none'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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