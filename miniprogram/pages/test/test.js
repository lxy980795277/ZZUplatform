// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson:[{"col": "0", "row": "0", "rowspan": "2", "course_name": "金融风险管理", "teacher": "卫琳", "classroom": "2-9,北区9_201", "detail": "金融风险管理(773250.01) (卫琳)(2-9,北区9_201)", "id": 1}, {"col": "1", "row": "0", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "2", "row": "0", "rowspan": "2", "course_name": "金融风险管理", "teacher": "卫琳", "classroom": "2-9,北区9_201", "detail": "金融风险管理(773250.01) (卫琳)(2-9,北区9_201)", "id": 1}, {"col": "3", "row": "0", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "4", "row": "0", "rowspan": "4", "course_name": "IT创新创业教育", "teacher": "刘成明", "classroom": "2-9,不安排教室", "detail": "IT创新创业教育(771035.01) (刘成明)(2-9,不安排教室)", "id": 2}, {"col": "5", "row": "0", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "1", "row": "1", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "3", "row": "1", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "5", "row": "1", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "0", "row": "2", "rowspan": "2", "course_name": "人工智能", "teacher": "王兆成", "classroom": "2-9,北区9_202", "detail": "人工智能(773293.01) (王兆成)(2-9,北区9_202)", "id": 3}, {"col": "1", "row": "2", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "2", "row": "2", "rowspan": "2", "course_name": "人工智能", "teacher": "王兆成", "classroom": "2-9,北区9_202", "detail": "人工智能(773293.01) (王兆成)(2-9,北区9_202)", "id": 3}, {"col": "3", "row": "2", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "5", "row": "2", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "1", "row": "3", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "3", "row": "3", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "5", "row": "3", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "0", "row": "4", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "1", "row": "4", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "2", "row": "4", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "3", "row": "4", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "4", "row": "4", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "5", "row": "4", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "0", "row": "5", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "1", "row": "5", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "2", "row": "5", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "3", "row": "5", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "4", "row": "5", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "5", "row": "5", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "0", "row": "6", "rowspan": "2", "course_name": "人工智能", "teacher": "王兆成", "classroom": "4-9,北区8_407,北区8_408", "detail": "人工智能(773293.01) (王兆成)(4-9,北区8_407,北区8_408)", "id": 3}, {"col": "1", "row": "6", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "2", "row": "6", "rowspan": "2", "course_name": "人工智能", "teacher": "王兆成", "classroom": "4-9,北区8_407,北区8_408", "detail": "人工智能(773293.01) (王兆成)(4-9,北区8_407,北区8_408)", "id": 3}, {"col": "3", "row": "6", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "4", "row": "6", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "5", "row": "6", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "1", "row": "7", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "3", "row": "7", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "4", "row": "7", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "5", "row": "7", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "0", "row": "8", "rowspan": "2", "course_name": "工程实践", "teacher": "李翠霞", "classroom": "2-9,不安排教室", "detail": "工程实践(775193.41) (李翠霞)(10-17,不安排教室)科技论文写作(771030.18) (李翠霞)(2-9,不安排教室)", "id": 4}, {"col": "1", "row": "8", "rowspan": "2", "course_name": "社会实践", "teacher": "李翠霞", "classroom": "2-9,不安排教室", "detail": "社会实践(771034.18) (李翠霞)(2-9,不安排教室)", "id": 5}, {"col": "2", "row": "8", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "3", "row": "8", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "4", "row": "8", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "5", "row": "8", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "2", "row": "9", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "3", "row": "9", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "4", "row": "9", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}, {"col": "5", "row": "9", "rowspan": "1", "course_name": "", "teacher": "", "classroom": "", "detail": "", "id": 0}],
    color_list:["#f37b1d","#fbbd08","#8dc63f","#39b54a","#0081ff","#e03997","#a5673f","#8799a3","#9c26b0","#6739b6","#0081ff"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(that.data.lesson)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})