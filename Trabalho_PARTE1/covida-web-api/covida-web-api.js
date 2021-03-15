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
        gamesBetweenMinMax: gamesBetweenMinMax
    }

    function body(req, callback) {
        let body_txt = ''
        req.on('data', chunk => {
            body_txt += chunk.toString()
        }).on('end', () => {
            const body_obj = JSON.parse(body_txt)
            callback(null, body_obj)
        })
    }

    //DONE WITH MOCK
    //DONE ONLINE
    function getMostPopularGames(req, res) {
        console.log(req.method + ": " + req.url)
        covidaServices.getMostPopularGames((err, games) => {
            if (err) {
                const erro = {
                    'statusCode': err.code,
                    'errorMessage': err.message
                }
                res.json(erro)
            } else {
                res.status = 200;
                res.setHeader('Content-type', 'application/json')
                res.json(games)
                //res.end(JSON.stringify(games))
            }
        })
    }

    //DONE WITH MOCK
    //DONE ONLINE
    function getSpecificGame(req, res) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const gameName = query.game_name
        /*
        const pathNameSplit = query.split('=') //[ '', 'covida', 'games', ':game_name' ]
        const gameName = pathNameSplit[1]
        */
        covidaServices.getSpecificGame(gameName, (err, game) => {
            if (err) {
                const erro = {
                    'statusCode': err.code,
                    'errorMessage': err.message
                }
                res.json(erro)
            } else {
                res.status = 200;
                res.setHeader('Content-type', 'application/json')
                res.json(game)
            }
        })
    }

    //DONE WITH MOCK
    function createGroup(req, res) {
        console.log(req.method + ": " + req.url)
        body(req, (err, body) => {
            covidaServices.createGroup(body.name, body.description, (error, response) => {
                if (error) {
                    const erro = {
                        'statusCode': error.code,
                        'errorMessage': error.message
                    }
                    res.json(erro)
                } else {
                    res.status = 201;
                    res.setHeader('Content-type', 'application/json')
                    res.json(response)
                }
            })

        })

    }

    //DONE WITH MOCK
    function listAllGroups(req, res) {
        console.log(req.method + ": " + req.url)
        covidaServices.listAllGroups((err, groups) => {
            if (err) {
                const erro = {
                    'statusCode': err.code,
                    'errorMessage': err.message
                }
                res.json(erro)
            } else {
                res.status = 200;
                res.setHeader('Content-type', 'application/json')
                res.json(groups)
            }
        })
    }

    //DONE WITH MOCK
    function getSpecificGroup(req, res) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const groupId = query.group_id
        covidaServices.getSpecificGroup(groupId, (err, group) => {
            if (err) {
                const erro = {
                    'statusCode': err.code,
                    'errorMessage': err.message
                }
                res.json(erro)
            } else {
                res.status = 200;
                res.setHeader('Content-type', 'application/json')
                res.json(group)
            }
        })
    }

    //DONE WITH MOCK
    function editGroup(req, res) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const groupId = query.group_id
        body(req, (err, body) => {
            covidaServices.editGroup(groupId, body.name, body.description, (error, response) => {
                if (error) {
                    const erro = {
                        'statusCode': error.code,
                        'errorMessage': error.message
                    }
                    res.json(erro)
                } else {
                    res.status = 200;
                    res.setHeader('Content-type', 'application/json')
                    res.json(response)
                }
            })
        })
    }

    //DONE WITH MOCK
    function addGameToGroup(req, res) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const gameName = query.game_name
        const groupId = query.group_id
        covidaServices.addGameToGroup(gameName, groupId, (err, response) => {
            if (err) {
                const erro = {
                    'statusCode': err.code,
                    'errorMessage': err.message
                }
                res.json(erro)
            } else {
                res.status = 200;
                res.setHeader('Content-type', 'application/json')
                res.json(response)
            }
        })
    }

    //DONE WITH MOCK
    function removeGameFromGroup(req, res) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const gameName = query.game_name
        const groupId = query.group_id
        covidaServices.removeGameFromGroup(gameName, groupId, (err, response) => {
            if (err) {
                const erro = {
                    'statusCode': err.code,
                    'errorMessage': err.message
                }
                res.json(erro)
            } else {
                res.status = 200;
                res.setHeader('Content-type', 'application/json')
                res.json(response)
            }
        })
    }

    //DONE WITH MOCK
    function gamesBetweenMinMax(req, res) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const minRating = query.min_Rating
        const maxRating = query.max_Rating
        const groupId = query.group_id
        covidaServices.gamesBetweenMinMax(groupId, minRating, maxRating, (err, response) => {
            if (err) {
                const erro = {
                    'statusCode': err.code,
                    'errorMessage': err.message
                }
                res.json(erro)
            } else {
                res.status = 200;
                res.setHeader('Content-type', 'application/json')
                res.json(response)
            }
        })
    }
}