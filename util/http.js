import {
  config
} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1007: 'url路径错误',
  1005: '不正确的开发者key',
  3000: '该期内容不存在'
}

class HTTP {
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          let errorCode = res.data.error_code
          this._showError(errorCode)
        }
      },
      fail: (err) => {
        this._showError(1)
      }
    })
  }

  _showError(errorCode) {
    if (!errorCode) {
      errorCode = 1
    }
    wx.showToast({
      title: tips[errorCode],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}