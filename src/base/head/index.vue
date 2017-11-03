<template>
   <div class="head">
    <div class="logo"></div>
    <div class="search" @click="goSearch"></div>
   </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'head',
  methods: {
    goSearch: function(id) {
      this.$router.push({ name: "search", params: {} });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.head
  position:relative
  height:116pxx
  background:#2ca2f9
  z-index:100
  .logo
   float:left
   margin-top:24pxx
   margin-left:24pxx
   width:264pxx
   height:62pxx
   background: url(./logo.png) no-repeat;
   background-size: 264pxx 62pxx;
  .search
   float:right
   margin-top:36pxx
   margin-right:24pxx
   width:48pxx
   height:48pxx
   background: url(./search.png) no-repeat;
   background-size: 48pxx 48pxx;
</style>
