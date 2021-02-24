<template>
  <div class="RankingList">
      <Back>排行榜</Back>
      <RankingTitle>官方榜</RankingTitle>
      <div class="officialRank">
          <div class="officialItem" v-for="item in officialList" :key="item.id" @click="ToCloudRank(item.id,item)">
            <RankingItem :item="item"></RankingItem>
            <ul>
                <li v-for="(item,index) in item.tracks" :key="index">{{(index + 1 ) + '.' + item.first + ' - ' + item.second}}</li>
            </ul>
          </div>
      </div>
      <RankingTitle>全球榜</RankingTitle>
      <div class="globalRank">
          <RankingItem v-for="item in globalList" :key="item.id" :item="item" @click.native="ToRankDetail(item.id)"></RankingItem>
      </div>
  </div>
</template>

<script>
import Back from '../components/Back'
import RankingItem from '../components/RankingItem'
import RankingTitle from '../components/RankingTitle'
export default {
    components:{
        Back,
        RankingItem,
        RankingTitle
    },
    data(){
        return {
            officialList:null,
            globalList:null,
        }
    },
    created(){
        this.axios.get("/toplist/detail").then((response)=>{
            this.officialList = response.data.list.slice(0,4);
            this.globalList = response.data.list.slice(4);
        })
    },
    methods:{
        ToRankDetail(id){
            this.$router.push({
                path:'/SongListList',
                query:{
                    id
                }
            })
        },
        ToCloudRank(id,info){
            this.$router.push({
                path:'/CloudRank',
                name:'CloudRank',
                query:{
                    id
                },
                params:{
                    info
                }
            })
        }
    }
}
</script>

<style lang="less">
.RankingList{
    width: 100%;
    padding-top: 50px;
    .officialRank{
        width: 100%;
        .officialItem{
            width: 100%;
            display: flex;
            border-bottom: 1px solid #e7e9ea;
            margin-top: 5px;
            .RankingItem{
                flex: 1;
            }
            ul{
                flex: 2;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                li{
                    color: #616262;
                    font-size: 14px;
                }
            }
        }
    }
    .globalRank{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .RankingItem{
            margin-top: 5px;
            flex: calc((100% - 10px) / 3);
            .cover{
                margin-right: 0;
            }
            &:nth-child(3n-1){
                margin-left: 5px;
                margin-right: 5px;
            }
            &:last-child{
                width: 33.33%;
                padding-right: 5px;
                flex: none;
            }
        }
    }
}
</style>