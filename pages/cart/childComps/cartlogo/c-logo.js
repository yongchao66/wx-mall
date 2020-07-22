// pages/cart/childComps/cartlogo/c-logo.js
Component({

  methods: {
    buttonClick() {
      wx.switchTab({
        url: '/pages/home/home'
      })
    }
  }
})
