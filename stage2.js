import "./main.sass"
let currentStage = 0;

const stages = [
    {
        field: [
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null]
        ],
        jewel: [4, 4],
        mirrors: [[2, 1, AreaState.MIRROR1], [3, 2, AreaState.MIRROR2]]
    },
    {
        field: [
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null]
        ],
        jewel: [4, 0],
        mirrors: [[1, 1, AreaState.MIRROR1], [3, 3, AreaState.MIRROR2]]
    }
];

function initializeField(stageIndex) {
    const stage = stages[stageIndex];
    const field = stage.field.map(row => row.slice());

    stage.mirrors.forEach(([x, y, state]) => {
        field[x][y] = state;
    });
    const [jx, jy] = stage.jewel;
    field[jx][jy] = AreaState.JEWEL;

    return field;
}

document.addEventListener('DOMContentLoaded', () => {
    const fieldElement = document.getElementById('field');
    const simulateButton = document.getElementById('simulateButton');
    const resetButton = document.getElementById('resetButton');
    const nextStageButton = document.getElementById('nextStageButton');
    const laserDirectionSelect = document.getElementById('laserDirection');
    let field = initializeField(currentStage);

    let startX = null;
    let startY = null;

    const renderField = () => {
        fieldElement.innerHTML = '';
        field.forEach((row, x) => {
            row.forEach((area, y) => {
                const areaElement = document.createElement('div');
                areaElement.classList.add('area');
                if (area) areaElement.classList.add(area);
                areaElement.addEventListener('click', () => {
                    startX = x;
                    startY = y;
                    highlightStartPosition(x, y);
                });
                fieldElement.appendChild(areaElement);
            });
        });
    };

    const highlightStartPosition = (x, y) => {
        const areas = document.querySelectorAll('.area');
        areas.forEach(area => area.style.border = '1px solid #000');
        const startPositionElement = areas[x * 5 + y];
        startPositionElement.style.border = '2px solid red';
    };

    simulateButton.addEventListener('click', () => {
        if (startX !== null && startY !== null) {
            const direction = laserDirectionSelect.value;
            if (simulateLaser(field, startX, startY, direction)) {
                nextStageButton.style.display = 'inline';
            }
        } else {
            alert('Please select a start position for the laser.');
        }
    });

    resetButton.addEventListener('click', () => {
        renderField();
    });

    nextStageButton.addEventListener('click', () => {
        currentStage = (currentStage + 1) % stages.length;
        field = initializeField(currentStage);
        nextStageButton.style.display = 'none';
        renderField();
    });

    renderField();
});
