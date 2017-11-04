import { config } from './config.js';
import axios from 'axios';
export const ERR_OK = 0;
export function getIndexJson() {
    const url = config.baseURL + 'song/index';
    return axios.get(url, {
        params: {}
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function getTopJson() {
    const url = config.baseURL + 'song/top';
    return axios.get(url, {
        params: {}
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function getPlayListJson() {
    const url = config.baseURL + 'song/playList';
    return axios.get(url, {
        params: {}
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function getClassJson() {
    const url = config.baseURL + 'song/class';
    return axios.get(url, {
        params: {}
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function getTopDetailJson(url) {
    const baseurl = config.baseURL + 'song/topDetail';
    return axios.get(baseurl, {
        params: {url}
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function getPlayListDetailJson(url) {
    const baseurl = config.baseURL + 'song/playListDetail';
    return axios.get(baseurl, {
        params: {url}
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function geSingerListJson(url) {
    const baseurl = config.baseURL + 'song/singerList';
    return axios.get(baseurl, {
        params: {url}
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function getHotKeyWordJson(keyword) {
    const baseurl = config.baseURL + 'song/hotKeyWord';
    return axios.get(baseurl, {
        params: {keyword}
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function getSeachJson(keyword) {
    const baseurl = config.baseURL + 'song/search';
    return axios.get(baseurl, {
        params: {keyword}
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function getSongInfoJson(song) {
    let hash = song.id.replace("songs_", "");
    console.log(hash);
    const baseurl = config.baseURL + 'song/songInfo';
    return axios.get(baseurl, {
        params: {hash}
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}
