import * as types from './mutation-types'

const mutations = {
  [types.SET_PLAYING_STATE](state, status) {
    state.playing = status;
  },
  [types.SET_FULL_SCREEN](state, status) {
    state.fullScreen = status;
  },
  [types.SET_PLAYLIST](state, playlist) {
    state.playlist = playlist;
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  }
 }

export default mutations
