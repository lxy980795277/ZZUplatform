// service/say/say.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    name_input:"",
    image:[],
    list:[],      //消息列表
    list_init:[], //消息列表 
  },
  upper:function(e){
    wx.showToast({
      title: '已经到顶了 ',
      icon:'none'
    })
  },
  lower:function(e){
    wx.showToast({
      title: '已经到底了',
      icon:'none'
    })
  },
  return_home:function(e){
    wx.switchTab({
      url: '../../pages/Home/Home',
    })
  },
  goto_add:function(e){
    wx.navigateTo({
      url: '../say_add/say_add',
    })
  },
  goto_detail:function(e){   //跳转到该条信息的详情界面 
    console.log("这条悄悄话的id是"+e.currentTarget.dataset.id)
  
    wx.navigateTo({   //这个地方把这条信息的id传过去 传到新的页面下方 
      url: '../say_detail/say_detail?id=' + e.currentTarget.dataset.id + "&see=" + e.currentTarget.dataset.see + "&comment=" + e.currentTarget.dataset.comment,
    })
  },
  
  name_input: function (e) {
    var that = this;
    that.setData({
      name_input: e.detail.value,
    })
    console.log("查询的名字是", that.data.name_input)
  },
  

  name_search: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.zzumarket.com/aa.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        id: "123456789",
        content: this.data.name_input,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data)
        }
      }
    })
  },
  preview: function (e) {
    var current = e.currentTarget.dataset.src;
    console.log("current是：", current)
    
    this.data.image[0] = current;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.image // 需要预览的图片http链接列表
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

  
  onShow: function () {
    this.gettime();         //初始化时间
    this.getsay_content(); //访问服务器获取内容 
  },


  //功能函数在下面 

  























  gettime: function () {   //获取当前时间的函数 

    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear().toString();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var time = M + '-' + D;
    var a = parseInt(Y + M + D + h + m);
    var real_date = Y + '/' + M + '/' + D + " " + h + ':' + m + ':' + s;
    this.setData({
      timenow: Y + M + D + h + m + s,
      openid: getApp().globalData.user_openid,
    })
    console.log(this.data.timenow)
  },

  getsay_content: function (e) {
    var that = this
    wx.request({
      url: 'https://www.zzumarket.com/select_say.php', //服务器地址
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
          list: res.data[0],
          list_init: res.data[0],
        })
        wx.hideToast()
        var a = JSON.stringify(res.data[0])
        var b = that.data.list[0].id
        console.log(b)
      }
    })
  },
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