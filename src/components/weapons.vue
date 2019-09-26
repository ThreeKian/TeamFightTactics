<template>
  <div class="box">
    <p class="title">可选装备</p>
    <div class="cell">
      <div class="content one" @click="chooseWeapons(1)"></div>
      <div class="content twe" @click="chooseWeapons(2)"></div>
      <div class="content three" @click="chooseWeapons(3)"></div>
      <div class="content four" @click="chooseWeapons(4)"></div>
      <div class="content five" @click="chooseWeapons(5)"></div>
      <div class="content six" @click="chooseWeapons(6)"></div>
      <div class="content seven" @click="chooseWeapons(7)"></div>
      <div class="content eight" @click="chooseWeapons(8)"></div>
    </div>
    <div style="display: flex;justify-content: space-between">
      <p class="title">我的装备</p>
      <div class="title" style="margin-right: 10px">
        <Button type="primary" @click="cleanMyWeapons()">全部清除</Button>
      </div>
    </div>
    <div class="cell" style="flex-wrap: wrap;">
      <div v-for="(data, index) in sjChoosedList" class="myWeapons" :key="index" @click="removeWeapons(index)">
        <img :src="data.name" style="width: 100%">
       </div>
    </div>
    <p class="title">可合成装备</p>
    <div class="composeWeaponsBox">
      <div class="composeWeaponsContent" v-for="(item, index) in composeWeaponsList" :key="index" :class="index%2 === 0 ? 'rightLine':''">
        <div style="margin-left: 7px"><img :src="item.firstName" class="composeWeaponsImg"></div>
        +
        <div><img :src="item.secondName" class="composeWeaponsImg"></div>
        =
        <div style="margin-right: 7px"><img :src="item.thirdName" class="composeWeaponsImg"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { constants } from 'crypto';
export default {
  name: "weapons",
  components: {},
  data() {
    return {
      sjList: [
        {
          name: require('../assets/Images/composeWeapons/BF.png'),
          index: 1
        },
        {
          name: require('../assets/Images/composeWeapons/Rod.png'),
          index: 2
        },
        {
          name: require('../assets/Images/composeWeapons/Bow.png'),
          index: 3
        },
        {
          name: require('../assets/Images/composeWeapons/Tear.png'),
          index: 4
        },
        {
          name: require('../assets/Images/composeWeapons/Vest.png'),
          index: 5
        },
        {
          name: require('../assets/Images/composeWeapons/Cape.png'),
          index: 6
        },
        {
          name: require('../assets/Images/composeWeapons/Belt.png'),
          index: 7
        },
        {
          name: require('../assets/Images/composeWeapons/Spatula.png'),
          index: 8
        }
      ],
      sjChoosedList: [],
      // 可合成装备+散件详细list
      composeWeaponsList: [],
      // 最终可合成装备list
      lastWeaponsList: [],
      showMoveOut: false
    };
  },
  mounted() {},
  methods: {
    changeItem(index) {
      if (this.indexItem !== index) {
        this.showMoveOut = true;
      }
      this.showMoveOut = false;
      this.indexItem = index;
    },
    chooseWeapons(index) {
      if (this.sjChoosedList.length < 10) {
        this.composeWeaponsList = []
        this.lastWeaponsList = []
        this.sjChoosedList.push(this.sjList[index - 1]);
        this.showComposeWeapons();
      } else {
        this.error();
      }
    },
    showComposeWeapons() {
      for (let i = 0; i < this.sjChoosedList.length; i++) {
          for (let k = i + 1; k < this.sjChoosedList.length; k++) {
            let data = {
              firstName: this.sjChoosedList[i].name,
              firstIndex: this.sjChoosedList[i].index,
              secondName: this.sjChoosedList[k].name,
              secondIndex: this.sjChoosedList[k].index,
              third: this.sjChoosedList[i].index * 10 + this.sjChoosedList[k].index,
              thirdName: require('../assets/Images/composeWeapons/' +
              (this.sjChoosedList[i].index * 10 + this.sjChoosedList[k].index) + '.png')
            }
            // 判断最终可合成装备是否已经包含该id，并且判断是否有重复的散件组成（即：a+b=c、b+a=c这种情况）
            if(this.lastWeaponsList.indexOf(data.third) === -1 &&
            this.lastWeaponsList.indexOf(this.sjChoosedList[k].index * 10 + this.sjChoosedList[i].index) === -1){ 
              this.composeWeaponsList.push(data)
              this.lastWeaponsList.push(data.third)
            } 
          }
        }
    },
    removeWeapons(index) {
      this.sjChoosedList.splice(index, 1)
      this.composeWeaponsList = []
      this.lastWeaponsList = []
      this.showComposeWeapons()
    },
    cleanMyWeapons() {
      this.sjChoosedList = [];
      this.composeWeaponsList = [];
    },
    error() {
      this.$Message.error("最多只能选择10件装备");
    }
  }
};
</script>

<style scoped type="less">
.box {
  border: 1px solid #f1f1f1;
  width: calc(30% - 10px);
  height: auto;
}
.title {
  text-align: left;
  font-size: 18px;
  margin: 10px 0 0 10px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
}
.cell {
  display: flex;
  width: 100%;
}
.content {
  width: 10%;
  padding: 10% 0 0;
  margin: 10px 0 10px 2.2%;
}
.one {
  background: url("../assets/Images/composeWeapons/BF.png");
  background-size: cover;
}
.twe {
  background: url("../assets/Images/composeWeapons/Rod.png");
  background-size: cover;
}
.three {
  background: url("../assets/Images/composeWeapons/Bow.png");
  background-size: cover;
}
.four {
  background: url("../assets/Images/composeWeapons/Tear.png");
  background-size: cover;
}
.five {
  background: url("../assets/Images/composeWeapons/Vest.png");
  background-size: cover;
}
.six {
  background: url("../assets/Images/composeWeapons/Cape.png");
  background-size: cover;
}
.seven {
  background: url("../assets/Images/composeWeapons/Belt.png");
  background-size: cover;
}
.eight {
  background: url("../assets/Images/composeWeapons/Spatula.png");
  background-size: cover;
}
.myWeapons {
  width: 8%;
  margin-left: 10%;
  margin-top: 10px;
}
.rightLine {
  border-right: 2px solid #f1f1f1
}
.composeWeaponsBox {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 10px 10px 10px;
  overflow-y: auto;
  max-height: 350px
}
.composeWeaponsContent {
  width: 50%;
  display: flex;
  font-size: 32px;
  font-weight: blod;
}
.composeWeaponsImg {
  width: 60%;
  min-width: 35px;
}
</style>
