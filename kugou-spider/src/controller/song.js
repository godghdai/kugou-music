const Base = require('./base.js');
const fetch = require('node-fetch');

module.exports = class extends Base {

  async indexAction() {

    const result = await this.cache("http://m.kugou.com/", () => {
      return this.getHtml("http://m.kugou.com/", function($) {
        let data = {
          "banners": [],
          "songs": []
        };
        $('.swipe-wrap a').each(function(i, elem) {
          let item = $(this);
          data["banners"][i] = {
            url: item.attr("href"),
            img: item.find("img").attr("src")
          };
        });

        $('.panel-songslist-item').each(function(i, elem) {
          let item = $(this);
          data["songs"][i] = {
            id: item.attr("id"),
            title: item.find(".panel-songs-item-name").text().trim()
          };
        });
        return data;
      });
    });

    return this.success(result);
  }

  async topAction() {

    const result = await this.cache("http://m.kugou.com/rank/list", () => {
      return this.getHtml("http://m.kugou.com/rank/list", function($) {
        let data = []
        $('.panel-img-list li').each(function(i, elem) {
          let item = $(this);
          data[i] = {
            url: item.find("a").attr("href"),
            img: item.find(".panel-img-left img").attr("_src"),
            title: item.find(".panel-img-content").text().trim()
          };
        });
        return data;
      });
    });

    return this.success(result);
  }

  async topDetailAction() {
    let url = this.get("url") || "http://m.kugou.com/rank/info/6666";
    var result = await this.getHtml(url, function($) {
      let data = {
        "title": $(".page-title").text().trim(),
        "img": $(".rank-info-hd img").attr("src"),
        "time": $(".rank-info-hd .rank-info-time").text().trim(),
        "songs": []
      };
      $('.panel-songslist-item').each(function(i, elem) {
        let item = $(this);
        data["songs"][i] = {
          id: item.attr("id"),
          num: item.find(".panel-songs-item-num").text().trim(),
          title: item.find(".panel-songs-item-name").text().trim(),
          order: item.find(".panel-songs-item-num").text().trim()
        };
      });
      return data;
    });
    return this.success(result);
  }

  async playListAction() {

    const result = await this.cache("http://m.kugou.com/plist/index", () => {
      return this.getHtml("http://m.kugou.com/plist/index", function($) {
        let data = [];
        $('.panel-img-list li').each(function(i, elem) {
          let item = $(this);
          data[i] = {
            url: item.find("a").attr("href"),
            img: item.find(".panel-img-left img").attr("_src"),
            title: item.find(".panel-img-content-first").text().trim(),
            playcount: item.find(".panel-img-content-sub").text().trim()
          };
        });
        return data;
      });
    });
    return this.success(result);
  }

  async playListDetailAction() {
    let url = this.get("url") || "http://m.kugou.com/plist/list/191005";
    var result = await this.getHtml(url, function($) {
      let data = {
        "img": $("#imgBoxInfo img").attr("src"),
        "title": $(".page-title").text().trim(),
        "detail": $("#introBox").text().trim(),
        "songs": []
      };
      $('.panel-songslist-item').each(function(i, elem) {
        let item = $(this);
        data["songs"][i] = {
          id: item.attr("id"),
          title: item.find(".panel-songs-item-name").text().trim()
        };
      });
      return data;
    });
    return this.success(result);
  }

  async classAction() {

    const result = await this.cache("http://m.kugou.com/singer/class", () => {
      return this.getHtml("http://m.kugou.com/singer/class", function($) {
        let data = [];
        let sub;
        $('.singer-class-list').each(function(i, elem) {
          sub = [];
          let item = $(this);
          item.find("li a").each(function(subIndex, subElem) {
            let sub_item = $(this);
            sub.push({
              id: sub_item.attr("href"),
              title: sub_item.text().trim()
            });
          });
          data.push(sub);
        });
        return data;
      });
    });
    return this.success(result);
  }

  async singerListAction() {
    let url = this.get("url") || "http://m.kugou.com/singer/list/88";
    var result = await this.getHtml(url, function($) {
      let data = {
        "title": $(".page-title").text().trim(),
        "singers": []
      };
      $('.singer-img-list li').each(function(i, elem) {
        let item = $(this);
        data["singers"][i] = {
          url: item.find("a").attr("href"),
          img: item.find("a img").attr("_src"),
          title: item.find(".panel-img-content-first").text().trim()
        };

      });
      return data;
    });
    return this.success(result);
  }


  async singerAction() {

    console.log(this.get("url"));

    var result = await this.getHtml("http://m.kugou.com/singer/info/3060", function($) {
      let data = {
        "img": $("#imgBoxInfo img").attr("src"),
        "title": $(".page-title").text().trim(),
        "detail": $("#introBox").text().trim(),
        "songs": []
      };
      $('.panel-songslist li').each(function(i, elem) {
        let item = $(this);
        data["songs"][i] = {
          id: item.attr("id"),
          title: item.find(".panel-songs-item-name").text().trim()
        };
      });
      return data;
    });
    return this.success(result);
  }

  async searchAction() {
    let url=`http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=${encodeURIComponent(this.get("keyword"))}&page=1&pagesize=30&showtype=1`;
    console.log(url)
    var result = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
        }
    }).then(function(res) {
        return res.text();
    });
    return this.json(result);
  }

  async hotKeyWordAction() {
    var result = await fetch("http://mobilecdn.kugou.com/api/v3/search/hot?format=json&plat=0&count=30", {
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
        }
    }).then(function(res) {
        return res.text();
    });
    return this.json(result);
  }


};
