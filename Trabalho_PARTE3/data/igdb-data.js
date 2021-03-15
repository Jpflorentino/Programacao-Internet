'use strict'

const fetch = require('node-fetch')

module.exports = () => {

    const URL = `https://api.igdb.com/v4/games`

    return {
        getMostPopularGames: getMostPopularGames,
        getSpecificGame: getSpecificGame
    }

    function getMostPopularGames() {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID,
                'Authorization': process.env.AUTHORIZATION
            },
            body: "fields name,rating,total_rating,url,rating_count; sort rating desc; where rating != null;"
        }
        return fetch(URL, options).then(body => body.json(), err => ({
            code: err.status,
            message: err.title
        }))
    }

    function getSpecificGame(gameName) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID,
                'Authorization': process.env.AUTHORIZATION
            },
            body: `fields name,rating,total_rating,url,rating_count; search "${gameName}";`
        }

        if (gameName === null || gameName === "" || gameName === undefined) {
            return Promise.resolve({
                code: 400,
                message: "Bad Request: Missing Game Name"
            })
        }
        return fetch(URL, options).then(res => res.json()).then(body => {
            if (body.length === 0) {
                return {
                    code: 404,
                    message: "Not Found: Game Doesn't Exists"
                }
            }
            return body
        }).catch(err => {
            return {
                code: err.status,
                message: err.title
            }
        })
    }
}