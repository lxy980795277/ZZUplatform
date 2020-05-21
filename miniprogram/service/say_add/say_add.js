// service/say_add/say_add.js
Page({

  
  data: {
    timenow: "",   //系统当前时间 
    openid: "",//用户的openid 方便图片上传 
    imgList: [],     //上传的图片路径
    textarea:"",//用户输入的话
    today_year:0,
    today_month:0,
    today_day:0,
    today_hour:0,
    today_minute:0,
    today_second:0,
  },



  ChooseImage() {
    var img_left =  9 - this.data.imgList.length
    wx.chooseImage({
      count: img_left, 
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (res.tempFilePaths.length + this.data.imgList.length == 9) {
          wx.showToast({
            title: '最多上传9张图哦',
            icon: 'none'
          })
        }
          if (this.data.imgList.length != 0) {
            this.setData({
              imgList: this.data.imgList.concat(res.tempFilePaths),
            })
            console.log(this.data.imgList.length)
            if (this.data.imgList.length == 2) {
              this.setData({
                imgurl_2: res.tempFilePaths[0],
              })
            }
            else {
              this.setData({
                imgurl_3: res.tempFilePaths[0],
              })
            }

          } else {
            this.setData({
              imgList: res.tempFilePaths,
              imgurl_1: res.tempFilePaths[0],
            })
            console.log(this.data.imgList.length)


          }
        }

    });

    console.log("图片路径为", this.data.imgList)
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textarea: e.detail.value
    })
    console.log(this.data.textarea)
  },
  submit:function(e){
    this.upload_photo()
  },

  upload_photo: function () {

    if(this.data.textarea==""){
      wx.showToast({
        title: '说点什么吧~',
        icon:'none'
      })
    }

    else{
    var number = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    var length = this.data.imgList.length;
    for(var i = 0; i< this.data.imgList.length; i++) {

  wx.uploadFile({
    url: 'https://www.zzumarket.com/say_photo.php', //仅为示例，非真实的接口地址
    filePath: this.data.imgList[i],
    name: 'file',
    /*header: {
    'content-type': 'multipart/form-data'
    }, // 设置请求的 header*/
    formData: {
      'openid': this.data.openid,
      'time': this.data.timenow,
      'number': number[i],
    },
    success(res) {
      const data = res.data
      console.log(res)
      if (i == length) {
        if (res.statusCode == 200) {
          /*wx.hideLoading()*/
          console.log("最后一张图片已经上传成功")

        }
      }
    }
  })
}
var final_img = this.data.imgList;
var photo_number = this.data.imgList.length;
for (var i = 0; i < photo_number; i++) {
  final_img[i] = "https://www.zzumarket.com/image/say/" + this.data.openid + '/' + this.data.timenow + '/' + i.toString() + '.jpg';
}
for (var j = photo_number; j < 9; j++) {
  final_img[j] = 'no';
}

wx.request({
  url: 'https://www.zzumarket.com/insert_say.php', //服务器地址
  data: {
    id: this.data.openid + this.data.timenow,
    openid: this.data.openid,
    content: this.data.textarea,
    img1: final_img[0],
    img2: final_img[1],
    img3: final_img[2],
    img4: final_img[3],
    img5: final_img[4],
    img6: final_img[5],
    img7: final_img[6],
    img8: final_img[7],
    img9: final_img[8],
    see: 0,
    comment: 0,
    year: this.data.today_year,
    month: this.data.today_month,
    day: this.data.today_day,
    hour: this.data.today_hour,
    minute: this.data.today_minute,
    second: this.data.today_second
  },
  header: {
    'content-type': 'application/json'
  },
  success: function (res) {
    console.log(res)
    wx.hideLoading()
    wx.showToast({
      title: '发布成功',
      icon: 'success'
    })
    var i = setTimeout(function () {
      wx.navigateTo({
        url: '../say/say',
      })
    }, 1000)

  }
})
    }
  },

  
  onLoad: function (options) {

  },


 
  onShow: function () {
    this.gettime();
  },

  gettime: function () {   //获取当前时间的函数 和获取用户openid

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
      today_year: Y,
      today_month: M,
      today_day: D,
      today_hour: h,
      today_minute: m,
      today_second: s,
    })
    console.log(this.data.timenow)
  },
})