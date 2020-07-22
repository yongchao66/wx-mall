import { getMenu, getSub, getSubtDetail } from '../../network/category'
import { POP, NEW, SELL } from '../../utils/const'

const types = [POP, NEW, SELL]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateMenu: [],
    tabTitle: ["推荐", "新款", "精选"],
    currentIndex: 0,
    cateSubData: {},
    currentType: POP,
    tabScrollTop: 0,
    isTabFixed: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMenu()
  },

  /**
   * 监测滚动的位置
   */
  onPageScroll: function (options) {

    const flag = options.scrollTop >= this.data.tabScrollTop
    console.log(flag)

    if (flag != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag
      })
    }
  },
	
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
	menuClick(e) {
    const currentIndex = e.detail.index
    const currentType = 'pop'

    this.setData({
      currentIndex,
      currentType
    })
    const flag = this.data.cateSubData[currentIndex].cateSub.length === 0
    
    if (flag) {
      this._getSub(currentIndex)
      this._getSubtDetail(currentIndex, currentType)
    }
	},
  tabClick(e) {
    const index = e.detail.index

    this.setData({
      currentType: types[index]
    })
   
    const flag = this.data.cateSubData[this.data.currentIndex].cateSubGoods[types[index]].length === 0
    if (flag) {
      this._getSubtDetail(this.data.currentIndex, types[index])
    }
   
  },
	_getMenu() {
		getMenu().then( res => {
			const cateMenu = res.data.category.list

      const cateSubData = {}
      //初始化每个类别的子数据
      cateMenu.forEach(function (item, index) {
        cateSubData[index] = {
          cateSub: [],
          cateSubGoods: {
            'pop': [],
            'new': [],
            'sell': []
          }
        }
      })

      this.setData({
        cateMenu,
        cateSubData
      })
     
			this._getSub(0)
			this._getSubtDetail(0, POP)
		})
	},
  _getSub(currentIndex) {
    const maitKey = this.data.cateMenu[currentIndex].maitKey

		getSub(maitKey).then( res => {

      const cateSubData = this.data.cateSubData
      cateSubData[currentIndex].cateSub = res.data.list

      this.setData({
        cateSubData
      })
      
		})
	},
  _getSubtDetail(currentIndex, type) {
    const miniWallkey = this.data.cateMenu[currentIndex].miniWallkey;

		getSubtDetail(miniWallkey, type).then( res => {
      
      const cateSubData = this.data.cateSubData
      cateSubData[currentIndex].cateSubGoods[type] = res

      this.setData({
        cateSubData
      })

		})
	}
})