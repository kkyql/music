import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    RecommendSongList:null,
    currentPlayListInfo:null,
    currentListSongInfo:null,
    NewMusicList:{
      RecommendList:null,
      ElseList:null
    },
    play:{
      currentMusic:null,
      currentList:[],
      icon_state:false,
      List_state:false,
      detail_state:false,
      lyric:null,
      time:{
        currentTime:null,
        totalTime:null,
      }
    },
    filer:null,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
