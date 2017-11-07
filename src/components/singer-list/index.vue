<template>
<div>
  <mhead></mhead>
  <div class="menu">
    <div class="back" @click="goback"></div>{{title}}
  </div>
  <div v-if="singers.length" class="main_con" >
    <scroll ref="scroll" class="wrapper" :data="singers" :pulldown="pulldown">
      <ul class="content">
        <li v-for="singer in singers" class="singer_con" @click="goDetail(singer.url)">
          <div class="singer">
            <img class="photo" v-lazy="singer.img" :_src="singer.img" alt="" />
            <div class="title">{{singer.title}}</div>
          </div>
        </li>
      </ul>
      <div class="loading-wrapper"></div>
    </scroll>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import Mhead from "base/head";
import Scroll from "base/scroll";
import { geSingerListJson, ERR_OK } from "api";
export default {
  name: "singer-list",
  data() {
    return {
      pulldown: false,
      title: "",
      singers: []
    };
  },
  watch: {},
  created() {},
  beforeRouteEnter(to, from, next) {
    geSingerListJson(to.params.url).then(res => {
      if (res.errno === ERR_OK) {
        next(vm => {
          vm.singers = res.data.singers;
          vm.title = res.data.title;
        });
      }
    });
  },
  activated() {
    setTimeout(() => {
      this.$refs.scroll && this.$refs.scroll.refresh();
    }, 20);
  },
  methods: {
    goDetail: function(url) {
      console.log(url);
      this.$router.push({ name: "singerDetail", params: { url } });
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

.menu {
  position: absolute;
  left: 0;
  top: 116pxx;
  height: 100pxx;
  background: #fff;
  text-align: center;
  z-index: 9;
  width: 100%;
  line-height: 100pxx;
  color: #4c4c4c;
  box-shadow: 0 8pxx 8pxx 0 #f4f4f4;

  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 120pxx;
    height: 100%;
    background: url('./goback.png') no-repeat 26pxx 26pxx;
    background-size: 30pxx 52pxx;
  }
}

.wrapper {
  height: 100%;
}

.main_con {
  position: absolute;
  left: 0;
  top: 216pxx;
  bottom: 0;
  right: 0;
  overflow: hidden;
  z-index: 8;
}

.singer_con {
  width: 100%;
  padding-top: 24pxx;
  padding-left: 26pxx;

  .singer {
    display: flex;
    border-bottom: 2px solid #e5e5e5;
    padding-bottom: 24pxx;
    align-items: center;

    .photo {
      width: 122pxx;
      height: 122pxx;
    }

    .title {
      margin-left: 36pxx;
      flex: 1;
      font-size: $font-size-medium;
    }
  }
}

.content :last-child .singer {
  border-bottom: none;
}
</style>
