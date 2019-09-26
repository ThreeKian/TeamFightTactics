<template>
  <div>
    <div style="text-align: left;padding: 20px 0 0 20px">
      <Input
        type="text"
        placeholder="请输入英雄"
        style="margin: 0 20px;width: 160px"
        v-model="heroName"
        @keyup.enter.native="searchHero()"
      />
      <Button type="primary" style="margin-right: 10px" @click="searchHero()">搜索</Button>
      <Button type="primary" style="margin-right: 10px" @click="resetHero()">重置</Button>
      <div style="margin: 10px 0 10px 20px">
        <span>种族：</span>
        <RadioGroup
          v-model="heroType"
          type="button"
          style="margin-right: 20px"
          @on-change="changeHero()"
        >
          <Radio label="全部"></Radio>
          <Radio label="恶魔"></Radio>
          <Radio label="龙族"></Radio>
          <Radio label="浪人"></Radio>
          <Radio label="极地"></Radio>
          <Radio label="帝国"></Radio>
          <Radio label="忍者"></Radio>
          <Radio label="贵族"></Radio>
          <Radio label="暗影"></Radio>
          <Radio label="海盗"></Radio>
          <Radio label="机器人"></Radio>
          <Radio label="虚空"></Radio>
          <Radio label="狂野"></Radio>
          <Radio label="约德尔人"></Radio>
        </RadioGroup>
      </div>
      <div style="margin: 10px 0 10px 20px">
        <span>职业：</span>
        <RadioGroup v-model="heroJob" type="button" @on-change="changeHero()">
          <Radio label="全部"></Radio>
          <Radio label="刺客"></Radio>
          <Radio label="剑士"></Radio>
          <Radio label="斗士"></Radio>
          <Radio label="元素使"></Radio>
          <Radio label="护卫"></Radio>
          <Radio label="枪手"></Radio>
          <Radio label="骑士"></Radio>
          <Radio label="游侠"></Radio>
          <Radio label="换形师"></Radio>
          <Radio label="法师"></Radio>
        </RadioGroup>
      </div>
    </div>
    <div style="display: flex;">
      <div class="hero-box" v-if="!showEmpty">
        <div
          class="hero-table"
          v-for="(item,index) in showHeroList"
          :key="index"
          @click="choosedHero(index)"
        >
          <div class="content-box">
            <img src="../assets/Images/champs/akl.png" class="hero-img" />
            <div class="attribute-box">
              <div class="attribute-content">
                <img src="../assets/Images/icon/ay.png" class="icon-type" />
                <div class="attribute-text">约德尔</div>
              </div>
              <div class="attribute-content" style="margin-top: 8px;">
                <img src="../assets/Images/icon/lr.png" class="icon-type" />
                <div class="attribute-text">法师</div>
              </div>
              <div class="attribute-content" style="margin-top: 8px;">
                <img src="../assets/Images/jb.png" class="icon-type" />
                <div class="attribute-text">4</div>
              </div>
            </div>
          </div>
          <!-- <img :src="item.img" class="heroImg" /> -->
        </div>
      </div>
      <div class="right-content">
        <h2 class="right-content-title">阵容列表</h2>
      </div>
    </div>
    <div class="heroBox" v-if="showEmpty">
      <div class="zanwu">
        <img src="../assets/zanwu.png" style="width: 200px;height: 180px" />
        <div>暂无数据</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "heroType",
  components: {},
  data() {
    return {
      allHeroList: [
        {
          name: "阿卡丽",
          img: require("../assets/cz/akl.png"),
          type: "忍者",
          job: "刺客"
        },
        {
          name: "阿里，阿狸，狐狸",
          img: require("../assets/cz/al.png"),
          type: "狂野",
          job: "法师"
        },
        {
          name: "波比",
          img: require("../assets/cz/bb.png"),
          type: "约德尔人",
          job: "骑士"
        },
        {
          name: "布隆",
          img: require("../assets/cz/bl.png"),
          type: "极地",
          job: "护卫"
        },
        {
          name: "丽桑卓，冰女",
          img: require("../assets/cz/bn.png"),
          type: "极地",
          job: "元素使"
        },
        {
          name: "船长，普朗克",
          img: require("../assets/cz/cz.png"),
          type: "海盗",
          job: "剑士",
          job2: "枪手"
        },
        {
          name: "大虫子，科加斯",
          img: require("../assets/cz/dcz.png"),
          type: "虚空",
          job: "斗士"
        },
        {
          name: "德莱文，水子哥，水哥",
          img: require("../assets/cz/dlw.png"),
          type: "帝国",
          job: "剑士"
        },
        {
          name: "冰鸟，凤凰，艾尼维亚",
          img: require("../assets/cz/fh.png"),
          type: "极地",
          job: "元素使"
        },
        {
          name: "寡妇，伊芙琳",
          img: require("../assets/cz/gf.png"),
          type: "恶魔",
          job: "刺客"
        },
        {
          name: "德玛，盖伦",
          img: require("../assets/cz/gl.png"),
          type: "贵族",
          job: "骑士"
        },
        {
          name: "寒冰，艾希",
          img: require("../assets/cz/hb.png"),
          type: "极地",
          job: "游侠"
        },
        {
          name: "火男，布兰德",
          img: require("../assets/cz/hn.png"),
          type: "恶魔",
          job: "元素使"
        },
        {
          name: "女枪，好运姐，赏金猎人，厄运小姐",
          img: require("../assets/cz/hyj.png"),
          type: "海盗",
          job: "枪手"
        },
        {
          name: "劫",
          img: require("../assets/cz/j.png"),
          type: "忍者",
          job: "刺客"
        },
        {
          name: "剑姬，菲欧娜",
          img: require("../assets/cz/jj.png"),
          type: "贵族",
          job: "剑士"
        },
        {
          name: "剑魔，亚托克斯",
          img: require("../assets/cz/jm.png"),
          type: "恶魔",
          job: "剑士"
        },
        {
          name: "机器人，布里茨",
          img: require("../assets/cz/jqr.png"),
          type: "机器人",
          job: "斗士"
        },
        {
          name: "凯南",
          img: require("../assets/cz/kn.png"),
          type: "忍者",
          type2: "约德尔人",
          job: "元素使"
        },
        {
          name: "卡萨丁",
          img: require("../assets/cz/ksd.png"),
          type: "虚空",
          job: "法师"
        },
        {
          name: "卡特琳娜",
          img: require("../assets/cz/ktln.png"),
          type: "帝国",
          job: "刺客"
        },
        {
          name: "露露",
          img: require("../assets/cz/ll.png"),
          type: "约德尔人",
          job: "法师"
        },
        {
          name: "拉面熊，沃利贝尔，狗熊",
          img: require("../assets/cz/lm.png"),
          type: "极地",
          job: "斗士"
        },
        {
          name: "龙女，希瓦娜",
          img: require("../assets/cz/ln.png"),
          type: "龙族",
          job: "换形师"
        },
        {
          name: "狼人，沃里克",
          img: require("../assets/cz/lr.png"),
          type: "狂野",
          job: "斗士"
        },
        {
          name: "龙王，奥瑞利安·索尔",
          img: require("../assets/cz/lw.png"),
          type: "龙族",
          job: "法师"
        },
        {
          name: "卢锡安，奥巴马",
          img: require("../assets/cz/lxa.png"),
          type: "贵族",
          job: "枪手"
        },
        {
          name: "莫干那",
          img: require("../assets/cz/mgn.png"),
          type: "恶魔",
          job: "法师"
        },
        {
          name: "奈德丽，豹女，奶大力",
          img: require("../assets/cz/ndl.png"),
          type: "狂野",
          job: "换形师"
        },
        {
          name: "纳尔",
          img: require("../assets/cz/ne.png"),
          type: "狂野",
          type2: "约德尔人",
          job: "换形师"
        },
        {
          name: "男枪，格雷福斯",
          img: require("../assets/cz/nq.png"),
          type: "海盗",
          job: "枪手"
        },
        {
          name: "诺手，德莱厄斯",
          img: require("../assets/cz/ns.png"),
          type: "帝国",
          job: "骑士"
        },
        {
          name: "派克",
          img: require("../assets/cz/pk.png"),
          type: "海盗",
          job: "刺客"
        },
        {
          name: "千珏",
          img: require("../assets/cz/qj.png"),
          type: "暗影",
          job: "游侠"
        },
        {
          name: "日女，雷欧娜",
          img: require("../assets/cz/rn.png"),
          type: "贵族",
          job: "护卫"
        },
        {
          name: "慎，腰子，肾",
          img: require("../assets/cz/s.png"),
          type: "忍者",
          job: "剑士"
        },
        {
          name: "死歌，死哥，卡尔萨斯",
          img: require("../assets/cz/sg.png"),
          type: "暗影",
          job: "法师"
        },
        {
          name: "狮子狗，雷恩加尔",
          img: require("../assets/cz/szg.png"),
          type: "狂野",
          job: "刺客"
        },
        {
          name: "螳螂，卡兹克",
          img: require("../assets/cz/tl.png"),
          type: "虚空",
          job: "刺客"
        },
        {
          name: "铁男，莫德凯撒",
          img: require("../assets/cz/tn.png"),
          type: "暗影",
          job: "骑士"
        },
        {
          name: "天使，凯尔",
          img: require("../assets/cz/ts.png"),
          type: "贵族",
          job: "骑士"
        },
        {
          name: "VN，vn，薇恩，澡子哥，枣子哥，洗澡狗",
          img: require("../assets/cz/vn.png"),
          type: "贵族",
          job: "游侠"
        },
        {
          name: "挖掘机，雷克塞",
          img: require("../assets/cz/wjj.png"),
          type: "虚空",
          job: "斗士"
        },
        {
          name: "韦鲁斯，维鲁斯",
          img: require("../assets/cz/wls.png"),
          type: "恶魔",
          job: "游侠"
        },
        {
          name: "乌鸦，斯维因",
          img: require("../assets/cz/wy.png"),
          type: "帝国",
          type2: "恶魔",
          job: "换形师"
        },
        {
          name: "小法，维嘉，维迦",
          img: require("../assets/cz/xf.png"),
          type: "约德尔人",
          job: "法师"
        },
        {
          name: "小炮，崔丝塔娜",
          img: require("../assets/cz/xp.png"),
          type: "约德尔人",
          job: "枪手"
        },
        {
          name: "亚索，孤儿，快乐风男",
          img: require("../assets/cz/ys.png"),
          type: "浪人",
          job: "剑士"
        },
        {
          name: "猪妹，猪女，瑟庄妮",
          img: require("../assets/cz/zm.png"),
          type: "极地",
          job: "骑士"
        },
        {
          name: "蜘蛛，伊莉丝",
          img: require("../assets/cz/zz.png"),
          type: "恶魔",
          job: "换形师"
        },
        {
          name: "卡牌大师，崔斯特",
          img: require("../assets/cz/kp.png"),
          type: "海盗",
          job: "法师"
        }
      ],
      showHeroList: [],
      heroName: "",
      heroType: "全部",
      heroJob: "全部",
      showEmpty: false
    };
  },
  mounted() {
    this.showHeroList = this.allHeroList;
  },
  methods: {
    changeHero() {
      this.showHeroList = [];
      if (this.heroType === "全部" && this.heroJob === "全部") {
        this.showHeroList = this.allHeroList;
      } else if (this.heroType !== "全部" && this.heroJob === "全部") {
        for (let item of this.allHeroList) {
          if (this.heroType === item.type || this.heroType === item.type2) {
            this.showHeroList.push(item);
          }
        }
      } else if (this.heroType === "全部" && this.heroJob !== "全部") {
        for (let item of this.allHeroList) {
          if (this.heroJob === item.job || this.heroJob === item.job2) {
            this.showHeroList.push(item);
          }
        }
      } else if (this.heroType !== "全部" && this.heroJob !== "全部") {
        for (let item of this.allHeroList) {
          if (
            (this.heroType === item.type || this.heroType === item.type2) &&
            (this.heroJob === item.job || this.heroJob === item.job2)
          ) {
            this.showHeroList.push(item);
          }
        }
      }
      if (this.showHeroList.length === 0) {
        this.showEmpty = true;
      } else {
        this.showEmpty = false;
      }
      console.log(this.heroType);
    },
    searchHero() {
      this.showHeroList = [];
      this.heroType = "全部";
      this.heroJob = "全部";
      for (let item of this.allHeroList) {
        if (item.name.indexOf(this.heroName) !== -1) {
          this.showHeroList.push(item);
        }
      }
      if (this.showHeroList.length === 0) {
        this.showEmpty = true;
      } else {
        this.showEmpty = false;
      }
    },
    resetHero() {
      this.showHeroList = [];
      this.heroName = "";
      this.heroType = "全部";
      this.heroJob = "全部";
      for (let item of this.allHeroList) {
        if (item.name.indexOf(this.heroName) !== -1) {
          this.showHeroList.push(item);
        }
      }
      if (this.showHeroList.length === 0) {
        this.showEmpty = true;
      } else {
        this.showEmpty = false;
      }
    }
  }
};
</script>
<style type="less" scope>
.hero-box {
  display: flex;
  flex-wrap: wrap;
  width: calc(75% - 20px);
  text-align: center;
  margin-left: 20px;
  max-height: 640px;
}
.hero-table {
  margin: 15px 15px 0 0;
  width: 200px;
  height: 120px;
}
.content-box {
  width: 200px;
  height: 120px;
  display: flex;
  background: linear-gradient(to bottom, #f2e0d7, #e2c4b5) !important;
  border-radius: 3px;
}
.hero-img {
  width: 66px;
  height: 66px;
  margin: 27px 0 27px 10px;
}
.attribute-box {
  margin: 10px 10px 10px 8px;
  border-left: 1px solid #d7c1b9;
}
.attribute-content {
  display: flex;
}
.icon-type {
  margin-left: 10px;
  width: 28px;
  height: 28px;
}
.attribute-text {
  line-height: 28px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #845948;
}
.zanwu {
  width: 200px;
  height: 180px;
  margin-left: calc(50% - 100px);
  margin-top: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #666;
}
.right-content {
  border: 1px solid #f1f1f1;
  width: calc(25% - 20px);
  margin: 15px 20px 0 0;
}
.right-content-title {
  font-weight: bold;
  text-align: left;
  margin: 10px 0 10px 10px;
  color: #666;
}
</style>