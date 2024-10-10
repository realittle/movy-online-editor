import * as mo from 'movy';
// npm run dev 即可在editor实时同步
// mo.addText({})

mo.addGrid({ gridSize: 100}); // 用于

mo.addCircleOutline(
  {x:-3.5,y:0,radius:1.5,
    lineWidth:0.3,color: "#3498db"}
).reveal()
mo.addCircleOutline({x:3.5,y:0,radius:1.5}).reveal()

mo.addArrow(
  [-1.7, 0], [2, 0], 
  { lineWidth: 0.07 }
).drawLine({ duration: 1.5 });
