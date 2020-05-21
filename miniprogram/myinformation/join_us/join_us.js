// pages/Home/Home.js
Page({
  data: {
    swiperH: '',//swiper高度
    nowIdx: 0,//当前swiper索引
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'http://47.94.37.91/zzu.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'http://47.94.37.91/zzu.jpg',
    }, {
      id: 2,
      type: 'image',
        url: 'http://47.94.37.91/zzu.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'http://47.94.37.91/zzu.jpg'
    }, {
      id: 4,
      type: 'image',
        url: 'http://47.94.37.91/zzu.jpg'
    }, {
      id: 5,
      type: 'image',
        url: 'http://47.94.37.91/image/a.jpg'
    }, {
      id: 6,
      type: 'image',
        url: 'http://47.94.37.91/image/a.jpg'
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },
  cardSwiper(e) {
    this.setData({
      cardIndex: e.detail.current
    })
  },
  



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //获取swiper高度
  getHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth - 2 * 50;//获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;
    var sH = winWid * imgh / imgw + "px"
    this.setData({
      swiperH: sH//设置高度
    })
  },
  //swiper滑动事件
  swiperChange: function (e) {
    this.setData({
      nowIdx: e.detail.current
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