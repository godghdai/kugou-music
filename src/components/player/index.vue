<template>
  <div>
    <div class="minplayer">
      <img class="photo" :src="currentSong.imgUrl" alt=""/>
      <div class="info">
        <p class="song">{{currentSong.songName}}</p>
        <p class="singer">{{currentSong.singerName}}</p>
      </div>
      <div class="icos">
        <i :class="status" @click="toggle"></i>
        <i class="ico_prev" @click="playPrev"></i>
        <i class="ico_next" @click="playNext"></i>
      </div>
    </div>
    <audio ref="audio" :src="currentSong.playurl" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="end" @pause="paused"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex';
  export default {
    mixins: [],
    data() {
      return {
        songReady: false,
        playing: false
      }
    },
    computed: {
      ...mapGetters([
        'currentSong'
      ]),
      status() {
        return this.songReady ? "ico_pause" : "ico_loading";
      }
    },
    created() {

    },
    methods: {
      ...mapActions([
       'playPrev',
       'playNext'
      ]),
      ready() {
        this.songReady = true;
      },
      error() {
        this.songReady = true;
      },
      updateTime() {

      },
      end() {

      },
      paused() {

      },
      toggle() {

      }
    },
    watch: {
      currentSong(newSong, oldSong) {
         if (!this.ready) return;
         this.songReady = false;
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play();
          // this.getLyric()
        }, 1000);
      }
    },
    components: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable";
  .minplayer
    position:fixed
    height:152pxx
    width:100%
    left: 0;
    bottom: 0
    background: rgba(0,0,0,.9)
    color: #fff
    z-index:999
    .photo
      margin-top:8pxx
      margin-left:8pxx
      width:136pxx
      height:136pxx
      border-radius: 15pxx
      display: inline-block
      vertical-align: middle
    .info
      width: 65%
      display: inline-block
      vertical-align: middle
      .song
        width: 100%
        line-height: 1.7
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        font-size: 28pxx
        color: #fff
      .singer
        line-height: 1.3
        font-size: 24pxx
        color: #888
    .icos
      position: absolute
      top: 40pxx
      right: 20pxx
      .ico_play,.ico_prev,.ico_next,.ico_loading,.ico_pause
        width: 70pxx
        height: 70pxx
        display: inline-block
        vertical-align: middle
        cursor: pointer
        background-size: 100%
      .ico_loading
        background: url(./loading.png) no-repeat center
        transform-origin: center
        animation:rotate 1s linear infinite
      .ico_pause
        background: url(./pause_icon.png) no-repeat center
      .ico_play
        background: url(./play_icon.png) no-repeat center
      .ico_prev
        background: url(./prev_icon.png) no-repeat center
      .ico_next
        background: url(./next_icon.png) no-repeat center

  @keyframes rotate
    0%
      transform:rotate(0deg)
    50%
      transform:rotate(180deg)
    100%
      transform:rotate(360deg)
</style>
