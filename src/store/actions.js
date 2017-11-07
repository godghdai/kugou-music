import * as types from './mutation-types';
import { getSongInfoJson } from "api";
export const addSongToPlayList = function({ commit, state }, song) {
  let playlist = state.playlist.slice();
  getSongInfoJson(song).then(info => {
    song["album_img"] = info.album_img;
    song["fileName"] = info.fileName;
    song["imgUrl"] = info.imgUrl.replace("{size}", 100);
    song["playurl"] = info.url;
    song["songName"] = info.songName;
    song["singerName"] = info.singerName;
    playlist.push(song);
    commit(types.SET_PLAYLIST, playlist);
    commit(types.SET_CURRENT_INDEX, playlist.length - 1);
    console.log(song);
  });
}

export const playPrev = function({ commit, state }) {
  let prev = state.currentIndex - 1;
  let playlist = state.playlist;
  if (prev < 0) prev = playlist.length - 1;
  commit(types.SET_CURRENT_INDEX, prev);
}

export const playNext = function({ commit, state }) {
  let next = state.currentIndex + 1;
  let playlist = state.playlist;
  if (next > playlist.length - 1) next = 0;
  commit(types.SET_CURRENT_INDEX, next);
}
