<template>
<scroll ref="scroll" class="wrapper" :data="playlist" :pulldown="pulldown" @pulldown="loadData">
  <ul class="content">
    <li v-for="play in playlist" class="play_con" @click="goDetail(play.url)">
      <div class="play">
        <img class="photo" v-lazy="play.img" alt="" />
        <div class="title">
          <p>{{play.title}}</p>
          <p class="play_info">
            <span class="ico_play"></span>
            <span class="play_count">{{play.playcount}}</span>
          </p>
        </div>
        <div class="ico_arrow"></div>
      </div>
    </li>
  </ul>
  <div class="loading-wrapper"></div>
</scroll>

</template>

<script type="text/ecmascript-6">
import Scroll from "base/scroll";
import { getPlayListJson, ERR_OK } from "api";
export default {
  name: "top",
  data() {
    return {
      pulldown: false,
      playlist: []
    };
  },
  watch: {},
  created() {
    this._getJson();
  },
   activated() {
      setTimeout(() => {
        this.$refs.scroll && this.$refs.scroll.refresh();
      }, 20);
    },
  methods: {
    goDetail: function(url) {
      console.log(url);
      this.$router.push({ name: "songListDetail", params: { url } });
    },
    _getJson() {
      getPlayListJson().then(res => {
        if (res.errno === ERR_OK) {
          this.playlist = res.data;
          this.$nextTick(() => {
          });
        }
      });
    },
    loadData() {
      getPlayListJson().then(res => {
        this.playlist = res.data.concat(this.data);
      });
    }
  },
  components: {
    Scroll
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
.wrapper
  height:100%

.play_con
  padding-left:24pxx
  &:last-child .play
    border-bottom:none
 .play
   padding-top:26pxx
   padding-bottom:24pxx
   height:248pxx
   border-bottom:1px solid #e5e5e5
   box-sizing: border-box
   display:flex
  .photo
    width:192pxx
    height:192pxx
  .title
    font-size: $font-size-medium
    padding-top:50pxx
    padding-left:38pxx
    box-sizing: border-box
    flex:1
    line-height:54pxx
  .ico_arrow
    width:80pxx
    height:100%
    background: url(./arrow_icon.png) no-repeat 36pxx 80pxx;
    background-size: 20pxx 36pxx;
  .play_info
    margin-top:-6pxx
  .ico_play
    display:inline-block
    height:24pxx
    width:24pxx
    background: url(./icon_music.png) no-repeat
    background-size: 100%
    vertical-align:middle
  .play_count
    margin-left:16pxx
    font-size:$font-size-smail
    color:#c5a89b
    line-height:$font-size-smail
    vertical-align:middle
</style>
