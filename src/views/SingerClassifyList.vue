<template>
  <div class="SingerClassifyList">
      <Back>{{$route.query.name}} - 热门歌手</Back>
      <ul>
          <li v-for="item in SingerClassifyList" :key="item.id" @click="ToSearch(item.name,item.id)">
              <img :src="item.img1v1Url" alt="" class="photo">
              <div class="info">
                  <span>{{item.name}}</span>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import Back from '../components/Back'
export default {
    data(){
        return {
            SingerClassifyList:[],
        }
    },
    components:{
        Back
    },
    created() {
        this.axios.get("/artist/list?cat=" + this.$route.query.id).then((response)=>{
            this.SingerClassifyList = response.data.artists;
            var img = new Image();
            for(var i=0;i<this.SingerClassifyList.length;i++){
                img.src = this.SingerClassifyList[i].img1v1Url
            }
        })
    },
    methods:{
        ToSearch(name,id){
            this.$router.push({
                name:'Search',
                params:{
                    id,
                    name
                }
            })
        },
    },
}
</script>

<style lang="less">
.SingerClassifyList{
    width: 100%;
    padding-top: 50px;
    ul{
        width: 100%;
        padding-left: 10px;
        padding-bottom: 10px;
        li{
            width: 100%;
            height: 85px;
            margin-top: 5px;
            display: flex;
            .photo{
                width: 80px;
                height: 80px;
                margin-right: 8px;
            }
            .info{
                flex: 1;
                border-bottom: 1px solid #e3e5e6;
                display: flex;
                align-items: center;
                span{
                    color: #313232;
                    font-size: 18px;
                }
            }
        }
    }
}
</style>