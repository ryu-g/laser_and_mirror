import "./main.sass"
let currentStage = 0

const AreaState = {
  EMPTY: 0,
  MIR1: 1,
  MIR2: 2,
  JEWEL: 3,
  start: 4
}

const stages = [
  {
      field: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 4, 0, 0, 0, 3, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
      ],
      jewel: [5, 1],
      mirrors: [
      ]
  },
  {
      field: [
          [4, 4, 4, 4, 4, 4, 4],
          [4, 0, 0, 0, 0, 0, 4],
          [4, 0, 0, 0, 0, 0, 4],
          [4, 0, 0, 0, 0, 0, 4],
          [4, 0, 0, 0, 0, 0, 4],
          [4, 0, 0, 0, 0, 0, 4],
          [4, 4, 4, 4, 4, 4, 4],
      ],
      jewel: [4, 4],
      mirrors: [
        [2, 1, AreaState.MIR1],
        [3, 5, AreaState.MIR2],
        [1, 4, AreaState.MIR1],
        [5, 4, AreaState.MIR1],
        [4, 2, AreaState.MIR1],
        [5, 5, AreaState.MIR1],
        [4, 5, AreaState.MIR1],
        [3, 2, AreaState.MIR2],
        [3, 2, AreaState.MIR2],
        [5, 2, AreaState.MIR2],
        [2, 4, AreaState.MIR2],
        [2, 4, AreaState.MIR2]
      ]
  },
  {
      field: [
          [4, 4, 4, 4, 4, 4, 4],
          [4, 0, 0, 0, 0, 0, 4],
          [4, 0, 0, 0, 0, 0, 4],
          [4, 0, 0, 0, 0, 0, 4],
          [4, 0, 0, 0, 0, 0, 4],
          [4, 0, 0, 0, 0, 0, 4],
          [4, 4, 4, 4, 4, 4, 4]
      ],
      jewel: [3, 2],
      mirrors: [
        [1, 1, AreaState.MIR1],
        [2, 2, AreaState.MIR1],
        [4, 4, AreaState.MIR1],
        [5, 4, AreaState.MIR1],
        [4, 2, AreaState.MIR1],
        [5, 5, AreaState.MIR1],
        [4, 5, AreaState.MIR1],
        [1, 5, AreaState.MIR2],
        [3, 5, AreaState.MIR2],
        [3, 2, AreaState.MIR2],
        [3, 2, AreaState.MIR2],
        [5, 2, AreaState.MIR2],
        [3, 1, AreaState.MIR2],
        [2, 3, AreaState.MIR2]
      ]
  },
  {
      field: [
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
        [4, 0, 0, 0, 0, 0, 0, 0, 0, 4,],
        [4, 0, 0, 0, 0, 0, 0, 0, 0, 4,],
        [4, 0, 0, 0, 0, 0, 0, 0, 0, 4,],
        [4, 0, 0, 0, 0, 0, 0, 0, 0, 4,],
        [4, 0, 0, 0, 0, 0, 0, 0, 0, 4,],
        [4, 0, 0, 0, 0, 0, 0, 0, 0, 4,],
        [4, 0, 0, 0, 0, 0, 0, 0, 0, 4,],
        [4, 0, 0, 0, 0, 0, 0, 0, 0, 4,],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4,]
      ],
      jewel: [4, 4],
      mirrors: [[1, 1, AreaState.MIR1],
      [5, 5, AreaState.MIR1],
      [3, 3, AreaState.MIR1],
      [7, 2, AreaState.MIR1],
      [1, 6, AreaState.MIR1],
      [1, 1, AreaState.MIR1],
      [2, 6, AreaState.MIR1],
      [4, 4, AreaState.MIR1],
      [7, 4, AreaState.MIR1],
      [4, 2, AreaState.MIR1],
      [7, 7, AreaState.MIR1],
      [4, 7, AreaState.MIR1],
      [8, 3, AreaState.MIR1],
      [8, 2, AreaState.MIR1],
      [2, 8, AreaState.MIR2],
      [6, 8, AreaState.MIR2],
      [7, 6, AreaState.MIR2],
      [7, 8, AreaState.MIR2],
      [2, 8, AreaState.MIR2],
      [2, 4, AreaState.MIR2],
      [5, 4, AreaState.MIR2],
      [1, 8, AreaState.MIR2],
      [3, 7, AreaState.MIR2],
      [3, 2, AreaState.MIR2],
      [3, 2, AreaState.MIR2],
      [5, 2, AreaState.MIR2],
      [3, 1, AreaState.MIR2],
      [2, 3, AreaState.MIR2],
      [2, 7, AreaState.MIR2],
      [2, 2, AreaState.MIR2],
      [4, 4, AreaState.MIR2],
      [1, 5, AreaState.MIR2]
    ]
  }
]

