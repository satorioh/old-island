import { HTTP } from '../util/http.js'

class LikeModel extends HTTP {
  // constructor() {
  //   super()
  // }

  like(behavior, artId, type){
    let url = behavior == 'like' ? 'like' : 'like/cancel'
    this.request({
      url:url,
      method: 'POST',
      data: {
        art_id: artId,
        type: type
      },
    })
  }

  getClassicLikeStatus (artId, type, callback) {
    this.request({
      url: 'classic/' + type + '/' + artId + '/favor',
      success: callback
    })
  }
}

export {LikeModel}