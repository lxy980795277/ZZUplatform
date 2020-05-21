Page({

  data: {
    id:"",
    image:[],
    iconname:"like",
    comment_number:100,
    new_input:"",
    if_input:false,
    if_input2:false,
    list:[],
    comment_list:[],
    reply_list:[],
    time_now:"",
    thisgood_openid:"",
    comment_date:"",
    init_commentid:"",       //将要回复的评论id
    init_openid:"",   //要回复的用户openid
    init_goodid:"",         //当前的商品编号 
  },

  add_comment:function(e){          //点击初始评论的回复函数 
   
    var that = this;
    /*console.log("当前评论 ：", e.currentTarget.dataset.idd);
    console.log("当前评论 ：", e.currentTarget.dataset.goodid);
    console.log("当前评论 ：", e.currentTarget.dataset.initopenid);*/
    that.setData({
      if_input2:true,
      init_commentid:e.currentTarget.dataset.idd,
      init_openid: e.currentTarget.dataset.initopenid,
      init_goodid: e.currentTarget.dataset.goodid
    })
    
  },
  send_comment2:function(e){     //点击初始评论后端访问数据库 
    if (this.data.new_input == '') {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none',
      })
    }
    else{
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


      var number = parseInt(e.currentTarget.dataset.comment_number);
      console.log("当前这条商品的评论数为", number)
      var newnumber = number + 1
      var initcommentid = this.data.init_comment;
      wx.request({
        url: 'https://www.zzumarket.com/reply_comment.php', //服务器地址
        data: {
          replyid: getApp().globalData.user_openid + M + D + h + m + s,
          goodid: this.data.init_goodid,
          openid: getApp().globalData.user_openid,
          initopenid: this.data.init_openid,
          ifsale: 1,
          date: time,
          content: this.data.new_input,
          commentid: this.data.init_commentid,

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
            icon: "none",
          })
          var i = setTimeout(function () {
            that.onShow();
          }, 1000)

        },
        fail: function (err) {
          wx.showToast({
            title: '评论失败！',
            icon: "none",
          })
        }
      })
      wx.request({
        url: 'https://www.zzumarket.com/add_comment.php', //服务器地址
        data: {
          goodid: getApp().globalData.goods_id,
          number: newnumber,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log("评论数量已经更新")
        }
      })
    }
   
  },


  like_this:function(e){
    var that = this;
    if(that.data.iconname=="like"){
      that.setData({
        iconname: "likefill"
      })
      wx.showToast({
        title: '已收藏',
        icon: 'success',
        duration: 2000
      })
    }
    else{
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
  getwechat:function(e){
    console.log("微信号码是",e.currentTarget.dataset.wechat)
    wx.setClipboardData({
     
      data: e.currentTarget.dataset.wechat,
      success:function(res){
        wx.showToast({
          title: '微信复制成功',
        })
      }
    })
    
    
  },
  getqq: function (e) {
    console.log("微信号码是", e.currentTarget.dataset.qq)
    wx.setClipboardData({
      data: e.currentTarget.dataset.qq,
      success: function (res) {
        /*wx.hideToast();
        wx.showToast({
          title: 'QQ号码已复制到剪切板',
          icon: 'none'
        })*/
        wx.showToast({
          title: 'QQ复制成功',
        })
      }
    })
    
  },

  send_comment:function(e){
    var number = parseInt(e.currentTarget.dataset.comment_number);
    console.log("当前这条商品的评论数为",number)
    var newnumber=number+1
    if(this.data.new_input==''){
      wx.showToast({
        title: '评论不能为空',
        icon:'none',
      })
    }
    else{
      var that = this;

      var if_saler = 0;
      if (this.data.thisgood_openid == getApp().globalData.user_openid) {
        if_saler = 1;
      }
      else {
        if_saler = 0;
      }

      wx.request({
        url: 'https://www.zzumarket.com/comment.php', //服务器地址
        data: {
          comment_id: this.data.time_now + getApp().globalData.user_openid,
          goodid: getApp().globalData.goods_id,
          openid: getApp().globalData.user_openid,
          if_sale: if_saler,
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
          wx.showToast({
            title: '评论成功！',
            icon: "none",
          })
          var i = setTimeout(function () {
            that.onShow();
          }, 1000)
        }
      }) 
      wx.request({
        url: 'https://www.zzumarket.com/add_comment.php', //服务器地址
        data: {
          goodid: getApp().globalData.goods_id,
          number:newnumber,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log("评论数量已经更新")
        }
      })
    }
    
  },


  inputdone:function(e){
      console.log("输入结束")
      var that = this;
      that.setData({
        if_input:false,
        if_input2:false,
      })
  },
  input_comment:function(e){
      var that = this;
      that.setData({
        if_input:true,
      })
      console.log("已经开启评论输入")
  },
  input:function(e){
    var that = this;
    that.setData({
      new_input:e.detail.value
    })
    console.log("输入内容为：",e.detail.value);
  },

  preview:function(e){
    var current = e.currentTarget.dataset.src;
    console.log("current是：",current)
    this.data.image[0]=current;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.image // 需要预览的图片http链接列表
    })

  },




  onLoad: function (options) {
    
    var app = getApp();
    var ooppeenniidd = options.openid;
    console.log("已经传过来了", ooppeenniidd)
    
    var that = this;
    that.setData({
      id:app.globalData.goods_id,
      thisgood_openid: ooppeenniidd,
    })
    
  },


  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showToast({
      title: '请稍后',
      icon:'loading',
    })
    var that = this;
    wx.request({
      url: 'https://www.zzumarket.com/show_details.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        id: getApp().globalData.goods_id//请求参数
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
      time_now:Y+M+D+h+m+s,
      comment_date:M+'-'+D+' '+h+':'+m,
    })

    wx.request({
      url: 'https://www.zzumarket.com/select_comment.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        id: getApp().globalData.goods_id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data){
          that.setData({
            comment_list: res.data[0],
          })
          console.log("评论的返回值列表", that.data.comment_list)
        }
        
        wx.hideToast()
      }
    }) 



    wx.request({
      url: 'https://www.zzumarket.com/select_reply.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        id: getApp().globalData.goods_id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data){
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