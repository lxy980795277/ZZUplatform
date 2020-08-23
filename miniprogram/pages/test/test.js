// pages/test/test.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

    color_list:["#f37b1d","#fbbd08","#8dc63f","#39b54a","#0081ff","#e03997","#a5673f","#8799a3","#9c26b0","#6739b6","#0081ff"],
    course_json: [],
    name: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    //判断用户是否登录，未登录则跳转登录界面
    if(!getApp().globalData.login_stat){
      wx.redirectTo({
        url: '../../fur_search_login/lessons/lessons',
      })
      }else{
        wx.showLoading({
          title: '查询中',
        })
        var that = this;
        wx.request({
          url: decodeURIComponent('https://www.zzumarket.com/test.php'),
          data:{
            id: getApp().globalData.user_id,
            pwd: getApp().globalData.user_pwd,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            //var course_json = res.data
            wx.hideLoading({
              complete: (res) => {
                wx.showToast({
                  title: '查询成功',
                  icon: 'success',
                  duration: 2000
                })
              },
            })
            that.setData({
              course_json:res.data,
              name: getApp().globalData.name
            })
            console.log(that.data.course_json)
            console.log("成功!")
            
          },
          fail: function () {
            wx.showToast({
              title: '查询失败',
              icon: 'none',
              duration: 2000
            })
            console.log("失败!")
            wx.redirectTo({
              url: '../../fur_search_login/lessons/lessons',
            })
          },
        })
    }
    
  
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
    var that = this
    if(that.data.name != getApp().globalData.name){
      that.onLoad()
      that.setData({
        name: getApp().globalData.name
      })
    }
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