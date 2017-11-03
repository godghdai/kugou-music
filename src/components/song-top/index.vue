<template>
<scroll ref="scroll" class="wrapper" :data="tops" :pulldown="pulldown" @pulldown="loadData">
  <ul class="content">
    <li v-for="top in tops" class="top_con" @click="itemclick(top.url)">
      <div class="top">
        <img class="photo" v-lazy="top.img" alt="" />
        <span class="title">{{top.title}}</span>
        <div class="ico_arrow"></div>
      </div>
    </li>
  </ul>
  <div class="loading-wrapper"></div>
</scroll>

</template>

<script type="text/ecmascript-6">
import Scroll from "base/scroll";
import { getTopJson, ERR_OK } from "api";
export default {
  name: "top",
  data() {
    return {
      pulldown: false,
      tops: []
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
    itemclick: function(url) {
      this.$router.push({ name: "songTopDetail", params: { url } });
    },
    _getJson() {
      getTopJson().then(res => {
        if (res.errno === ERR_OK) {
          this.tops = res.data;
          this.$nextTick(() => {
          });
        }
      });
    },
    loadData() {
      getTopJson().then(res => {
        this.tops = res.data.concat(this.data);
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

.top_con
  overflow:hidden
  padding-left:24pxx
  &:last-child .top
    border-bottom:none
 .top
   padding-top:26pxx
   height:248pxx
   border-bottom:1px solid #e5e5e5
   box-sizing: border-box
 .photo
   float:left
   width:194pxx
   height:194pxx
 .title
   margin-left:40pxx
   float:left
   height:194pxx
   line-height:194pxx
   font-size:$font-size-medium
 .ico_arrow
   float:right
   width:80pxx
   height:100%
   background: url(./arrow_icon.png) no-repeat 36pxx 80pxx;
   background-size: 20pxx 36pxx;

</style>
