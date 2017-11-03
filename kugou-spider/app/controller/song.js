function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
const fetch = require('node-fetch');

module.exports = class extends Base {

  indexAction() {
    var _this = this;

    return _asyncToGenerator(function* () {

      const result = yield _this.cache("http://m.kugou.com/", function () {
        return _this.getHtml("http://m.kugou.com/", function ($) {
          let data = {
            "banners": [],
            "songs": []
          };
          $('.swipe-wrap a').each(function (i, elem) {
            let item = $(this);
            data["banners"][i] = {
              url: item.attr("href"),
              img: item.find("img").attr("src")
            };
          });

          $('.panel-songslist-item').each(function (i, elem) {
            let item = $(this);
            data["songs"][i] = {
              id: item.attr("id"),
              title: item.find(".panel-songs-item-name").text().trim()
            };
          });
          return data;
        });
      });

      return _this.success(result);
    })();
  }

  topAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {

      const result = yield _this2.cache("http://m.kugou.com/rank/list", function () {
        return _this2.getHtml("http://m.kugou.com/rank/list", function ($) {
          let data = [];
          $('.panel-img-list li').each(function (i, elem) {
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

      return _this2.success(result);
    })();
  }

  topDetailAction() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      let url = _this3.get("url") || "http://m.kugou.com/rank/info/6666";
      var result = yield _this3.getHtml(url, function ($) {
        let data = {
          "title": $(".page-title").text().trim(),
          "img": $(".rank-info-hd img").attr("src"),
          "time": $(".rank-info-hd .rank-info-time").text().trim(),
          "songs": []
        };
        $('.panel-songslist-item').each(function (i, elem) {
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
      return _this3.success(result);
    })();
  }

  playListAction() {
    var _this4 = this;

    return _asyncToGenerator(function* () {

      const result = yield _this4.cache("http://m.kugou.com/plist/index", function () {
        return _this4.getHtml("http://m.kugou.com/plist/index", function ($) {
          let data = [];
          $('.panel-img-list li').each(function (i, elem) {
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
      return _this4.success(result);
    })();
  }

  playListDetailAction() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      let url = _this5.get("url") || "http://m.kugou.com/plist/list/191005";
      var result = yield _this5.getHtml(url, function ($) {
        let data = {
          "img": $("#imgBoxInfo img").attr("src"),
          "title": $(".page-title").text().trim(),
          "detail": $("#introBox").text().trim(),
          "songs": []
        };
        $('.panel-songslist-item').each(function (i, elem) {
          let item = $(this);
          data["songs"][i] = {
            id: item.attr("id"),
            title: item.find(".panel-songs-item-name").text().trim()
          };
        });
        return data;
      });
      return _this5.success(result);
    })();
  }

  classAction() {
    var _this6 = this;

    return _asyncToGenerator(function* () {

      const result = yield _this6.cache("http://m.kugou.com/singer/class", function () {
        return _this6.getHtml("http://m.kugou.com/singer/class", function ($) {
          let data = [];
          let sub;
          $('.singer-class-list').each(function (i, elem) {
            sub = [];
            let item = $(this);
            item.find("li a").each(function (subIndex, subElem) {
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
      return _this6.success(result);
    })();
  }

  singerListAction() {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      let url = _this7.get("url") || "http://m.kugou.com/singer/list/88";
      var result = yield _this7.getHtml(url, function ($) {
        let data = {
          "title": $(".page-title").text().trim(),
          "singers": []
        };
        $('.singer-img-list li').each(function (i, elem) {
          let item = $(this);
          data["singers"][i] = {
            url: item.find("a").attr("href"),
            img: item.find("a img").attr("_src"),
            title: item.find(".panel-img-content-first").text().trim()
          };
        });
        return data;
      });
      return _this7.success(result);
    })();
  }

  singerAction() {
    var _this8 = this;

    return _asyncToGenerator(function* () {

      console.log(_this8.get("url"));

      var result = yield _this8.getHtml("http://m.kugou.com/singer/info/3060", function ($) {
        let data = {
          "img": $("#imgBoxInfo img").attr("src"),
          "title": $(".page-title").text().trim(),
          "detail": $("#introBox").text().trim(),
          "songs": []
        };
        $('.panel-songslist li').each(function (i, elem) {
          let item = $(this);
          data["songs"][i] = {
            id: item.attr("id"),
            title: item.find(".panel-songs-item-name").text().trim()
          };
        });
        return data;
      });
      return _this8.success(result);
    })();
  }

  searchAction() {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      let url = `http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=${encodeURIComponent(_this9.get("keyword"))}&page=1&pagesize=30&showtype=1`;
      console.log(url);
      var result = yield fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
        }
      }).then(function (res) {
        return res.text();
      });
      return _this9.json(result);
    })();
  }

  hotKeyWordAction() {
    var _this10 = this;

    return _asyncToGenerator(function* () {
      var result = yield fetch("http://mobilecdn.kugou.com/api/v3/search/hot?format=json&plat=0&count=30", {
        headers: {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
        }
      }).then(function (res) {
        return res.text();
      });
      return _this10.json(result);
    })();
  }

};
//# sourceMappingURL=song.js.map