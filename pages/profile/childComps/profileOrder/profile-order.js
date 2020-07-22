// pages/profile/childComps/profileOrder/profile-order.js
Component({
  options: {
    addGlobalClass: true
  },
  data: {
		list: [
		  {
		    icon: 'icon-daifukuan',
		    title: '待付款'
		  },
		  {
		    icon: 'icon-daifahuo',
		    title: '待发货'
		  },
		  {
		    icon: 'icon-icon_daishouhuo2x',
		    title: '待收货'
		  },
		  {
		    icon: 'icon-pingjia',
		    title: '评价'
		  },
		  {
		    icon: 'icon-tuihuotuikuan-',
		    title: '退款/售后'
		  }
		]
  }
})
