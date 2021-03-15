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
        gamesBetweenMinMax: gamesBetweenMinMax,
        removeGroup: removeGroup
    }

    function getMostPopularGames() {
        return igdbData.getMostPopularGames()
    }

    function getSpecificGame(gameName) {
        return igdbData.getSpecificGame(gameName)
    }

    function createGroup(name, description) {
        return covidaDB.createGroup(name, description)
    }

    function listAllGroups() {
        return covidaDB.listAllGroups()
    }

    function getSpecificGroup(groupId) {
        return covidaDB.getSpecificGroup(groupId)
    }

    function editGroup(groupId, name, description) {
        return covidaDB.editGroup(groupId, name, description)
    }

    function addGameToGroup(gameName, groupId) {
        return igdbData.getSpecificGame(gameName).then(game => covidaDB.addGameToGroup(game, groupId))
    }

    function removeGameFromGroup(gameName, groupId) {
        return igdbData.getSpecificGame(gameName).then(game => covidaDB.removeGameFromGroup(game, groupId))
    }

    function gamesBetweenMinMax(groupId, minRating, maxRating) {
        return covidaDB.gamesBetweenMinMax(groupId, minRating, maxRating)
    }

    function removeGroup(groupId) {
        return covidaDB.removeGroup(groupId)
    }
}