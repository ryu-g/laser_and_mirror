
const AreaState = {
  EMPTY: 'empty',
  MIRROR1: 'mirror1',
  MIRROR2: 'mirror2',
  JEWEL: 'jewel'
}

function initializeField() {
  const field = [
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
  ];

  // ゴールの設定
  field[4][4] = AreaState.JEWEL;

  // 鏡の設定
  field[2][1] = AreaState.MIRROR1;
  field[3][2] = AreaState.MIRROR2;

  return field;
}

function simulateLaser(field, startX, startY, direction) {
  let x = startX;
  let y = startY;

  while (x >= 0 && x < field.length && y >= 0 && y < field[0].length) {
      const areaState = field[x][y];
      if (areaState === AreaState.JEWEL) {
          console.log('Laser hit the jewel!');
          return true;
      } else if (areaState === AreaState.MIRROR1) {
          // 鏡1によるレーザーの方向転換ロジック
          [x, y, direction] = reflectLaser(direction, 'mirror1');
      } else if (areaState === AreaState.MIRROR2) {
          // 鏡2によるレーザーの方向転換ロジック
          [x, y, direction] = reflectLaser(direction, 'mirror2');
      } else {
          // 進行方向に沿ってレーザーを進める
          [x, y] = moveLaser(x, y, direction);
      }
  }

  console.log('Laser did not hit the jewel.');
  return false;
}

function moveLaser(x, y, direction) {
  switch (direction) {
      case 'up':
          return [x - 1, y];
      case 'down':
          return [x + 1, y];
      case 'left':
          return [x, y - 1];
      case 'right':
          return [x, y + 1];
      default:
          return [x, y];
  }
}

function reflectLaser(direction, mirrorType) {
  if (mirrorType === 'mirror1') {
      // 鏡1による方向転換ロジック
      if (direction === 'up') return [x, y + 1, 'right'];
      if (direction === 'right') return [x + 1, y, 'down'];
      if (direction === 'down') return [x, y - 1, 'left'];
      if (direction === 'left') return [x - 1, y, 'up'];
  } else if (mirrorType === 'mirror2') {
      // 鏡2による方向転換ロジック
      if (direction === 'up') return [x, y - 1, 'left'];
      if (direction === 'right') return [x - 1, y, 'up'];
      if (direction === 'down') return [x, y + 1, 'right'];
      if (direction === 'left') return [x + 1, y, 'down'];
  }
  return [x, y, direction];
}


document.addEventListener("DOMContentLoaded", () =>{
  const fieldElement = document.getElementById("field")
  const field = initializeField()

  field.forEach((row, x) => {
    row.forEach((area, y) => {
      const areaElement = document.createElement("div")
      areaElement.classList.add("area")
      if(area) areaElement.classList.add(area)
        fieldElement.appendChild(areaElement)
    })
  })
})