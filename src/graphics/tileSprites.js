import { getCurrentLocation } from "../logic/world/locationList.js";
import { tileImage } from "./image.js";

const mainTileSet = "src/assets/tileMap/PixelWoods/Terrain(main)/terrainTiles.png";
const walls = "src/assets/tileMap/Texture/TX Tileset Stone Ground.png";

//35, 36, 37, 59, 60, 61, 83, 84, 85
export const tiles = {
    56: {
        name: 'Grass1',
        props: {
            isWalkable: true,
        },
        image: new tileImage(mainTileSet, 8, 2)
    },
    57: {
        name: 'Grass2',
        props: {
            isWalkable: true,
        },
        image: new tileImage(mainTileSet, 8, 3)
    },
    80: {
        name: 'Grass3',
        props: {
            isWalkable: true,
        },
        image: new tileImage(mainTileSet, 8, 4)
    },
    81: {
        name: 'Grass4',
        props: {
            isWalkable: true,
        },
        image: new tileImage(mainTileSet, 7, 2)
    },
    104: {
        name: 'Grass5',
        props: {
            isWalkable: true,
        },
        image: new tileImage(mainTileSet, 7, 3)
    },
    105: {
        name: 'Grass6',
        props: {
            isWalkable: true,
        },
        image: new tileImage(mainTileSet, 7, 4)
    },
    15: {
        name: 'wall',
        props: {
            isWalkable: false,
        },
        image: new tileImage(walls, 0, 0)
    },
};


export function getActorTile(actor) {
    return tiles[getCurrentLocation().floor[actor.getPosY()][actor.getPosX()]]
}
export function getTile(posX, posY) {
    return tiles[getCurrentLocation().floor[posY][posX]]
}
