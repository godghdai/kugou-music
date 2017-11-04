<template>
    <audio ref="audio" :src="currentSong.playurl" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="end" @pause="paused"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  export default {
    mixins: [],
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'currentSong'
      ])
    },
    created() {

    },
    methods: {
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
  @import "~common/stylus/variable"
</style>
