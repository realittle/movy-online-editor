import * as mo from 'movy';

// mo.addAxes2D().addGrid() // 快捷键Ctrl+`/` -- 坐标轴和网格线参考

// 请在此输入代码块
const codeTxt = `  
MATCH (w1:Word)-[:MEANS]->(dm)
    <-[:MEANS]-(w2:Word)
WHERE w1.spell = 'judge'
RETURN dm.text AS meaning, 
    COLLECT(w2.spell) AS synonyms
`;

const codeRows = codeTxt.trim(' ').trim('\n').split('\n'); // 将代码按行分割存入列表
// TODO：应更改为代码长度最大的那行字符长度
const firstRowLen = codeRows[0].length; // 获取第一行代码的长度
const totalRows = codeRows.length; // 获取代码总行数

// TODO：设置字体大小，使代码块随字体大小而变化
const scale = 0.5; 
let x = 0 - firstRowLen / 5; // 设置第一行代码横坐标位置 -- 以(0,0)为坐标中心，下同
let y = totalRows / 2; // 设置第一行代码纵坐标位置


for(let rowIndex in codeRows) { // 注意此处遍历拿到的是数组的索引

    const row = mo.addText(
        codeRows[rowIndex], // 各行代码
        {
            font: 'code', // 仅zh、gdh支持输入中文
            position: [x,y],
            anchor: 'topLeft', // 以代码左上角为position基准点
            scale,
        }
    ).typeText({
      interval: 0.1, // 每打一个字符串的间隔时长
      cursorBlinkCount: 0, // 该行代码打完后的光标闪烁次数
      cursorBlinkSpeed: 5, // 该行代码打完后的光标闪烁速度
    })

    y -= scale * 2; // 设置下一行代码纵坐标位置
}