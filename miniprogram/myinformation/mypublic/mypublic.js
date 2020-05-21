Page({
  data: {
    TabCur: 0,
    categories: ['全部'],
    typic: [],
    scrollLeft: 0
    
  },
  tabSelect(e) {  //滑动选择四个导航栏
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  onLoad: function(options){
    
  }
})