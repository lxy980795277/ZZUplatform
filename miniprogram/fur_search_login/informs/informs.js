// fur_search_login/informs/informs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft:0,
    list:["要点新闻","学术动态","通知公告"],
    news:[],
    xueshu:[],
    tongzhi:[],
    detail_src:"",
    i:0,

  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60,
      i: this.data.TabCur
    })
    console.log("现在是第多少页面"+this.data.TabCur)
  },

  goto_detail_informs:function(e){
    getApp().globalData.informs_src = e.currentTarget.dataset.src
    console.log("详细信息的链接是"+e.currentTarget.dataset.src)
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '../informs_detail/informs_detail?src=' + e.currentTarget.dataset.src,
    })
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    if (!getApp().globalData.login_stat) {
      wx.redirectTo({
        url: '../../fur_search_login/lessons/lessons',
      })
    }
    else{
      wx.request({
        url: decodeURIComponent('https://www.zzumarket.com/news.php'),
        data: {
          id: getApp().globalData.user_id,
          pwd: getApp().globalData.user_pwd,
          i: 0
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log("新闻列表是" + res.data)
          that.setData({
            news: res.data[0],
            xueshu: res.data[1],
            tongzhi: res.data[2]
          })
          wx.hideLoading({
            complete: (res) => { },
          })
          wx.showToast({
            title: '查询成功',
            duration: 1000,
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