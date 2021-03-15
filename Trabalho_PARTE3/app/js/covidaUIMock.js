'use strict'

const urlParse = require('url').parse

module.exports = (covidaServices) => {
    return {
        //FORM FUNCTIONS
        home: home,
        getSpecificGameForm: getSpecificGameForm,
        createGroupForm: createGroupForm,
        getSpecificGroupForm: getSpecificGroupForm,
        editGroupForm: editGroupForm,
        addGameToGroupForm: addGameToGroupForm,
        removeGameFromGroupForm: removeGameFromGroupForm,
        gamesBetweenMinMaxForm: gamesBetweenMinMaxForm,
        removeGroupForm: removeGroupForm,
        //FUNCTIONS
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

    //**********ERROR HANDLER**********//
    function errorHandlerUI(err, req, res) {
        const erro = {
            'code': err.code,
            'message': err.message
        }
        res.render('errorHandler', erro)
    }

    //**********FORMS**********//
    function home(req, res) {
        res.render('home')
    }

    function getSpecificGameForm(req, res) {
        res.render('getSpecificGameForm')
    }

    function createGroupForm(req, res) {
        res.render('createGroupForm')
    }

    function getSpecificGroupForm(req, res) {
        res.render('getSpecificGroupForm')
    }

    function editGroupForm(req, res) {
        res.render('editGroupForm')
    }

    function addGameToGroupForm(req, res) {
        res.render('addGameToGroupForm')
    }

    function removeGameFromGroupForm(req, res) {
        res.render('removeGameFromGroupForm')
    }

    function gamesBetweenMinMaxForm(req, res) {
        res.render('gamesBetweenMinMaxForm')
    }

    function removeGroupForm(req, res) {
        res.render('removeGroupForm')
    }
    //***************************//

    //**********PEDIDOS**********//
    function getMostPopularGames(req, res) {
        console.log(req.method + ": " + req.url)
        covidaServices.getMostPopularGames().then(body => {
            console.log(body)
            const answer = {
                'items': body,
                'size': body.length
            }
            res.status = 200;
            res.render('getMostPopularGames', answer)
        }, err => errorHandlerUI(err, req, res))
    }

    function getSpecificGame(req, res) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const gameName = query.game_name
        covidaServices.getSpecificGame(gameName).then(body => {
            const answer = {
                'games': body,
                'size': body.length
            }
            res.status = 200
            res.render('getSpecificGameResponse', answer)
        }, err => errorHandlerUI(err, req, res))
    }

    function createGroup(req, res) {
        console.log(req.method + ": " + req.url)
        covidaServices.createGroup(req.body.name, req.body.description).then(body => {
            const answer = {
                "id": body.id,
                "name": body.name,
                "description": body.description,
            }
            res.status = 200
            res.render('createGroupResponse', answer)

        }, err => errorHandlerUI(err, req, res))
    }

    function listAllGroups(req, res) {
        console.log(req.method + ": " + req.url)
        covidaServices.listAllGroups().then(body => {
            const answer = {
                'groups': body,
                'size': body.length,
                'games': body.games
            }
            res.status = 200
            res.render('listAllGroupsResponse', answer)
        }, err => errorHandlerUI(err, req, res))
    }

    function getSpecificGroup(req, res) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const groupId = query.group_id
        covidaServices.getSpecificGroup(groupId).then(body => {
            const answer = {
                "id": body.id,
                "name": body.name,
                "description": body.description,
                "games": body.games
            }
            res.status = 200
            res.render('getSpecificGroupResponse', answer)
        }, err => errorHandlerUI(err, req, res))
    }

    function editGroup(req, res) {
        console.log(req.method + ": " + req.url)
        const groupId = req.body.group_id
        const name = req.body.name
        const description = req.body.description
        covidaServices.editGroup(groupId, name, description).then(body => {
            const answer = {
                "id": body.group.id,
                "name": body.group.name,
                "description": body.group.description,
                "games": body.group.games,
                "message": body.message
            }
            res.status = 200
            res.render('editGroupResponse', answer)
        }, err => errorHandlerUI(err, req, res))
    }

    function addGameToGroup(req, res) {
        console.log(req.method + ": " + req.url)
        covidaServices.addGameToGroup(req.body.gameName, req.body.group_id).then(body => {
                const answer = {
                    "id": body.group.id,
                    "name": body.group.name,
                    "description": body.group.description,
                    "games": body.group.games,
                    "message": body.message
                }
                res.status = 200
                res.render('addGameToGroupResponse', answer)
            },
            err => errorHandlerUI(err, req, res))
    }

    function removeGameFromGroup(req, res) {
        console.log(req.method + ": " + req.url)
        covidaServices.removeGameFromGroup(req.body.gameName, req.body.group_id).then(body => {
                console.log(body)
                const answer = {
                    "id": body.group.id,
                    "name": body.group.name,
                    "description": body.group.description,
                    "games": body.group.games,
                    "message": body.message
                }
                res.status = 200
                res.render('removeGameFromGroupResponse', answer)
            },
            err => errorHandlerUI(err, req, res))
    }

    function gamesBetweenMinMax(req, res) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const minRating = query.min_Rating
        const maxRating = query.max_Rating
        const groupId = query.group_id
        covidaServices.gamesBetweenMinMax(groupId, minRating, maxRating).then(body => {
            console.log(body)
            const answer = {
                "games": body
            }

            res.render('gamesBetweenMinMaxResponse', answer)
        }, err => errorHandlerUI(err, req, res))
    }

    function removeGroup(req, res) {
        console.log(req.method + ": " + req.url)
        const group_id = req.body.group_id
        covidaServices.removeGroup(group_id).then(body => {
            const answer = {
                'message': body
            }
            res.render('removeGroupResponse', answer)
        }, err => errorHandlerUI(err, req, res))
    }
    //***************************//
}