<template>
  <div class="MusicController" @click.stop="detail">
    <div class="left">
      <div
        class="img"
        :style="`backgroundImage:url(${
          currentMusic ? currentMusic.al.picUrl : ''
        })`"
      ></div>
      <div class="songName">
        <span>{{ currentMusic ? currentMusic.name : "网易云音乐" }}</span>
      </div>
    </div>
    <div class="right">
      <div class="progress">
        <canvas width="35" height="35" ref="circle"></canvas>
        <div class="play" @click.stop="playToggle">
          <svg
            t="1613866611688"
            class="play_icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2194"
            width="20"
            height="20"
            v-if="!icon_state"
          >
            <path
              d="M852.727563 392.447107C956.997809 458.473635 956.941389 565.559517 852.727563 631.55032L281.888889 993.019655C177.618644 1059.046186 93.090909 1016.054114 93.090909 897.137364L93.090909 126.860063C93.090909 7.879206 177.675064-35.013033 281.888889 30.977769L852.727563 392.447107 852.727563 392.447107Z"
              fill="#bdbdbb"
              p-id="2195"
            ></path>
          </svg>
          <svg
            t="1613868052028"
            class="pause_icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2995"
            width="20"
            height="20"
            v-else
          >
            <path
              d="M735.9 128.89999999c-51.2 0-96 44.7-96 95.8v702.6c0 51.1 44.8 95.8 96 95.8s96-44.7 96-95.8V224.69999999c0-51.1-44.8-95.8-96-95.8z m-447.8 0c-51.2 0-96 44.7-96 95.8v702.6c0 51.1 44.8 95.8 96 95.8s96-44.7 96-95.8V224.69999999c-0.1-51.1-44.9-95.8-96-95.8z"
              fill="#bdbdbb"
              p-id="2996"
            ></path>
          </svg>
        </div>
      </div>
      <svg
        t="1612967183393"
        class="list_icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2199"
        width="32"
        height="32"
        @click.stop="ListState"
      >
        <path
          d="M994.78186667 215.99573333c-49.152-56.06968853-111.77528853-99.9424-180.95217814-126.70293333a36.29966187 36.29966187 0 0 0-49.51608853 33.86026667v448.37546666a189.8723552 189.8723552 0 0 0-118.32888853-41.32408853c-105.40373333 0-191.14666667 85.74293333-191.14666667 191.14666667S540.58097813 912.49777813 645.98471147 912.49777813s191.14666667-85.74293333 191.14666666-191.14666666c0-2.00248853-0.1820448-4.00497813-0.3640896-6.00746667 0-1.09226667 0.36408853-2.00248853 0.3640896-3.09475627V180.49706667c38.59342187 21.66328853 73.728 50.06222187 103.0371552 83.3763552 13.2892448 15.10968853 36.40888853 16.5660448 51.33653334 3.2768 15.10968853-13.1072 16.5660448-36.0448 3.2768-51.15448854zM645.98471147 839.68c-65.17191147 0-118.32888853-53.15697813-118.3288896-118.32888853s53.15697813-118.32888853 118.3288896-118.3288896 118.32888853 53.15697813 118.32888853 118.3288896-53.15697813 118.32888853-118.32888853 118.32888853zM163.56693333 293.54666667h418.70222187c20.02488853 0 36.40888853-16.384 36.4088896-36.40888854s-16.384-36.40888853-36.4088896-36.4088896h-418.70222187a36.40888853 36.40888853 0 1 0 0 72.81777814zM418.4291552 457.38666667h-254.86222187c-20.02488853 0-36.40888853 16.384-36.40888853 36.40888853s16.384 36.40888853 36.40888853 36.4088896h254.86222187c20.02488853 0 36.40888853-16.384 36.4088896-36.4088896s-16.384-36.40888853-36.4088896-36.40888853zM309.20248853 694.0444448h-145.6355552c-20.02488853 0-36.40888853 16.384-36.40888853 36.40888853s16.384 36.40888853 36.40888853 36.40888854h145.6355552c20.02488853 0 36.40888853-16.384 36.4088896-36.40888854s-16.384-36.40888853-36.4088896-36.40888853z"
          p-id="2200"
          fill="#999999"
        ></path>
      </svg>
      <span class="list_num">{{ currentList ? currentList.length : "" }}</span>
    </div>
    <audio
      :src="`https://music.163.com/song/media/outer/url?id=${
        currentMusic ? currentMusic.id : ''
      }.mp3`"
      ref="audio"
      autoplay
      loop
    ></audio>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props:['progressTime'],
  computed: {
    ...mapState({
      currentMusic: (state) => state.play.currentMusic,
      currentList: (state) => state.play.currentList,
      icon_state: (state) => state.play.icon_state,
      List_state: (state) => state.play.List_state,
      currentTime: (state) => state.play.time.currentTime,
      totalTime: (state) => state.play.time.totalTime,
    }),
  },
  mounted() {
    let audio = this.$refs.audio;
    audio.addEventListener("timeupdate", () => {
      this.$store.state.play.time.currentTime = audio.currentTime;
      this.$store.state.play.time.totalTime = audio.duration;
      this.MusicProgroess(audio.currentTime, audio.duration);
    });
    audio.addEventListener("play", () => {
      this.$store.state.play.icon_state = true;
    });
    audio.addEventListener("pause", () => {
      this.$store.state.play.icon_state = false;
    });
  },
  methods: {
    MusicProgroess(current, total) {
      let canvas = this.$refs.circle;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 35, 35);
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.arc(
        17.5,
        17.5,
        16,
        Math.PI * -0.5,
        Math.PI * ((current / total) * 2 - 0.5),
        false
      );
      ctx.stroke();
      ctx.closePath();
    },
    playToggle() {
      if(!this.currentMusic) return;
      if (this.icon_state) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
    },
    ListState(){
      if(this.currentList.length<=0)return;
      this.$store.state.play.List_state = !this.List_state;
    },
    detail(){
      if(!this.currentMusic) return;
      this.$store.state.play.detail_state = !this.$store.state.play.detail_state;
    }
  },
  watch:{
    progressTime(n){
      this.$refs.audio.currentTime = n;
    },
    icon_state(n){
      if (n) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    }
  }
};
</script>

<style lang="less">
.MusicController {
  width: 100%;
  height: 50px;
  max-width: 1080px;
  padding: 0 15px;
  position: fixed;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 60%;
    height: 35px;
    display: flex;
    align-items: center;
    .img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: black;
      background-size: cover;
    }
    .songName {
      width: 80%;
      height: 18px;
      margin-left: 8px;
      position: relative;
      overflow: hidden;
      span {
        position: absolute;
        white-space: nowrap;
        left: 50%;
        transform: translateX(-50%);
        letter-spacing: 2px;
        animation: move 6s linear 0s infinite;
      }
      @keyframes move {
        0% {
          left: 100%;
          transform: translateX(50%);
        }
        100% {
          left: 0;
          transform: translateX(-100%);
        }
      }
    }
  }
  .right {
    height: 35px;
    display: flex;
    align-items: center;
    position: relative;
    .progress {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: 2px solid #bdbdbb;
      position: relative;
      .play {
        position: absolute;
        top: -2px;
        left: -2px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        .play_icon {
          position: absolute;
          left: 9px;
          top: 7px;
        }
        .pause_icon{
          position: absolute;
          left: 8px;
          top: 6px;
        }
      }

      canvas {
        margin-left: -2px;
        margin-top: -2px;
      }
    }
    .list_icon {
      margin-left: 10px;
    }
    .list_num{
      position: absolute;
      font-size: 14px;
      left: calc(100% - 2px);
      bottom: 0;
      color: #999999;
    }
  }
}
</style>