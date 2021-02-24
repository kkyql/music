<template>
  <div class="Video">
    <ul>
      <VideoItem v-for="item in MvDatas" :key="item.id" :item="item"></VideoItem>
    </ul>
    <footer>
      —— 我也是有底线的 ——
    </footer>
  </div>
  
</template>

<script>
import VideoItem from '../components/VideoItem'
export default {
  // /mv/url?id=
  // /mv/detail?mvid=
  components:{
    VideoItem
  },
  data(){
    return {
      MvDatas:null
    }
  },
  created(){
    this.axios.get("/mv/exclusive/rcmd").then((response)=>{
      this.MvDatas = response.data.data
    })
  }
}

</script>

<style lang="less">
.Video{
  padding-top: 100px;
  footer{
    width: 100%;
    text-align: center;
    color: #dee0e1;
    padding-bottom: 10px;
  }
}
</style>