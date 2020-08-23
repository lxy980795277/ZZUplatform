const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
var request = require('request')
// 定时器
exports.main = async(event, context) => {
  const appkey = 'TfAwQDWPZZlNWEThaxqabiNT';
  const appsecret = 'p4YPYIoBqSZVmvf0KkB3wM6egzwBjExn';
  var url = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + appkey + '&client_secret=' + appsecret;
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
    }, function(error, response, body) {

      if (!error && response.statusCode == 200) {
        console.log('通行证为' + body.access_token)
        resolve(body.access_token)
          //记得修改.doc('xxx') 中的内容
        db.collection('setconfig').doc('fdb5d5d75ea16fef000792930532bd0b').update({
          data: {
            value: body.access_token
          }

        }).then(res => {
          console.log('调用完成')
          console.log(res)
        })
      }
    })
  })
}