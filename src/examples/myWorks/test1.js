import * as mo from 'movy';

// 快捷键Ctrl+`/` -- 坐标轴和网格线参考
// mo.addAxes2D().addGrid();

// 请在此输入代码块
const codeTxt = `  
MATCH (w1:Word)-[:MEANS]->(dm)
    <-[:MEANS]-(w2:Word)
WHERE w1.spell = 'judge'
RETURN dm.text AS meaning, 
    COLLECT(w2.spell) AS synonyms
`;
// 将代码按行分割存入列表
const codeRows = codeTxt.trim(' ').trim('\n').split('\n');

// 设置字体相对大小，使代码块随字体大小而变化
const scale = 0.5; 

// 获取代码总行数
const totalRows = codeRows.length; 
// 设置第一行代码纵坐标位置 -- 以(0,0)为坐标中心，下同
let y = totalRows * scale; 

// 封装一个函数，用来获取string[]数组中最长字符串的长度
function getMaxLen(strList){ 
    let maxStrLen = 0;
    for(let i in strList) {
        // 获取各行代码的长度
        const strLen = codeRows[i].length;
        if (strLen > maxStrLen) {
            maxStrLen = strLen;
        }
    }
    return maxStrLen;
}
// 设置第一行代码横坐标位置
let x = 0 - getMaxLen(codeRows) * scale / 2.5;

// 将多行代码组合成文本块（无需在此定义基准点）
const textGroup = mo.addGroup({scale: 1});

// 注意此处遍历拿到的是数组的索引
for (let i in codeRows) { 
    // 在进度条添加标记
    mo.addMarker('第' + String(Number(i) + 1) + '行代码'); 
    textGroup.addText(
        codeRows[i], // 各行代码
        {
            font: 'code', // 仅zh、gdh支持输入中文
            position: [x,y],
            anchor: 'topLeft', // 以代码左上角为position基准点
            scale,
        }
    ).typeText({
      interval: 0.03, // 每打一个字符串的间隔时长
      cursorBlinkCount: 0, // 该行代码打完后的光标闪烁次数
      cursorBlinkSpeed: 20, // 该行代码打完后的光标闪烁速度
    });
    // 设置下一行代码纵坐标位置
    y -= scale * 2; 
}
mo.pause(0.8); // 动画暂停，以秒为单位

// 文本组整体移动，position为相对位移位置
// 让两个步骤同时进行的方法 -- t: '<'
// textGroup.scaleTo(0.7).moveTo({position: [-4,3],t: '<'});
textGroup.scaleTo(0.5).moveTo({position: [5.3,-3.5],t: '<'});

// 获取GroupObject下的子对象数组
const groupArr = textGroup.children;
for (let i in groupArr) {
  let timeParam;
  // 防止第一行提前变色
  if (Number(i)){ timeParam = {t: '<'};}
  // 逐行变色
  groupArr[i].changeColor('#0073ff',timeParam); // 缩短变色间隔
  if (Number(i) + 1 >= groupArr.length){
    mo.pause(0.7); // 最后一行代码延迟褪色
  }
  groupArr[i].changeColor('#fff');
  // 所在行褪色的同时，给下一行上色
  groupArr[String(Number(i)+1)].changeColor('#0073ff',{t: '<'});
}