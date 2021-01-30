function Palm(x, y) {
    this.x = x;
    this.y = y;
    this.h = 0;
    this.w = 0;
    this.spriteX = 0;
    this.spriteY = 0;
}

function Star(x, y) {
    this.x = x;
    this.y = y;
    this.h = 12;
    this.w = 13;
    this.spriteX = 163;
    this.spriteY = 243;
}

function Sand(x, y) {
    this.x = x;
    this.y = y;
    this.h = TILE_HEIGHT;
    this.w = TILE_WIDTH;
    this.spriteX = 224;
    this.spriteY = 144;

    this.draw = function (ctx) {
        ctx.drawImage(sprite, this.spriteX, this.spriteY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
}
//+++ SAND
const SAND_SPRITES = {
    TYPE_A : {x:224, y:144},
    TYPE_B : {x:208, y:144},
    TYPE_C : {x:192, y:144},
    TYPE_D : {x:176, y:144},
    TYPE_E : {x:160, y:144},
    TYPE_F : {x:144, y:144},
    TYPE_G : {x:128, y:144},
    TYPE_H : {x:224, y:160},
    TYPE_I : {x:208, y:160},
    TYPE_J : {x:192, y:160},
    TYPE_K : {x:176, y:160},
    TYPE_L : {x:160, y:160},
    TYPE_M : {x:144, y:160},
    TYPE_N : {x:128, y:160},
    TYPE_O : {x:112, y:160},
    TYPE_P : {x:112, y:176},
    TYPE_Q : {x:128, y:176},
    TYPE_R : {x:144, y:176},

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
    ]
    let sand = new Sand();

    // make default sand twice as common as every other type
    let normal = Math.floor(Math.random() * 2);
    if (normal === 1) {
        return sand;
    }

    let randomIndex = Math.floor(Math.random() * types.length);
    sand.spriteX = SAND_SPRITES[types[randomIndex]].x;
    sand.spriteY = SAND_SPRITES[types[randomIndex]].y;
    return sand;
}
//--- SAND