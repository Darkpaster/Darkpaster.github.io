import { getCurrentLocation } from "../logic/world/locationList.js";
import { tileImage } from "./image.js";

const mainTileSet = "src/assets/tileMap/PixelWoods/Terrain(main)/terrainTiles.png";
const walls = "src/assets/tileMap/Texture/TX Tileset Stone Ground.png";
const tiles_town = "src/assets/tileMap/tiles_town.png";

//57, 81, 105, 437, 438, 439
export const tiles = {

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
};


export function getActorTile(actor) {
    return tiles[getCurrentLocation().floor[actor.getPosY()][actor.getPosX()]]
}
export function getTile(posX, posY) {
    return tiles[getCurrentLocation().floor[posY][posX]]
}
export function getWallTile(posX, posY) {
    return tiles[getCurrentLocation().objects[posY][posX]]
}
