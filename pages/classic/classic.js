// pages/classic/classic.js
import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData:null,
    likeStatus:false,
    favNums:0,
    first:false,
    last:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((data)=>{
      this.setData({
        classicData:data,
        likeStatus:data.like_status,
        favNums:data.fav_nums
      })
    })
  },

  handleLike (e) {
    let behavior = e.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },

  onNext (e) {
    this._updateClassicData('next')
  },

  onPrev (e) {
    this._updateClassicData('previous')
  },

  _updateClassicData (dir) {
    let index = this.data.classicData.index
    classicModel.getClassicData(index, dir, (data)=>{
      this._getLikeStatus(data.id, data.type)
      this.setData({
        classicData: data,
        first:classicModel.isFirst(data.index),
        last:classicModel.isLast(data.index)
      })
    })
  },

  _getLikeStatus (artId, type) {
    likeModel.getClassicLikeStatus(artId, type, (data)=>{
      this.setData({
        likeStatus:data.like_status,
        favNums:data.fav_nums
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})