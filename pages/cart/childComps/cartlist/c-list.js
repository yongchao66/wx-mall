// pages/cart/childComps/cartlist/c-list.js
const app = getApp()

Component({

	options: {
	  addGlobalClass: true
	},
  properties: {
		cartlist: {
			type: Array,
			value: []
		}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCheckClick(e) {
      const index = e.currentTarget.dataset.index;
      let currentId = this.properties.cartlist[index].id
      const goods = app.globalData.cartList.find( item => item.id == currentId)
      
      goods.checked = !goods.checked
      
      app.changeGoodsState(index, goods)
    },
    itemClick(e) {
      const id = e.currentTarget.dataset.id;

      wx.navigateTo({
        url: '/pages/detail/detail?id=' + id
      })
    },
    subClick(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent('sub', {index})
    },
    addClick(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent('add', {index})
    },
    delClick(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent('del', { index })   
    },
    onInput(e) {
      const index = e.currentTarget.dataset.index
      const value = e.detail.value
     
      this.triggerEvent('input', { index, value })
    }
  }
})
