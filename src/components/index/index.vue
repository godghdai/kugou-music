<template>
<div >
  <mhead></mhead>
  <ul class="tab">
    <li class="tab-item">
      <router-link to="songNew">新歌</router-link>
    </li>
    <li class="tab-item">
      <router-link to="songTop">排行</router-link>
    </li>
    <li class="tab-item">
      <router-link to="songList">歌单</router-link>
    </li>
    <li class="tab-item">
      <router-link to="singerCategory">歌手</router-link>
    </li>
  </ul>
  <div class="tab_content">
      <router-view></router-view>
  </div>
</div>

</template>

<script type="text/ecmascript-6">
import Mhead from "base/head";

export default {
  name: 'index',
  data () {
    return {

    };
  },
  components: {
    Mhead
  },
  watch: {
     '$route' (to, from) {
       // const toDepth = to.path.split('/').length;
        // const fromDepth = from.path.split('/').length;
        // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
     }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .tab
    position:absolute
    top:116pxx
    left:0
    display:flex
    width:100%
    padding:0 5px
    box-sizing: border-box
    height:128pxx
    line-height:118pxx
    background: #fff
    box-shadow: 0 10pxx 10pxx 0 #f4f4f4
    z-index:99
    .tab-item
      flex:1
      text-align:center
      & > a
        display:block
        width:100%
        font-size:40pxx;
        color: #4d555d;
        box-sizing: border-box
        border-bottom: 8pxx solid #fff;
        &.active
         border-bottom: 8pxx solid #33a3f5;

  .tab_content
    position:absolute
    left:0
    top:242pxx
    bottom:0
    right:0
    overflow:hidden


</style>
