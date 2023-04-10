import axios from "axios";
import { GameListType } from "../model/GameListType";
import { GameType } from "../model/GameType";


export const postSearchByTitle = async (titolo: string) => {
    const apiUrl = 'https://dk8far7kja.execute-api.us-east-1.amazonaws.com/prod-fase2/games-wiki-resource'
    const data = { "title": titolo };

    const response = await axios.post(apiUrl, data);
    const gameList: GameListType = response.data;

    const listOfGamesToReturn = await Promise.all(gameList.games.map(async (element) => {
        element.url = await getCoverArt(element.title);
        return element;
    }))
    return listOfGamesToReturn;
}

export const postSearchByGenre = async (genresList: string[]) => {
    const apiUrl = 'https://dk8far7kja.execute-api.us-east-1.amazonaws.com/prod-fase2/search-by-genres'
    const data = { "genres": genresList };

    const response = await axios.post(apiUrl, data);
    const gameList: GameListType = response.data;

    const listOfGamesToReturn = await Promise.all(gameList.games.map(async (element) => {
        element.url = await getCoverArt(element.title);
        return element;
    }))
    return listOfGamesToReturn;

}

export const postSearchByRating = async (ratings: number[]) => {
    const apiUrl = 'https://dk8far7kja.execute-api.us-east-1.amazonaws.com/prod-fase2/search-by-rating'
    const data = { "ratings": ratings };

    const response = await axios.post(apiUrl, data);
    const gameList: GameListType = response.data;
    
    const listOfGamesToReturn = await Promise.all(gameList.games.map(async (element) => {
        element.url = await getCoverArt(element.title);
        return element;
    }))
    return listOfGamesToReturn;

}

export const postGameById = async (id: string) => {
    const apiUrl = 'https://dk8far7kja.execute-api.us-east-1.amazonaws.com/prod-fase2/search-by-id'
    const data = { "id": id }

    const response = await axios.post(apiUrl, data);
    const game: GameType = response.data.game;

    game.url = await getCoverArt(game.title)
    return game;
}

export const postSuggestions = async (game: GameType) => {
    const apiUrl = 'https://dk8far7kja.execute-api.us-east-1.amazonaws.com/prod-fase2/recommendations'
    const data = {
        "title": game.title,
        "genres": game.genres,
        "team": game.team
    }

    const response = await axios.post(apiUrl, data);
    const suggestedGames: GameType[] = response.data.games;
    
    const listOfGamesToReturn = await Promise.all(suggestedGames.map(async (element) => {
        element.url = await getCoverArt(element.title);
        return element;
    }))
    return listOfGamesToReturn;
}

///////////////////////

const apiKey = "d895745fcec943bf99a823bca0680765";

const replaceEverything = (title: string) => {

    let title1 = title.replace(/\. |,| /g, "-");
    let title2 = title1.replace(/:|'/g, "");

    if (title2.endsWith("-")) {
        let title3 = title2.slice(0, -1)
        return title3
    }

    return title2
}

export const getCoverArt = async (title: string) => {
    const titleFormatted = replaceEverything(title);

    /* const urlExtApi = `https://api.rawg.io/api/games/grand-theft-auto-iv?key=${apiKey}`; */
    const urlExtApi = `https://api.rawg.io/api/games/${titleFormatted}?key=${apiKey}`;
    try {
        const response2 = await axios.get(urlExtApi);
        const gameCover: string = response2.data.background_image;

        return gameCover;
    } catch (e) {
        return "";
    }

    /*return "https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg"*/
}


///////////////////////

function timeout(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

