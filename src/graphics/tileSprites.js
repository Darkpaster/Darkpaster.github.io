import { getCurrentLocation } from "../logic/world/locationList.js";
import { tileImage } from "./image.js";

const mainTileSet = "src/assets/tileMap/PixelWoods/Terrain(main)/terrainTiles.png";
const walls = "src/assets/tileMap/Texture/TX Tileset Stone Ground.png";
const tiles_town = "src/assets/tileMap/tiles_town.png";

//57, 81, 105, 437, 438, 439
export const tiles = {

    // 0: {
    //     name: 'abyss',
    //     props: {
    //         isWalkable: true,
    //     },
    //     image: new tileImage(mainTileSet, 8, 2)
    // },

    57: {
        name: 'Grass1',
        props: {
            isWalkable: true,
        },
        image: new tileImage(mainTileSet, 8, 2)
    },
    81: {
        name: 'Grass2',
        props: {
            isWalkable: true,
        },
        image: new tileImage(mainTileSet, 8, 3)
    },
    105: {
        name: 'Grass3',
        props: {
            isWalkable: true,
        },
        image: new tileImage(mainTileSet, 8, 4)
    },
    437: {
        name: 'Tree1',
        props: {
            isWalkable: false,
        },
        image: new tileImage(tiles_town, 4, 3)
    },
    438: {
        name: 'Tree2',
        props: {
            isWalkable: false,
        },
        image: new tileImage(tiles_town, 5, 3)
    },
    439: {
        name: 'Tree3',
        props: {
            isWalkable: false,
        },
        image: new tileImage(tiles_town, 6, 3)
    },
    // 785: {
    //     name: 'Tree3',
    //     props: {
    //         isWalkable: false,
    //     },
    //     image: new tileImage(tiles_town, 6, 3)
    // },
    // 752: {
    //     name: 'Tree3',
    //     props: {
    //         isWalkable: false,
    //     },
    //     image: new tileImage(tiles_town, 6, 3)
    // },

};


export function getActorTile(actor) {
    return tiles[getCurrentLocation().floor[actor.getPosY()][actor.getPosX()]]
}
export function getTile(posX, posY) {
    return tiles[getCurrentLocation().floor[posY][posX]]
}
export function getWallTile(posX, posY) {
    // const pos = getCurrentLocation();
    // const number = pos.objects[posY][posX];
    // return tiles[number];

    const pos = getCurrentLocation().objects[posY][posX];
    
    if (pos === undefined) {
        console.warn(`No object at position (${posX}, ${posY})`);
        return null;
    }

    let tile = tiles[pos];

    if (!tile) {
        // console.warn(`No tile found for number ${pos} at (${posX}, ${posY})`);
        tile = tiles[81];
    }

    return tile;
}
