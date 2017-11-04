export const playing = state => state.playing;

export const currentIndex = state => state.currentIndex;

export const fullScreen = state => state.fullScreen;

export const playlist = state => state.playlist;

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
