const app = getApp()

Page({

  data: {
    cartList: [],
    isShow: false,
    isSelectAll: false,
    totalPrice: 0,
    totalCount: 0
  },

  onLoad: function (options) {
    this.setData({
      cartList: app.globalData.cartList
    })

    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
    }

    // 设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      this.setData({
        [`cartList[${index}]`]: goods
      })
      
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })

      this.changeData()
    }
  },

  onShow() {
    if (this.data.cartList.length != 0) {
      wx.setNavigationBarTitle({
        title: `购物车(${this.data.cartList.length})`,
      })

      this.setData({
        isShow: true
      })
    }
  },

  // 某个商品的输入数量
  onInput(e) {
    const index = e.detail.index;
    let cartList = this.data.cartList
    let count = cartList[index].count

    count = e.detail.value.replace(/\-/g, "")
    cartList[index].count = count

    this.setData({
      [`cartList[${index}]`]: cartList[index]
    })
    
    this.changeData()
    wx.setStorageSync('goods', cartList)
  },
  
  // 增加某个商品的数量
  onAddCount(e) {
    this.changeCount(true, e)
  },

  // 减少某个商品的数量
  onSubCount(e) {
    this.changeCount(false, e)
  },

  changeCount(bool, e) {
    const index = e.detail.index;
    let cartList = this.data.cartList
    let count = cartList[index].count

    if (bool) {
      count ++;
    } else {
      if (count <= 1) {
        wx.showToast({
          title: '宝贝不能再少了',
          icon: 'none'
        })
        return false
      }
      count --;
    }
  
    cartList[index].count = count
    
    this.setData({
      [`cartList[${index}]`]: cartList[index]
    })
    
    this.changeData()
    wx.setStorageSync('goods',cartList)
  },

  // 删除商品
  onDelete(e) {
    let index = e.detail.index;
    let cartList = this.data.cartList
        cartList.splice(index, 1);
    this.setData({
      cartList
    })

    wx.setNavigationBarTitle({
      title: `购物车(${cartList.length})`
    })

    if (!cartList.length) {
      wx.setNavigationBarTitle({
        title: '购物车',
      })
      this.setData({
        isShow: false
      })
    }

    this.changeData()
    wx.setStorageSync('goods', cartList)
  },

  // 全选
  onSelectAll() {
    // 判断是否是全部选中
    if (this.data.isSelectAll) { // 目前全部选中
      this.data.cartList.forEach(item => item.checked = false)
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    } else { // 某些没选中
      this.data.cartList.forEach(item => item.checked = true)
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    }
    this.changeData()
  },
  
  changeData() {
    let totalCount = 0;
    let totalPrice = 0;
    
    for (let item of this.data.cartList) {
      if (item.checked) {
        totalCount ++
        totalPrice += item.price * item.count
      }
    }

    this.setData({
      totalPrice: totalPrice.toFixed(2),
      totalCount
    })
  }
})