import { spawnFloor, spawnObjects } from "./spawn.js";

let currentLocation = null;

const locations = {
    spawn: {
        floor: spawnFloor,
        objects: spawnObjects
    },
}

export function getCurrentLocation() {
    return currentLocation ? currentLocation : locations.spawn;
}
export function setCurrentLocation(location) {
    currentLocation = locations[location];
}