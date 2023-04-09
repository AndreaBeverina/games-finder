import axios from "axios";
import fakeDB from "../db/fakeDB.json"
import { GameType } from "../model/GameType";
import { GameListType } from "../model/GameListType";




export const postVideogame = async (titolo: string) => {
    const apiUrl = 'https://dk8far7kja.execute-api.us-east-1.amazonaws.com/prod-fase2/games-wiki-resource'
    const data = { "title": titolo };

    const response = await axios.post(apiUrl, data);
    const gameList : GameListType = response.data;
    return gameList.games;
}

export const postVideogameByGenre = async (genresList : string[]) => {
    const apiUrl = 'https://dk8far7kja.execute-api.us-east-1.amazonaws.com/prod-fase2/search-by-genres'
    const data = { "genres" : genresList};

    const response = await axios.post(apiUrl, data);
    const gameList : GameListType = response.data;
    return gameList.games;

}

export const getGame = async (id: string) => {
    const apiUrl = "https://dk8far7kja.execute-api.us-east-1.amazonaws.com/prod-fase2/search-by-id"
    const data = {"id" : id}

    const response = await axios.post(apiUrl, data);
    const game : GameType = response.data.game;
    return game;
}

export const getSuggestions = async (game: GameType) => {
    //TODO: fare il metodo per bene
    //await timeout(1000);
    //const gameList: GameType[] = fakeDB.games;
    //return gameList;

    return null
}

///////////////////////

export const getCoverArt = async (title: string) => {
    const gamesDBUrlGame = "https://api.igdb.com/v4/games/";
    const gamesDBUrlCover = "https://api.igdb.com/v4/covers";

    const headers= {
        "Client-ID" : "uz7zklv9aphrjfyxd9gmbnznathe2f",
        "Authorization" : "Bearer yrxwqgtqu6gv8gx3ainqk6kw7s6elg",
        "Access-Control-Allow-Origin" : "*"
    }

    const data1 = "fields name; limit 1; search \"" + title + "\"";
    const response1 = await axios.post(gamesDBUrlGame, data1, {headers});
    const gameId = response1.data.id;
    console.log(gameId);

    const data2 = "fields *; where game = \""+ gameId +"\"";
    const response2 = await axios.post(gamesDBUrlCover, data2, {headers});
    const gameCover = response2.data.url;
    console.log(gameCover);
    
}


///////////////////////

function timeout(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

