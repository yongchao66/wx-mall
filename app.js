//app.js
App({
  onLaunch: function () {
    
  },

  addToCart(obj) {
    // 判断是否已经添加进来
    const oldInfo = this.globalData.cartList.find( (item) => item.id === obj.id)
    
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      obj.count = 1
      obj.checked = false
      this.globalData.cartList.push(obj)
      wx.setStorageSync('goods', this.globalData.cartList)
    }
    
    // 购物车回调
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  },
  globalData: {
    cartList: wx.getStorageSync('goods') || [],
    canIUse: wx.canIUse('button.open-type.contact')
  }
})