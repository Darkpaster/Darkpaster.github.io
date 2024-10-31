import { AnimatedImageManager } from "./image.js";
import { boar, loading, villager } from "./sprites.js";


export const madBoarManager = new AnimatedImageManager(boar);
export const villagerManager = new AnimatedImageManager(villager);

export const loadingWofl = new AnimatedImageManager(loading);

//hero.render(sheet, ctx, player.x, player.y);
