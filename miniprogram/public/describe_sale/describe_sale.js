const app = getApp();
Page({
  data: {
    typelist: ['数码产品', '书籍资料', '电车自行车', '零食饮品', '护肤美妆', '运动器材', '男鞋女鞋', '衣服饰品', '生活用品', '其它'],
    typeiconlist: ['camera.png', 'book.png', 'bike.png', 'food.png', 'bottle.png', 'basketball.png', 'shoe.png', 'tshirt.png', 'goods.png', 'else.png'],
    is_know: 0,
    multiIndex: [0, 0, 0],
    imgList: [],
    modalName: null,
    tag: 0,
    openid: "",
    timenow: "",
    time_regulate: "",
    time_int: 0,
    real_time: "",
    imgurl_1: "",       //三个图片的url
    imgurl_2: "",
    imgurl_3: "",
    good_name: "",
    textareaAValue: '', //详情界面
    user_name: "",       //用户微信昵称
    user_avaurl: "",     //用户微信头像地址
    can_talk: 0,         //是否可以讲价
    type: "notknow",     //是否点击了 阅读发布须知
    user_wechat: "",     //用户的wechat
    user_phone: "",      //用户的手机号
    money: 0,            //商品价格
    type_now: "",        //当前选择的类别
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.currentTarget.dataset.type)
    this.setData({
      type_now: e.currentTarget.dataset.type
    })
  },
  type_sure: function (e) {  //类型选择完毕后
    if (this.data.type_now == "") {
      wx.showToast({
        title: '请选择类别',
        icon: 'none',
      })
    }
    else {
      this.setData({
        modalName: null
      })
    }
  },
  type_cancel: function (e) {  //重新输入标签
    this.setData({
      type_now: "",
    })
  },


  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
    if (this.data.isCard == 1) {
      this.data.can_talk = 1;
      console.log("用户选择为接受议价")
    }
    else {
      this.data.can_talk = 0;
      console.log("用户选择为：不接受议价")
    }
  },
  is_Know: function (e) {
    if (e.detail.value == 1) {
      this.setData({
        is_know: 1,
        type: "know",
      })
      console.log("用户接受发布条例")
      console.log(this.data.type)
    }
    else {
      this.setData({
        is_know: 0,
        type: "notknow"
      })
      console.log("用户拒绝了发布条例")
      console.log(this.data.type)
    }
  },
  hand_in_publish: function (e) {
    while (1) {
      if (this.data.good_name == "") {
        wx.showToast({
          title: '请输入商品名称',
          icon: 'none'
        })
        break;
      }
      else if (this.data.good_name.length >= 30) {
        wx.showToast({
          title: '商品名称过长，请修改！',
          icon: 'none'
        })
        break;
      }
      else if (this.data.textareaAValue == "") {
        wx.showToast({
          title: '请输入商品介绍',
          icon: 'none'
        })
        break;
      }
      
      else if (this.data.type_now == "") {
        wx.showToast({
          title: '请选择物品类别',
          icon: 'none'
        })
        break;
      }
      else if (this.data.user_wechat == "" && this.data.user_phone == "") {
        wx.showToast({
          title: '请至少输入一项联系方式：微信号，或者QQ号',
          icon: 'none'
        })
        break;
      }

      else if (this.data.is_know == 0) {
        wx.showToast({
          title: '请同意《发布须知》',
          icon: 'none'
        })
        break;
      }

      else {
        this.setData({
          tag: 1,
        })
        break;
      }
    }

    if (this.data.tag == 1) {
      wx.showLoading({
        title: '上传中',
      })

      var imgurl = [this.data.imgurl_1, this.data.imgurl_2, this.data.imgurl_3];
      var number = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
      var length = this.data.imgList.length;
      for (var i = 0; i < this.data.imgList.length; i++) {

        wx.uploadFile({
          url: 'https://www.zzumarket.com/upload_photo.php', //仅为示例，非真实的接口地址
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
                wx.hideLoading()
                console.log("最后一张图片已经上传成功")
              }
            }
          }
        })
      }

      var final_img = this.data.imgList;
      var photo_number = this.data.imgList.length;
      for (var i = 0; i < photo_number; i++) {
        final_img[i] = "https://www.zzumarket.com/image/" + this.data.openid + '/' + this.data.timenow + '/' + i.toString() + '.jpg';
      }
      for (var j = photo_number; j < 9; j++) {
        final_img[j] = 'no';
      }

      wx.request({
        url: 'https://www.zzumarket.com/insert_into.php', //服务器地址
        data: {
          id: this.data.openid + this.data.timenow,
          openid: this.data.openid,
          name: this.data.good_name,
          type: this.data.type_now,
          goods_money: this.data.money,
          wechat: this.data.user_wechat,
          phone: this.data.user_phone,
          detail: this.data.textareaAValue,
          a: 0,
          b: 0,
          img1: final_img[0],
          img2: final_img[1],
          img3: final_img[2],
          img4: final_img[3],
          img5: final_img[4],
          img6: final_img[5],
          img7: final_img[6],
          img8: final_img[7],
          img9: final_img[8],
          date: this.data.time_regulate,
          wechatname: this.data.user_name,
          wechatava: this.data.user_avaurl,
          time2: this.data.real_time,
          buy_or_sale: 0,    //1是卖，0为买
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: '发布成功',
            icon: 'success'
          })
        }
      })

    }
  },


  ChooseImage() {
    wx.chooseImage({
      count: 9, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
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
      title: '小主',
      content: '确定要删除这张图片吗？',
      cancelText: '再看看',
      confirmText: '再见',
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
      textareaAValue: e.detail.value
    })
    console.log(this.data.textareaAValue)
  },

  getwechat: function (e) {
    this.setData({
      user_wechat: e.detail.value,
    })
    console.log(this.data.user_wechat)
  },
  getphone: function (e) {
    this.setData({
      user_phone: e.detail.value,
    })
    console.log(this.data.user_phone)
  },
  getMoney: function (e) {
    this.setData({
      money: e.detail.value,
    })
    console.log(this.data.money)
  },
  getname: function (e) {
    this.setData({
      good_name: e.detail.value,
    })
    console.log(this.data.good_name)
  },

  onLoad: function (options) {

  },

  onShow: function (e) {   /*先读取从上一个页面传回来的用户数据，方便下一步操作 */
    console.log(getApp().globalData.user_name)   //测试是够传入了user_info
    this.setData({
      user_name: getApp().globalData.user_info.nickName,
      user_avaurl: getApp().globalData.user_info.avatarUrl,
    })
    console.log("昵称和头像已经获取成功", this.data.user_name, this.data.user_avaurl)

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

    var time = M + '-' + D;
    var a = parseInt(Y + M + D + h + m);
    var real_date = Y + '/' + M + '/' + D + " " + h + ':' + m + ':' + s;
    console.log(real_date)
    console.log(a)
    this.setData({
      openid: getApp().globalData.user_openid,
      timenow: Y + M + D + h + m + s,
      time_regulate: time,
      real_time: real_date,
    })
    console.log("openid和时间已经成功获取", this.data.openid + '|' + this.data.timenow)


  }
})
