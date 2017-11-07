<template>
   <div class="app">
      <router-view></router-view>
      <ul class="playlist">
        <li v-for="singer in playlist">
          <div class="singer">
            <div class="title">{{singer.title}}</div>
          </div>
        </li>
      </ul>
      <player></player>
   </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import player from "components/player";
export default {
  data() {
    return {
      transitionName: ''
    };
  },
   computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  watch: {
  '$route' (to, from) {
   // const toDepth = to.path.length;
   // const fromDepth = from.path.length;
   // this.transitionName = toDepth > fromDepth ? 'slide-left' : 'slide-right';
  }
  },
  created() {

  },
  components: {
    player
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 .app
   height:100%
   margin:auto 0
/*
.slide-left-enter-active,.slide-right-enter-active
  transition: all .2s ease

.slide-left-leave-active,.slide-right-leave-active
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-left-enter, .slide-left-leave-to
  opacity: 0
  // transform: translate(-750pxx, 0)

.slide-right-enter, .slide-right-leave-to
  opacity: 0
  // transform: translate(750pxx, 0)
*/
 .playlist
   position:absolute
   left:0
   bottom:0
   z-index:8
   display:none
</style>
