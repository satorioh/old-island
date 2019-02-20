import { HTTP } from '../util/http.js'

class ClassicModel extends HTTP {
  // constructor() {
  //   super()
  // }

  getLatest(callBack){
    this.request({
      url:'classic/latest',
      success:(data) => {
        callBack(data)
        this._setLastIndex(data.index)
        let key = this._getKey(data.index)
        wx.setStorageSync(key, data)
      }
    })
  }

  getClassicData(index, dir, callBack){
    let key = dir == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url:'classic/' + index + '/' + dir,
        success:(data) => {
          wx.setStorageSync(this._getKey(data.index), data)
          callBack(data)
        }
      })
    } else {
      callBack(classic)
    }
  }

  isFirst (index) {
    return index == 1 ? true : false
  }

  isLast (index) {
    let lastIndex = this._getLastIndex()
    return lastIndex == index ? true : false
  }

  _setLastIndex (index) {
    wx.setStorageSync('lastIndex', index)
  }

  _getLastIndex () {
    return wx.getStorageSync('lastIndex')
  }

  _getKey (index) {
    return 'classic-' + index
  }
}

export {ClassicModel}