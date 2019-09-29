<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%', marginTop: '-1px'}">
        <Menu mode="horizontal" theme="dark" :active-name="indexItem">
          <div class="layout-box">
            <div class="layout-nav">
              <MenuItem name="1">
                <div @click="changeItem('1')">
                  <Icon type="ios-navigate"></Icon>装备
                </div>
              </MenuItem>
              <MenuItem name="2">
                <div @click="changeItem('2')">
                  <Icon type="ios-keypad"></Icon>羁绊
                </div>
              </MenuItem>
              <MenuItem name="3">
                <div @click="changeItem('3')">
                  <Icon type="ios-analytics"></Icon>阵容
                </div>
              </MenuItem>
              <MenuItem name="4">
                <div @click="changeItem('4')">
                  <Icon type="ios-paper"></Icon>简介
                </div>
              </MenuItem>
            </div>
          </div>
        </Menu>
      </Header>
      <Content :style="{margin: '40px 10px 0 10px', background: '#fff', minHeight: '500px'}">
        <div class="bgImage" v-if="indexItem === '1'" :class="showMoveOut? 'moveOut':''">
          <div style="display: flex;height:100%; overflow:hidden; margin:0 auto;">
            <div class="bgImage leftWeapons">
              <table>
                <tr v-for="(item1,index1) in weaponsList" :key="index1">
                  <td
                    v-for="(item2,index2) in item1.weapons"
                    :key="index2"
                    style="background: rgba(0, 0, 0, .7)"
                    :class="index2 !== 0?'tdWidth':''"
                  >
                    <Tooltip placement="top" max-width="200" :disabled="item2.content && index1 === 0" :transfer="true" theme="light" style="z-index: 100000">
                      <div class="contentBox">
                        <img
                          :src="item2.img"
                          v-if="item2.img"
                          :class="index2 !== 0 ? 'contentImg':'firstContentImg'"
                          :style="{'margin': index1 !== 0 ? '15px 0 15px 0':'0'}"
                        />
                        <div class="contentText" v-if="item2.content"
                             :style="{'height': index1 !== 0 ? '70px':'auto'}">
                          {{item2.content}}
                        </div>
                      </div>
                      <div slot="content">
                        <span>{{item2.content}}</span>
                      </div>
                    </Tooltip>
                  </td>
                </tr>
              </table>
            </div>
            <!-- 装备合成 -->
            <weapons style="float:right; height:auto;height: auto"></weapons>
          </div>
        </div>
        <div class="bgImage" v-if="indexItem === '2'" :class="showMoveOut? 'moveOut':''">
          <!-- <img src="../assets/hero.png" class="showImage hero" /> -->
          <collocation></collocation>
        </div>
        <div class="bgImage" v-if="indexItem === '3'" :class="showMoveOut? 'moveOut':''">
<!--          <heros></heros>-->
          <team></team>
        </div>
        <div class="bgImage" v-if="indexItem === '4'" :class="showMoveOut? 'moveOut':''">
          <div class="heroBox" style="min-height: 845px">
            <div class="zanwu team">
              <img src="../assets/zanwu.png" style="width: 200px;height: 180px" />
              <div style="margin-top: 100px;font-size: 16px">ThreeKian--仨仟君</div>
              <div style="font-size: 16px;margin-top: 15px;">已适配英雄联盟9.18版本</div>
              <div style="font-size: 16px;margin-top: 15px;">此软件为免费软件,请勿用作商业用途，如有问题请联系本人</div>
              <div style="font-size: 16px;margin-top: 15px;">联系方式(QQ、微信)：389651411</div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
