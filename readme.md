# readme

官方文档：https://docs.screeps.com/index.html

官方中文文档：https://screeps-cn.github.io/

文档：https://twodam.net/Tutorial-for-Screeps-0

# invite响应入口

https://github.com/steamyali/screeps/invitations

# 代码注释

* `main.js`为主文件，所有的函数调用都在其中
* `harvester.js`是一种分类为harvester的creep的代码，其中包含以下任务: 
    * 采矿(...)
    * 对于部分需要提供能量和耐久的部件进行维护
    * 多于的矿(能源)丢到Spawn中来产生新的creep
* `builder.js`是一种分类为builder的creep的代码，主要是进行采矿来修建ROAD,TOWER...
* `upgrader.js`是一种分类为upgrader的creep的代码，主要是进行采矿来更新Energy Sources(能量源)
* `rebirth.js`是重生creep代码，因为creep有寿命限制，可以保证creep的命名规则和个数一定
* `makeroad.js`是造路的，好像没什么用...因为造路是一次性的，不要在意...

# Connect C++

Install emsdk:
```
sudo apt-get install python2.7 cmake default-jre git-core
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
```

If you want to update it, try to use `./emsdk update` in emsdk

# 游戏教程

创造一个Spawn`Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1');`

这个操作是需要在`Console`中使用，因为这个是只需要使用一次的而`Script`是需要循环运行

黄色方块为能源(source)，使用带有`WORK`的Creep来获取，使用带有`CARRY`的来搬运

在`Script`中使用`Ctrl+Enter`运行代码(或使用一个钩状图形)

```java
module.exports.loop = function () {
    var creep = Game.creeps['Harvester1'];
    // 命名Harvester1为creep
    if(creep.carry.energy < creep.carryCapacity) { // 如果还未收集完能量
    // 其中creep.carry.energy为creep的携带资源，creep.carryCapacity为creep的携带资源总量
        var sources = creep.room.find(FIND_SOURCES); // 令sources为该房间可以找到的所有能源，是一个数组
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) { // harvest是转移资源
        // 意思是creep不在目标sources[0]的位置导致无法转移资源
            creep.moveTo(sources[0]); // 移动到sources[0]
        }
    }
    else { // 否则
        if( creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
            // 如果无法传输则移动(这个函数好像是直接传输的，同时有一个返回值)
            creep.moveTo(Game.spawns['Spawn1']); // 移动到Spawn1
        }
    }
    // ERR_NOT_IN_RANGE为全局变量，大小为-9，意义为不在目标
}
```

同时我们可以将上面的代码改为一种循环，方式如下：

```java
...
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        // 其它部分均一样
    }
...
```

现在可以尝试使用模块(function)来简化代码，我们将上面的代码保存在role.harvester

```java
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
	}
};

module.exports = roleHarvester;
```

将main修改为
```java
var roleHarvester = require('role.harvester');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        roleHarvester.run(creep);
    }
}
```

现在新建一个新的creep命名为`Upgrader1`，同时将其进行分类`Game.creeps['Harvester1'].memory.role = 'harvester'; Game.creeps['Upgrader1'].memory.role = 'upgrader';`

新建文档`role.upgrader`

```java
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } // 先让creep进行能量收集至满
        else { 
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) { 
            // 前往这个房间的控制结构来升级
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;
```

`main`的修改与上面类似，只要对不同类型的creep执行不同命令即可

```java
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') { // role: 类别
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
```

第二个控制器级别有5种扩展，而一个房间的控制器需要经常升级(20000)，否则会判断失去控制权

新建一个creep: `Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1',     { memory: {
role: 'builder' } } );`

新建`role.builder`

```java
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) { // 没能量就挖矿
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) { // 有能量就开建
	        creep.memory.building = true; // 这不就是个flag么...真的丑
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) { // 建造
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else { // 挖矿
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;
```

`main`修改为
```java
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
```

`main`修改为(死去的creep实时更新)
```java
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    for(var name in Memory.creeps) { // 将多于的名字清空内存
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // filter意味过滤
    console.log('Harvesters: ' + harvesters.length); // 计算数量

    if(harvesters.length < 2) { // 少于2个
        var newName = 'Harvester' + Game.time; // 新建一个名字
        console.log('Spawning new harvester: ' + newName); 
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}}); // 新建一个Harvester
    }

    if(Game.spawns['Spawn1'].spawning) { // 看不懂...
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
```

有一个房间安全模式`Game.spawns['Spawn1'].room.controller.activateSafeMode();`

新建塔楼`Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );`

`role.harvester`进行修改
```java
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, { // 塔楼需要补充能量
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;
```

`main`修改
```java
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    var tower = Game.getObjectById('38d5ff1a72418098ff525d97');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) { // 自动修复(好像是tower来修复墙壁)
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) { // 自动攻击
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
```
