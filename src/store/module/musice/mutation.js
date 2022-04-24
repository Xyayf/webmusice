export default {
  setCurrentSong (state, song) {
    state.currentSong = song
    console.log(song)
  },
  setPlayList (state, song) {
    const index = state.playList.findIndex(item => item.id === song.id)
    if (index > -1) {
      state.playList.splice(index, 1)
    }
    state.playList.unshift(song)
    // console.log(state.playList)
  },
  toggleplayStatue (state, playStatue) {
    state.playStatue = playStatue
  },
  setPlayMode (state) {
    let mode = state.playMode
    mode++
    state.playMode = mode % 3
  }

}
