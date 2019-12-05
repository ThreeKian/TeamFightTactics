<template>
  <div class="layout">
    <Layout>
      <div class="pinkBox">
        <div class="moveIn">
          <ul>
            <li v-for="index in 1000" :key="index">
              <H1>+1S</H1>
            </li>
          </ul>
        </div>
        <div class="bigger">
          <div class="ellipse"></div>
          <div class="shirt"></div>
          <div class="diamond"></div>
          <div class="rectangle"></div>
          <div class="trapezoid"></div>
          <div class="head"></div>
          <div class="hairColor"></div>
          <div class="head2"></div>
          <div class="leftGlass"></div>
          <div class="rightGlass"></div>
          <div class="glassLine"></div>
          <div class="leftNose"></div>
          <div class="rightNose"></div>
          <div class="mouth"></div>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style type="less">
.layout {
  border: 1px solid #d7dde4;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.pinkBox {
  height: 1000px;
  background: #ff7b91;
  justify-content: center;
  text-align: center;
}
ul li {
  list-style-type: none;
}
.moveIn {
  width: 100%;
  height: 747px;
  position: relative;
  animation: mymove 10s infinite;
  -webkit-animation: mymove 10s infinite;
  animation-timing-function: linear;
  -webkit-animation-timing-function: linear;
}
@keyframes mymove {
  from {
    top: 80%;
  }
  to {
    top: -200%;
  }
}

@-webkit-keyframes mymove {
  from {
    top: 80%;
  }
  to {
    top: -200%;
  }
}
/* 黑西服 */
.ellipse {
  position: absolute;
  bottom: -60px;
  z-index: 1;
  width: 400px;
  height: 100px;
  background: black;
  border-radius: 50% / 50%;
  margin-left: calc((100% - 400px) / 2);
}
/* 白衬衫 */
.shirt {
  position: absolute;
  bottom: 0;
  z-index: 2;
  background: white;
  height: 50px;
  width: 140px;
  margin-left: calc((100% - 140px) / 2);
}
/* 菱形 */
.diamond {
  position: absolute;
  bottom: 10px;
  z-index: 4;
  height: 40px;
  width: 40px;
  background: #ff7b91;
  margin-left: calc((100% - 40px) / 2);
  -webkit-clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  -moz-clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  transition: 1s clip-path;
}
/* 领带 */
.rectangle {
  position: absolute;
  bottom: 0;
  z-index: 4;
  height: 40px;
  width: 20px;
  background: #ff7b91;
  margin-left: calc((100% - 20px) / 2);
}
/* 梯形 */
.trapezoid {
  position: absolute;
  bottom: 35px;
  z-index: 1;
  margin-left: calc((100% - 240px) / 2);
  height: 0;
  width: 28px;
  border-top: 25px solid #e5c3b2;
  border-left: 120px solid transparent;
  border-right: 120px solid transparent;
}
.head {
  position: absolute;
  bottom: 59px;
  z-index: 1;
  border-radius: 5px;
  width: 240px;
  height: 250px;
  background: #fde8de;
  margin-left: calc((100% - 240px) / 2);
}
.hair {
  position: absolute;
  bottom: 240px;
  z-index: 1;
  width: 270px;
  height: 90px;
  border-radius: 10px;
  background: #cecece;
  margin-left: calc((100% - 270px) / 2);
}
.head2 {
  position: absolute;
  bottom: 101px;
  z-index: 3;
  width: 220px;
  height: 205px;
  border-radius: 5px;
  background: #fde8de;
  margin-left: calc((100% - 220px) / 2);
}
.leftGlass {
  position: absolute;
  bottom: 151px;
  z-index: 4;
  border: 12px solid black;
  width: 126px;
  height: 100px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0);
  margin-left: calc((100% - 273px) / 2);
}
.rightGlass {
  position: absolute;
  bottom: 151px;
  z-index: 4;
  border: 12px solid black;
  width: 126px;
  height: 100px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0);
  margin-left: calc((100% - -22px) / 2);
}
.glassLine {
  position: absolute;
  bottom: 220px;
  z-index: 4;
  width: 44px;
  height: 16px;
  background: black;
  margin-left: calc((100% - 45px) / 2);
}
.leftNose {
  position: absolute;
  bottom: 136px;
  z-index: 4;
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: #d8ac96;
  margin-left: calc((100% - 30px) / 2);
}
.rightNose {
  position: absolute;
  bottom: 136px;
  z-index: 4;
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: #d8ac96;
  margin-left: calc((100% - -10px) / 2);
}
.font {
  position: absolute;
  bottom: 95px;
  z-index: 4;
  width: 100px;
  height: 50px;
  border-radius: 3px;
  background: #d8ac96;
}
.mouth {
  position: absolute;
  bottom: 95px;
  z-index: 2;
  width: 100px;
  height: 60px;
  border-radius: 3px;
  background: #d8ac96;
  border-radius: 0 / 0;
  margin-left: calc((100% - 100px) / 2);
  animation: smile 6s infinite;
  -webkit-animation: smile 6s infinite;
  animation-timing-function: linear;
  -webkit-animation-timing-function: linear;
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1;
  animation-delay: 1s;
  -webkit-animation-delay: 1s; /* Safari 和 Chrome */
}
@keyframes smile {
  0% {
    border-radius: 0 / 0;
    bottom: 95px;
  }
  3% {
    border-radius: 45% / 45%;
    bottom: 80px;
  }
  100% {
    border-radius: 45% / 45%;
    bottom: 80px;
  }
}

@-webkit-keyframes smile {
  0% {
    border-radius: 0 / 0;
    bottom: 95px;
  }
  3% {
    border-radius: 45% / 45%;
    bottom: 80px;
  }
  100% {
    border-radius: 45% / 45%;
    bottom: 80px;
  }
}
.bigger {
  position: relative;
  bottom: -64px;
  animation: big 6s infinite;
  -webkit-animation: big 6s infinite;
  animation-timing-function: linear;
  -webkit-animation-timing-function: linear;
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1;
  animation-delay: 1s;
  -webkit-animation-delay: 1s; /* Safari 和 Chrome */
}
@keyframes big {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  3% {
    transform: scale(1.1); /*开始为原始大小*/
  }
  100% {
    transform: scale(1.1);
  }
}

@-webkit-keyframes big {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  3% {
    transform: scale(1.1); /*开始为原始大小*/
  }
  100% {
    transform: scale(1.1);
  }
}
.hairColor {
  position: absolute;
  bottom: 240px;
  z-index: 1;
  width: 270px;
  height: 90px;
  border-radius: 10px;
  background: #cecece;
  margin-left: calc((100% - 270px) / 2);
  animation: black-hair 6s infinite;
  -webkit-animation: black-hair 6s infinite;
  animation-timing-function: linear;
  -webkit-animation-timing-function: linear;
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1;
  animation-delay: 1s;
  -webkit-animation-delay: 1s; /* Safari 和 Chrome */
}
@keyframes black-hair {
  0% {
    background: #cecece; /*开始为原始大小*/
  }
  3% {
    background: black; /*开始为原始大小*/
  }
  100% {
    background: black; /*开始为原始大小*/
  }
}

@-webkit-keyframes black-hair {
  0% {
    background: #cecece; /*开始为原始大小*/
  }
  3% {
    background: black; /*开始为原始大小*/
  }
  100% {
    background: black; /*开始为原始大小*/
  }
}
</style>
