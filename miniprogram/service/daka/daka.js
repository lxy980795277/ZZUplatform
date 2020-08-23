// service/daka/daka.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    pwd:"",
    email:"",
  },

  idInput:function (e) {
    this.setData({
      id:e.detail.value
    })
    console.log("学号是"+this.data.id)
  },
 
// 获取输入密码
  pwdInput :function (e) {
    this.setData({
      pwd:e.detail.value
    })
    // console.log("密码是"+this.data.pwd)
  },
  emailInput:function (e) {
    this.setData({
      email:e.detail.value
    })
    // console.log("邮箱是"+this.data.email)
  },
 
// 登录
  login: function () {
    var reg = /^[0-9]+@qq\.com$/;
    if(this.data.id.length == 0 || this.data.pwd.length == 0||this.data.email.length==0){
      wx.showToast({  
        title: '以上三项不能为空',  
        icon: 'none',  
        duration: 1000
      })  
}else if(this.data.id.length < 11){
  wx.showToast({
    title: '请输入正确的学号',
    icon:'none',
    duration: 1000
  })
}else if(!reg.test(this.data.email)){
  wx.showToast({
    title: '请输入正确的邮箱',
    icon:'none',
    duration: 1000
  })
}else {
  // 这里修改成跳转的页面
  wx.request({
    url: decodeURIComponent('https://www.zzumarket.com/insert_daka.php'),
    data:{
      id: this.data.id,
      pwd:this.data.pwd,
      email:this.data.email
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.data =='insert have been succeeded'){
        wx.showToast({
          title: '保存成功',
        })
        console.log(res.data)
      }else{
        wx.showToast({
          title: '请勿重复添加',
          icon: 'none',
          duration: 1000
        })
        console.log(res.data)
      }
    },
    fail: function () {
      wx.showToast({
        title: '登录失败，稍后再试',
        icon: 'none',
        duration: 2000
      })
      console.log("失败!")
    },
  })
    }  
  },

  protocol: function () {
    wx.navigateTo({
      url: '../reminder/reminder',
    })
  },

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