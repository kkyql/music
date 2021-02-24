<template>
  <div class="lyric">
      <div :class="{cover:true,pause:!icon_state}" :style="`backgroundImage:url(${currentMusic.al.picUrl})`" @click="lyricStateToggle" v-if="lyricState">
          <i :class="{pause:!icon_state}"></i>
          <i :class="{pause:!icon_state}"></i>
          <i :class="{pause:!icon_state}"></i>
      </div>
      <ul class="lyricText" @click="lyricStateToggle" v-show="!lyricState" ref="ul">
        <li v-for="(item,index) in lyric" :key="index">{{item.text}}</li>
      </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState({
            currentMusic:(state)=>state.play.currentMusic,
            icon_state:(state)=>state.play.icon_state,
            currentTime: (state) => state.play.time.currentTime,
            totalTime: (state) => state.play.time.totalTime,
            lyric: (state) => state.play.lyric,
        }),
    },
    data(){
        return {
            lyricState:true,
            lyricStr:null,
        }
    },
    methods:{
        lyricStateToggle(){
            this.lyricState = !this.lyricState
        },
        lyricColor(){
            var lis = document.querySelectorAll(".lyricText li");
            var topLength = 0;
            for(var i=0;i<this.lyric.length;i++){
                topLength += lis[i].offsetHeight;
                if(this.currentTime>this.lyric[i].time){
                    for(var j=0;j<this.lyric.length;j++){
                        lis[j].style.color="white";
                    }
                    lis[i].style.color = "red";
                    this.$refs.ul.style.transform = `translateX(-50%) translateY(${-topLength}px)`;
                }
            }
        }
    },
    mounted(){
        this.lyricColor();
    },
    watch:{
        currentTime(){
            this.lyricColor();
        }
    }
}
</script>

<style lang="less">
.lyric{
    width: 100%;
    height: 60vh;
    overflow: hidden;
    margin-top: 10px;
    position: relative;
    z-index: 1;
    .pause{
        animation-play-state: paused !important;
    }
    .cover{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 60vw;
        height: 60vw;
        border-radius: 50%;
        border: 3px solid #272822;
        background-size: cover;
        z-index: 1;
        animation: rotate 8s linear 0s infinite;
        >i{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            transform: translate(-50%,-50%);
            border-radius: 50%;
            border: 1px solid transparent;
            transform-origin: center;
            animation: zoom 1.8s linear 0s infinite;
            &:nth-child(1){
                animation-delay: -1.2s;
            }
            &:nth-child(2){
                animation-delay: -0.6s;
            }
        }
        @keyframes zoom {
            10%{
                border-color: white;
            }
            100%{
                transform: translate(-50%,-50%) scale(1.6);
            }
        }
        @keyframes rotate {
            100%{
                transform: translate(-50%,-50%) rotate(360deg);
            }
        }
    }
    .lyricText{
        width: 90%;
        position: absolute;
        left: 50%;
        padding-top: 50%;
        transform: translateX(-50%) translateY(0);
        color: white;
        li{
            width: 100%;
            text-align: center;
            letter-spacing: 2px;
            padding-bottom: 15px;
        }
    }
}
</style>