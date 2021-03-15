'use strict'
module.exports = () => {

    const game = [{
            "id": 131887,
            "name": "Project +",
            "rating": 100.0,
            "rating_count": 5,
            "total_rating": 100.0,
            "url": "https://www.igdb.com/games/project-plus"
        },
        {
            "id": 26974,
            "name": "Heartbound",
            "rating": 100.0,
            "rating_count": 7,
            "total_rating": 100.0,
            "url": "https://www.igdb.com/games/heartbound"
        },
        {
            "id": 114283,
            "name": "Persona 5 Royal",
            "rating": 99.9639220218948,
            "rating_count": 46,
            "total_rating": 96.83910386809025,
            "url": "https://www.igdb.com/games/persona-5-royal"
        },
        {
            "id": 80468,
            "name": "NieR RepliCant",
            "rating": 99.9256391401233,
            "rating_count": 5,
            "total_rating": 99.9256391401233,
            "url": "https://www.igdb.com/games/nier-replicant"
        },
        {
            "id": 74878,
            "name": "Hitman: Game of the Year Edition",
            "rating": 99.8757763975155,
            "rating_count": 5,
            "total_rating": 99.8757763975155,
            "url": "https://www.igdb.com/games/hitman-game-of-the-year-edition"
        },
        {
            "id": 26834,
            "name": "Utawarerumono: Mask of Truth",
            "rating": 99.8070055320812,
            "rating_count": 7,
            "total_rating": 88.3410027660406,
            "url": "https://www.igdb.com/games/utawarerumono-mask-of-truth"
        },
        {
            "id": 77378,
            "name": "Super Mario All-Stars + Super Mario World",
            "rating": 99.7846919201089,
            "rating_count": 11,
            "total_rating": 99.7846919201089,
            "url": "https://www.igdb.com/games/super-mario-all-stars-plus-super-mario-world"
        },
        {
            "id": 30155,
            "name": "Rocksmith 2014 Edition - Remastered",
            "rating": 99.7667984967223,
            "rating_count": 10,
            "total_rating": 99.7667984967223,
            "url": "https://www.igdb.com/games/rocksmith-2014-edition-remastered"
        },
        {
            "id": 20196,
            "name": "Metal Gear Solid: The Legacy Collection",
            "rating": 99.74116077106521,
            "rating_count": 19,
            "total_rating": 93.3705803855326,
            "url": "https://www.igdb.com/games/metal-gear-solid-the-legacy-collection"
        },
        {
            "id": 45181,
            "name": "Mass Effect Trilogy",
            "rating": 99.6563732203569,
            "rating_count": 47,
            "total_rating": 99.6563732203569,
            "url": "https://www.igdb.com/games/mass-effect-trilogy"
        },
        {
            "id": 131887,
            "name": "Project +",
            "rating": 100.0,
            "rating_count": 5,
            "total_rating": 100.0,
            "url": "https://www.igdb.com/games/project-plus"
        },
        {
            "id": 26974,
            "name": "Heartbound",
            "rating": 100.0,
            "rating_count": 7,
            "total_rating": 100.0,
            "url": "https://www.igdb.com/games/heartbound"
        },
        {
            "id": 114283,
            "name": "Persona 5 Royal",
            "rating": 99.9639220218948,
            "rating_count": 46,
            "total_rating": 96.83910386809025,
            "url": "https://www.igdb.com/games/persona-5-royal"
        },
        {
            "id": 80468,
            "name": "NieR RepliCant",
            "rating": 99.9256391401233,
            "rating_count": 5,
            "total_rating": 99.9256391401233,
            "url": "https://www.igdb.com/games/nier-replicant"
        },
        {
            "id": 74878,
            "name": "Hitman: Game of the Year Edition",
            "rating": 99.8757763975155,
            "rating_count": 5,
            "total_rating": 99.8757763975155,
            "url": "https://www.igdb.com/games/hitman-game-of-the-year-edition"
        },
        {
            "id": 26834,
            "name": "Utawarerumono: Mask of Truth",
            "rating": 99.8070055320812,
            "rating_count": 7,
            "total_rating": 88.3410027660406,
            "url": "https://www.igdb.com/games/utawarerumono-mask-of-truth"
        },
        {
            "id": 77378,
            "name": "Super Mario All-Stars + Super Mario World",
            "rating": 99.7846919201089,
            "rating_count": 11,
            "total_rating": 99.7846919201089,
            "url": "https://www.igdb.com/games/super-mario-all-stars-plus-super-mario-world"
        },
        {
            "id": 30155,
            "name": "Rocksmith 2014 Edition - Remastered",
            "rating": 99.7667984967223,
            "rating_count": 10,
            "total_rating": 99.7667984967223,
            "url": "https://www.igdb.com/games/rocksmith-2014-edition-remastered"
        },
        {
            "id": 20196,
            "name": "Metal Gear Solid: The Legacy Collection",
            "rating": 99.74116077106521,
            "rating_count": 19,
            "total_rating": 93.3705803855326,
            "url": "https://www.igdb.com/games/metal-gear-solid-the-legacy-collection"
        },
        {
            "id": 45181,
            "name": "Mass Effect Trilogy",
            "rating": 99.6563732203569,
            "rating_count": 47,
            "total_rating": 99.6563732203569,
            "url": "https://www.igdb.com/games/mass-effect-trilogy"
        }
    ]

    return {
        getMostPopularGames: getMostPopularGames,
        getSpecificGame: getSpecificGame
    }

    function getMostPopularGames() {
        return new Promise((resolve, reject) => {
            const games = game
            if (!games) {
                reject({
                    code: 500,
                    message: "Internal Problem: Games Array Missing"
                })
            }
            resolve(games)
        })
    }

    function getSpecificGame(gameName) {
        return new Promise((resolve, reject) => {
            const games = game
            const g = games.filter(game => game.name === gameName)
            if (gameName === null || gameName === "" || gameName === undefined) {
                return reject({
                    code: 400,
                    message: "Bad Request: Missing Game Name"
                })
            } else if (!games) {
                return reject({
                    code: 500,
                    message: "Internal Problem: Games Array Missing"
                })
            } else if (g.length === 0) {
                return reject({
                    code: 404,
                    message: "Not Found: Game Doesn't Exists"
                })
            }
            resolve(g)
        })
    }
}