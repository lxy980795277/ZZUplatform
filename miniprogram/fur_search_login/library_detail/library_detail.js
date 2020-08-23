// fur_search_login/library_detail/library_detail.js
const util = require('../../components/utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_index:0,
    book_name:"",
    books_content:[],
  },

  sure:function(e){
    var that = this;
    console.log("用户点击了搜索")
    console.log("书名是"+that.data.book_name)
    wx.showLoading({
      title: '搜索中',
    })
    wx.request({
      url: decodeURIComponent('https://www.zzumarket.com/book.php'),
      data: {
        key:that.data.book_name,
        i:that.data.page_index
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          books_content:res.data
        })
        
        console.log(res.data)
        wx.hideLoading({
          complete: (res) => {
            wx.showToast({
              title: '查询成功',
              duration:1000
            })
          },
        })
       
      },
      fail: function () {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
          duration: 2000
        })

      },
    })
  },
  search:function(e){
    this.setData({
      book_name: e.detail.value
    });
    console.log("输入的书名是"+this.data.book_name)
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var bookname = options.bookname;
    console.log("传过来的书名是", bookname)
    that.setData({
      book_name:bookname
    })


    wx.showLoading({
      title: '搜索中',
    })
    wx.request({
      url: decodeURIComponent('https://www.zzumarket.com/book.php'),
      data: {
        key:that.data.book_name,
        i:that.data.page_index
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          books_content:res.data
        })
        console.log(res.data)
        wx.hideLoading({
          complete: (res) => {
            wx.showToast({
              title: '查询成功',
              duration:1000
            })
          },
        })
      },
      fail: function () {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
          duration: 2000
        })
      },
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
    var that = this
    var index_now = that.data.page_index;
    index_now = index_now+1;
    that.setData({
      page_index:index_now
    })
    console.log("现在的页数是"+that.data.page_index)

    wx.showLoading({
      title: '搜索中',
    })
    wx.request({
      url: decodeURIComponent('https://www.zzumarket.com/book.php'),
      data: {
        key:that.data.book_name,
        i:index_now
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data==0){
          wx.showToast({
            title: '没有更多了~',
            icon:'none'
          })
        }
        else{
          that.setData({
            books_content:that.data.books_content.concat(res.data)
          })
          console.log(res.data)
          console.log(that.data.books_content)
          wx.hideLoading({
          })
        }
        
       
      },
      fail: function () {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
          duration: 2000
        })

      },
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})