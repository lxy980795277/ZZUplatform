// pages/Home/Home.js
const util = require('../../components/utils/utils.js')
Page({
  data: {
    goods_number:0, //数据的总条数 
    loadding: false,
    pullUpOn: true,
    good_index:6,
    price_sort:false,
    see_sort:false,
    date_sort:false,
    price_sorttime:0,
    state: false,
    first_click: false,
    sort_mask:false,
    if_login: false,
    search_name: "",     //搜索的名称
    type: 1,
    cardCur: 0,
    mask: false,   //点击发布后的阴影界面
    typelist: ['数码产品', '书籍资料', '电车自行车', '零食饮品', '护肤美妆', '运动器材', '男鞋女鞋', '衣服饰品', '生活用品', '其它'],
    typeiconlist: ['camera.png', 'book.png', 'bike.png', 'food.png', 'bottle.png', 'basketball.png', 'shoe.png', 'tshirt.png', 'goods.png', 'else.png'],



    btnList: [{
      bgColor: "#16C2C2",
      //图标/图片地址
      imgUrl: "../../icons/note.png",
      //图片高度 rpx
      imgHeight: 50,
      //图片宽度 rpx
      imgWidth: 50,
      //名称
      text: "发布",
      //字体大小
      fontSize: 34,
      //字体颜色
      color: "#fff"
    }, {
      bgColor: "#64B532",
      //图标/图片地址
      imgUrl: "../../icons/me.png",
      //图片高度 rpx
      imgHeight: 50,
      //图片宽度 rpx
      imgWidth: 50,
      //名称
      text: "我的",
      //字体大小
      fontSize: 34,
      //字体颜色
      color: "#fff"
    }],

    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://www.zzumarket.com/aa.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://www.zzumarket.com/aa.jpg'
    }, {
      id: 2,
      type: 'image',
        url: 'https://www.zzumarket.com/aa.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://www.zzumarket.com/aa.jpg'
    }, {
      id: 4,
      type: 'image',
        url: 'https://www.zzumarket.com/aa.jpg'
    }, {
      id: 5,
      type: 'image',
        url: 'https://www.zzumarket.com/aa.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    list: [],
    list_buy: [],
    list_init: [],
    list_buy_init: [],
  },

  showModal(e) {    //这个是物品分类相关函数 
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  onClick(e) {
    let index = e.detail.index
    switch (index) {
      case -1:
        util.toast("您点击了悬浮按钮")
        break;
      case 0:
        wx.navigateTo({
          url: "../../public/describe/describe"
        })
        break;
      case 1:
        wx.navigateTo({
          url: "../mypublic/mypublic"
        })
        break;
      default:
        break;
    }
  },
  add_goods: function (e) {      //物品发布准备界面
    wx.getSetting({     /*查看用户是否已经授权登录 */
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              console.log(res.userInfo)
              getApp().globalData.user_info = res.userInfo;
              getApp().globalData.user_name = userInfo.nickName;
              getApp().globalData.user_ava = userInfo.avatarUrl;

            }
          })
          wx.login({
            //获取code
            success: function (res) {
              var code = res.code; //返回code
              var appId = '...';
              var secret = '...';
              if (code) {
                wx.request({
                  url: 'https://www.zzumarket.com/getopenid.php',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名
                  data: {
                    code: code,
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    getApp().globalData.user_openid = res.data;
                  }
                })
              }
              else {
                console.log("获取用户登录态失败！");
              }
              var app = getApp();
              var openid = app.globalData.user_openid;
              console.log("用户的openid是", app.globalData.user_openid)
              /*console.log("用户的昵称是", getApp().globalData.user_info.nickName)
              console.log("用户的头像是", getApp().globalData.user_info.avatarUrl)*/

            }
          })

        }
        else {
          wx.showToast({
            title: '未授权',
            icon: "none"
          })
        }
      }
    })
    if (getApp().globalData.user_openid != "") {
      this.setData({
        mask: true,
      })
    }

  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },


  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  goto_goodadd: function (e) {     //跳转到发布界面
    var app = getApp();
    var id = app.globalData.user_openid;

    if (!id) {
      wx.showToast({
        title: '请先授权才能发布哦~',
        icon: 'none',
      })
    }
    else {
      if (id != "") {
        this.setData({
          mask: false,
        })
        console.log("已经获取到OPENID，允许发布")
        wx.navigateTo({        //跳转到发布
          url: '/public/describe/describe',
          success: function (res) {
            console.log(res);
          },

          fail: function () {
            //页面跳转失败!
          },
          complete: function () {
            //页面跳转成功!
          }
        })
      }
      else {
        wx.showToast({
          title: '用户信息错误！',
          icon: 'none',
        })
      }
    }


  },
  goto_goodsale: function (e) {
    var app = getApp();
    var id = app.globalData.user_openid;
    if (!id) {
      wx.showToast({
        title: '请先授权才能发布哦~',
        icon: 'none',
      })
    }
    else {
      if (id != "") {
        this.setData({
          mask: false,
        })
        console.log("已经获取到OPENID，允许发布")
        wx.navigateTo({        //跳转到发布
          url: '/public/describe/describe',
          success: function (res) {
            console.log(res);
          },

          fail: function () {
            //页面跳转失败!
          },
          complete: function () {
            //页面跳转成功!
          }
        })
      }
      else {
        wx.showToast({
          title: '用户信息错误！',
          icon: 'none',
        })
      }
    }
  },
  name_input: function (e) {
    var that = this;
    that.setData({
      name_input: e.detail.value,
    })
    console.log("查询的名字是", that.data.name_input)
  },

  type_search: function (e) {    //按分类查看商品的函数 
    var that = this;
    console.log("当前所选择的分类是", e.currentTarget.dataset.typename)
    wx.request({
      url: 'https://www.zzumarket.com/select_type.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        type: e.currentTarget.dataset.typename,
        buyorsale: this.data.type,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          wx.showToast({
            title: e.currentTarget.dataset.typename,
            icon: 'none',
          })
          that.setData({
            list: res.data[0],
            list_buy: res.data[0],
            modalName: null
          })
        }
        else {
          wx.showToast({
            title: '该分类暂无商品',
            icon: 'none',
          })
          that.setData({
            modalName: null,
            list:that.data.list_init
          })
        }

      }
    })
  },

  sort_price:function(e){
    var list_state=this.data.state
    var time = this.data.price_sorttime;
    time=time+1;
    if(time%2==1){
      this.setData({
        price_sort:true,
        first_click:true,
        mask:true,
        sorttime:time,
        see_sort:false,
        date_sort:false,
      })
    }
    else{
      this.setData({
        first_click: false,
        mask: false,
        price_sort:false,
        sorttime: time,
        see_sort: false,
        date_sort: false,
      })
    }
    if (list_state) {
      this.setData({
        state: false,
        mask: false,
        price_sort: false,
        see_sort: false,
        date_sort: false,
      });
    } else {
      this.setData({
        state: true
      });
    }
  },

  sort_see: function (e) {
    var list_state = this.data.state
    var time = this.data.price_sorttime;
    time = time + 1;
    if (time % 2 == 1) {
      this.setData({
        first_click: true,
        mask: true,
        sorttime: time,
        see_sort:true,
        date_sort:false,
        price_sort:false,
      })
    }
    else {
      this.setData({
        first_click: false,
        mask: false,
        sorttime: time,
        see_sort:false,
        date_sort: false,
        price_sort: false,
      })
    }
    if (list_state) {
      this.setData({
        state: false,
        mask: false,
        see_sort:false,
        date_sort: false,
        price_sort: false,
      });
    } else {
      this.setData({
        state: true
      });
    }
  },

  sort_date: function (e) {
    var list_state = this.data.state
    var time = this.data.price_sorttime;
    time = time + 1;
    if (time % 2 == 1) {
      this.setData({
        first_click: true,
        mask: true,
        sorttime: time,
        date_sort:true,
        price_sort:false,
        see_sort:false,
      })
    }
    else {
      this.setData({
        first_click: false,
        mask: false,
        sorttime: time,
        date_sort:false,
        price_sort: false,
        see_sort: false,
      })
    }
    if (list_state) {
      this.setData({
        state: false,
        mask: false,
        date_sort:false,
        price_sort: false,
        see_sort: false,
      });
    } else {
      this.setData({
        state: true
      });
    }
  },

  


  name_search: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.zzumarket.com/name_query.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        queryname: this.data.name_input,
        buyorsale: this.data.type,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          that.setData({
            list: res.data[0],
            list_buy: res.data[0],
            modalName: null
          })
        }
        else {
          wx.showToast({
            title: '没有查询到相关物品',
            icon: 'none',
          })
          that.setData({
            modalName: null,

          })
        }

      }
    })
  },

  hidemask: function () {
    this.setData({
      first_click: false,
      mask:false,
      state:false,
      price_sort:false,
      date_sort:false,
      see_sort:false,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  go_buy: function (e) {
    this.setData({        //初始化商品列表
      type: 1,
      list: this.data.list_init,
      list_buy: this.data.list_buy_init,
    })
  },
  go_sale: function (e) {
    this.setData({
      type: 0,
      list: this.data.list_init,
      list_buy: this.data.list_buy_init,
    })
  },
  goto_Search: function (e) {
    // 当点击 搜索 的时候，触发这个事件
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '/pages/Search/Search',
      success: function (res) {
        console.log(res);
      },

      fail: function () {
        //页面跳转失败!
      },
      complete: function () {
        //页面跳转成功!
      }
    })
  },
  goto_searchschool: function (e) {
    // 当点击 xx学校 的时候，触发这个事件
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '/pages/Search/Search',
      success: function (res) {
        console.log(res);
      },

      fail: function () {
        //页面跳转失败!
      },
      complete: function () {
        //页面跳转成功!
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



    



    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //console.log("当前时间戳为：" + timestamp);
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
    var time = M + '-' + D;
    this.setData({
      today: time,
      pullUpOn: true,
      good_index:6
    })

    wx.showToast({        //一个友好的提示，服务器访问完成后会关闭
      title: '加载中',
      icon: 'loading',
      duration: 100000
    })
    var a = new Date().getTime();
    var b = new Date();
    var t1 = new Date("2019/09/20 8:20:00")
    var t2 = new Date()
    console.log(new Date(t2 - t1).getTime() / 1000 / 60)
    //console.log(a/1000/60/60/24/365)
    var that = this;
    wx.request({
      url: 'https://www.zzumarket.com/select.php', //服务器地址
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


    wx.request({
      url: 'https://www.zzumarket.com/select_count.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        name: 'bob'//请求参数
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("一共有"+res.data+"条数据")
        that.setData({
          goods_number:res.data
        })
        wx.hideToast()
      }
    })

  },
  goto_details: function (e) {
    var that = this;
    wx.navigateTo({        //跳转到发布朋友圈的界面
      url: '/trade/goods_details/goods_details?openid=' + e.currentTarget.dataset.openid,
      success: function (res) {
        console.log(res);
      },

      fail: function () {
        //页面跳转失败!
      },
      complete: function () {
        //页面跳转成功!
      }
    })
    var app = getApp();
    console.log("编号 ：", e.currentTarget.dataset.id);
    console.log("名称 ：", e.currentTarget.dataset.name);
    console.log("类别 ：", e.currentTarget.dataset.type);
    console.log("价格 ：", e.currentTarget.dataset.money);
    console.log("电话 ：", e.currentTarget.dataset.people_phone);
    console.log("浏览 ：", e.currentTarget.dataset.see);
    app.globalData.goods_id = e.currentTarget.dataset.id;
    console.log("全局变量的值 goods_details已经变成：", app.globalData.goods_id)
    wx.request({
      url: 'https://www.zzumarket.com/see_add.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        name: 'bob',//请求参数
        id: e.currentTarget.dataset.id,
        see: e.currentTarget.dataset.see,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("成功")
        console.log("浏览量已经更新为 ：", res.data);
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

  },

  price_sort1: function (e) {
    var that = this
    wx.request({
      url: 'https://www.zzumarket.com/sort_byprice.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        sort_way: 1,
        buyorsale: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          that.setData({
            list: res.data[0],
          })
        }
        else {
          wx.showToast({
            title: '系统错误',
            icon: 'none',
          })
        }
      }
    })
    that.setData({
      date_sort: false,
      price_sort: false,
      see_sort: false,

    })
  },

  price_sort2: function (e) {
    var that = this
    wx.request({
      url: 'https://www.zzumarket.com/sort_byprice.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        sort_way: 0,
        buyorsale: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          that.setData({
            list: res.data[0],
          })
        }
        else {
          wx.showToast({
            title: '系统错误',
            icon: 'none',
          })
        }
      }
    })
    that.setData({
      date_sort: false,
      price_sort: false,
      see_sort: false,

    })
  },

  see_sort1: function (e) {
    var that = this
    wx.request({
      url: 'https://www.zzumarket.com/sort_bysee.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        sort_way: 1,
        buyorsale: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          that.setData({
            list: res.data[0],
          })
        }
        else {
          wx.showToast({
            title: '系统错误',
            icon: 'none',
          })
        }
      }
    })
    that.setData({
      date_sort: false,
      price_sort: false,
      see_sort: false,

    })
  },

  see_sort2: function (e) {
    var that = this
    wx.request({
      url: 'https://www.zzumarket.com/sort_bysee.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        sort_way: 0,
        buyorsale: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          that.setData({
            list: res.data[0],
          })
        }
        else {
          wx.showToast({
            title: '系统错误',
            icon: 'none',
          })
        }
      }
    })
    that.setData({
      date_sort: false,
      price_sort: false,
      see_sort: false,

    })
  },

  date_sort1: function (e) {
    var that = this
    wx.request({
      url: 'https://www.zzumarket.com/sort_bydate.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        sort_way: 1,
        buyorsale: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          that.setData({
            list: res.data[0],
          })
        }
        else {
          wx.showToast({
            title: '系统错误',
            icon: 'none',
          })
        }
      }
    })
    that.setData({
      date_sort: false,
      price_sort: false,
      see_sort: false,

    })
  },

  date_sort2: function (e) {
    var that = this
    wx.request({
      url: 'https://www.zzumarket.com/sort_bydate.php', //服务器地址
      //url: 'http://www.zzumarket.com',
      data: {
        sort_way: 0,
        buyorsale: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data[0])
          that.setData({
            list: res.data[0],
          })
        }
        else {
          wx.showToast({
            title: '系统错误',
            icon: 'none',
          })
        }
      }
    })
    that.setData({
      date_sort: false,
      price_sort: false,
      see_sort: false,

    })
  },

  onPullDownRefresh: function () {
    //延时为了看效果
    setTimeout(() => {
      this.setData({
        productList: this.data.loadData,
        pageIndex: 1,
        pullUpOn: true,
        loadding: false
      })
      wx.stopPullDownRefresh()
      wx.showToast({
        title: '刷新成功',
        icon: "none"
      })
    }, 200)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("执行下拉加载函数")
    if (!this.data.pullUpOn)
    {
      setTimeout(() => {

        wx.showToast({
          title: '暂无更多商品~',
          icon: "none"
        })
      }, 200)
      return;
    } 
    var index_now = this.data.good_index   //获取当前记录的下标
    console.log("当前商品的下标是 "+index_now)
    var that = this;
    var increase = 3;
    /*this.setData({
      loadding: true
    },() => {
      if (this.data.pageIndex == 3) {
        this.setData({
          loadding: false,
          pullUpOn: false
        })
      } else {
        this.setData({
          productList: this.data.productList.concat(this.data.loadData),
          pageIndex: this.data.pageIndex + 1,
          loadding: false
        })
      }
    })*/
    this.setData({
      loadding: true
    })
    if(index_now + increase >=this.data.goods_number){
      increase = this.data.goods_number - index_now;
    }
    if(index_now<this.data.goods_number){
      //再次读取一批数据
      //再次读取一批数据
      //再次读取一批数据
      wx.request({
        url: 'https://www.zzumarket.com/select_more.php', //服务器地址
        //url: 'http://www.zzumarket.com',
        data: {
          number: index_now,
          number1: increase 
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data) {
            that.setData({
              list: that.data.list.concat(res.data[0]),
              good_index:index_now+increase
            })
          }
          else {
            wx.showToast({
              title: '系统错误',
              icon: 'none',
            })
          }
        }
      })
      //再次读取一批数据
      //再次读取一批数据
    }
    else{         //如果没有更多数据了 提醒用户已经到底了
      this.setData({
        loadding: false,
        pullUpOn: false
      })
      setTimeout(() => {

        wx.showToast({
          title: '暂无更多商品~',
          icon: "none"
        })
      }, 200)
      
    }
  },

  return_sort:function(e){
    this.setData({
      list:this.data.list_init,
      
        date_sort: false,
        price_sort: false,
        see_sort: false,
      
    })
  }
})