function initializeField(stageIndex) {
  const stage = stages[stageIndex]
  const field = stage.field.map(row => row.slice())

  stage.mirrors.forEach(([x, y, state]) => {
      field[y][x] = state
  })
  const [jx, jy] = stage.jewel
  field[jy][jx] = AreaState.JEWEL

  fieldData.innerText = JSON.stringify(field)


  return field
}


document.addEventListener('DOMContentLoaded', () => {
  const fieldElement = document.getElementById('field')
  const simulateButton = document.getElementById('simulateButton')
  const resetButton = document.getElementById('resetButton')
  const nextStageButton = document.getElementById('nextStageButton')
  const laserDirectionSelect = document.getElementById('laserDirection')
  const fieldData = document.getElementById('fieldData')
  let field = initializeField(currentStage)

  let startX = null
  let startY = null
  let field_w = null
  console.log(field_w)
  let field_h = null
  console.log(field_h)

  const renderField = () => {
    fieldElement.innerHTML = ''

    field_w = field.length
    console.log(field_w)
    field_h = field[0].length
    console.log(field_h)

    updateGridStyle(field.length, field[0].length);
    
    field.forEach((row, x) => {
      row.forEach((area, y) => {
        const areaElement = document.createElement('div')
        areaElement.classList.add("area")
        if (area == 1) areaElement.classList.add("mirror1")
        if (area == 2) areaElement.classList.add("mirror2")
        if (area == 3) areaElement.classList.add("jewel")
        if (area == 4) areaElement.classList.add("start")
        areaElement.addEventListener('click', () => {
          startX = x
          startY = y
          if(areaElement.classList.contains('start'))
            highlightStartPosition(x, y, field_w, field_h)
        })
        fieldElement.appendChild(areaElement)
      })
    })
  }

  const highlightStartPosition = (x, y, w, h) => {
    const areas = document.querySelectorAll('.area')
    areas.forEach(area => area.style.border = '1px solid #000')
    const startPositionElement = areas[x * w + y]
    startPositionElement.style.border = '2px solid red'
  }

  const updateGridStyle = (rows, cols) => {
    fieldElement.style.gridTemplateColumns = `repeat(${cols}, 50px)`;
    fieldElement.style.gridTemplateRows = `repeat(${rows}, 50px)`;
  }

  simulateButton.addEventListener('click', () => {
    if (startX !== null && startY !== null) {
      const direction = laserDirectionSelect.value
      if (simulateLaser(field, startX, startY, direction, field_w, field_h)) {
        nextStageButton.style.display = 'inline'
      }
    } else {
      alert('Please select a start position for the laser.')
    }
  })

  resetButton.addEventListener('click', () => {
    renderField()
  })

  nextStageButton.addEventListener('click', () => {
    currentStage = (currentStage + 1) % stages.length
    field = initializeField(currentStage)
    nextStageButton.style.display = 'none'
    renderField()
  })

  renderField()
})

function simulateLaser(field, startX, startY, direction, w, h) {
  let x = startX
  let y = startY

  const laserPath = []
  
  while (x >= 0 && x < field.length && y >= 0 && y < field[0].length) {
      laserPath.push([x, y])
      const areaState = field[x][y]
      if (areaState === AreaState.JEWEL) {
          console.log('Laser hit the jewel!')
          highlightPath(laserPath, w, h)
          return true
      } else if (areaState === AreaState.MIR1) {
          [x, y, direction] = reflectLaser(direction, 1, x, y)
      } else if (areaState === AreaState.MIR2) {
          [x, y, direction] = reflectLaser(direction, 2, x, y)
      } else {
          [x, y] = moveLaser(x, y, direction)
      }
  }

  console.log('Laser did not hit the jewel.')
  highlightPath(laserPath, w, h)
  return false
}

function moveLaser(x, y, direction) {
  switch (direction) {
      case 'up':
          return [x - 1, y]
      case 'down':
          return [x + 1, y]
      case 'left':
          return [x, y - 1]
      case 'right':
          return [x, y + 1]
      default:
          return [x, y]
  }
}

function reflectLaser(direction, mirrorType, x, y) {
  if (mirrorType === 1) {
      if (direction === 'up') return [x, y + 1, 'right']
      if (direction === 'right') return [x - 1, y, 'up']
      if (direction === 'down') return [x, y - 1, 'left']
      if (direction === 'left') return [x + 1, y, 'down']
  } else if (mirrorType === 2) {
      if (direction === 'up') return [x, y - 1, 'left']
      if (direction === 'right') return [x + 1, y, 'down']
      if (direction === 'down') return [x, y + 1, 'right']
      if (direction === 'left') return [x - 1, y, 'up']
  }
  return [x, y, direction]
}

function highlightPath(path, w, h) {
  path.forEach(([x, y], index) => {
      setTimeout(() => {
          const areaElement = document.querySelector(`.area:nth-child(${x *  w + y + 1})`)
          areaElement.style.border = '2px solid red'
      }, index * 200)
  })
}
