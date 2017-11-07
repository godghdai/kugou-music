<template>
<div class="">
  <mhead></mhead>
  <div v-if="detail&&detail.title" class="menu">
    <div class="back" @click="goback"></div>{{detail.title}}
  </div>
  <div v-if="detail&&detail.title" class="main_con">
    <scroll ref="scroll" class="wrapper" :data="detail.songs" :pulldown="pulldown">
      <div class="content">
        <div class="banner">
          <img :src="detail.img" alt="" />
          <div class="mask">
            {{detail.time}}
          </div>
        </div>
        <ul v-if="detail&&detail.songs">
          <li v-for="song in detail.songs" class="song_con" @click="addSongToPlayList(song)">
            <div class="song">
              <div class="ico_number">{{song.num}}</div>
              <div class="title">
                {{song.title}}
              </div>
              <div class="ico_arrow"></div>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</div>

  </template>

<script type="text/ecmascript-6">
import { mapActions } from "vuex";
import Scroll from "base/scroll";
import Mhead from "base/head";
import { getTopDetailJson, ERR_OK } from "api";
export default {
  name: "top-detail",
  data() {
    return {
      pulldown: false,
      detail: null
    };
  },
  watch: {},
  beforeRouteEnter(to, from, next) {
    getTopDetailJson(to.params.url).then(res => {
      if (res.errno === ERR_OK) {
        next(vm => {
          vm.detail = res.data;
        });
      }
    });
  },
  created() {},
  activated() {
    setTimeout(() => {
      this.$refs.scroll && this.$refs.scroll.refresh();
    }, 20);
  },
  methods: {
    ...mapActions(["addSongToPlayList"]),
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

.wrapper {
  height: 100%;
}

.main_con {
  position: absolute;
  left: 0;
  top: 116pxx;
  bottom: 0;
  right: 0;
  overflow: hidden;
  z-index: 8;
}

.menu {
  position: absolute;
  left: 0;
  top: 116pxx;
  height: 100pxx;
  background: linear-gradient(top, rgba(0, 0, 0, 0.6), transparent);
  text-align: center;
  z-index: 9;
  width: 100%;
  line-height: 100pxx;
  color: #fff;

  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 120pxx;
    height: 100%;
    background: url('./goback_1.png') no-repeat 26pxx 26pxx;
    background-size: 30pxx 52pxx;
  }
}

.banner {
  overflow: hidden;
  height: 450pxx;
  width: 100%;
  position: relative;

  img {
    width: 100%;
    margin-top: -160pxx;
  }

  .mask {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100pxx;
    background: linear-gradient(bottom, rgba(0, 0, 0, 0.6), transparent);
    z-index: 9;
    width: 100%;
    color: #fff;
    font-size: $font-size-medium;
    line-height: 64pxx;
    padding-left: 40pxx;
  }
}

.song_con {
  padding-left: 26pxx;
}

.song {
  display: flex;
  height: 144pxx;
  line-height: 48pxx;
  align-items: center;
  border-bottom: 2px solid #e5e5e5;

  .ico_number {
    width: 72pxx;
    color: #999;
    font-size: 20pxx;
  }

  .title {
    flex: 1;
    color: #333333;
    font-size: $font-size-medium;
  }

  // text-overflow:ellipsis
  // white-space:nowrap
  // overflow:hidden
  .ico_arrow {
    width: 68pxx;
  }
}
</style>
