/* main.js为主文件，调用所有函数 
 * 命名规则: 所有的creep均有分类，分类以英文直译为主
 * Harvester: 工人(收割机)，主要任务为采集当前房间的矿物(黄色方块)，同时对hits<hitsMax的ROAD进行修复
 *            注意: 游戏中大部分建筑都有耐久(腐蚀)，需要及时维修(repair)
 * Builder: 建筑师，主要任务是采集资源来建造建筑，同时及时对TOWER提供能量
 *            注意: TOWER可以攻击敌人，治疗友军，维修建筑，但是都需要能量(ENERGY)
 * Upgrader: 升级者，主要任务是对当前房间的控制器(Controller)进行升级
 *            注意: Controller在一定时间不进行升级就会降级(我也很无语...)
 *                  升级Controller可以建造更多的建筑和控制更多的房间
 * Harvester1: 目前懒得对不同的房间进行命名(因为目前级别过低不能占领其它房间，之后可以不用这个)
 * Claim: 占领者，目前级别不够不用在意，之后再说
 * rebirth: 重生机制，保证有足够的creep在工作(creep在1500ticks后会死去)，这个代码有点复杂....
 * tower: 塔楼，用处如上
 * */

var roleHarvester = require('harvester.js');
var roleHarvester1 = require('harvester1.js');
var roleBuilder = require('builder.js');
var roleUpgrader = require('upgrader.js');
var rebirth = require('rebirth.js');
var tower = require('tower.js');
var roleClaim = require('claim.js');
var roleAttacker = require('attacker.js');

// 该代码是循环执行，即这个代码上层会套一个while不断的运行
// 如果要将当前状态进行传递，可以存储到creep.memory.x.(x是变量名)
module.exports.loop = function () {

    rebirth.run();
    tower.run();

    for(var name in Game.creeps) {
    // 循环枚举每一个creep，每个creep根据其职务进行了分类
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'harvester1') {
            roleHarvester1.run(creep);
        }
        if(creep.memory.role == 'claim') {
            roleClaim.run(creep);
        }
        if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
    }
}
