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
