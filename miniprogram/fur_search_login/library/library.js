// fur_search_login/library/library.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      book_name:""
  },
  sure:function(e){
    console.log("最终输入的书名是"+this.data.book_name)
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '../library_detail/library_detail?bookname=' + this.data.book_name,
    })
  },

  
  search:function(e){
      this.setData({
        book_name: e.detail.value
      });
      console.log("输入的书名是"+this.data.book_name)
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