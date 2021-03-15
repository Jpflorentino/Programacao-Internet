'use strict'

const express = require("express")
const app = express()

const elasticSearch = {
    port: "9200",
    host: "localhost",
    index: "groups",
}

const port = '8080'

const covidaDB = require('./data/covida-db')(elasticSearch)
const covidaDBMock = require('./data/covida-db-mock')()
const igdbData = require('./data/igdb-data')()
const igdbDataMock = require('./data/igdb-data-mock')()
const covidaServices = require('./covida-services/covida-services')(covidaDB, igdbData)
const covidaApi = require('./covida-web-api/covida-web-api')(covidaServices)

app.get('/covida/games', covidaApi.getMostPopularGames)
app.get('/covida/games/game', covidaApi.getSpecificGame)
app.get('/covida/groups', covidaApi.listAllGroups)
app.get('/covida/groups/group', covidaApi.getSpecificGroup)
app.get('/covida/groups/games', covidaApi.gamesBetweenMinMax)
app.post('/covida/groups', covidaApi.createGroup)
app.put('/covida/groups/group', covidaApi.editGroup)
app.put('/covida/groups/games', covidaApi.addGameToGroup)
app.delete('/covida/groups/games', covidaApi.removeGameFromGroup)
app.delete('/covida/groups', covidaApi.removeGroup)

//app.use(covidaApi.errorHandler)

app.listen(port, () => console.log(`Listening on ${port}`))