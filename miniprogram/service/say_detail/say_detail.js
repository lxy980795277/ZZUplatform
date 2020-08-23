// service/say_detail/say_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"" , ///这条信息的数据库id
    list:[],        //这条信息的详细数据
    list_init:[]  ,  //这条信息的详细数据 是初始数据 
    comment_number:0,
    see:0,
    comment_list:[],  //评论初始值 （非回复类评论）
    comment_content:"" ,//输入的评论
    timenow:"",
    openid:"",
    image:[],
    if_input2:false,  //评论回复的几个数据
    reply_chatid:"",
    reply_replyid:"",
    reply_openid:"",
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
      var idid = options.id
      var see = options.see
      console.log(idid)
      this.setData({
        id:idid,
        see:see
      })
    

  },



  onReady: function () {

  },

 
  onShow: function () {
    this.gettime();
    this.getsay_detail();   //获取该条信息详情
    this.getcomment();     //获取该条信息评论
    this.getcomment_reply();   //获取评论信息 

  },

  
  


  getsay_detail: function (e) {
    var that = this
    wx.request({
      url: 'https://www.zzumarket.com/say_detail.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        id: that.data.id,
        see:that.data.see
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data[0])
        that.setData({
          list: res.data[0],
          list_init: res.data[0],
          comment_number:res.data[0].comment_number
        })
        wx.hideToast()
        var a = JSON.stringify(res.data[0])
        var b = that.data.list[0].id
        console.log(b)
      }
    })
  },

  getcomment:function(e){
    var that = this
    wx.request({
      url: 'https://www.zzumarket.com/select_say_comment.php', //服务器地址
      data: {
        ID: that.data.id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          that.setData({
            comment_list: res.data[0],
          })
          wx.hideToast()
        }

      }
    })
  },

  getcomment_reply:function(e){
    var that = this
    wx.request({
      url: 'https://www.zzumarket.com/select_say_comment_reply.php', //服务器地址
      data: {

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          that.setData({
            comment_reply_list: res.data[0],
          })
          wx.hideToast()
        }

      }
    })
  },
  inputdone:function(e){
    this.setData({
      if_input2:false,
    })
  },

  input: function (e) {
    var that = this;
    that.setData({
      comment_content: e.detail.value
    })
    console.log("输入内容为：", e.detail.value);
  },
    /*发送评论 */

  send_comment: function (e) {
    
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear().toString();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString();
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    var h = date.getHours().toString();
    var m = date.getMinutes().toString();
    var s = date.getSeconds().toString();
    var comment_time = M+'-'+D +' '+h+":"+m
    var number = parseInt(e.currentTarget.dataset.comment_number);
    var chat_id = e.currentTarget.dataset.chatid;
    console.log("当前这条论坛的评论数为", number)
    
    if (this.data.comment_content == '') {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none',
      })
    }
    else {
      var that = this;
      var n = "no"
      var a = Math.floor(Math.random() * 10)    //这两行随机生成头像
      var result = '../../icons/ava/' + a + '.png'
      wx.request({
        url: 'https://www.zzumarket.com/add_say_comment.php',
        data: {
          id: 's' + getApp().globalData.user_openid + that.data.timenow,
          openid: getApp().globalData.user_openid,
          chatid: that.data.id,
          content: that.data.comment_content,
          date: comment_time,
          reply_id: n,
          comment: number,
          ava:result,
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
    }

  },

  send_comment2: function (e) {
    
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear().toString();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString();
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    var h = date.getHours().toString();
    var m = date.getMinutes().toString();
    var s = date.getSeconds().toString();
    var comment_time = M + '-' + D + ' ' + h + ":" + m
    var number = parseInt(e.currentTarget.dataset.comment_number);
    var chat_id = e.currentTarget.dataset.chatid;
    console.log("当前这条论坛的评论数为", number)
    var that = this;
    if (that.data.comment_content == '') {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none',
      })
    }
    else {
      var n = "no"
      var a = Math.floor(Math.random() * 10)    //这两行随机生成头像
      var result = '../../icons/ava/' + a + '.png'
      wx.request({
        url: 'https://www.zzumarket.com/add_say_reply.php', //服务器地址
        data: {
          id: 's' + getApp().globalData.user_openid + that.data.timenow,
          openid: getApp().globalData.user_openid,
          chatid: that.data.id,
          reply_content: that.data.comment_content,
          reply_date: comment_time,
          reply_id: that.data.reply_replyid,
          reply_openid: that.data.reply_openid,
          comment: number,
          ava:result

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
        }
      })
    }
  },

  add_comment: function (e) {          //点击初始评论的回复函数 

    var that = this;
    /*console.log("当前评论 ：", e.currentTarget.dataset.idd);
    console.log("当前评论 ：", e.currentTarget.dataset.goodid);
    console.log("当前评论 ：", e.currentTarget.dataset.initopenid);*/
    that.setData({
      if_input2: true,
      reply_chatid: e.currentTarget.dataset.chatid,
      reply_replyid: e.currentTarget.dataset.replyid,
      reply_openid: e.currentTarget.dataset.openid,
    })

  },


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
  
 
})