import { getCurrentLocation } from "../logic/world/locationList.js";
import { tileImage } from "./image.js";

const mainTileSet = "src/assets/tileMap/PixelWoods/Terrain(main)/terrainTiles.png";

//35, 36, 37, 59, 60, 61, 83, 84, 85
export const tiles = {
    56: {
        name: 'Grass1',
        props: {
            walkable: true,
        },
        image: new tileImage(mainTileSet, 8, 2)
    },
    57: {
        name: 'Grass2',
        props: {
            walkable: true,
        },
        image: new tileImage(mainTileSet, 8, 3)
    },
    80: {
        name: 'Grass3',
        props: {
            walkable: true,
        },
        image: new tileImage(mainTileSet, 8, 4)
    },
    81: {
        name: 'Grass4',
        props: {
            walkable: true,
        },
        image: new tileImage(mainTileSet, 7, 2)
    },
    104: {
        name: 'Grass5',
        props: {
            walkable: true,
        },
        image: new tileImage(mainTileSet, 7, 3)
    },
    105: {
        name: 'Grass6',
        props: {
            walkable: true,
        },
        image: new tileImage(mainTileSet, 7, 4)
    },
};


export function getTile(actor) {
    return tiles[getCurrentLocation().floor[actor.getTileY()][actor.getTileX()]]
}
