const base = "http://152.136.185.210:8000/api/n3"
const time = 5000

function request(options) {
  wx.showLoading({
    title: '加载中...',
  })

  return new Promise( (resolve, reject) => {
    wx.request({
      url: base + options.url,
      timeout: time,
      method: options.method || 'get',
      data: options.data,
      success: function(res) {
        resolve(res.data)
      },
      fail: reject,
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}

export default request