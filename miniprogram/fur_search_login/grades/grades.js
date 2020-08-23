// fur_search_login/grades/grades.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_content:5,
    picker: ['2016-2017 1', '2016-2017 2', '2017-2018 1', '2017-2018 2', '2018-2019 1', '2018-2019 2', '2019-2020 1', '2019-2020 2'],
    grade_content:[],

    total_info:[],
    
    reminder:""


  },

  PickerChange(e) {
    console.log(e);
    this.setData({
      index_content: e.detail.value
    })
  },
  onLoad: function (options) {
    //判断用户是否登录，未登录则跳转登录界面
    if (!getApp().globalData.login_stat) {
      wx.redirectTo({
        url: '../../fur_search_login/lessons/lessons',
      })
    } else {
      wx.showLoading({
        title: '查询中',
      })
      var that = this;
      wx.request({
        url: decodeURIComponent('https://www.zzumarket.com/score.php'),
        data: {
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
            grade_content: res.data[0],
            total_info: res.data[1],
            reminder: '排名加载中...'
          })
          console.log(res.data[0],res.data[1])
          console.log("成绩查询成功!")

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
      wx.request({
        url: decodeURIComponent('https://www.zzumarket.com/score1.php'),
        data: {
          id: getApp().globalData.user_id,
          pwd: getApp().globalData.user_pwd,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            reminder: res.data
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