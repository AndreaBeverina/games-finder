import fakeDB from "../db/fakeDB.json"
import { GameType } from "../model/GameType";

export const postVideogame = async (titolo: string) => {
    //TODO: fare questo metodo 
    await timeout(1000);
    const gameList : GameType[] = fakeDB.games;
    return gameList;
}

export const getGame = async (id : number) => {
    //await timeout(1000);
    const gameList : GameType[] = fakeDB.games;
    let game : GameType = gameList[id];

    return game;
}

export const getSuggestions = async (game : GameType) => {
    //TODO: fare il metodo per bene
    await timeout(1000);
    const gameList : GameType[] = fakeDB.games;
    return gameList;
}



///////////////////////

function timeout(ms : any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

