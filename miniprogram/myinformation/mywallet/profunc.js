function OcrIdCard(access_token){
  return new Promise(function(resolve,reject){
    var that = this;
    //识别身份证
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res.tempFilePaths)
        getApp().globalData.idcard_image =  res.tempFilePaths[0]
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64', //编码格式
          success(ans) {
            // console.log(ans.data)
            wx.showLoading({ title: '识别中' })
            wx.request({
              url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=' + access_token,
              method: 'POST',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                image: ans.data,
                id_card_side: 'front'
              },
              success(_res) {
                wx.hideLoading();
                resolve(_res)
                
              }, fail(_res) {
                wx.hideLoading();
                wx.showToast({
                  title: '请求出错',
                })
                reject(_res)
              }
            })
          }
        })
      }
    })
  })
}

module.exports = {
  OcrIdCard: OcrIdCard
}