import {
  Tabs,
  TabPane,
  Menu,
  MenuItem,
  Content,
  Button,
  Input,
  Table
} from "iview";
import weapons from "../components/weapons.vue";
import collocation from "../components/collocation.vue";
// import heros from "../components/heroType.vue";
import team from "../components/team.vue";
export default {
  name: "home",
  components: {
    weapons,
    collocation,
    team,
    Tabs,
    TabPane,
    Menu,
    MenuItem,
    Content,
    Button,
    Input,
    Table
  },
  data() {
    return {
      indexItem: "1",
      showMoveOut: false,
      weaponsList: []
    };
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      let list = [];
      for (let k = 0; k < 10; k++) {
        let data = {
          img: ""
        };
        if (i === 0 && k !== 0) {
          data.img = require("../assets/Images/weapons/" + k * 10 + ".png");
        } else if (i !== 0) {
          data.img = require("../assets/Images/weapons/" +
            (i * 10 + k) +
            ".png");
        }
        list.push(data);
      }
      let dict = {
        weapons: list
      };
      this.weaponsList.push(dict);
    }
    this.weaponsList[0].weapons[1].content = "+15攻击力";
    this.weaponsList[0].weapons[2].content = "+20%技能伤害";
    this.weaponsList[0].weapons[3].content = "+20%攻速";
    this.weaponsList[0].weapons[4].content = "+20法力值";
    this.weaponsList[0].weapons[5].content = "+20护甲";
    this.weaponsList[0].weapons[6].content = "+20%魔抗";
    this.weaponsList[0].weapons[7].content = "+200生命值";
    this.weaponsList[0].weapons[8].content = "搭配武器属性翻倍 :)";
    this.weaponsList[0].weapons[9].content = "+10%暴击和闪避几率";

    this.weaponsList[1].weapons[1].content = "在击杀或者助攻后获得一层额外15攻击力,可无限叠加";
    this.weaponsList[1].weapons[2].content = "+25%全能吸血";
    this.weaponsList[1].weapons[3].content = "攻击会造成目标5%最大生命值额外真实伤害";
    this.weaponsList[1].weapons[4].content =
      "用技能后每次普攻回复15%最大法力值";
    this.weaponsList[1].weapons[5].content = "死亡后复活：复活后回复500生命值";
    this.weaponsList[1].weapons[6].content = "普攻伤害40%吸血";
    this.weaponsList[1].weapons[7].content = "左右两格内友军+15%攻速";
    this.weaponsList[1].weapons[8].content = "装备者视为刺客";
    this.weaponsList[1].weapons[9].content = "+150暴击";

    this.weaponsList[2].weapons[1].content = "+25%全能吸血";
    this.weaponsList[2].weapons[2].content = "+50%技能伤害";
    this.weaponsList[2].weapons[3].content = "每次普攻+5%攻速(无上限)";
    this.weaponsList[2].weapons[4].content = "技能造成180点溅射伤害";
    this.weaponsList[2].weapons[5].content = "开打时左右临格友军+300护盾,持续7秒";
    this.weaponsList[2].weapons[6].content = "敌人每次释放技能-125血";
    this.weaponsList[2].weapons[7].content = "技能造成目标20%最大HP伤害";
    this.weaponsList[2].weapons[8].content = "装备者视为法师";
    this.weaponsList[2].weapons[9].content = "技能有25%几率暴击";

    this.weaponsList[3].weapons[1].content = "攻击会造成目标5%最大生命值额外真实伤害";
    this.weaponsList[3].weapons[2].content = "每次普攻+5%攻速(无上限)";
    this.weaponsList[3].weapons[3].content = "普攻射程翻倍";
    this.weaponsList[3].weapons[4].content = "每3下普攻造成100点魔法伤害弹射3个目标";
    this.weaponsList[3].weapons[5].content = "装备者闪避所有暴击攻击";
    this.weaponsList[3].weapons[6].content = "普攻有20%几率使敌人-1星";
    this.weaponsList[3].weapons[7].content = "对目标与其身后目标造成6%最大HP伤害";
    this.weaponsList[3].weapons[8].content = "装备者视为剑士";
    this.weaponsList[3].weapons[9].content = "死亡时装备会跳到友方身上并提供额外20%攻速和暴击";

    this.weaponsList[4].weapons[1].content =
      "用技能后每次普攻回复15%最大法力值";
    this.weaponsList[4].weapons[2].content = "技能造成180点溅射伤害";
    this.weaponsList[4].weapons[3].content = "每3下普攻造成100点魔法伤害弹射3个目标";
    this.weaponsList[4].weapons[4].content = "释放技能后立刻恢复20%法力值";
    this.weaponsList[4].weapons[5].content = "临格敌人-35%攻速,持续4秒";
    this.weaponsList[4].weapons[6].content = "普攻有33%几率防止敌人获得法力值,持续4秒";
    this.weaponsList[4].weapons[7].content = "装备者低于25%生命时,友军回复1200血";
    this.weaponsList[4].weapons[8].content = "装备者视为恶魔";
    this.weaponsList[4].weapons[9].content = "战斗开始造成伤害+40%或攻击恢复40生命";

    this.weaponsList[5].weapons[1].content = "死亡后复活：复活后回复500生命值";
    this.weaponsList[5].weapons[2].content = "开打时左右临格友军+300护盾,持续7秒";
    this.weaponsList[5].weapons[3].content = "装备者闪避所有暴击攻击";
    this.weaponsList[5].weapons[4].content = "临格敌人-35%攻速,持续4秒";
    this.weaponsList[5].weapons[5].content = "反弹100%普攻伤害";
    this.weaponsList[5].weapons[6].content = "普攻有33%几率对敌人造成缴械";
    this.weaponsList[5].weapons[7].content = "普攻造成20%灼烧伤害";
    this.weaponsList[5].weapons[8].content = "装备者视为骑士";
    this.weaponsList[5].weapons[9].content = "闪避时增加一个区域减少敌人35%攻速";

    this.weaponsList[6].weapons[1].content = "普攻伤害40%吸血";
    this.weaponsList[6].weapons[2].content = "敌人每次释放技能-125血";
    this.weaponsList[6].weapons[3].content = "普攻有20%几率使敌人-1星";
    this.weaponsList[6].weapons[4].content = "普攻有33%几率防止敌人获得法力值,持续4秒";
    this.weaponsList[6].weapons[5].content = "普攻有33%几率对敌人造成缴械";
    this.weaponsList[6].weapons[6].content = "装备者获得75%魔抗";
    this.weaponsList[6].weapons[7].content = "开打时,放逐一名敌人6秒";
    this.weaponsList[6].weapons[8].content = "攻击1名额外敌人,造成75%伤害";
    this.weaponsList[6].weapons[9].content = "被控时净化,冷却时间5秒";

    this.weaponsList[7].weapons[1].content = "左右两格内友军+15%攻速";
    this.weaponsList[7].weapons[2].content = "技能造成目标20%最大HP伤害";
    this.weaponsList[7].weapons[3].content = "对目标与其身后目标造成6%最大HP伤害";
    this.weaponsList[7].weapons[4].content =
      "装备者低于25%生命时,友军回复1200血";
    this.weaponsList[7].weapons[5].content = "普攻造成20%灼烧伤害";
    this.weaponsList[7].weapons[6].content = "开打时,放逐一名敌人6秒";
    this.weaponsList[7].weapons[7].content = "装备者每秒回复6%已损失生命值,上限每秒400";
    this.weaponsList[7].weapons[8].content = "装备者视为极地";
    this.weaponsList[7].weapons[9].content = "战斗开始获得法术护盾,护盾被打破时使目标眩晕";

    this.weaponsList[8].weapons[1].content = "装备者视为刺客";
    this.weaponsList[8].weapons[2].content = "装备者视为法师";
    this.weaponsList[8].weapons[3].content = "装备者视为剑士";
    this.weaponsList[8].weapons[4].content = "装备者视为恶魔";
    this.weaponsList[8].weapons[5].content = "装备者视为骑士";
    this.weaponsList[8].weapons[6].content = "攻击1名额外敌人,造成75%伤害";
    this.weaponsList[8].weapons[7].content = "装备者视为极地";
    this.weaponsList[8].weapons[8].content = "人口+1";
    this.weaponsList[8].weapons[9].content = "变成约德尔人";

    this.weaponsList[9].weapons[1].content = "+150暴击";
    this.weaponsList[9].weapons[2].content = "技能有25%几率暴击";
    this.weaponsList[9].weapons[3].content = "死亡时装备会跳到友方身上并提供额外20%攻速和暴击";
    this.weaponsList[9].weapons[4].content = "战斗开始造成伤害+40%或攻击恢复40生命";
    this.weaponsList[9].weapons[5].content = "闪避时增加一个区域减少敌人35%攻速";
    this.weaponsList[9].weapons[6].content = "被控时净化,冷却时间5秒";
    this.weaponsList[9].weapons[7].content = "战斗开始获得法术护盾,护盾被打破时使目标眩晕";
    this.weaponsList[9].weapons[8].content = "变成约德尔人";
    this.weaponsList[9].weapons[9].content = "占用三个物品栏,备战开始时复制2个随机装备";
  },
  methods: {
    changeItem(index) {
      if (this.indexItem !== index) {
        this.showMoveOut = true;
      }
      this.showMoveOut = false;
      this.indexItem = index;
    }
  }
};
</script>
<style type="less">
.bgImage {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.showImage {
  display: block;
  height: auto;
}
.hero {
  width: 98%;
  margin: 30px auto 0 auto;
}
.zb {
  width: calc(100% - 20px);
  margin: 10px 10px;
}
.leftWeapons {
  width: 85%;
  height: 100%;
  overflow: hidden;
}
.tdWidth {
  /* width: calc((100% - 50px) / 9); */
  width: 145px;
}
.contentBox {
  display: flex;
}
.firstContentImg {
  width: 40px;
  height: 40px;
}
.contentImg {
  width: 40px;
  height: 40px;
  margin: 15px 2px 15px 0;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
}
.contentText {
  height: 70px;
  width: 66px;
  margin: 0 0 0 -3px;
  font-size: 10px;
  font-weight: 300;
  color: white;
  text-align: left;
  vertical-align: middle;
  display: table-cell;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: scale(.82);
}
.team {
  margin-top: 200px;
  width: 100%;
  margin-left: 0 !important;
}
.ivu-layout-header {
  background: linear-gradient(to right, #2897ff, #49c5ff) !important;
  z-index: 10086;
}
.ivu-menu-dark {
  background: rgba(0, 0, 0, 0) !important;
}
.ivu-menu-horizontal {
  height: 40px !important;
  line-height: 40px !important;
}
.ivu-layout-header {
  height: 40px !important;
  line-height: 40px !important;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu {
  color: rgba(255, 255, 255, 0.5);
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover,
.ivu-menu-dark .ivu-menu-horizontal .ivu-menu-submenu-active,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover {
  color: white;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.layout-box {
  /* width: 50%; */
  width: 100%;
  justify-content: space-between;
  display: flex;
  /* margin-left: calc(50% - 35px); */
}
.layout-logo {
  width: 50px;
  height: 50px;
  border-radius: 3px;
  background: url("../assets/logo3.png");
  background-size: cover;
  background-position: center;
}
.layout-nav {
  /* width: 420px; */
  width: 330px;
  margin: 0 auto;
  /* margin-right: 20px; */
}
.layout-footer-center {
  text-align: center;
  padding: 18px 50px !important;
}
.moveOut {
  animation: mymove 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  /* Safari and Chrome */
  -webkit-animation: mymove 0.3s;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-fill-mode: forwards;
}
.moveIn {
  animation: mymove2 0.4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  /* Safari and Chrome */
  -webkit-animation: mymove2 0.4s;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-fill-mode: forwards;
}
@keyframes mymove {
  from {
    left: 0;
  }
  to {
    left: -100%;
  }
}
@-webkit-keyframes mymove /* Safari and Chrome */ {
  from {
    left: 0;
  }
  to {
    left: -100%;
  }
}
@keyframes mymove2 {
  from {
    left: 100%;
  }
  to {
    left: 0;
  }
}
@-webkit-keyframes mymove2 /* Safari and Chrome */ {
  from {
    left: 100%;
  }
  to {
    left: 0;
  }
}
</style>
<style>
</style>
