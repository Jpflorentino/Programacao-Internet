'use strict'

const urlParse = require('url').parse

module.exports = (covidaServices, auth) => {
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
        loginForm: loginForm,
        registerForm: registerForm,
        deleteAccountForm: deleteAccountForm,
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
        login: login,
        register: register,
        logout: logout,
        deleteAccount: deleteAccount
    }


    //**********ERROR HANDLER**********//
    function errorHandlerUI(err, req, res) {
        const erro = {
            'code': err.code,
            'message': err.message,
            user: req.user
        }
        res.render('errorHandler', erro)
    }

    //**********FORMS**********//
    function home(req, res) {
        res.render('home', {
            user: req.user
        })
    }

    function getSpecificGameForm(req, res) {
        res.render('getSpecificGameForm', {
            user: req.user
        })
    }

    function createGroupForm(req, res) {
        req.isAuthenticated() ?
            res.render('createGroupForm', {
                user: req.user
            }) : res.redirect('/covida/auth/login')
    }

    function getSpecificGroupForm(req, res) {
        res.render('getSpecificGroupForm', {
            user: req.user
        })
    }

    function editGroupForm(req, res) {
        const answer = {
            user: req.user,
            'id': req.query.groupId
        }
        res.render('editGroupForm', answer)
    }

    function addGameToGroupForm(req, res) {
        res.render('addGameToGroupForm', {
            user: req.user
        })
    }

    function removeGameFromGroupForm(req, res) {
        res.render('removeGameFromGroupForm', {
            user: req.user
        })
    }

    function gamesBetweenMinMaxForm(req, res) {
        req.isAuthenticated() ?
            covidaServices.listAllGroupsAuth(req.user._id).then(body => {
                const answer = {
                    'groups': body,
                    user: req.user
                }
                res.status = 200
                res.render('gamesBetweenMinMaxForm', answer)
            }, err => errorHandlerUI(err, req, res)) : res.redirect('/covida/auth/login')
    }

    function removeGroupForm(req, res) {
        res.render('removeGroupForm', {
            user: req.user
        })
    }

    function loginForm(req, res) {
        res.render('loginForm')
    }

    function registerForm(req, res) {
        res.render('registerForm')
    }

    function deleteAccountForm(req, res) {
        res.render('deleteAccountForm', {
            user: req.user
        })
    }
    //***************************//

    //**********PEDIDOS**********//

    //DONE
    function getMostPopularGames(req, res) {
        console.log(req.method + ": " + req.url)
        covidaServices.getMostPopularGames().then(body => {
            if (req.user === undefined) {
                const answer = {
                    'games': body,
                    'size': body.length,
                }
                res.status = 200
                res.render('getMostPopularGames', answer)
            } else {
                covidaServices.listAllGroupsAuth(req.user._id).then(groups => {
                    const answer = {
                        'games': body,
                        'size': body.length,
                        'groups': groups,
                        user: req.user
                    }
                    res.status = 200
                    res.render('getMostPopularGames', answer)
                })
            }
        }, err => errorHandlerUI(err, req, res))
    }

    //DONE
    function getSpecificGame(req, res) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const gameName = query.game_name
        covidaServices.getSpecificGame(gameName).then(body => {
            if (req.user === undefined) {
                const answer = {
                    'games': body,
                    'size': body.length,
                }
                res.status = 200
                res.render('getMostPopularGames', answer)
            } else {
                covidaServices.listAllGroupsAuth(req.user._id).then(groups => {
                    const answer = {
                        'games': body,
                        'size': body.length,
                        'groups': groups,
                        user: req.user
                    }
                    res.status = 200
                    res.render('getSpecificGameResponse', answer)
                })
            }
        }, err => errorHandlerUI(err, req, res))
    }

    //DONE
    function createGroup(req, res) {
        console.log(req.method + ": " + req.url)
        covidaServices.createGroup(req.body.name, req.body.description).then(body => {
            covidaServices.createGroupAuth(req.user._id, body).then(() => {
                const answer = {
                    "id": body.id,
                    "name": body.name,
                    "description": body.description,
                    user: req.user
                }
                res.status = 200
                res.redirect('/covida/groups/allGroups')
            })
        }, err => errorHandlerUI(err, req, res))
    }

    //DONE
    function listAllGroups(req, res) {
        console.log(req.method + ": " + req.url)
        req.isAuthenticated() ?
            covidaServices.listAllGroupsAuth(req.user._id).then(body => {
                const answer = {
                    'groups': body,
                    'size': body.length,
                    user: req.user
                }
                res.status = 200
                res.render('listAllGroupsResponse', answer)
            }, err => errorHandlerUI(err, req, res)) : res.redirect('/covida/auth/login')
    }

    //DONE
    //Falta Redirect
    function getSpecificGroup(req, res) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const groupId = query.groupId

        covidaServices.getSpecificGroup(groupId).then(body => {
            const answer = {
                "id": groupId,
                "name": body.name,
                "description": body.description,
                "games": body.games,
                user: req.user
            }
            res.status = 200
            res.render('getSpecificGroupResponse', answer)
        }, err => errorHandlerUI(err, req, res))
    }

    //DONE
    function editGroup(req, res) {
        console.log(req.method + ": " + req.url)
        const groupId = req.body.group_id
        const name = req.body.name
        const description = req.body.description
        covidaServices.editGroup(groupId, name, description).then(body => {
            covidaServices.editGroupAuth(req.user._id, body).then(() => {
                /*
                const answer = {
                    "id": body.id,
                    "name": body.name,
                    "description": body.description,
                    "message": body.result,
                    user: req.user
                }*/
                res.status = 200
                res.redirect('/covida/groups/allGroups')
                //res.render('editGroupResponse', answer)
            })
        }, err => errorHandlerUI(err, req, res))
    }

    //DONE
    function addGameToGroup(req, res) {
        console.log(req.method + ": " + req.url)
        const {
            gameName,
            groupId
        } = JSON.parse(req.body.targetGroup)
        covidaServices.addGameToGroup(gameName, groupId).then(body => {
            covidaServices.addGameToGroupAuth(body.game, req.user._id, groupId).then(() => {
                /*const answer = {
                    "id": body.id,
                    "message": body.result,
                    "name": body.game[0].name,
                    "total_rating": body.game[0].total_rating,
                    "url": body.game[0].url,
                    user: req.user
                }*/
                res.status = 200
                res.redirect('/covida/groups/allGroups')
            })
            //res.render('addGameToGroupResponse', answer)
        }, err => errorHandlerUI(err, req, res))
    }

    //DONE
    function removeGameFromGroup(req, res) {
        console.log(req.method + ": " + req.url)
        const {
            gameName,
            groupId
        } = JSON.parse(req.body.targetGroup)
        covidaServices.removeGameFromGroup(gameName, groupId).then(body => {
            covidaServices.removeGameFromGroupAuth(body.game, req.user._id, groupId).then(() => {
                /*
                const answer = {
                    "id": body.id,
                    "message": body.result,
                    "name": body.game[0].name,
                    "total_rating": body.game[0].total_rating,
                    "url": body.game[0].url,
                    user: req.user
                }*/
                res.status = 200
                res.redirect('/covida/groups/allGroups')
                //res.render('removeGameFromGroupResponse', answer)
            })
        }, err => errorHandlerUI(err, req, res))
    }

    //DONE 
    function gamesBetweenMinMax(req, res) {
        console.log(req.method + ": " + req.url)
        const urlPathname = urlParse(req.url, true)
        const {
            query
        } = urlPathname //assim obtem-se so a propriedade pathname do URL
        const minRating = query.min_Rating
        const maxRating = query.max_Rating
        const groupId = query.groupId
        req.isAuthenticated() ?
            covidaServices.gamesBetweenMinMaxAuth(req.user._id, groupId, minRating, maxRating).then(body => {
                const answer = {
                    "game": body,
                    "minRating": minRating,
                    "maxRating": maxRating,
                    "groupId": groupId,
                    user: req.user
                }

                res.render('gamesBetweenMinMaxResponse', answer)
            }, err => errorHandlerUI(err, req, res)) : res.redirect('/covida/auth/login')
    }

    //DONE
    function removeGroup(req, res) {
        console.log(req.method + ": " + req.url)
        const groupId = req.body.groupId
        covidaServices.removeGroup(groupId).then(body => {
            covidaServices.removeGroupAuth(req.user._id, body.id).then(() => {
                /*
                const answer = {
                    'id': body.id,
                    'result': body.result,
                    user: req.user
                }*/
                res.status = 200
                res.redirect('/covida/groups/allGroups')
                //res.render('removeGroupResponse', answer)
            })
        }, err => errorHandlerUI(err, req, res))
    }

    function deleteAccount(req, res) {
        console.log(req.method + ": " + req.url)
        covidaServices.deleteAccount(req.user._id).then(ids => {
            if (ids.length !== 0) {
                ids.forEach(id => covidaServices.removeGroup(id))
            }
            req.logout()
            res.status = 200
            res.redirect('/')
            //res.render('removeGroupResponse', answer)
        }, err => errorHandlerUI(err, req, res))
    }

    function login(req, res) {
        auth.login(req.body.username, req.body.password).then(user => {
            req.login(user, (err) => {
                if (err) {
                    return errorHandlerUI(err, req, res)
                }
                res.redirect('/')
            })
        }, err => errorHandlerUI(err, req, res))
    }

    function register(req, res) {
        auth.register(req.body.fullname, req.body.username, req.body.password).then(user => {
            req.login(user, (err) => {
                if (err) {
                    return errorHandlerUI(err, req, res)
                }
                res.redirect('/')
            })
        }, err => errorHandlerUI(err, req, res))
    }

    function logout(req, res) {
        req.logout()
        res.redirect('/covida/auth/login')
    }
    //***************************//
}