let screenSize;
let gameField;

const settings = {
    liveChance: 0.2,
    frameRate: 15,
    backgroundColor: 30,
    update: function() {
        gameField.fillWithRandom(this.liveChance);
    }
};

const gui = new dat.GUI();

function updateScreenSize() {
    const bodyRect = document.body.getBoundingClientRect();
    screenSize = {
        width: bodyRect.width,
        height: bodyRect.height,
    };
    resizeCanvas(screenSize.width, screenSize.height)
}

function generateGUISettings() {
    gui.add(settings, 'liveChance', 0.1, 1).step(0.1);
    gui.add(settings, 'frameRate', 1, 30)
        .step(1)
        .onChange((value) => frameRate(value));
    gui.add(settings, 'update');
}

function setup() {
    createCanvas();
    updateScreenSize();

    generateGUISettings();

    window.addEventListener('resize', updateScreenSize);

    gameField = new GameField(50);

    frameRate(settings.frameRate);
}

function clearCanvas() {
    noStroke();
    fill(settings.backgroundColor);
    rect(0, 0, screenSize.width, screenSize.height);
}

function draw() {
    clearCanvas();

    gameField.draw();

    update();
}

function update() {
    gameField.update();
}
