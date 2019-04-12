// components/search/searchCmp.js
import { KeywordModel } from "../../models/keyword";
import { BookModel } from "../../models/book";
import { paginationBev } from "../behaviors/pagination";

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors:[paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type:String,
      observer:'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    searching:false,
    q:'',
    loadingCenter:false,
  },

  attached(){
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(e){
      this.initialize()
      this.triggerEvent('cancel',{},{})
    },

    onConfirm(e){
      this._showResult()
      this._showLoadingCenter()
      // this.initialize()
      const q = e.detail.value || e.detail.text
      this.setData({
        q
      })
      bookModel.search(0, q).then(res =>{
          this.setMoreData(res.books)
          this.setTotal(res.total)
          keywordModel.addToHistory(q)
          this._hideLoadingCenter()
        })
    },

    onDelete(e){
      this.initialize()
      this._closeResult()
    },

    loadMore(){
      if(!this.data.q){
        return
      }
      if(this.isLocked()){
        return
      }
      console.log('load more')
      // const length = this.data.dataArray.length
      if(this.hasMore()){
        // this.data.loading = true
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(res =>{
          this.setMoreData(res.books)
          // this.data.loading = false
          this.unLocked()
        }, ()=>{
          this.unLocked()
        })
      }
    },

    _showResult(){
      this.setData({
        searching: true
      })
    },

    _closeResult(){
      this.setData({
        searching: false,
        q:''
      })
    },

    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },

    _hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    },
  }
})
