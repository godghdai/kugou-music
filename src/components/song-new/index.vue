<template>
<scroll ref="scroll" class="wrapper" :data="songs" :pulldown="pulldown" @pulldown="loadData">

  <div class="content">
    <slider v-if="banners.length" ref="slider" class="banners">
      <div v-for="banner in banners" class="banners_wrap">
        <a href="javascript:;">
          <img :src="banner.img" alt="" />
        </a>
      </div>
    </slider>
    <ul>
      <li v-for="song in songs" class="song_con" @click="addSongToPlayList(song)">
        <div class="song">
          <span class="title">{{song.title}}</span>
        </div>
      </li>
    </ul>
  </div>
</scroll>

</template>

<script type="text/ecmascript-6">
import { mapActions } from 'vuex';
import Scroll from "base/scroll";
import { getIndexJson, ERR_OK } from "api";
import Slider from "base/slider";
export default {
  name: "singer",
  data() {
    return {
      pulldown: false,
      banners: [],
      songs: []
    };
  },
  watch: {},
  created() {
    this._getJson();
  },
  activated() {
    this.refresh();
  },
  methods: {
    ...mapActions([
     'addSongToPlayList'
    ]),
    refresh () {
      this.$refs.slider && this.$refs.slider.refresh();
    },
    _getJson() {
      getIndexJson().then(res => {
        if (res.errno === ERR_OK) {
          this.banners = res.data.banners;
          this.songs = res.data.songs;
          this.refresh();
        }
      });
    },
    loadData() {
      getIndexJson().then(res => {
        if (res.errno === ERR_OK) {
          this.songs = res.data.songs.concat(this.songs);
        }
      });
    }
  },
  components: {
    Slider,
    Scroll
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
 .wrapper
   height: 100%

 .banners
   height: 308pxx
   width: 754pxx
   .banners_wrap
     width:800%
   img,a
     height: 308pxx
     width: 754pxx
    a
      float:left

 .content
  padding-top:10pxx

 .song_con
   padding-left:24pxx
   font-size: $font-size-medium
   height: 148pxx
   width:100%
   display: table
   &:last-child .song
     border-bottom:none
   .song
    display: table-cell
    vertical-align: middle
    border-bottom: 1px solid #e5e5e5
    padding-right:100pxx
    .title
     color:#333
     line-height:48pxx
     display: table-cell
     vertical-align: middle
</style>
