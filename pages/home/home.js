import { getHomeMultidata, getHomeGoods } from '../../network/home'
import { POP, NEW, SELL, BACKTOP_DISTANCE } from '../../utils/const'

const types = [POP, NEW, SELL]

Page({

  data: {
    banners: [],
		recommends: [],
		tabTitle: ["流行", "新款", "精选"],
		goods: {
			'pop': {page: 0 ,list: []},
			'new': {page: 0 ,list: []},
			'sell': {page: 0 ,list: []}
		},
		currentType: POP,
    showBackTop: false,
    tabScrollTop: 0,
    isTabFixed: false,
  },

  onLoad: function (options) {
    this._getHomeMultidata()
		this._getHomeGoods(POP)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getHomeGoods(this.data.currentType);
  },

  /**
   * 监测滚动的位置
   */
  onPageScroll: function (options) {
    
    const flag = options.scrollTop >= BACKTOP_DISTANCE

    if (flag != this.data.showBackTop) {

      this.setData({
        showBackTop: flag
      })
    }

    const flag2 = options.scrollTop >= this.data.tabScrollTop

    if (flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  },

  onShareAppMessage: function(options) {

  },

  //图片加载完成后
  onImageLoad() {
    wx.createSelectorQuery().select('.tab-control').boundingClientRect(rect => {
      this.setData({
        tabScrollTop: rect.top
      })
    }).exec()
  },
	/**
	 * 点击相关事件
	 */

	tabClick(e) {

		const index = e.detail.index
		
		this.setData({
			currentType: types[index]
		})

		const flag = this.data.goods[this.data.currentType].page === 0
		if (flag) {
			this._getHomeGoods(this.data.currentType)
		}
	},
  //返回底部
  onBackTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
  },
	/**
	 * 网络请求相关
	 */
	_getHomeMultidata() {
		getHomeMultidata().then( res => {
			const banners = res.data.banner.list
			const recommends = res.data.recommend.list
			
			this.setData({
				banners,
				recommends
			})
		})
	},
	_getHomeGoods(type) {
		const goods = this.data.goods
		const page = goods[type].page + 1
		
		getHomeGoods(type, page).then( res => {
			
			const list = res.data.list
			
			goods[type].list.push(...list)
			goods[type].page = page
			
			this.setData({
				goods
			})
		})
	}
})