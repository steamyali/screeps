# readme

官方文档：https://docs.screeps.com/index.html

官方中文文档：https://screeps-cn.github.io/

文档：https://twodam.net/Tutorial-for-Screeps-0

# invite响应入口

https://github.com/steamyali/screeps/invitations

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

黄色方块为能源(source)，使用带有`WORK`的Creep来获取，使用带有`CARRY`的来搬运

在`Script`中使用`Ctrl+Enter`运行代码(或使用一个钩状图形)

```java
module.exports.loop = function () {
    var creep = Game.creeps['Harvester1'];
    // 命名Harvester1为creep
    if(creep.carry.energy < creep.carryCapacity) { // 如果还未收集完能量
    // 其中creep.carry.energy为creep的携带资源，creep.carryCapacity为creep的携带资源总量
        var sources = creep.room.find(FIND_SOURCES); // 令sources为该房间可以找到的所有能源，是一个数组
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) { // harvest是转移
        // 意思是creep不在目标sources[0]的位置
            creep.moveTo(sources[0]); // 移动到sources[0]
        }
    }
    else { // 否则
        if( creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
            creep.moveTo(Game.spawns['Spawn1']); // 移动到Spawn1
        }
    }
    // ERR_NOT_IN_RANGE为全局变量，大小为-9，意义为不在目标
}
```
