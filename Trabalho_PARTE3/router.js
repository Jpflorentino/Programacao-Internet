'use strict'
const express = require("express")
const passport = require('passport')

module.exports = () => {

    const router = express.Router()

    const elasticSearch = {
        port: "9200",
        host: "localhost",
        index: "groups",
    }

    const covidaDB = require('./data/covida-db')(elasticSearch)
    const covidaDBMock = require('./data/covida-db-mock')()
    const igdbDB = require('./data/igdb-data')()
    const igdbDataMock = require('./data/igdb-data-mock')()
    const authDB = require('./data/auth-db')(elasticSearch)
    //const covidaServices = require('./covida-services/covida-services')(covidaDBMock, igdbDB)
    const covidaServices = require('./covida-services/covida-services')(covidaDB, igdbDB, authDB)
    const covidaApi = require('./covida-web-api/covida-web-api')(covidaServices, authDB)
    // const covidaUIMock = require('./app/js/covidaUIMock')(covidaServices)
    const covidaUI = require('./app/js/covidaUI')(covidaServices, authDB)

    router.use(express.json())
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((userId, done) => authDB
        .getUser(userId)
        .then(user => done(null, user))
        .catch(err => done(err))
    )

    //API
    router.get('/api/covida/games', covidaApi.getMostPopularGames)
    router.get('/api/covida/games/game', covidaApi.getSpecificGame)
    router.get('/api/covida/groups', covidaApi.listAllGroups)
    router.get('/api/covida/groups/group', covidaApi.getSpecificGroup)
    router.get('/api/covida/groups/games', covidaApi.gamesBetweenMinMax)
    router.post('/api/covida/groups', covidaApi.createGroup)
    router.put('/api/covida/groups/group', covidaApi.editGroup)
    router.put('/api/covida/groups/games', covidaApi.addGameToGroup)
    router.delete('/api/covida/groups/games', covidaApi.removeGameFromGroup)
    router.delete('/api/covida/groups', covidaApi.removeGroup)

    //UI
    router.use(express.urlencoded({
        extended: true
    }))

    router.get('/', covidaUI.home)
    router.get('/covida/games/popularGames', covidaUI.getMostPopularGames)
    router.get('/covida/specificGameForm', covidaUI.getSpecificGameForm) //form
    router.get('/covida/games/specificGame', covidaUI.getSpecificGame)
    router.get('/covida/groups/groupForm', covidaUI.createGroupForm) //form
    router.post('/covida/groups/group', covidaUI.createGroup)
    router.get('/covida/groups/allGroups', covidaUI.listAllGroups)
    router.get('/covida/specificGroupForm', covidaUI.getSpecificGroupForm) //form
    router.get('/covida/groups/specificGroup', covidaUI.getSpecificGroup)
    router.get('/covida/groupForm', covidaUI.editGroupForm) //form
    router.post('/covida/groups/group/edit', covidaUI.editGroup)
    router.post('/covida/groups/games/gameToGroup', covidaUI.addGameToGroup)
    router.post('/covida/groups/games/gameFromGroup', covidaUI.removeGameFromGroup)
    router.get('/covida/gamesBetweenMinMaxForm', covidaUI.gamesBetweenMinMaxForm) //form
    router.get('/covida/groups/gamesBetweenMinMax', covidaUI.gamesBetweenMinMax)
    router.post('/covida/groups/group/delete', covidaUI.removeGroup)

    //AUTHETICATION
    router.get('/covida/auth/login', covidaUI.loginForm)
    router.post('/covida/auth/login', covidaUI.login)
    router.get('/covida/auth/register', covidaUI.registerForm)
    router.post('/covida/auth/register', covidaUI.register)
    router.get('/covida/auth/logout', covidaUI.logout)
    router.get('/covida/auth/delete', covidaUI.deleteAccountForm)
    router.post('/covida/auth/delete', covidaUI.deleteAccount)

    return router
}