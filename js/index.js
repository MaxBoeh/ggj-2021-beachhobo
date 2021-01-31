function Palm(x, y) {
    this.x = x;
    this.y = y;
    this.h = 0;
    this.w = 0;
    this.spriteX = 0;
    this.spriteY = 0;
}

//+++ MISC
function Misc(x, y) {
    this.x = x;
    this.y = y;
    this.h = 16;
    this.w = 16;
    this.spriteX = 160;
    this.spriteY = 240;

    this.draw = function (ctx) {
        ctx.drawImage(sprite, this.spriteX, this.spriteY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
}

const MISC_SPRITES = {
    TYPE_A: {x: 160, y: 240},
    TYPE_B: {x: 176, y: 240},
    TYPE_C: {x: 192, y: 240},
    TYPE_D: {x: 208, y: 240},
    TYPE_E: {x: 224, y: 240},

}

function getRandomMisc() {
    let types = [
        'TYPE_A',
        'TYPE_B',
        'TYPE_C',
        'TYPE_D',
        'TYPE_E',
    ];
    let misc = new Misc();
    let randomIndex = Math.floor(Math.random() * types.length);
    misc.spriteX = MISC_SPRITES[types[randomIndex]].x;
    misc.spriteY = MISC_SPRITES[types[randomIndex]].y;
    return misc;
}

//--- MISC

//+++ SAND
function Sand(x, y) {
    this.x = x;
    this.y = y;
    this.h = TILE_HEIGHT;
    this.w = TILE_WIDTH;
    this.spriteX = 224; // default sand
    this.spriteY = 144; // default sand
    this.withMisc = false;

    this.draw = function (ctx) {
        ctx.drawImage(sprite, this.spriteX, this.spriteY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
}

// @todo remove TYPE_A? (because its already drawn as default?)
const SAND_SPRITES = {
    TYPE_A: {x: 224, y: 144},
    TYPE_B: {x: 208, y: 144},
    TYPE_C: {x: 192, y: 144},
    TYPE_D: {x: 176, y: 144},
    TYPE_E: {x: 160, y: 144},
    TYPE_F: {x: 144, y: 144},
    TYPE_G: {x: 128, y: 144},
    TYPE_H: {x: 224, y: 160},
    TYPE_I: {x: 208, y: 160},
    TYPE_J: {x: 192, y: 160},
    TYPE_K: {x: 176, y: 160},
    TYPE_L: {x: 160, y: 160},
    TYPE_M: {x: 144, y: 160},
    TYPE_N: {x: 128, y: 160},
    TYPE_O: {x: 112, y: 160},
    TYPE_P: {x: 112, y: 176},
    TYPE_Q: {x: 128, y: 176},
    TYPE_R: {x: 144, y: 176},
    TYPE_S: {x: 240, y: 240},
    TYPE_T: {x: 256, y: 240},
    TYPE_U: {x: 272, y: 240},
}

function getRandomSand() {
    let types = [
        'TYPE_A',
        'TYPE_B',
        'TYPE_C',
        'TYPE_D',
        'TYPE_E',
        'TYPE_F',
        'TYPE_G',
        'TYPE_H',
        'TYPE_I',
        'TYPE_J',
        'TYPE_K',
        'TYPE_L',
        'TYPE_M',
        'TYPE_N',
        'TYPE_O',
        'TYPE_P',
        'TYPE_Q',
        'TYPE_R',
        'TYPE_S',
        'TYPE_T',
        'TYPE_U',
    ]
    let sand = new Sand();

    // make default sand more as common as every other type
    let normal = Math.floor(Math.random() * 3);
    if (normal !== 1) {
        // 1 in x chance to spawn with misc
        if (Math.floor(Math.random() * 100) === 1) {
            console.log('with misc')
            sand.withMisc = true;
        }
        return sand;
    }

    let randomIndex = Math.floor(Math.random() * types.length);
    sand.spriteX = SAND_SPRITES[types[randomIndex]].x;
    sand.spriteY = SAND_SPRITES[types[randomIndex]].y;
    return sand;
}

//--- SAND
//+++ WATER
const WATER_ANIMATION_INTERVAL = 1000;
const WATER_ANIMATION_MODULO = 10;

function Water(x, y) {
    this.x = x;
    this.y = y;
    this.h = TILE_HEIGHT;
    this.w = 48;
    this.spriteX = 16; // default water
    this.spriteY = 16; // default water
    this.withMisc = false;
    this.animations = 5;
    this.step = -1;
    this.originalSpriteX = 0;
    this.originalSpriteY = 0;
    this.drawTick = 0;
    //@todo neither of those is working and i dont know why
    /*
    this.animationIntervalId = setInterval(this.nextFrame, WATER_ANIMATION_INTERVAL);
    this.animationIntervalId = setInterval(
        (function (self) {
                return function () {
                    self.nextFrame
                }
            })(this),
                WATER_ANIMATION_INTERVAL
        );
    */

    this.draw = function (ctx) {
        if (this.step === -1) {
            this.originalSpriteX = this.spriteX;
            this.step = 0;
        }
        ctx.drawImage(watersprite, this.spriteX, this.spriteY, this.w, this.h, this.x, this.y, this.w, this.h);
        this.drawTick += 1;
        if (this.drawTick % WATER_ANIMATION_MODULO === 0) {
            this.nextFrame();
        }


    }

    this.nextFrame = function () {
        //console.log('next frame water');
        this.step += 1;
        this.drawTick = 0;
        this.spriteX += this.w;
        if (this.step > this.animations) {
            this.step = 0;
            this.spriteX = this.originalSpriteX;
        }
    }
}

const WATER_SPRITES = {
    TYPE_A: {x: 0, y: 0},
    TYPE_B: {x: 0, y: 16},
    TYPE_C: {x: 0, y: 32},
    TYPE_D: {x: 0, y: 48},
    TYPE_E: {x: 0, y: 64},
    TYPE_F: {x: 0, y: 80},
    TYPE_G: {x: 0, y: 96},
    TYPE_H: {x: 0, y: 112},
}

function getRandomWater() {
    let types = [
            'TYPE_A',
            'TYPE_B',
            'TYPE_C',
            'TYPE_D',
            'TYPE_E',
            'TYPE_F',
            'TYPE_G',
            'TYPE_H',
        ],
        water = new Water();
    let randomIndex = Math.floor(Math.random() * types.length);
    water.spriteX = WATER_SPRITES[types[randomIndex]].x;
    water.spriteY = WATER_SPRITES[types[randomIndex]].y;
    return water;
}
//--- WATER


function getRandomTile(col) {
    if (col >= WATER_COL) {
        let water = getRandomWater();
        /*
        setInterval(
            (function (self) {
                return function () {
                    self.nextFrame
                }
            })(water),
            WATER_ANIMATION_INTERVAL
        );
        */

        return water;
    } else {
        return getRandomSand();
    }
}