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
    loading:false,
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
      this.triggerEvent('cancel',{},{})
    },

    onConfirm(e){
      this._showResult()
      this._showLoadingCenter()
      this.initialize()
      const q = e.detail.value || e.detail.text
      bookModel.search(0, q).then(res =>{
          this.setMoreData(res.books)
          this.setTotal(res.total)
          this.setData({
            q
          })
          keywordModel.addToHistory(q)
          this._hideLoadingCenter()
        })
    },

    onDelete(e){
      this._closeResult()
    },

    loadMore(){
      if(!this.data.q){
        return
      }
      if(this._isLocked()){
        return
      }
      console.log('load more')
      // const length = this.data.dataArray.length
      if(this.hasMore()){
        // this.data.loading = true
        this._locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(res =>{
          this.setMoreData(res.books)
          // this.data.loading = false
          this._unLocked()
        }, ()=>{
          this._unLocked()
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
        searching: false
      })
    },

    _isLocked(){
      return this.data.loading
    },

    _locked(){
      // this.data.loading = true
      this.setData({
        loading:true
      })
    },

    _unLocked(){
      // this.data.loading = false
      this.setData({
        loading:false
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
