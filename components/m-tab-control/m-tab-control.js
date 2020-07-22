// components/m-tab-control/m-tab-control.js
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0,
  },
  methods: {
    tabClick(e) {
      let index = e.currentTarget.dataset.index;
			
      this.setData({
        currentIndex: index
      })

      this.triggerEvent('itemclick', { index })
    }
  }
})
