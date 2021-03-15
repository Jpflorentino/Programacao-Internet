'use strict'

const urlParse = require('url').parse

module.exports = (covidaServices) => {
    return {
        getMostPopularGames: getMostPopularGames,
        getSpecificGame: getSpecificGame,
        createGroup: createGroup,
        listAllGroups: listAllGroups,
        getSpecificGroup: getSpecificGroup,
        editGroup: editGroup,
        addGameToGroup: addGameToGroup,
        removeGameFromGroup: removeGameFromGroup,
        gamesBetweenMinMax: gamesBetweenMinMax,
        removeGroup: removeGroup,
    }

    function errorHandler(err, res) {
        const erro = {
            'code': err.code,
            'message': err.message
        }
        res.json(erro)
    }

    function niceHandler(body, res) {
        res.status = 200;
        res.setHeader('Content-type', 'application/json')
        res.json(body)
    }

    function body(req, callback) {
        return new Promise((resolve, reject) => {
            let body_txt = ''
            req.on('data', chunk => {
                body_txt += chunk.toString()
            }).on('end', () => {
                const body_obj = JSON.parse(body_txt)
                resolve(body_obj)
            })
        })
    }

    //DONE WITH MOCK
    //DONE ONLINE
    function getMostPopularGames(req, res, next) {
        console.log(req.method + ": " + req.url)
        covidaServices.getMostPopularGames().then(body => niceHandler(body, res), err => errorHandler(err, res))
    }

    //DONE WITH MOCK
    //DONE ONLINE
    function getSpecificGame(req, res, next) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const gameName = query.game_name

        covidaServices.getSpecificGame(gameName).then(body => niceHandler(body, res), err => errorHandler(err, res))
    }

    //DONE WITH MOCK
    function createGroup(req, res, next) {
        console.log(req.method + ": " + req.url)
        body(req).then(body => {
            covidaServices.createGroup(body.name, body.description).then(body => niceHandler(body, res), err => errorHandler(err, res))
        })
    }

    //DONE WITH MOCK
    function listAllGroups(req, res, next) {
        console.log(req.method + ": " + req.url)
        covidaServices.listAllGroups().then(body => niceHandler(body, res), err => errorHandler(err, res))
    }

    //DONE WITH MOCK
    function getSpecificGroup(req, res, next) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const groupId = query.group_id
        covidaServices.getSpecificGroup(groupId).then(body => niceHandler(body, res), err => errorHandler(err, res))
    }

    //DONE WITH MOCK
    function editGroup(req, res, next) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const groupId = query.group_id
        body(req).then(body => {
            covidaServices.editGroup(groupId, body.name, body.description).then(body => niceHandler(body, res), err => errorHandler(err, res))
        })
    }

    //DONE WITH MOCK
    function addGameToGroup(req, res, next) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        console.log(query)
        const gameName = query.game_name
        const groupId = query.group_id
        covidaServices.addGameToGroup(gameName, groupId).then(body => niceHandler(body, res), err => errorHandler(err, res))
    }

    //DONE WITH MOCK
    function removeGameFromGroup(req, res, next) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const gameName = query.game_name
        const groupId = query.group_id
        covidaServices.removeGameFromGroup(gameName, groupId).then(body => niceHandler(body, res), err => errorHandler(err, res))
    }

    //DONE WITH MOCK
    function gamesBetweenMinMax(req, res, next) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const minRating = query.min_Rating
        const maxRating = query.max_Rating
        const groupId = query.group_id
        covidaServices.gamesBetweenMinMax(groupId, minRating, maxRating).then(body => niceHandler(body, res), err => errorHandler(err, res))
    }

    function removeGroup(req, res, next) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const groupId = query.group_id
        covidaServices.removeGroup(groupId).then(body => niceHandler(body, res), err => errorHandler(err, res))
    }
}