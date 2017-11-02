<template>
<div>
  <slider v-if="banners.length" ref="slider" class="banners">
    <div v-for="banner in banners">
      <a href="javascript:;">
        <img :src="banner.img" alt="" />
      </a>
    </div>
  </slider>
  <div class="songs_con" >
    <scroll ref="scroll" class="wrapper" :data="songs" :pulldown="pulldown" @pulldown="loadData">
      <ul class="content">
        <li v-for="song in songs" class="song_con" @click="itemclick(12)">
          <div class="song"><span class="title">{{song.title}}</span></div>
        </li>
      </ul>
    </scroll>
  </div>
  <div>

  </div>

</div>



</template>

<script type="text/ecmascript-6">
import Scroll from "base/scroll";
import { getIndexJson, ERR_OK } from "api";
import Slider from "base/slider";
export default {
  name: "singer",
  data() {
    return {
      pulldown: true,
      banners: [],
      songs: []
    };
  },
  watch: {},
  created() {
    this._getJson();
  },
  activated() {
    setTimeout(() => {
      this.$refs.slider && this.$refs.slider.refresh();
    }, 20);
  },
  methods: {
    itemclick: function(id) {
      this.$router.push({
        name: "songListDetail",
        params: {
          id
        }
      });
    },
    _getJson() {
      getIndexJson().then(res => {
        if (res.errno === ERR_OK) {
          this.banners = res.data.banners;
          this.songs = res.data.songs;
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

.banners
 height: 308pxx
 img,a
  height: 308pxx
  width: 100%

.songs_con
 position: absolute;
 left: 0;
 top: 308pxx
 bottom: 0
 overflow: hidden
 .wrapper
  height: 100%
  .song_con
   padding-left:24pxx
   font-size: $font-size-medium
   height: 148pxx
   width:100%
   display: table
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
