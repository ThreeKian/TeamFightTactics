<template>
  <div style="display: flex;">
    <div class="left-box">
      <div v-for="(data, index) in typeList" :key="index" class="flex row-box">
        <div>
          <div class="title-text">{{data.name}}：</div>
          <div v-html="data.attribute" class="content-text">{{data.attribute}}</div>
        </div>
        <div class="flex">
          <div v-for="(data2, index2) in data.List" :key="index2">
            <div class="flex img-box">
              <img :src="data2.name" style="width:44px;height:44px;" />
              <div
                v-bind:class="{'gray': data2.star === '1', 'green': data2.star === '2', 'blue': data2.star === '3',
            'zi': data2.star === '4', 'orange': data2.star === '5'}"
                class="star-text"
              >{{data2.star}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-box">
      <div v-for="(data, index) in jobList" :key="index" class="flex row-box" :class="{'bold-line': index === 1}">
        <div>
          <div class="title-text">{{data.name}}：</div>
          <div v-html="data.attribute" class="content-text">{{data.attribute}}</div>
        </div>
        <div class="flex">
          <div v-for="(item, index2) in data.List" :key="index2">
            <div class="flex img-box">
              <img :src="item.name" style="width:44px;height:44px;" />
              <div
                v-bind:class="{'gray': item.star === '1', 'green': item.star === '2', 'blue': item.star === '3',
            'zi': item.star === '4', 'orange': item.star === '5'}"
                class="star-text"
              >{{item.star}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'heroType',
  components: {},
  data () {
    return {
      typeList: [
        {
          List: [
            {
              name: require('../assets/Images/champs/ys.png'),
              star: '5'
            }
          ],
          name: '浪人',
          attribute:
            '<span>战斗开始时如果领近格子没有友军，会获得他生命值100%的护盾</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/jqr.png'),
              star: '2'
            }
          ],
          name: '机器人',
          attribute: '<span>战斗开始时充满法力值</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/ln.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/lw.png'),
              star: '4'
            },
            {
              name: require('../assets/Images/champs/ps.png'),
              star: '5'
            }
          ],
          name: '龙族',
          attribute: '<span>-减83魔免</span><span style="color:red">(2)</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/tl.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/ksd.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/wjj.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/dcz.png'),
              star: '4'
            }
          ],
          name: '虚空',
          attribute:
            '<span>虚空英雄造成真实伤害</span><span style="color:red">(3)</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/ns.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/kt.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/dlw.png'),
              star: '4'
            },
            {
              name: require('../assets/Images/champs/wy.png'),
              star: '5'
            }
          ],
          name: '帝国',
          attribute:
            '<span>随机1个</span><span style="color:red">(2)</span>' +
            '<span>，或所有</span><span style="color:red">(4)</span><span>帝国角色产生双倍伤害 </span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/nq.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/kp.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/pk.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/cz.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/hyj.png'),
              star: '5'
            }
          ],
          name: '海盗',
          attribute:
            '<span>每回合随机赚取1-4枚金币(每箱平均1.75金币)</span><span style="color:red">(3)</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/s.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/j.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/kn.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/akl.png'),
              star: '4'
            }
          ],
          name: '忍者',
          attribute:
            '<span>只有</span><span style="color:red">(1)</span><span>：该忍者角色提高攻击力和法术强度50 </span>' +
            '<span style="color:red">(4)</span><span>所有忍者提高攻击力和法术强度70</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/lr.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/ndl.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/hl.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/szg.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/ne.png'),
              star: '4'
            }
          ],
          name: '狂野',
          attribute:
            '<span>攻击会生成怒气层数(最多5层)。每层怒气提供12%攻击速度。仅限狂野</span><span style="color:red">(2)</span>' +
            '<span>所有友军</span><span style="color:red">(4)</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/jj.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/gl.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/vn.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/lxa.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/rn.png'),
              star: '4'
            },
            {
              name: require('../assets/Images/champs/ts.png'),
              star: '5'
            }
          ],
          name: '贵族',
          attribute:
            '<span>随机一个友军+100护甲并且每次攻击治疗该友军50点护甲和魔抗以及每次攻击获得25生命</span><span style="color:red">(3)</span>' +
            '<span>所有友军</span><span style="color:red">(6)</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/bl.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/bn.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/gx.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/ax.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/zm.png'),
              star: '4'
            },
            {
              name: require('../assets/Images/champs/fh.png'),
              star: '4'
            }
          ],
          name: '极地',
          attribute:
            '<span>20%</span><span style="color:red">(2)</span><span>，30%</span><span style="color:red">(4)</span>' +
            '<span>，45%</span><span style="color:red">(6)</span><span>几率造成2秒眩晕效果</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/xp.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/ll.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/bb.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/xf.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/kn.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/ne.png'),
              star: '4'
            }
          ],
          name: '约德尔',
          attribute:
            '<span>对友方约德尔人进行的攻击会有35%</span><span style="color:red">(3)</span>' +
            '<span>60%</span><span style="color:red">(6)</span><span>几率命中</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/zz.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/wls.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/mgn.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/gf.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/jm.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/hn.png'),
              star: '4'
            },
            {
              name: require('../assets/Images/champs/wy.png'),
              star: '5'
            }
          ],
          name: '恶魔',
          attribute:
            '<span>普攻有40%几率燃烧敌人20法力并获取15</span><span style="color:red">(2)</span>，30<span style="color:red">(4)</span>' +
            '<span>，45</span><span style="color:red">(6)</span><span>法力</span>'
        }
      ],
      jobList: [
        {
          List: [
            {
              name: require('../assets/Images/champs/tn.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/qj.png'),
              star: '4'
            },
            {
              name: require('../assets/Images/champs/sg.png'),
              star: '5'
            }
          ],
          name: '暗影',
          attribute:
            '<span>在战斗开始时诅咒一名随机敌人，将其生命值变为100</span><span style="color:red">(2)</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/qgy.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/js.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/w.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/jks.png'),
              star: '4'
            }
          ],
          name: '海克斯',
          attribute:
            '<span>在战斗开始时发射炸弹使有装备目标附近1格<span style="color:red">(2)</span>，2格<span style="color:red">(4)</span>' +
            '<span>敌人的装备失效7秒</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/bl.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/rn.png'),
              star: '4'
            },
            {
              name: require('../assets/Images/champs/ps.png'),
              star: '5'
            }
          ],
          name: '护卫',
          attribute: '<span>邻近友军获得50点护甲</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/bn.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/kn.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/hn.png'),
              star: '4'
            },
            {
              name: require('../assets/Images/champs/fh.png'),
              star: '5'
            }
          ],
          name: '元素使',
          attribute:
            '<span>在战斗开始时召唤一个元素之灵，血量：2200，伤害：100</span><span style="color:red">(3)</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/vn.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/wls.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/ax.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/qj.png'),
              star: '4'
            }
          ],
          name: '游侠',
          attribute:
            '<span>每3秒有30%</span><span style="color:red">(2)</span><span>，70%</span><span style="color:red">(4)</span>' +
            '<span>概率攻速翻倍，持续3秒</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/lr.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/wjj.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/jqr.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/gx.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/w.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/dcz.png'),
              star: '4'
            }
          ],
          name: '斗士',
          attribute:
            '<span>获得额外250</span><span style="color:red">(2)</span><span>，500</span><span style="color:red">(4)</span>' +
            '<span>，900</span><span style="color:red">(4)</span><span>点最大生命值</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/nq.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/xp.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/lxa.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/cz.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/jks.png'),
              star: '4'
            },
            {
              name: require('../assets/Images/champs/hyj.png'),
              star: '5'
            }
          ],
          name: '枪手',
          attribute:
            '<span>攻击后有50%几率对范围内1个</span><span style="color:red">(2)</span><span>，2个</span><span style="color:red">(4)</span>' +
            '<span>，3个</span><span style="color:red">(4)</span><span>敌人进行额外打击</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/ndl.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/zz.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/js.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/ln.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/ne.png'),
              star: '4'
            },
            {
              name: require('../assets/Images/champs/wy.png'),
              star: '5'
            }
          ],
          name: '换形师',
          attribute:
            '<span>在变形时获得60%</span><span style="color:red">(4)</span><span>，120%</span><span style="color:red">(6)</span>' +
            '<span>最大生命值</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/jj.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/qgy.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/s.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/jm.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/cz.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/dlw.png'),
              star: '4'
            },
            {
              name: require('../assets/Images/champs/ys.png'),
              star: '5'
            }
          ],
          name: '剑士',
          attribute:
            '<span>每次攻击有35%几率打出1次</span><span style="color:red">(3)</span><span>，2次</span><span style="color:red">(6)</span>' +
            '<span>，4次</span><span style="color:red">(9)</span><span>额外攻击</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/ns.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/gl.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/tn.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/bb.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/zm.png'),
              star: '4'
            },
            {
              name: require('../assets/Images/champs/ts.png'),
              star: '5'
            }
          ],
          name: '骑士',
          attribute:
            '<span>所有友军无视所有来源15点</span><span style="color:red">(2)</span><span>，35点</span><span style="color:red">(4)</span>' +
            '<span>，65点</span><span style="color:red">(6)</span><span>伤害</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/tl.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/pk.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/j.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/kt.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/gf.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/szg.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/akl.png'),
              star: '4'
            }
          ],
          name: '刺客',
          attribute:
            '<span>所有刺客获得额外75%</span><span style="color:red">(3)</span><span>，150%</span>' +
            '<span style="color:red">(6)</span><span>，225%</span><span style="color:red">(9)</span><span>暴击伤害及10%' +
            '</span><span style="color:red">(3)</span><span>，25%</span><span style="color:red">(6)</span>' +
            '<span>，40%</span><span style="color:red">(9)</span><span>暴击概率</span>'
        },
        {
          List: [
            {
              name: require('../assets/Images/champs/ksd.png'),
              star: '1'
            },
            {
              name: require('../assets/Images/champs/kp.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/hl.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/ll.png'),
              star: '2'
            },
            {
              name: require('../assets/Images/champs/xf.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/mgn.png'),
              star: '3'
            },
            {
              name: require('../assets/Images/champs/lw.png'),
              star: '4'
            },
            {
              name: require('../assets/Images/champs/sg.png'),
              star: '5'
            }
          ],
          name: '法师',
          attribute:
            '<span>所有友军增加40%</span><span style="color:red">(3)</span><span>，100%</span><span style="color:red">(6)</span>' +
            '<span>，175%</span><span style="color:red">(9)</span><span>技能伤害</span>'
        }
      ]
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style lang="less">
.left-box {
  width: 50%;
}
.right-box {
  width: 50%;
}
.title-text {
  display: table-cell;
  height: 56px;
  vertical-align: middle;
  font-size: 17px;
  font-weight: bold;
  width: 70px;
  text-align: right;
  color: darkgoldenrod;
}
.content-text {
  display: table-cell;
  height: 56px;
  vertical-align: middle;
  font-size: 13px;
  font-weight: bold;
  text-align: left;
  color: grey;
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
.star-text {
  width: 18px;
  height: 18px;
  font-size: 13px;
  line-height: 18px;
  font-weight: bold;
  color: white;
  margin: 26px -18px 0 -18px;
}
.flex {
  display: flex;
}
.row-box {
  height: 56px;
  border-bottom: 1px solid #f1f1f1;
  justify-content: space-between;
}
.bold-line {
    border-bottom: 2px dashed #999;
}
.img-box {
  width: 44px;
  height: 44px;
  margin: 6px 0 6px 3px;
}
</style>
