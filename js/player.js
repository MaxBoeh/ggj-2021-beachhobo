//+++ CONST PLAYER
const PLAYER_ACCELERATION = 10;
const PLAYER_DECELERATION = 1;

const FACING = {
    NORTH: 'N',
    EAST: 'E',
    SOUTH: 'S',
    WEST: 'W'
};
//--- CONST PLAYER

player = {

    x: 0,
    y: 0,
    w: 10,
    h: 10,
    v: 0, // current value
    facing : FACING.NORTH,

    init: function () {
        console.log('init player');
        document.addEventListener('keydown', this.keydown)
    },

    draw: function (ctx) {
        ctx.fillRect(this.x, this.y, this.w, this.h);
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
        }
        this.accelerate();
        this.facing = FACING.NORTH;
    },

    moveLeft: function () {
        if (this.facing !== FACING.WEST) {
            this.halt();
        }
        this.accelerate();
        this.facing = FACING.WEST;
    },

    moveDown: function () {
        if (this.facing !== FACING.SOUTH) {
            this.halt();
        }
        this.accelerate();
        this.facing = FACING.SOUTH;
    },

    moveRight: function () {
        if (this.facing !== FACING.EAST) {
            this.halt();
        }
        this.accelerate();
        this.facing = FACING.EAST;
    },

    accelerate: function () {
        this.v += PLAYER_ACCELERATION;
        console.log(this.v);
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

    halt : function () {
        console.log('halt stop');
        this.v = 0;
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

        console.log(player.x, player.y);
    },
}