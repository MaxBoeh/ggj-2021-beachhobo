//+++ CONST PLAYER
const PLAYER_ACCELERATION = 2;
const PLAYER_DECELERATION = 1;
const PLAYER_START_X = 400;
const PLAYER_START_Y = 300;

const FACING = {
    NORTH: 'N',
    EAST: 'E',
    SOUTH: 'S',
    WEST: 'W'
};

const PLAYER_SPRITE = {
    [FACING.SOUTH]: {x: 0, y: 0},
    [FACING.WEST]: {x: 0, y: 16},
    [FACING.NORTH]: {x: 0, y: 32},
    [FACING.EAST]: {x: 0, y: 48},
}
//--- CONST PLAYER

player = {
    x: PLAYER_START_X,
    y: PLAYER_START_Y,
    w: 16,
    h: 16,
    v: 0, // current value
    facing: FACING.NORTH,
    spriteX: 0,
    spriteY: 0,
    animations: 3,
    frame: 0,
    frameTick: 0,

    init: function () {
        console.log('init player');
        document.addEventListener('keydown', this.keydown)
    },

    draw: function (ctx) {
        ctx.drawImage(playersprite, this.spriteX, this.spriteY, this.w, this.h, this.x, this.y, this.w, this.h);
        this.frameTick += 1;
        //@todo this sucks
        if (this.frameTick % 5 === 0 && this.v > 0) {
            this.nextFrame();
        }

        if (cfg[FLAG_DRAW_TILE_BORDER_ON_PLAYER]) {
            this.drawTileBorder(ctx);
        }
    },

    drawTileBorder: function (ctx) {
        ctx.strokeStyle = '#FFF';
        ctx.beginPath();
        let modX = this.x % TILE_WIDTH,
            modY = this.y % TILE_HEIGHT,
            x = this.x,
            y = this.y;

        if (modY > 8) {
            y += (TILE_HEIGHT - modY);
        } else {
            y -= modY;
        }

        if (modX > 8) {
            x += TILE_WIDTH - modX;
        } else {
            x -= modX;
        }

        // position tile according to the direction the player is facing
        switch (this.facing) {
            case FACING.NORTH:
                y -= this.h;
                break;
            case FACING.EAST:
                x += this.w;
                break;
            case FACING.WEST:
                x -= this.w;
                break;
            case FACING.SOUTH:
                y += this.h;
                break;
        }
        ctx.rect(x, y, TILE_WIDTH, TILE_HEIGHT);
        ctx.stroke();
    },

    nextFrame: function () {
        console.log('next frame player');
        this.frameTick = 0;
        this.frame += 1;
        this.spriteX += this.w;
        if (this.frame >= this.animations) {
            this.frame = 0;
            this.spriteX = 0;
        }
    },

    update: function (delta) {
        if (this.v > 0) {
            switch (this.facing) {
                case FACING.NORTH:
                    this.y -= this.v;
                    break;
                case FACING.EAST:
                    this.x += this.v;
                    break;
                case FACING.SOUTH:
                    this.y += this.v;
                    break;
                case FACING.WEST:
                    this.x -= this.v;
                    break;
            }
        }
        this.decelerate();
    },

    moveUp: function () {
        // if we change directions we lose all velocity
        if (this.facing !== FACING.NORTH) {
            this.halt();
            this.spriteX = PLAYER_SPRITE[FACING.NORTH].x;
            this.spriteY = PLAYER_SPRITE[FACING.NORTH].y;
        }
        this.accelerate();
        this.facing = FACING.NORTH;


    },

    moveLeft: function () {
        if (this.facing !== FACING.WEST) {
            this.halt();
            this.spriteX = PLAYER_SPRITE[FACING.WEST].x;
            this.spriteY = PLAYER_SPRITE[FACING.WEST].y;
        }
        this.accelerate();
        this.facing = FACING.WEST;


    },

    moveDown: function () {
        if (this.facing !== FACING.SOUTH) {
            this.halt();
            this.spriteX = PLAYER_SPRITE[FACING.SOUTH].x;
            this.spriteY = PLAYER_SPRITE[FACING.SOUTH].y;
        }
        this.accelerate();
        this.facing = FACING.SOUTH;


    },

    moveRight: function () {
        if (this.facing !== FACING.EAST) {
            this.halt();
            this.spriteX = PLAYER_SPRITE[FACING.EAST].x;
            this.spriteY = PLAYER_SPRITE[FACING.EAST].y;
        }
        this.accelerate();
        this.facing = FACING.EAST;


    },

    accelerate: function () {
        this.v += PLAYER_ACCELERATION;
        //console.log(this.v);
    },

    decelerate: function () {
        if (this.v === 0) {
            return;
        }

        this.v -= PLAYER_DECELERATION;

        if (this.v < 0) {
            this.v = 0;
        }

    },

    halt: function () {
        console.log('halt stop');
        this.v = 0;
        this.frame = 0;
        this.frameTick = 0;
    },

    keydown: function (e) {
        switch (e.code) {
            case 'KeyW':
                player.moveUp();
                break;
            case 'KeyA':
                player.moveLeft();
                break;
            case 'KeyS':
                player.moveDown();
                break;
            case 'KeyD':
                player.moveRight();
                break;
        }

        //console.log(player.x, player.y);
    },
}