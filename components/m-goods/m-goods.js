Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    goodlist: {
      type: Array,
      value: []
    }
  },
	data: {
		
	},
	methods: {
		itemClick(e) {
			let id = e.currentTarget.dataset.id
      
			wx.navigateTo({
			  url: '/pages/detail/detail?id=' + id,
			})
		}
	}
})

