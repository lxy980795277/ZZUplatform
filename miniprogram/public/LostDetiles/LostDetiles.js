Page({

  data: {
    id: "",
    image: [],
    iconname: "like",
    comment_number: 1,
    new_input: "",
    if_input: false,
    if_input2: false,
    list: [],
    comment_list: [],
    reply_list: [],
    time_now: "",
    today:"",
    thisgood_openid: "",
    comment_date: "",
    init_commentid: "",       //将要回复的评论id
    init_openid: "",   //要回复的用户openid
    init_goodid: "",         //当前的商品编号 
  },

  add_comment: function (e) {          //点击初始评论的回复函数 

    var that = this;
    // console.log("当前评论 ：", e.currentTarget.dataset.idd);
    // console.log("当前评论 ：", e.currentTarget.dataset.goodid);
    // console.log("当前评论 ：", e.currentTarget.dataset.initopenid);
    that.setData({
      if_input2: true,
      init_commentid: e.currentTarget.dataset.idd,
      init_openid: e.currentTarget.dataset.initopenid,
      init_goodid: e.currentTarget.dataset.goodid
    })
    console.log("init_commentid:", this.data.init_commentid);
    console.log("init_openid:", this.data.init_openid);
    console.log("init_goodid:", this.data.init_goodid);
  },
  send_comment_2: function (e) {     //点击初始评论后端访问数据库 
    console.log("开启回复他人功能");
    var that = this;
    var timestamp = Date.parse(new Date());     //获取当前时间的函数 
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var time = M + '-' + D + ' ' + h + ':' + m;



    var initcommentid = this.data.init_comment;
    wx.request({
      url: 'https://www.zzumarket.com/reply_LostComment.php', //服务器地址
      data: {
        replyid: getApp().globalData.user_openid + M + '' + D + '' + h + '' + m + ''+ s,
        goodid: this.data.id,
        openid: getApp().globalData.user_openid,
        initopenid: this.data.init_openid,

        date: time,
        content: this.data.new_input,
        commentid: this.data.init_commentid,
        isLost: 1,

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          if_input2: false,
        })
        wx.showToast({
          title: '评论成功！',
          icon: "success",
        })
        var i = setTimeout(function () {
          that.onShow();
        }, 2000)

      },
      fail: function (err) {
        wx.showToast({
          title: '评论失败！',
          icon: "none",
        })
      }
    })
  },


  like_this: function (e) {
    var that = this;
    if (that.data.iconname == "like") {
      that.setData({
        iconname: "likefill"
      })
      wx.showToast({
        title: '已收藏',
        icon: 'success',
        duration: 2000
      })
    }
    else {
      that.setData({
        iconname: "like"
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'success',
        duration: 2000
      })
    }

  },

  send_comment: function (e) {
    var that = this;
    console.log("测试一下");
    var isLoster = 0;
    if (this.data.thisgood_openid == getApp().globalData.user_openid) {
      isLoster = 1;
    }
    else {
      isLoster = 0;
    }
    wx.request({
      url: 'https://www.zzumarket.com/LostComment.php', //服务器地址
      data: {
        comment_id: this.data.time_now + this.data.thisgood_openid,
        goodid: this.data.id,
        openid: this.data.thisgood_openid,
        isLoster: isLoster,
        date: this.data.comment_date,
        content: this.data.new_input,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          if_input: false,
        })

      }
    })
    /*增加该物品的评论数 */
    console.log("增加评论数:", e.currentTarget.comment)
    wx.request({
      url: 'https://www.zzumarket.com/LostComment_add.php', //服务器地址
      data: {
        goodid: this.data.id,
        comment: comment_number,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          if_input: false,
        })

      }
    })
  },


  inputdone: function (e) {
    console.log("输入结束")
    var that = this;
    that.setData({
      if_input: false,
      if_input2: false,
    })
  },
  input_comment: function (e) {
    var that = this;
    that.setData({
      if_input: true,
    })
    console.log("已经开启评论输入")
  },
  input: function (e) {
    var that = this;
    that.setData({
      new_input: e.detail.value
    })
    console.log("输入内容为：", e.detail.value);
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




  onLoad: function (options) {

    var app = getApp();
    var user_id = options.id;
    var user_openid = options.openid;
    var comment = options.comment;
    console.log("已经传过来的评论数:", options.comment)

    var that = this;
    that.setData({
      id: user_id,
      thisgood_openid: user_openid,
      comment_number: comment,
    })
    console.log("用户id:", this.data.thisgood_openid);
    console.log("物品id:", this.data.id)
  },


  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showToast({
      title: '请稍后',
      icon: 'loading',
    })
    var that = this;
    console.log('用户的id:', this.data.id);
    wx.request({
      url: 'https://www.zzumarket.com/show_LostDetail.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        id: this.data.id//请求参数
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data[0])
        that.setData({
          list: res.data[0],
        })

      }
    })
    
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    that.setData({
      time_now: Y + M + D + h + m + s,
      comment_date: M + '-' + D + ' ' + h + ':' + m,
      today: M + '-' + D,
    })

    wx.request({
      url: 'https://www.zzumarket.com/select_LostComment.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        id: this.data.id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          that.setData({
            comment_list: res.data[0],
          })
          console.log("评论的返回值列表", that.data.comment_list)
        }

        wx.hideToast()
      }
    })



    wx.request({
      url: 'https://www.zzumarket.com/select_LostReply.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        id: this.data.id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          that.setData({
            reply_list: res.data[0],
          })
          console.log("回复评论的列表值是下列：", that.data.reply_list)
        }

        wx.hideToast()
      }
    })


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