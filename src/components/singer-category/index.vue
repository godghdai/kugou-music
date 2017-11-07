<template>
<scroll ref="scroll" class="wrapper" :data="categorylist" :pulldown="pulldown" @pulldown="loadData">
  <ul class="content">
    <li class="group_con" v-for="group in categorylist">
      <ul class="group">
        <li v-for="category in group" class="category" @click="goSingerList(category.id)">
          <span class="title">{{category.title}}</span>
          <div class="ico_arrow"></div>
        </li>
      </ul>
    </li>
  </ul>
  <div class="loading-wrapper"></div>
</scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from "base/scroll";
import { getClassJson, ERR_OK } from "api";
export default {
  name: "top",
  data() {
    return {
      pulldown: false,
      categorylist: []
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
    goSingerList: function(url) {
      this.$router.push({ name: "singerList", params: { url } });
    },
    _getJson() {
      getClassJson().then(res => {
        if (res.errno === ERR_OK) {
          this.categorylist = res.data;
          this.$nextTick(() => {});
        }
      });
    },
    loadData() {
      getClassJson().then(res => {
        this.categorylist = res.data.concat(this.data);
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

.wrapper {
  height: 100%;
}

.content {
  padding: 28pxx 26pxx;
  box-sizing: border-box;
}

.group_con {
  background: #fbfbfb;
  border: 2px solid #e4e4e4;
  border-radius: 8pxx;
  margin-bottom: 40pxx;
}

.category {
  height: 100pxx;
  line-height: 100pxx;
  border-bottom: 2px solid #e4e4e4;
  font-size: $font-size-medium;
  padding-left: 26pxx;
  padding-right: 26pxx;
  box-sizing: border-box;
  display: flex;

  .title {
    display:block
    flex: 1;
  }

  &:last-child {
    border-bottom: none;
  }

  .ico_arrow {
    width: 20pxx;
    background: url('./arrow_icon.png') no-repeat 0 32pxx;
    background-size: 20pxx 36pxx;
  }
}
</style>
