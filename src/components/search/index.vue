<template>
  <div>
  <mhead></mhead>
  <div class="menu">
  <div class="back" @click="goback"></div>搜索</div>
  <div class="search_panel">
    <div class="wrap">
      <input type="text" v-model="hotword" placeholder="歌手/歌名/拼音"/>
      <span class="search_ico"></span>
    </div>
    <span class="search_bt" @click="search">搜索</span>
  </div>
  <div v-show="!showResult" class="hot_title">
     最近热门
  </div>
  <div v-if="hotKeyWords.length&&!showResult" class="hotKeyWordPanel" >
    <scroll ref="scroll_hotkeys" class="wrapper" :data="hotKeyWords" :pulldown="pulldown">
     <ul class="content">
        <li v-for="hotkeyword in hotKeyWords" class="keyword_con" @click="hotWordClick(hotkeyword.keyword)">
            <div class="keyword">{{hotkeyword.keyword}}</div>
        </li>
      </ul>
    </scroll>
  </div>
  <div v-show="showResult" class="result_title">
     共有{{total}}条结果
  </div>
  <div v-if="songs.length&&showResult" class="resultPanel" >
    <scroll ref="scroll_songs" class="wrapper" :data="songs" :pulldown="pulldown2">
     <ul class="content">
        <li v-for="song in songs" class="song_con" @click="addSongToPlayList(song)">
            <div class="title">{{song.filename}}</div>
            <div class="ico_play"></div>
        </li>
      </ul>
    </scroll>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Mhead from "base/head";
import Scroll from "base/scroll";
import { getSeachJson, getHotKeyWordJson } from "api";
export default {
  name: "singer-list",
  timer: null,
  data() {
    return {
      pulldown: false,
      pulldown2: false,
      showResult: false,
      hotword: "",
      hotKeyWords: [],
      total: 0,
      songs: []
    };
  },
  watch: {
    hotword() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.search();
      }, 500);
    }
  },
  created() {
    this.initHotKeyWord();
  },
  activated() {
    setTimeout(() => {
      this.$refs.scroll_hotkeys && this.$refs.scroll_hotkeys.refresh();
    }, 20);
  },
  methods: {
    addSongToPlayList(song) {
      this.$store.dispatch("addSongToPlayList", {
        id: song.hash,
        title: song.filename
      });
    },
    initHotKeyWord() {
      getHotKeyWordJson().then(res => {
        if (res.status === 1) {
          this.hotKeyWords = res.data.info;
        }
      });
    },
    search() {
      if (this.hotword.length === 0) {
        this.showResult = false;
        return;
      }
      getSeachJson(this.hotword).then(res => {
        if (res.status === 1) {
          this.showResult = true;
          this.songs = res.data.info;
          this.total = res.data.total;
        }
      });
    },
    hotWordClick(hotword) {
      this.hotword = hotword;
    },
    goback() {
      this.$router.go(-1);
    }
  },
  components: {
    Mhead,
    Scroll
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.menu {
  position: absolute;
  left: 0;
  top: 116pxx;
  height: 100pxx;
  background: #fff;
  text-align: center;
  z-index: 9;
  width: 100%;
  line-height: 100pxx;
  color: #4c4c4c;
  box-shadow: 0 8pxx 8pxx 0 #f4f4f4;

  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 120pxx;
    height: 100%;
    background: url('./goback.png') no-repeat 26pxx 26pxx;
    background-size: 30pxx 52pxx;
  }
}

.search_panel {
  position: absolute;
  top: 216pxx;
  left: 0;
  height: 128pxx;
  width: 100%;
  background: #fbfbfb;
  padding-top: 30pxx;
  padding-left: 26pxx;
  box-sizing: border-box;

  .wrap {
    float: left;
    position: relative;
    width: 552pxx;
    height: 70pxx;
    padding-top: 6pxx;
    padding-left: 64pxx;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 6pxx;
    overflow: hidden;

    .search_ico {
      display: block;
      position: absolute;
      top: 0;
      left: 12pxx;
      width: 45pxx;
      height: 70pxx;
      background: url('./search_icon.png') no-repeat;
      background-size: 45pxx 70pxx;
    }

    input {
      font-size: 32pxx;
      width: 472pxx;
      height: 40pxx;
      line-height: 40pxx;
      appearance: none;
      outline: none;
    }
  }

  .search_bt {
    float: right;
    display: block;
    margin-right: 26pxx;
    width: 120pxx;
    height: 70pxx;
    line-height: 70pxx;
    font-size: $font-size-medium;
    color: #959595;
    text-align: center;
    background: #e5e5e5;
    border: 1px solid #e5e5e5;
    border-radius: 6pxx;
    box-sizing: border-box;
  }
}

.hot_title {
  position: absolute;
  top: 340pxx;
  left: 0;
  height: 100pxx;
  width: 100%;
  border-bottom: 1px solid #cccccc;
  color: #2ca3f5;
  font-size: 28pxx;
  line-height: 100pxx;
  padding-left: 36pxx;
}

.hotKeyWordPanel {
  position: absolute;
  top: 440pxx;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  .wrapper {
    height: 100%;
  }

  .keyword_con {
    padding-left: 32pxx;
    height: 130pxx;
    line-height: 130pxx;

    &:last-child .keyword {
      border-bottom: none;
    }

    .keyword {
      font-size: $font-size-medium;
      border-bottom: 2px solid #e5e5e5;
      color: #333333;
    }
  }
}

.result_title {
  position: absolute;
  top: 340pxx;
  left: 0;
  height: 100pxx;
  width: 100%;
  border-bottom: 1px solid #cccccc;
  color: #2ca3f5;
  font-size: 28pxx;
  line-height: 100pxx;
  padding-left: 36pxx;
}

.resultPanel {
  position: absolute;
  top: 440pxx;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  .wrapper {
    height: 100%;
  }

  .song_con {
    padding-left: 32pxx;
    height: 130pxx;
    width: 100%;
    display: table;

    &:last-child .title {
      border-bottom: none;
    }

    .title {
      display: table-cell;
      padding-right: 80pxx;
      font-size: $font-size-medium;
      border-bottom: 1px solid #e5e5e5;
      color: #333333;
      line-height: 50pxx;
      vertical-align: middle;
    }
  }
}
</style>
