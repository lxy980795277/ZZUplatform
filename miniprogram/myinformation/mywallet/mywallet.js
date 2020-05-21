
const cwx = require('profunc.js'); //在小程序页面引入该js 文件
//这个文件就是访问ocr接口的函数 
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    access_token:"",
    name:"",
    sex:"",
    minzu:"",
    birth:"",
    card_number:"",
    location:"",
    image_url:"",
  },
  returnback:function(e){
    wx.showToast({
      title: '绑定成功',
      icon:'success'
    })
  },
  
  ocridcard(){  //引用该ocr调用函数 
    var that = this;
    //传入上一步获取的access_token，即建立通信后的凭证
    cwx.OcrIdCard(that.data.access_token).then(function(_res){
      var trdata = _res.data.words_result;
      console.log(trdata)
      that.setData({
        name: trdata['姓名'].words,
        card_number: trdata['公民身份号码'].words,
        location: trdata['住址'].words,
        sex:trdata['性别'].words,
        minzu:trdata['民族'].words,
        birth:trdata['出生'].words,
        image_url:getApp().globalData.idcard_image,
      })
      console.log(that.data.image_url)
  })      
},
  ocrTEST:function(e){
    this.ocridcard()
  },
  



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //首先需要小程序和百度ocr接口建立通信，下面是通信方法 
//建立通信成功后，会得到一个成功的凭证，即access_token，下面的函数就是获取access_token的方法

  //这里首先需要认证百度开发者资格，申请一个百度开发者账号
  /*
  申请之后，在应用列表里面，找到字符识别，然后创建应用，也就是在自己的开发者账号上
  创建一个ocr的接口实体，创建之后，会给appkey和appsecert，
  分别是你自己的百度开发者账号、和ocr接口实体的唯一标识字符。
  */ 
  var that = this
  const appkey = 'TfAwQDWPZZlNWEThaxqabiNT'; //这里是appkey的标识符
  const appsecret = 'p4YPYIoBqSZVmvf0KkB3wM6egzwBjExn';//这里是appsecert的标识符
  var url = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + appkey + '&client_secret=' + appsecret;
  //访问百度ocr接口地址，post，传入自己的key和secert值
  wx.request({
    url: url,
    method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      success:function(res){
        //返回值有一大串信息，只需要获取其中的access_token，如下所示
        //将返回值的access_token保存到 data中的access_token变量下
        console.log("access_token已经成功获取"+res.data.access_token)
        that.setData({
          access_token:res.data.access_token
        })

        //至此获取access_token完毕，即小程序和百度已经建立通信 
//至此获取access_token完毕，即小程序和百度已经建立通信 
//至此获取access_token完毕，即小程序和百度已经建立通信 
      }
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