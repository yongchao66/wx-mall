Component({

	properties: {
		catemenu: {
			type: Array,
			value: []
		}
	},
	data: {
		currentIndex: 0
	},
	methods: {
	  itemClick(e) {
	    const index = e.currentTarget.dataset.index;

	    this.setData({
	      currentIndex: index
	    })
	
      this.triggerEvent('menuclick', { index })
	  }
	}
})
