// pages/cart/childComps/cartfoot/c-foot.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    checked: {
      type: Boolean,
      value: false
    },
    price: {
      type: Number,
      value: 0
    },
    counter: {
      type: Number,
      value: 0
    }
  },
  methods: {
    AllSelectClick() {
      this.triggerEvent('allSelect')
    }
  }
})
