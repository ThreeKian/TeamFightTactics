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
      <Button type="primary" style="margin-right: 10px" @click="searchHero()"
        >搜索</Button
      >
      <Button type="primary" style="margin-right: 10px" @click="resetHero()"
        >重置</Button
      >
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
          <Radio label="约德尔"></Radio>
          <Radio label="海克斯"></Radio>
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
          v-for="(item, index) in showHeroList"
          :key="index"
        >
          <div class="content-box" @click="addHero(item)">
            <img :src="item.img" class="hero-img" />
            <div class="attribute-box">
              <div class="attribute-content">
                <img :src="item.typeImg" class="icon-type" />
                <div class="attribute-text" v-if="!item.type2">
                  {{ item.type }}
                </div>
                <div class="attribute-text" v-if="item.type2">
                  {{ item.type }},{{ item.type2 }}
                </div>
              </div>
              <div class="attribute-content">
                <img :src="item.jobImg" class="icon-type" />
                <div class="attribute-text" v-if="!item.job2">
                  {{ item.job }}
                </div>
                <div class="attribute-text" v-if="item.job2">
                  {{ item.job }},{{ item.job2 }}
                </div>
              </div>
              <div class="attribute-content">
                <img src="../assets/Images/jb.png" class="icon-type" />
                <div class="attribute-text">{{ item.star }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-content" v-if="!showEmpty">
        <div style="display: flex;justify-content: space-between">
          <h2 class="right-content-title">阵容列表</h2>
          <Button
            type="primary"
            style="height: 30px;margin: 9px 10px 8px 0;"
            @click="cleanMyTeam()"
            >全部清除</Button
          >
        </div>
        <div class="cell" style="flex-wrap: wrap;">
          <div
            v-for="(data, index) in teamList"
            class="myTeam"
            :key="index"
            @click="removeHreo(index)"
          >
            <div>
              <img :src="data.img" style="width: 100%" />
              <div
                class="starText"
                :class="{
                  gray: data.star === '1',
                  green: data.star === '2',
                  blue: data.star === '3',
                  zi: data.star === '4',
                  orange: data.star === '5'
                }"
              >
                {{ data.star }}
              </div>
            </div>
          </div>
        </div>
        <h2 class="right-content-title">羁绊</h2>
        <div class="cell" style="flex-wrap: wrap;display: flex;">
          <div
            v-for="(data, index) in collocationData"
            :key="index"
          >
            <Tooltip placement="top" max-width="200" :disabled="data[0].showFull === false">
              <div class="collocationBox" v-if="data[0].list.length > 0">
                <img class="collocationImg" :src="data[0].collocationImg" v-if="data[0].list.length > 0"/>
                <div class="collocationText" v-if="data[0].list.length > 0" :class="{'lightText': data[0].showFull === false}">
                  {{ data[0].name }}({{ data[0].list.length }})个
                </div>
              </div>
              <div slot="content">
                <span>{{data[0].collocation[parseInt((data[0].list.length / data[0].full))].content}}</span>
              </div>
            </Tooltip>
          </div>
        </div>
        <!-- <div class="composeWeaponsBox">
          <div
            class="composeWeaponsContent"
            v-for="(item, index) in composeWeaponsList"
            :key="index"
            :class="index % 2 === 0 ? 'rightLine' : ''"
          >
            <div style="margin-left: 7px">
              <img :src="item.firstName" class="composeWeaponsImg" />
            </div>
            +
            <div><img :src="item.secondName" class="composeWeaponsImg" /></div>
            =
            <div style="margin-right: 7px">
              <img :src="item.thirdName" class="composeWeaponsImg" />
            </div>
          </div>
        </div> -->
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
          img: require("../assets/Images/champs/akl.png"),
          type: "忍者",
          job: "刺客",
          star: "4"
        },
        {
          name: "阿里，阿狸，狐狸",
          img: require("../assets/Images/champs/hl.png"),
          type: "狂野",
          job: "法师",
          star: "2"
        },
        {
          name: "波比",
          img: require("../assets/Images/champs/bb.png"),
          type: "约德尔",
          job: "骑士",
          star: "3"
        },
        {
          name: "布隆",
          img: require("../assets/Images/champs/bl.png"),
          type: "极地",
          job: "护卫",
          star: "2"
        },
        {
          name: "丽桑卓，冰女",
          img: require("../assets/Images/champs/bn.png"),
          type: "极地",
          job: "元素使",
          star: "2"
        },
        {
          name: "船长，普朗克",
          img: require("../assets/Images/champs/cz.png"),
          type: "海盗",
          job: "剑士",
          job2: "枪手",
          star: "3"
        },
        {
          name: "大虫子，科加斯",
          img: require("../assets/Images/champs/dcz.png"),
          type: "虚空",
          job: "斗士",
          star: "4"
        },
        {
          name: "德莱文，水子哥，水哥",
          img: require("../assets/Images/champs/dlw.png"),
          type: "帝国",
          job: "剑士",
          star: "4"
        },
        {
          name: "冰鸟，凤凰，艾尼维亚",
          img: require("../assets/Images/champs/fh.png"),
          type: "极地",
          job: "元素使",
          star: "5"
        },
        {
          name: "寡妇，伊芙琳",
          img: require("../assets/Images/champs/gf.png"),
          type: "恶魔",
          job: "刺客",
          star: "3"
        },
        {
          name: "德玛，盖伦",
          img: require("../assets/Images/champs/gl.png"),
          type: "贵族",
          job: "骑士",
          star: "1"
        },
        {
          name: "寒冰，艾希",
          img: require("../assets/Images/champs/ax.png"),
          type: "极地",
          job: "游侠",
          star: "3"
        },
        {
          name: "火男，布兰德",
          img: require("../assets/Images/champs/hn.png"),
          type: "恶魔",
          job: "元素使",
          star: "4"
        },
        {
          name: "女枪，好运姐，赏金猎人，厄运小姐",
          img: require("../assets/Images/champs/hyj.png"),
          type: "海盗",
          job: "枪手",
          star: "5"
        },
        {
          name: "劫",
          img: require("../assets/Images/champs/j.png"),
          type: "忍者",
          job: "刺客",
          star: "2"
        },
        {
          name: "剑姬，菲欧娜",
          img: require("../assets/Images/champs/jj.png"),
          type: "贵族",
          job: "剑士",
          star: "1"
        },
        {
          name: "剑魔，亚托克斯",
          img: require("../assets/Images/champs/jm.png"),
          type: "恶魔",
          job: "剑士",
          star: "3"
        },
        {
          name: "机器人，布里茨",
          img: require("../assets/Images/champs/jqr.png"),
          type: "机器人",
          job: "斗士",
          star: "2"
        },
        {
          name: "凯南",
          img: require("../assets/Images/champs/kn.png"),
          type: "忍者",
          type2: "约德尔",
          job: "元素使",
          star: "3"
        },
        {
          name: "卡萨丁",
          img: require("../assets/Images/champs/ksd.png"),
          type: "虚空",
          job: "法师",
          star: "1"
        },
        {
          name: "卡特琳娜",
          img: require("../assets/Images/champs/kt.png"),
          type: "帝国",
          job: "刺客",
          star: "3"
        },
        {
          name: "露露",
          img: require("../assets/Images/champs/ll.png"),
          type: "约德尔",
          job: "法师",
          star: "2"
        },
        {
          name: "拉面熊，沃利贝尔，狗熊",
          img: require("../assets/Images/champs/gx.png"),
          type: "极地",
          job: "斗士",
          star: "3"
        },
        {
          name: "龙女，希瓦娜",
          img: require("../assets/Images/champs/ln.png"),
          type: "龙族",
          job: "换形师",
          star: "3"
        },
        {
          name: "狼人，沃里克",
          img: require("../assets/Images/champs/lr.png"),
          type: "狂野",
          job: "斗士",
          star: "2"
        },
        {
          name: "龙王，奥瑞利安·索尔",
          img: require("../assets/Images/champs/lw.png"),
          type: "龙族",
          job: "法师",
          star: "4"
        },
        {
          name: "卢锡安，奥巴马",
          img: require("../assets/Images/champs/lxa.png"),
          type: "贵族",
          job: "枪手",
          star: "2"
        },
        {
          name: "莫干那，莫甘娜",
          img: require("../assets/Images/champs/mgn.png"),
          type: "恶魔",
          job: "法师",
          star: "3"
        },
        {
          name: "奈德丽，豹女，奶大力",
          img: require("../assets/Images/champs/ndl.png"),
          type: "狂野",
          job: "换形师",
          star: "2"
        },
        {
          name: "纳尔",
          img: require("../assets/Images/champs/ne.png"),
          type: "狂野",
          type2: "约德尔",
          job: "换形师",
          star: "4"
        },
        {
          name: "男枪，格雷福斯",
          img: require("../assets/Images/champs/nq.png"),
          type: "海盗",
          job: "枪手",
          star: "1"
        },
        {
          name: "诺手，德莱厄斯",
          img: require("../assets/Images/champs/ns.png"),
          type: "帝国",
          job: "骑士",
          star: "1"
        },
        {
          name: "派克",
          img: require("../assets/Images/champs/pk.png"),
          type: "海盗",
          job: "刺客",
          star: "2"
        },
        {
          name: "千珏",
          img: require("../assets/Images/champs/qj.png"),
          type: "暗影",
          job: "游侠",
          star: "4"
        },
        {
          name: "日女，雷欧娜",
          img: require("../assets/Images/champs/rn.png"),
          type: "贵族",
          job: "护卫",
          star: "4"
        },
        {
          name: "慎，腰子，肾",
          img: require("../assets/Images/champs/s.png"),
          type: "忍者",
          job: "剑士",
          star: "2"
        },
        {
          name: "死歌，死哥，卡尔萨斯",
          img: require("../assets/Images/champs/sg.png"),
          type: "暗影",
          job: "法师",
          star: "5"
        },
        {
          name: "狮子狗，雷恩加尔",
          img: require("../assets/Images/champs/szg.png"),
          type: "狂野",
          job: "刺客",
          star: "3"
        },
        {
          name: "螳螂，卡兹克",
          img: require("../assets/Images/champs/tl.png"),
          type: "虚空",
          job: "刺客",
          star: "1"
        },
        {
          name: "铁男，莫德凯撒",
          img: require("../assets/Images/champs/tn.png"),
          type: "暗影",
          job: "骑士",
          star: "1"
        },
        {
          name: "天使，凯尔",
          img: require("../assets/Images/champs/ts.png"),
          type: "贵族",
          job: "骑士",
          star: "5"
        },
        {
          name: "VN，vn，薇恩，澡子哥，枣子哥，洗澡狗",
          img: require("../assets/Images/champs/vn.png"),
          type: "贵族",
          job: "游侠",
          star: "1"
        },
        {
          name: "挖掘机，雷克塞",
          img: require("../assets/Images/champs/wjj.png"),
          type: "虚空",
          job: "斗士",
          star: "2"
        },
        {
          name: "韦鲁斯，维鲁斯",
          img: require("../assets/Images/champs/wls.png"),
          type: "恶魔",
          job: "游侠",
          star: "2"
        },
        {
          name: "乌鸦，斯维因",
          img: require("../assets/Images/champs/wy.png"),
          type: "帝国",
          type2: "恶魔",
          job: "换形师",
          star: "5"
        },
        {
          name: "小法，维嘉，维迦",
          img: require("../assets/Images/champs/xf.png"),
          type: "约德尔",
          job: "法师",
          star: "3"
        },
        {
          name: "小炮，崔丝塔娜",
          img: require("../assets/Images/champs/xp.png"),
          type: "约德尔",
          job: "枪手",
          star: "1"
        },
        {
          name: "亚索，孤儿，快乐风男",
          img: require("../assets/Images/champs/ys.png"),
          type: "浪人",
          job: "剑士",
          star: "5"
        },
        {
          name: "猪妹，猪女，瑟庄妮",
          img: require("../assets/Images/champs/zm.png"),
          type: "极地",
          job: "骑士",
          star: "4"
        },
        {
          name: "蜘蛛，伊莉丝",
          img: require("../assets/Images/champs/zz.png"),
          type: "恶魔",
          job: "换形师",
          star: "1"
        },
        {
          name: "卡牌大师，崔斯特",
          img: require("../assets/Images/champs/kp.png"),
          type: "海盗",
          job: "法师",
          star: "2"
        },
        {
          name: "卡莎，卡沙",
          img: require("../assets/Images/champs/ks.png"),
          type: "虚空",
          job: "刺客",
          job2: "游侠",
          star: "5"
        },
        {
          name: "青钢影，卡蜜尔，卡米尔，卡密尔",
          img: require("../assets/Images/champs/qgy.png"),
          type: "海克斯",
          job: "剑士",
          star: "1"
        },
        {
          name: "杰斯",
          img: require("../assets/Images/champs/js.png"),
          type: "海克斯",
          job: "换形师",
          star: "2"
        },
        {
          name: "蔚，皮城执法官",
          img: require("../assets/Images/champs/w.png"),
          type: "海克斯",
          job: "斗士",
          star: "3"
        },
        {
          name: "金克斯",
          img: require("../assets/Images/champs/jks.png"),
          type: "海克斯",
          job: "枪手",
          star: "4"
        }
      ],
      showHeroList: [],
      heroName: "",
      heroType: "全部",
      heroJob: "全部",
      showEmpty: false,
      teamList: [],
      judgeList: [],
      collocationDict: {
        恶魔: "em",
        龙族: "lz",
        浪人: "lr",
        极地: "jd",
        帝国: "dg",
        忍者: "rz",
        贵族: "gz",
        暗影: "ay",
        海盗: "hd",
        机器人: "jqr",
        虚空: "xk",
        狂野: "ky",
        约德尔: "yder",
        海克斯: "hks",
        刺客: "ck",
        剑士: "js",
        斗士: "ds",
        元素使: "yss",
        护卫: "hw",
        枪手: "qs",
        骑士: "qishi",
        游侠: "yx",
        换形师: "hxs",
        法师: "fs"
      },
      collocationData: {
        lr: [
          {
            name: "浪人",
            list: [],
            full: 1,
            collocation: [{
                content: "浪人(1)：战斗开始时如果领近格子没有友军，会获得他生命值100%的护盾"
              }],
            showFull: true,
            collocationImg: require("../assets/Images/icon-jb/lr-f.png"),
          }
        ],
        jqr: [
          {
            name: "机器人",
            list: [],
            full: 1,
            collocation: [{
                content: "机器人(1)：战斗开始时充满法力值"
              }],
            showFull: true,
            collocationImg: require("../assets/Images/icon-jb/jqr-f.png"),
          }
        ],
        lz: [
          {
            name: "龙族",
            list: [],
            full: 2,
            collocation: [{
                content: "龙族(2)：-减75%魔免"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/lz-h.png"),
          }
        ],
        xk: [
          {
            name: "虚空",
            list: [],
            full: 2,
            collocation: [{
                content: "虚空(2)：1名随机虚空英雄造成真实伤害"
              }, {
                content: "虚空(4)：所有虚空英雄造成真实伤害"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/xk-h.png"),
          }
        ],
        dg: [
          {
            name: "帝国",
            list: [],
            full: 2,
            collocation: [{
                content: "帝国(2)：随机1个帝国角色产生双倍伤害"
              }, {
                content: "帝国(4)：所有帝国角色产生双倍伤害"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/dg-h.png"),
          }
        ],
        hd: [
          {
            name: "海盗",
            list: [],
            full: 3,
            collocation: [{
                content: "海盗(3)：每回合随机赚取1-4枚金币(每箱平均1.75金币)"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/hd-h.png"),
          }
        ],
        rz: [
          {
            name: "忍者",
            list: [],
            full: 1,
            collocation: [{
                content: "忍者(1)：该忍者角色提高攻击力和法术强度50"
              }, {
                content: "忍者(1)：该忍者角色提高攻击力和法术强度50"
              }, {
                content: "忍者(1)：该忍者角色提高攻击力和法术强度50"
              }, {
                content: "忍者(4)：所有忍者提高攻击力和法术强度80"
              }],
            showFull: true,
            collocationImg: require("../assets/Images/icon-jb/rz-f.png"),
          }
        ],
        ky: [
          {
            name: "狂野",
            list: [],
            full: 2,
            collocation: [{
                content: "狂野(2)：狂野英雄攻击会生成怒气层数(最多5层)。每层怒气提供12%攻击速度"
              }, {
                content: "狂野(4)：所有英雄攻击会生成怒气层数(最多5层)。每层怒气提供12%攻击速度"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/ky-h.png"),
          }
        ],
        gz: [
          {
            name: "贵族",
            list: [],
            full: 3,
            collocation: [{
                content: "贵族(3)：随机一个友军+50护甲和魔抗并且每次攻击获得30生命"
              }, {
                content: "贵族(6)：所有友军+50护甲和魔抗并且每次攻击获得30生命"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/gz-h.png"),
          }
        ],
        jd: [
          {
            name: "极地",
            list: [],
            full: 2,
            collocation: [{
                content: "极地(2)：20%几率造成2秒眩晕效果"
              }, {
                content: "极地(4)：33%几率造成2秒眩晕效果"
              }, {
                content: "极地(6)：50%几率造成2秒眩晕效果"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/jd-h.png"),
          }
        ],
        yder: [
          {
            name: "约德尔",
            list: [],
            full: 3,
            collocation: [{
                content: "约德尔(3)：对友方约德尔人进行的攻击会有35%几率闪避"
              }, {
                content: "约德尔(6)：对友方约德尔人进行的攻击会有60%几率"
              }, {
                content: "约德尔(9)：对友方约德尔人进行的攻击会有90%几率闪避"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/yder-h.png"),
          }
        ],
        em: [
          {
            name: "恶魔",
            list: [],
            full: 2,
            collocation: [
              {
                content: "恶魔(2)：普攻有40%几率燃烧敌人20法力并获取15法力"
              },
              {
                content: "恶魔(4)：普攻有40%几率燃烧敌人20法力并获取30法力"
              },
              {
                content: "恶魔(6)：普攻有40%几率燃烧敌人20法力并获取45法力"
              }
            ],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/em-h.png"),
          }
        ],
        ay: [
          {
            name: "暗影",
            list: [],
            full: 2,
            collocation: [{
                content: "暗影(2)：在战斗开始时诅咒一名随机敌人，将其生命值变为100"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/ay-h.png"),
          }
        ],
        hks: [
          {
            name: "海克斯",
            list: [],
            full: 2,
            collocation: [{
                content: "海克斯(2)：在战斗开始时发射炸弹使有装备目标附近1格敌人的装备失效7秒"
              }, {
                content: "海克斯(4)：在战斗开始时发射炸弹使有装备目标附近2格敌人的装备失效7秒"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/hks-h.png"),
          }
        ],
        hw: [
          {
            name: "护卫",
            list: [],
            full: 2,
            collocation: [{
                content: "护卫(2)：邻近友军获得50点护甲"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/hw-h.png"),
          }
        ],
        yss: [
          {
            name: "元素使",
            list: [],
            full: 3,
            collocation: [{
                content: "元素使(3)：在战斗开始时召唤一个元素之灵，血量：2200，伤害：100"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/yss-h.png"),
          }
        ],
        yx: [
          {
            name: "游侠",
            list: [],
            full: 2,
            collocation: [{
                content: "游侠(2)：每3秒有25%概率攻速翻倍，持续3秒"
              }, {
                content: "游侠(4)：每3秒有70%概率攻速翻倍，持续3秒"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/yx-h.png"),
          }
        ],
        ds: [
          {
            name: "斗士",
            list: [],
            full: 2,
            collocation: [{
                content: "斗士(2)：游侠获得额外250点最大生命值"
              }, {
                content: "斗士(4)：获得额外500点最大生命值"
              }, {
                content: "斗士(6)：获得额外900点最大生命值"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/ds-h.png"),
          }
        ],
        qs: [
          {
            name: "枪手",
            list: [],
            full: 2,
            collocation: [{
                content: "枪手(2)：攻击后有50%几率对范围内1个敌人进行额外打击"
              }, {
                content: "枪手(4)：攻击后有50%几率对范围内2个敌人进行额外打击"
              }, {
                content: "枪手(6)：攻击后有50%几率对范围内3个敌人进行额外打击"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/qs-h.png"),
          }
        ],
        hxs: [
          {
            name: "换型师",
            list: [],
            full: 3,
            collocation: [{
                content: "换型师(3)：在变形时获得60%最大生命值"
              }, {
                content: "换型师(6)：在变形时获得100%最大生命值"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/hxs-h.png"),
          }
        ],
        js: [
          {
            name: "剑士",
            list: [],
            full: 3,
            collocation: [{
                content: "剑士(3)：每次攻击有45%几率打出1次额外攻击"
              }, {
                content: "剑士(6)：每次攻击有45%几率打出2次额外攻击"
              }, {
                content: "剑士(9)：每次攻击有45%几率打出4次额外攻击"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/js-h.png"),
          }
        ],
        qishi: [
          {
            name: "骑士",
            list: [],
            full: 2,
            collocation: [{
                content: "骑士(2)：所有友军无视所有来源15点伤害"
              }, {
                content: "骑士(4)：所有友军无视所有来源35点伤害"
              }, {
                content: "骑士(6)：所有友军无视所有来源65点伤害"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/qishi-h.png"),
          }
        ],
        ck: [
          {
            name: "刺客",
            list: [],
            full: 3,
            collocation: [{
                content: "刺客(3)：所有刺客获得额外75%暴击伤害及10%暴击概率"
              }, {
                content: "刺客(6)：所有刺客获得额外150%暴击伤害及25%暴击概率"
              }, {
                content: "刺客(9)：所有刺客获得额外225%暴击伤害及40%暴击概率"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/ck-h.png"),
          }
        ],
        fs: [
          {
            name: "法师",
            list: [],
            full: 3,
            collocation: [{
                content: "法师(3)：所有友军增加40%技能伤害"
              }, {
                content: "法师(6)：所有友军增加100%技能伤害"
              }, {
                content: "法师(9)：所有友军增加175%技能伤害"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/fs-h.png"),
          }
        ],
      }
    };
  },
  mounted() {
    this.allHeroList.sort((a, b) => {
      return Number(a.star) - Number(b.star);
    });
    for (let item of this.allHeroList) {
      item.typeImg = require("../assets/Images/icon/" +
        this.collocationDict[item.type] +
        ".png");
      item.jobImg = require("../assets/Images/icon/" +
        this.collocationDict[item.job] +
        ".png");
    }
    for (let i in this.collocationData) {
      let dict = {
        content: ''
      }
      this.collocationData[i][0].collocation.unshift(dict)
    }
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
        // this.teamList = [];
        // this.judgeList = [];
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
    },
    addHero(data) {
      let dict = {
        img: data.img,
        job: data.job,
        type: data.type,
        num: 1,
        star: data.star,
        name: data.name
      };
      if (data.job2) {
        dict.job2 = data.job2;
      }
      if (data.type2) {
        dict.type2 = data.type2;
      }
      if (this.teamList.length >= 10) {
        this.$Message.error("超过最大人口数量");
        return;
      }
      if (this.judgeList.indexOf(data.name) !== -1) {
        this.teamList[this.judgeList.indexOf(data.name)].num++;
        dict.num = this.teamList[this.judgeList.indexOf(data.name)].num;
        if (this.teamList[this.judgeList.indexOf(data.name)].num > 2) {
          this.$Message.error("相同英雄不能超过2个");
          this.teamList[this.judgeList.indexOf(data.name)].num--;
          dict.num = this.teamList[this.judgeList.indexOf(data.name)].num;
          return;
        }
      }
      this.judgeList.push(data.name);
      this.teamList.push(dict);
      // 判断种族
      if (this.collocationData[this.collocationDict[data.type]]) {
        // 判断collocationData内是否存在相同的英雄，因为如果有2个相同英雄，那么羁绊是不会增加的，所以要确保没有该英雄才把数据塞进去
        if (this.collocationData[this.collocationDict[data.type]][0].list.indexOf(data.name) === -1) {
          this.collocationData[this.collocationDict[data.type]][0].list.push(
            data.name
          );
        }
        // 判断羁绊是否满足起始要求，比如：2恶魔可以成羁绊，但是1个不行。满足的话显示金色图标，不满足显示蓝色，full表示最少形成羁绊的英雄数量
        if (this.collocationData[this.collocationDict[data.type]][0].list.length >= this.collocationData[this.collocationDict[data.type]][0].full) {
          this.collocationData[this.collocationDict[data.type]][0].showFull = true;
          this.collocationData[this.collocationDict[data.type]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.type] + "-f" + ".png");
          // 判断是否为忍者，并且数量大于1小于4，是的话取消金色羁绊图标显示，并且不提示羁绊内容
          if (data.type === '忍者' && this.collocationData[this.collocationDict[data.type]][0].list.length > 1 &&
          this.collocationData[this.collocationDict[data.type]][0].list.length < 4) {
            this.collocationData[this.collocationDict[data.type]][0].showFull = false;
            this.collocationData[this.collocationDict[data.type]][0].collocationImg =
              require('../assets/Images/icon-jb/' + this.collocationDict[data.type] + "-h" + ".png");
          }
        } else {
          this.collocationData[this.collocationDict[data.type]][0].showFull = false;
          this.collocationData[this.collocationDict[data.type]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.type] + "-h" + ".png");
        }
      }
      // 判断是否存在2个种族
      if (data.type2 && this.collocationData[this.collocationDict[data.type2]]) {
        if (this.collocationData[this.collocationDict[data.type2]][0].list.indexOf(data.name) === -1) {
          this.collocationData[this.collocationDict[data.type2]][0].list.push(
            data.name
          );
        }
        if (this.collocationData[this.collocationDict[data.type2]][0].list.length >= this.collocationData[this.collocationDict[data.type2]][0].full) {
          this.collocationData[this.collocationDict[data.type2]][0].showFull = true;
          this.collocationData[this.collocationDict[data.type2]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.type2] + "-f" + ".png");
          // 判断是否为忍者，并且数量大于1小于4，是的话取消金色羁绊图标显示，并且不提示羁绊内容
          if (data.type2 === '忍者' && this.collocationData[this.collocationDict[data.type2]][0].list.length > 1 &&
          this.collocationData[this.collocationDict[data.type2]][0].list.length < 4) {
            this.collocationData[this.collocationDict[data.type2]][0].showFull = false;
            this.collocationData[this.collocationDict[data.type2]][0].collocationImg =
              require('../assets/Images/icon-jb/' + this.collocationDict[data.type2] + "-h" + ".png");
          }
        } else {
          this.collocationData[this.collocationDict[data.type2]][0].showFull = false;
          this.collocationData[this.collocationDict[data.type2]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.type2] + "-h" + ".png");
        }
      }
      // 判断职业
      if (this.collocationData[this.collocationDict[data.job]]) {
        // 判断collocationData内是否存在相同的英雄，因为如果有2个相同英雄，那么羁绊是不会增加的，所以要确保没有该英雄才把数据塞进去
        if (this.collocationData[this.collocationDict[data.job]][0].list.indexOf(data.name) === -1) {
          this.collocationData[this.collocationDict[data.job]][0].list.push(
            data.name
          );
        }
        // 判断羁绊是否满足起始要求，比如：2恶魔可以成羁绊，但是1个不行。满足的话显示金色图标，不满足显示蓝色，full表示最少形成羁绊的英雄数量
        if (this.collocationData[this.collocationDict[data.job]][0].list.length >= this.collocationData[this.collocationDict[data.job]][0].full) {
          this.collocationData[this.collocationDict[data.job]][0].showFull = true;
          this.collocationData[this.collocationDict[data.job]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.job] + "-f" + ".png");
        } else {
          this.collocationData[this.collocationDict[data.job]][0].showFull = false;
          this.collocationData[this.collocationDict[data.job]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.job] + "-h" + ".png");
        }
      }
      // 判断是否存在2个职业
      if (data.job2 && this.collocationData[this.collocationDict[data.job2]]) {
        if (this.collocationData[this.collocationDict[data.job2]][0].list.indexOf(data.name) === -1) {
          this.collocationData[this.collocationDict[data.job2]][0].list.push(
            data.name
          );
        }
        if (this.collocationData[this.collocationDict[data.job2]][0].list.length >= this.collocationData[this.collocationDict[data.job2]][0].full) {
          this.collocationData[this.collocationDict[data.job2]][0].showFull = true;
          this.collocationData[this.collocationDict[data.job2]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.job2] + "-f" + ".png");
        } else {
          this.collocationData[this.collocationDict[data.job2]][0].showFull = false;
          this.collocationData[this.collocationDict[data.job2]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.job2] + "-h" + ".png");
        }
      }
    },
    removeHreo(index) {
      let data = this.teamList[index];
      // 判断种族
      if (this.collocationData[this.collocationDict[data.type]]) {
        // 判断头部英雄是否有该重复的英雄.num是添加的时候加入的数量，添加的方法里已经判断过了，如果有重复的英雄，num+1，但是因为新增的时候做过判断
        // 不管头部有几个同样的英雄，羁绊的list里面只会存入1个该英雄的名字
        // 此时，如果num===1,说明头部英雄列表内只存在1个该英雄，那么遍历羁绊内list，如果第i个和当前要删除的英雄名字相同，那么list删除第i个
        // 羁绊list内就没有该英雄了，html会自行根据list的数量来判断显示羁绊数量
        if (this.teamList[this.judgeList.indexOf(data.name)].num === 1) {
          let currentNum = Number;
          for (let i = 0; i < this.collocationData[this.collocationDict[data.type]][0].list.length; i++) {
            if (this.collocationData[this.collocationDict[data.type]][0].list[i] === data.name) {
              currentNum = i;
            }
          }
          this.collocationData[this.collocationDict[data.type]][0].list.splice(currentNum, 1);
        }
        // 重新判断羁绊是否满足最低数量要求，满足显示金色图标，不满足显示蓝色
        if (this.collocationData[this.collocationDict[data.type]][0].list.length >= this.collocationData[this.collocationDict[data.type]][0].full) {
          this.collocationData[this.collocationDict[data.type]][0].showFull = true;
          this.collocationData[this.collocationDict[data.type]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.type] + "-f" + ".png");
          // 判断是否为忍者，并且数量大于1小于4，是的话取消金色羁绊图标显示，并且不提示羁绊内容
          if (data.type === '忍者' && this.collocationData[this.collocationDict[data.type]][0].list.length > 1 &&
          this.collocationData[this.collocationDict[data.type]][0].list.length < 4) {
            this.collocationData[this.collocationDict[data.type]][0].showFull = false;
            this.collocationData[this.collocationDict[data.type]][0].collocationImg =
              require('../assets/Images/icon-jb/' + this.collocationDict[data.type] + "-h" + ".png");
          }
        } else {
          this.collocationData[this.collocationDict[data.type]][0].showFull = false;
          this.collocationData[this.collocationDict[data.type]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.type] + "-h" + ".png");
        }
      }
      if (data.type2 && this.collocationData[this.collocationDict[data.type2]]) {
        if (this.teamList[this.judgeList.indexOf(data.name)].num === 1) {
          let currentNum = Number;
          for (let i = 0; i < this.collocationData[this.collocationDict[data.type2]][0].list.length; i++) {
            if (this.collocationData[this.collocationDict[data.type2]][0].list[i] === data.name) {
              currentNum = i;
            }
          }
          this.collocationData[this.collocationDict[data.type2]][0].list.splice(currentNum, 1);
        }
        if (this.collocationData[this.collocationDict[data.type2]][0].list.length >= this.collocationData[this.collocationDict[data.type2]][0].full) {
          this.collocationData[this.collocationDict[data.type2]][0].showFull = true;
          this.collocationData[this.collocationDict[data.type2]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.type2] + "-f" + ".png");
          // 判断是否为忍者，并且数量大于1小于4，是的话取消金色羁绊图标显示，并且不提示羁绊内容
          if (data.type2 === '忍者' && this.collocationData[this.collocationDict[data.type2]][0].list.length > 1 &&
          this.collocationData[this.collocationDict[data.type2]][0].list.length < 4) {
            this.collocationData[this.collocationDict[data.type2]][0].showFull = false;
            this.collocationData[this.collocationDict[data.type2]][0].collocationImg =
              require('../assets/Images/icon-jb/' + this.collocationDict[data.type2] + "-h" + ".png");
          }
        } else {
          this.collocationData[this.collocationDict[data.type2]][0].showFull = false;
          this.collocationData[this.collocationDict[data.type2]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.type2] + "-h" + ".png");
        }
      }
      // 判断职业
      if (this.collocationData[this.collocationDict[data.job]]) {
        if (this.teamList[this.judgeList.indexOf(data.name)].num === 1) {
          let currentNum = Number;
          for (let i = 0; i < this.collocationData[this.collocationDict[data.job]][0].list.length; i++) {
            if (this.collocationData[this.collocationDict[data.job]][0].list[i] === data.name) {
              currentNum = i;
            }
          }
          this.collocationData[this.collocationDict[data.job]][0].list.splice(currentNum, 1);
        }
        // 重新判断羁绊是否满足最低数量要求，满足显示金色图标，不满足显示蓝色
        if (this.collocationData[this.collocationDict[data.job]][0].list.length >= this.collocationData[this.collocationDict[data.job]][0].full) {
          this.collocationData[this.collocationDict[data.job]][0].showFull = true;
          this.collocationData[this.collocationDict[data.job]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.job] + "-f" + ".png");
        } else {
          this.collocationData[this.collocationDict[data.job]][0].showFull = false;
          this.collocationData[this.collocationDict[data.job]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.job] + "-h" + ".png");
        }
      }
      if (data.job2 && this.collocationData[this.collocationDict[data.job2]]) {
        if (this.teamList[this.judgeList.indexOf(data.name)].num === 1) {
          let currentNum = Number;
          for (let i = 0; i < this.collocationData[this.collocationDict[data.job2]][0].list.length; i++) {
            if (this.collocationData[this.collocationDict[data.job2]][0].list[i] === data.name) {
              currentNum = i;
            }
          }
          this.collocationData[this.collocationDict[data.job2]][0].list.splice(currentNum, 1);
        }
        if (this.collocationData[this.collocationDict[data.job2]][0].list.length >= this.collocationData[this.collocationDict[data.job2]][0].full) {
          this.collocationData[this.collocationDict[data.job2]][0].showFull = true;
          this.collocationData[this.collocationDict[data.job2]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.job2] + "-f" + ".png");
        } else {
          this.collocationData[this.collocationDict[data.job2]][0].showFull = false;
          this.collocationData[this.collocationDict[data.job2]][0].collocationImg =
          require('../assets/Images/icon-jb/' + this.collocationDict[data.job2] + "-h" + ".png");
        }
      }
      // 如果头部英雄列表存在相同英雄，那么就算下面this.judgeList.splice(index, 1)删除了该英雄，但是另外一个相同英雄的dict里面num并没有变化
      // 此时需要num也变化，所以减1
      for (let item of this.teamList) {
        if (item.name === data.name) {
          item.num--;
        }
      }
      this.teamList.splice(index, 1);
      this.judgeList.splice(index, 1);
    },
    cleanMyTeam() {
      this.teamList = [];
      this.judgeList = [];
      this.collocationData = {
        lr: [
          {
            name: "浪人",
            list: [],
            full: 1,
            collocation: [{
                content: "浪人(1)：战斗开始时如果领近格子没有友军，会获得他生命值100%的护盾"
              }],
            showFull: true,
            collocationImg: require("../assets/Images/icon-jb/lr-f.png"),
          }
        ],
        jqr: [
          {
            name: "机器人",
            list: [],
            full: 1,
            collocation: [{
                content: "机器人(1)：战斗开始时充满法力值"
              }],
            showFull: true,
            collocationImg: require("../assets/Images/icon-jb/jqr-f.png"),
          }
        ],
        lz: [
          {
            name: "龙族",
            list: [],
            full: 2,
            collocation: [{
                content: "龙族(2)：-减75%魔免"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/lz-h.png"),
          }
        ],
        xk: [
          {
            name: "虚空",
            list: [],
            full: 2,
            collocation: [{
                content: "虚空(2)：1名随机虚空英雄造成真实伤害"
              }, {
                content: "虚空(4)：所有虚空英雄造成真实伤害"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/xk-h.png"),
          }
        ],
        dg: [
          {
            name: "帝国",
            list: [],
            full: 2,
            collocation: [{
                content: "帝国(2)：随机1个帝国角色产生双倍伤害"
              }, {
                content: "帝国(4)：所有帝国角色产生双倍伤害"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/dg-h.png"),
          }
        ],
        hd: [
          {
            name: "海盗",
            list: [],
            full: 3,
            collocation: [{
                content: "海盗(3)：每回合随机赚取1-4枚金币(每箱平均1.75金币)"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/hd-h.png"),
          }
        ],
        rz: [
          {
            name: "忍者",
            list: [],
            full: 1,
            collocation: [{
                content: "忍者(1)：该忍者角色提高攻击力和法术强度50"
              }, {
                content: "忍者(1)：该忍者角色提高攻击力和法术强度50"
              }, {
                content: "忍者(1)：该忍者角色提高攻击力和法术强度50"
              }, {
                content: "忍者(4)：所有忍者提高攻击力和法术强度80"
              }],
            showFull: true,
            collocationImg: require("../assets/Images/icon-jb/rz-f.png"),
          }
        ],
        ky: [
          {
            name: "狂野",
            list: [],
            full: 2,
            collocation: [{
                content: "狂野(2)：狂野英雄攻击会生成怒气层数(最多5层)。每层怒气提供12%攻击速度"
              }, {
                content: "狂野(4)：所有英雄攻击会生成怒气层数(最多5层)。每层怒气提供12%攻击速度"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/ky-h.png"),
          }
        ],
        gz: [
          {
            name: "贵族",
            list: [],
            full: 3,
            collocation: [{
                content: "贵族(3)：随机一个友军+50护甲和魔抗并且每次攻击获得30生命"
              }, {
                content: "贵族(6)：所有友军+50护甲和魔抗并且每次攻击获得30生命"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/gz-h.png"),
          }
        ],
        jd: [
          {
            name: "极地",
            list: [],
            full: 2,
            collocation: [{
                content: "极地(2)：20%几率造成2秒眩晕效果"
              }, {
                content: "极地(4)：33%几率造成2秒眩晕效果"
              }, {
                content: "极地(6)：50%几率造成2秒眩晕效果"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/jd-h.png"),
          }
        ],
        yder: [
          {
            name: "约德尔",
            list: [],
            full: 3,
            collocation: [{
                content: "约德尔(3)：对友方约德尔人进行的攻击会有35%几率闪避"
              }, {
                content: "约德尔(6)：对友方约德尔人进行的攻击会有60%几率"
              }, {
                content: "约德尔(9)：对友方约德尔人进行的攻击会有90%几率闪避"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/yder-h.png"),
          }
        ],
        em: [
          {
            name: "恶魔",
            list: [],
            full: 2,
            collocation: [
              {
                content: "恶魔(2)：普攻有40%几率燃烧敌人20法力并获取15法力"
              },
              {
                content: "恶魔(4)：普攻有40%几率燃烧敌人20法力并获取30法力"
              },
              {
                content: "恶魔(6)：普攻有40%几率燃烧敌人20法力并获取45法力"
              }
            ],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/em-h.png"),
          }
        ],
        ay: [
          {
            name: "暗影",
            list: [],
            full: 2,
            collocation: [{
                content: "暗影(2)：在战斗开始时诅咒一名随机敌人，将其生命值变为100"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/ay-h.png"),
          }
        ],
        hks: [
          {
            name: "海克斯",
            list: [],
            full: 2,
            collocation: [{
                content: "海克斯(2)：在战斗开始时发射炸弹使有装备目标附近1格敌人的装备失效7秒"
              }, {
                content: "海克斯(4)：在战斗开始时发射炸弹使有装备目标附近2格敌人的装备失效7秒"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/hks-h.png"),
          }
        ],
        hw: [
          {
            name: "护卫",
            list: [],
            full: 2,
            collocation: [{
                content: "护卫(2)：邻近友军获得50点护甲"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/hw-h.png"),
          }
        ],
        yss: [
          {
            name: "元素使",
            list: [],
            full: 3,
            collocation: [{
                content: "元素使(3)：在战斗开始时召唤一个元素之灵，血量：2200，伤害：100"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/yss-h.png"),
          }
        ],
        yx: [
          {
            name: "游侠",
            list: [],
            full: 2,
            collocation: [{
                content: "游侠(2)：每3秒有25%概率攻速翻倍，持续3秒"
              }, {
                content: "游侠(4)：每3秒有70%概率攻速翻倍，持续3秒"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/yx-h.png"),
          }
        ],
        ds: [
          {
            name: "斗士",
            list: [],
            full: 2,
            collocation: [{
                content: "斗士(2)：游侠获得额外250点最大生命值"
              }, {
                content: "斗士(4)：获得额外500点最大生命值"
              }, {
                content: "斗士(6)：获得额外900点最大生命值"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/ds-h.png"),
          }
        ],
        qs: [
          {
            name: "枪手",
            list: [],
            full: 2,
            collocation: [{
                content: "枪手(2)：攻击后有50%几率对范围内1个敌人进行额外打击"
              }, {
                content: "枪手(4)：攻击后有50%几率对范围内2个敌人进行额外打击"
              }, {
                content: "枪手(6)：攻击后有50%几率对范围内3个敌人进行额外打击"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/qs-h.png"),
          }
        ],
        hxs: [
          {
            name: "换型师",
            list: [],
            full: 3,
            collocation: [{
                content: "换型师(3)：在变形时获得60%最大生命值"
              }, {
                content: "换型师(6)：在变形时获得100%最大生命值"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/hxs-h.png"),
          }
        ],
        js: [
          {
            name: "剑士",
            list: [],
            full: 3,
            collocation: [{
                content: "剑士(3)：每次攻击有45%几率打出1次额外攻击"
              }, {
                content: "剑士(6)：每次攻击有45%几率打出2次额外攻击"
              }, {
                content: "剑士(9)：每次攻击有45%几率打出4次额外攻击"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/js-h.png"),
          }
        ],
        qishi: [
          {
            name: "骑士",
            list: [],
            full: 2,
            collocation: [{
                content: "骑士(2)：所有友军无视所有来源15点伤害"
              }, {
                content: "骑士(4)：所有友军无视所有来源35点伤害"
              }, {
                content: "骑士(6)：所有友军无视所有来源65点伤害"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/qishi-h.png"),
          }
        ],
        ck: [
          {
            name: "刺客",
            list: [],
            full: 3,
            collocation: [{
                content: "刺客(3)：所有刺客获得额外75%暴击伤害及10%暴击概率"
              }, {
                content: "刺客(6)：所有刺客获得额外150%暴击伤害及25%暴击概率"
              }, {
                content: "刺客(9)：所有刺客获得额外225%暴击伤害及40%暴击概率"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/ck-h.png"),
          }
        ],
        fs: [
          {
            name: "法师",
            list: [],
            full: 3,
            collocation: [{
                content: "法师(3)：所有友军增加40%技能伤害"
              }, {
                content: "法师(6)：所有友军增加100%技能伤害"
              }, {
                content: "法师(9)：所有友军增加175%技能伤害"
              }],
            showFull: false,
            collocationImg: require("../assets/Images/icon-jb/fs-h.png"),
          }
        ],
      }
      for (let i in this.collocationData) {
      let dict = {
        content: ''
      }
      this.collocationData[i][0].collocation.unshift(dict)
    }
    },
  }
};
</script>
<style type="less" scope>
.hero-box {
  display: flex;
  flex-wrap: wrap;
  width: calc(68% - 20px);
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
  width: 54px;
  height: 54px;
  margin: 33px 0 33px 10px;
}
.attribute-box {
  margin: 10px 10px 10px 8px;
  border-left: 1px solid #d7c1b9;
}
.attribute-content {
  display: flex;
}
.icon-type {
  margin: 4px 0 4px 4px;
  width: 27px;
  height: 27px;
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
  width: calc(32% - 20px);
  margin: 15px 20px 0 0;
}
.right-content-title {
  font-weight: bold;
  text-align: left;
  margin: 10px 0 10px 10px;
  color: #666;
}
.cell {
  display: flex;
  width: 100%;
}
.myTeam {
  width: 12%;
  margin-left: 4%;
  margin-top: 10px;
}
.starText {
  width: 100%;
  height: 16px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  margin-top: -5px;
}
.gray {
  background: gray;
}
.green {
  background: green;
}
.blue {
  background: royalblue;
}
.zi {
  background: darkorchid;
}
.orange {
  background: orange;
}
.collocationBox {
  width: 100%;
  height: 30px;
  text-align: center;
  display: flex;
  padding-left: 10px;
  margin-top: 10px;
}
.collocationImg {
  width: 24px;
  height: 24px;
  margin-top: 3px;
}
.collocationText {
  color: #666;
  font-size: 15px;
  line-height: 30px;
  font-weight: bold;
  margin-left: 3px;
}
.lightText {
  color: rgb(180, 180, 180);
}
</style>