import * as types from './mutation-types';
import { getSongInfoJson } from "api";
export const addSongToPlayList = function ({ commit, state }, song) {
     let playlist = state.playlist.slice();
     getSongInfoJson(song).then(info => {
      "http://imge.kugou.com/stdmusic/100/20150717/20150717160416784222.jpg"
         song["album_img"] = info.album_img;
         song["fileName"] = info.fileName;
         song["imgUrl"] = info.imgUrl;
         song["playurl"] = info.url;
         playlist.push(song);
         commit(types.SET_PLAYLIST, playlist);
         commit(types.SET_CURRENT_INDEX, playlist.length - 1);
         console.log(song);
     });
}
