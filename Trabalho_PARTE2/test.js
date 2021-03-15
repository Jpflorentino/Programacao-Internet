const urlParse = require('url')
const querystring = require('querystring')
const req = 'http://localhost:8080/covida/games?game_name=Starforge'
const url = urlParse.parse(req, true)
console.log(url.query.game_name)
const queryObject = querystring.parse(url.query)
//console.log(queryObject.game_name)

const games = [{
        "id": 3046,
        "name": "Day One: Garry's Incident",
        "rating": 10.0019684170631,
        "rating_count": 5,
        "total_rating": 10.0019684170631,
        "url": "https://www.igdb.com/games/day-one-garry-s-incident"
    },
    {
        "id": 2649,
        "name": "Starforge",
        "rating": 10.1775779095944,
        "rating_count": 3,
        "total_rating": 10.1775779095944,
        "url": "https://www.igdb.com/games/starforge"
    },
    {
        "id": 9616,
        "name": "Hong Kong 97",
        "rating": 10.2911278087957,
        "rating_count": 12,
        "total_rating": 10.2911278087957,
        "url": "https://www.igdb.com/games/hong-kong-97"
    },
    {
        "id": 55198,
        "name": "Kentucky Route Zero: TV Edition",
        "rating": 10.6046511627907,
        "rating_count": 6,
        "total_rating": 44.05232558139535,
        "url": "https://www.igdb.com/games/kentucky-route-zero-tv-edition"
    },
    {
        "id": 43321,
        "name": "Sonic the Hedgehog Genesis",
        "rating": 10.7244541222271,
        "rating_count": 11,
        "total_rating": 10.7244541222271,
        "url": "https://www.igdb.com/games/sonic-the-hedgehog-genesis"
    },
    {
        "id": 103313,
        "name": "The Quiet Man",
        "rating": 10.7794965744475,
        "rating_count": 6,
        "total_rating": 20.88974828722375,
        "url": "https://www.igdb.com/games/the-quiet-man"
    },
    {
        "id": 7557,
        "name": "Big Rigs: Over the Road Racing",
        "rating": 10.8477107471995,
        "rating_count": 17,
        "total_rating": 10.8477107471995,
        "url": "https://www.igdb.com/games/big-rigs-over-the-road-racing"
    },
    {
        "id": 9077,
        "name": "Crazy Bus",
        "rating": 11.3566510636749,
        "rating_count": 5,
        "total_rating": 11.3566510636749,
        "url": "https://www.igdb.com/games/crazy-bus"
    },
    {
        "id": 3005,
        "name": "Superman",
        "rating": 11.4149042839326,
        "rating_count": 15,
        "total_rating": 11.4149042839326,
        "url": "https://www.igdb.com/games/superman"
    },
    {
        "id": 45556,
        "name": "Sonic.EXE",
        "rating": 11.5291043395556,
        "rating_count": 5,
        "total_rating": 11.5291043395556,
        "url": "https://www.igdb.com/games/sonic-dot-exe"
    }
]
const g = games.filter(game => game.name === "Starforge" || game.name === "Sonic.EXE").reduce((obj, item) => {
    obj = item
    return obj
}, {})

console.log(g)

const v1 = 123
const v2 = "123"

if (v1 === v2) {
    console.log("Primeiro")
} else {
    console.log("Segundo")
}