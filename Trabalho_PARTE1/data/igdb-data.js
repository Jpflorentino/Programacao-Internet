'use strict'

const request = require('request')

module.exports = () => {

    const URL = `https://api.igdb.com/v4/games`

    return {
        getMostPopularGames: getMostPopularGames,
        getSpecificGame: getSpecificGame
    }

    function getMostPopularGames(callback) {
        const options = {
            url: URL,
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'on14knlc3p3r0v7685dtfnbysr3a85',
                'Authorization': 'Bearer 7xhf2wk9wzvbefsed7p6hp590hofk5',
            },
            body: "fields name,rating,total_rating,url,rating_count; sort rating desc; where rating != null;"
        }

        request.post(options, (err, res, body) => {
            if (err) return callback({
                code: err.status,
                message: err.title
            })
            callback(null, JSON.parse(body))
        })
    }

    function getSpecificGame(gameName, callback) {
        const options = {
            url: URL,
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'on14knlc3p3r0v7685dtfnbysr3a85',
                'Authorization': 'Bearer 7xhf2wk9wzvbefsed7p6hp590hofk5',
            },
            body: `fields name,rating,total_rating,url,rating_count; search "${gameName}";`
        }
        request.post(options, (err, res, body) => {
            if (gameName === null || gameName === "" || gameName === undefined) {
                return callback({
                    code: 400,
                    message: "Bad Request: Missing Game Name"
                })
            } else if (err) {
                return callback({
                    code: err.status,
                    message: err.title
                })
            } else if (body === "") {
                return callback({
                    code: 404,
                    message: "Not Found: Game Doesn't Exists"
                })
            }
            callback(null, JSON.parse(body))
        })
    }
}