import {
  getDetail,
  gBaseInfo,
  gShopInfo,
  gParamInfo,
  getRecommends
} from '../../network/detail'

import { formatTime } from '../../utils/util'

const app = getApp()

Page({
 
  data: {
    id: '',
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    commentInfo: {},
    detailInfo: {},
    paramInfo: {},
    recommends: []
  },

  onLoad: function(options) {

    const id = options.id

    this.setData({
      id
    })

    this._getDetail(id)
    this._getRecommends()
  },

  // 跳转到购物车页面
  onToCart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

	// 加入购物车
  onAddCart() {
	  let product = {}

      product.id = this.data.id
      product.image = this.data.topImages[0]
      product.title = this.data.baseInfo.title
      product.desc = this.data.baseInfo.desc
      product.price = this.data.baseInfo.realPrice
      product.name = this.data.shopInfo.name
      product.logo = this.data.shopInfo.logo

    console.log(app.globalData.cartList)

    const bool = app.globalData.cartList.find((item) => item.id === product.id)

    app.addToCart(product)

    
    if (bool) {
      wx.showToast({
        title: '该商品数量加1',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '加入购物车成功',
        icon: 'none'
      })
    }
	},

  /**
    * 网络请求相关的方法
    */
  _getDetail(id) {
    getDetail(id).then(res => {

      const data = res.result

      //获取顶部图片信息
      const topImages = data.itemInfo.topImages

      //获取商品信息
      const baseInfo = new gBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)

      //获取店铺信息
      const shopInfo = new gShopInfo(data.shopInfo)

      //获取详情信息
      const detailInfo = data.detailInfo

      //获取参数信息
      const paramInfo = new gParamInfo(data.itemParams.info, data.itemParams.rule)

      //获取评论信息
      let commentInfo = {}
      
      if (data.rate.list) {
        commentInfo = data.rate.list[0];

        commentInfo.created = formatTime(new Date(commentInfo.created*1000))
      }

      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      const recommends = res.data.list
      this.setData({
        recommends
      })
    })
  }
})