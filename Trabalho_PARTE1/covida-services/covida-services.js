'use strict'
module.exports = (covidaDB, igdbData) => {
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

    function getMostPopularGames(callback) {
        return igdbData.getMostPopularGames((err, games) => callback(err, games))
    }

    function getSpecificGame(gameName, callback) {
        return igdbData.getSpecificGame(gameName, (err, game) => callback(err, game))
    }

    function createGroup(name, description, callback) {
        return covidaDB.createGroup(name, description, (err, response) => callback(err, response))
    }

    function listAllGroups(callback) {
        return covidaDB.listAllGroups((err, groups) => callback(err, groups))
    }

    function getSpecificGroup(groupId, callback) {
        return covidaDB.getSpecificGroup(groupId, (err, group) => callback(err, group))
    }

    function editGroup(groupId, name, description, callback) {
        return covidaDB.editGroup(groupId, name, description, (err, group) => callback(err, group))
    }

    function addGameToGroup(gameName, groupId, callback) {
        return igdbData.getSpecificGame(gameName, (err, game) => {
            if (err) return callback(err)
            return covidaDB.addGameToGroup(game, groupId, (error, group) => callback(error, group))
        })
    }

    function removeGameFromGroup(gameName, groupId, callback) {
        return igdbData.getSpecificGame(gameName, (err, game) => {
            if (err) return callback(err)
            //return covidaDB.removeGameFromGroup(game, groupId, (error, group) => callback(error, group))
            //-------OU-------
            return covidaDB.removeGameFromGroup(game, groupId, callback)
        })
    }

    function gamesBetweenMinMax(groupId, minRating, maxRating, callback) {
        return covidaDB.gamesBetweenMinMax(groupId, minRating, maxRating, (err, games) => callback(err, games))
    }
}