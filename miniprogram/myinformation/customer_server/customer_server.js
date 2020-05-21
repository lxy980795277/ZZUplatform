var util = require('../../utils/util.js');
var lasttime = "";//获取上一条聊天记录的准确时间
var todaytime = util.formatTime1(new Date()); //获取今天的日期
Page({
  data: {
    InputBottom: 0,
    inputShowed: true,
    inputVal:"",
    
    scrollTop: 0,//控制上滑距离
    windowHeight: 100,//页面高度
    ChatContent: [{
      year: '2019年',
      data: '9月15日',
      time: '13:23',
      value: '我要投诉',
      user: "Customer",
    }, 
    {
      year: '',
      data: '',
      time: '13:24',
      value: '请描述您遇到的问题',
      user: "Server",
    }, 
    {
      year: '',
      data: '',
      time: '',
      value: '11111111111111111',
      user: "Customer",
    }, 
    {
      year: '',
      data: '',
      time: '',
      value: '2222222222222222',
      user: "Server",
    }, 
    {
      year: '',
      data: '',
      time: '',
      value: '33333333333333333',
      user: "Customer",
    }, 
    {
      year: '',
      data: '',
      time: '',
      value: '44444444444444444',
      user: "Server",
    }, ],
  },
  
  onReady: function () {
    var height = wx.getSystemInfoSync().windowHeight;
    this.setData({
      windowHeight: height
    })
    var time = util.formatTime1(new Date());
    this.setData({
      time:time
    })
    this.setData({
      todaytime : time
    })
    
    console.log("TodayTime:",todaytime);
    this.pageScrollToBottom();
  },

  // 获取容器高度，使页面滚动到容器底部
  pageScrollToBottom: function () {
    var that = this;
    var height = wx.getSystemInfoSync().windowHeight;
    console.log("height:" ,height);
    wx.createSelectorQuery().select('#page').boundingClientRect(function (rect) {
      if (rect) {
        that.setData({
          windowHeight: height,
          scrollTop: rect.height
        })
      }
    }).exec()
    console.log("scrollTop:", this.data.scrollTop);
  },
  inputTyping: function(e)
  {
    this.setData({
      inputVal:e.detail.value
    })
    //console.log(this.data.inputVal);
  },
  /**
  * 搜索栏控制函数 - 清空搜索框内容
  */
  clearInput: function () {
    var that = this;
    var height = this.data.scrollTop;
    var str = this.data.inputVal;
    console.log(str);
    this.setData({
      inputShowed:false
    })
    console.log(this.data.inputShowed);
    if (str != "") {
      that.setData({
        inputVal: ""
      });
      var obj = {};
      var year = util.get_year(new Date());           //获取年份
      var time1 = util.formatTime1(new Date());       //获取具体日期
      var time2 = util.formatTime2(new Date());     //获取具体时间
      console.log("time2:",time2);
      if (lasttime != time2)
      {
        this.setData({
          time2:time2,
          time1: time1
        })
        lasttime = time2;
        obj.year = year+'年';
        obj.data = time1;
        obj.time = time2;
      }
      else                          //如果时间相同，存入年与日期，不存具体时间
      {
        obj.year = "";
        obj.data = "";
        obj.time = "";
      }
      console.log("lasttime:",lasttime);
      obj.value = str;
      obj.user = "Customer";
      let ChatContent = this.data.ChatContent;
      ChatContent.push(obj);
      this.setData({
        ChatContent
      })
      this.setData({
        inputVal: '',
      })
      this.setData({
        scrollTop: height+200
      })
      //console.log(this.data.ChatContent);
      //console.log("scrollTop:   ", this.data.scrollTop);
      //console.log("this.data.inputVal");
      //console.log(this.data.inputVal);
      //this.pageScrollToBottom();
    }
  },
  onLoad()
  {
    
    //this.getData();
  }
})