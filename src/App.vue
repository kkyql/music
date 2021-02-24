<template>
  <div id="app" :style="`filter: hue-rotate(${$store.state.filer}deg)`">
    <template v-if="adver">
      <div class="adver" @mousewheel.prevent>
        <span>{{time}}秒后关闭</span>
      </div>
    </template>
    <template v-else>
      <PageNav v-if="$route.meta.isShow"></PageNav>
      <router-view></router-view>
      <MusicController :progressTime="progressTime"></MusicController>
      <PlayList v-if="$store.state.play.List_state"></PlayList>
      <Detail v-if="$store.state.play.detail_state" @setprogress="progressTime = $event"></Detail>
    </template>
  </div>
</template>

<script>
  import PageNav from './views/PageNav';
  import MusicController from '@/components/MusicController'
  import PlayList from '@/components/PlayList'
  import Detail from '@/components/Detail'
  export default {
    components:{
      PageNav,
      MusicController,
      PlayList,
      Detail
    },
    data(){
      return {
        adver:true,
        time:3,
        progressTime:null,
      }
    },
    mounted(){
      setInterval(()=>{
        this.time--;
      },1000)
      setTimeout(()=>{
        this.time=3;
        this.adver = false;
      },3500)
    }
  }
</script>

<style lang="less">
// @import url("../node_modules/swiper/swiper-bundle.css");
#app {
  max-width: 1080px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 50px;
  // filter: hue-rotate(0deg);
  div{
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
  }
  .adver{
    width: 100vw;
    max-width: 1080px;
    height: 100vh;
    margin: 0 auto;
    background-image: url(./assets/adver.jpg);
    background-size: cover;
    background-position: center;
    position: relative;
    span{
      position: absolute;
      color: white;
      right: 15px;
      top: 10px;
    }
  }
}

</style>
