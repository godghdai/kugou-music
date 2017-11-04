<template>
<div class="">
  <mhead></mhead>
  <div v-if="detail&&detail.title" class="menu">
    <div class="back" @click="goback"></div>{{detail.title}}</div>
  <div v-if="detail&&detail.title" class="main_con">
    <scroll v-if="detail&&detail.songs" ref="scroll" class="wrapper" :data="detail.songs" :pulldown="pulldown">
      <div class="content">
        <div class="banner">
          <img :src="detail.img" alt="" />
        </div>
        <div class="banner_info" :class="{banner_info_open:isOpen}" @click="toggle">
          {{detail.detail}}
          <span :class="['ico',isOpen ? 'ico_open' : 'ico_close']"></span>
        </div>
        <ul v-if="detail&&detail.songs" class="songs_con">
          <li v-for="song in detail.songs" class="song_con" @click="addSongToPlayList(song)">
            <div class="song">
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
import { mapActions } from 'vuex';
import Scroll from "base/scroll";
import Mhead from "base/head";
import { getPlayListDetailJson, ERR_OK } from "api";

export default {
  name: 'singer',
  data () {
    return {
      pulldown: false,
      detail: null,
      isOpen: false
    };
  },
  watch: {
    detail () {
      this.refresh();
    }
  },
  beforeRouteEnter(to, from, next) {
    getPlayListDetailJson(to.params.url).then(res => {
      if (res.errno === ERR_OK) {
        next(vm => {
          vm.detail = res.data;
        });
      }
    });
  },
  activated() {
    setTimeout(() => {
     this.refresh();
    }, 20);
  },
  methods: {
     ...mapActions([
     'addSongToPlayList'
     ]),
     refresh() {
       this.$refs.scroll && this.$refs.scroll.refresh();
     },
     toggle() {
      this.isOpen = !this.isOpen;
      this.$nextTick(() => {
         this.refresh();
      });
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
.menu
  position:absolute
  left:0
  top:116pxx
  height:100pxx
  background: linear-gradient(top,rgba(0,0,0,.6),transparent)
  text-align: center
  z-index:9
  width:100%
  line-height:100pxx
  font-size:$font-size-medium
  color:#fff
  .back
    position:absolute
    left:0
    top:0
    width:120pxx
    height:100%
    background: url(./goback_1.png) no-repeat 26pxx 26pxx
    background-size: 30pxx 52pxx

.main_con
  position:absolute
  left:0
  top:116pxx
  bottom:0
  right:0
  overflow:hidden
  z-index:8

 .wrapper
   height:100%

.banner
  overflow:hidden
  height:450pxx
  width:100%
  position:relative
  img
    width:100%
    margin-top: -160pxx;

.banner_info
  position:relative
  padding-top:22pxx
  padding-left:32pxx
  padding-right:106pxx
  height:58pxx
  box-shadow: 0 8pxx 8pxx 0 #f4f4f4;
  font-size:$font-size-medium
  line-height:60pxx
  overflow:hidden
  .ico
    position:absolute
    top:20pxx
    right:20pxx
    display:block
    width:42pxx
    height:42pxx
    background-size: 42pxx 42pxx
  .ico_open
   background: url(./open_icon.png) no-repeat
  .ico_close
   background: url(./close_icon.png) no-repeat

.banner_info_open
  height:auto;

.song_con
  padding-left:26pxx
  &:last-child .song
    border-bottom:none

.song
  display:flex
  height:144pxx
  line-height:48pxx
  align-items: center
  border-bottom:2px solid #e5e5e5
  .title
    flex:1
    color:#333333
    font-size:$font-size-medium
    // text-overflow:ellipsis
    // white-space:nowrap
    // overflow:hidden
  .ico_arrow
    width:68pxx


</style>

