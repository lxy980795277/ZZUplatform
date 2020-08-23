// fur_search_login/informs_detail/informs_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src :[],
    content:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inf_src = getApp().globalData.informs_src
    console.log("传过来的src是"+inf_src)
    var that = this
    that.setData({
      src:[inf_src]
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: decodeURIComponent('https://www.zzumarket.com/news_detail.php'),
      data: {
        link:that.data.src
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("新闻详细内容是"+res.data)
        that.setData({
          content: res.data
        })
        wx.hideLoading({
          complete: (res) => {},
        })
        
      },
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