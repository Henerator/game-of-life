class GameField {
    matrix = [
        { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
        { x: -1, y: 0 }, { x: 1, y: 0 },
        { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 },
    ];

    constructor(cellCount) {
        this.cellCount = cellCount;
        this.field = Array(cellCount).fill().map(
            () => Array(cellCount).fill()
        );
        this.fillWithRandom(settings.liveChance);
    }

    update() {
        const nextField = [];

        for (let y = 0; y < this.cellCount; y++) {
            nextField.push([]);

            for (let x = 0; x < this.cellCount; x++) {
                const state = this.getCellValue(x, y);
                const aliveCount = this.getAliveNeighboursCount(x, y);

                if (state === 0 && aliveCount === 3) {
                    nextField[y].push(1);
                } else if (state === 1 && (aliveCount < 2 || aliveCount > 3)) {
                    nextField[y].push(0);
                } else {
                    nextField[y].push(state);
                }
            }
        }

        this.field = nextField;
    }

    draw() {
        const fieldWidth = Math.min(screenSize.width, screenSize.height);
        const cellWidth = (fieldWidth - 2) / this.cellCount;

        push();
        translate(screenSize.width / 2 - fieldWidth / 2, screenSize.height / 2 - fieldWidth / 2);

        for (let y = 0; y < this.cellCount; y++) {
            for (let x = 0; x < this.cellCount; x++) {
                this.field[y][x] === 1
                    ? fill(255)
                    : fill(30);

                rect(x * cellWidth, y * cellWidth, cellWidth + 1, cellWidth + 1);
            }
        }

        pop();
    }

    fillWithRandom(liveChance) {
        for (let y = 0; y < this.cellCount; y++) {
            for (let x = 0; x < this.cellCount; x++) {
                this.field[y][x] = Math.random() <= liveChance ? 1 : 0;
            }
        }
    }

    getCellValue(x, y) {
        if (x < 0) {
            x = this.cellCount + x;
        } else if (x >= this.cellCount) {
            x = x - this.cellCount;
        }

        if (y < 0) {
            y = this.cellCount + y;
        } else if (y >= this.cellCount) {
            y = y - this.cellCount;
        }

        return this.field[y][x];
    }

    getAliveNeighboursCount(x, y) {
        return this.matrix.map(item => this.getCellValue(x + item.x, y + item.y))
            .reduce((sum, value) => sum + value, 0);
    }
}