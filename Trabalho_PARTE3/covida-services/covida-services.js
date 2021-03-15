'use strict'
module.exports = (covidaDB, igdbData, authDB) => {
    return {
        //*******************Funcoes API********************//
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

        //*******************Funcoes AUTH********************//
        createGroupAuth: createGroupAuth,
        listAllGroupsAuth: listAllGroupsAuth,
        editGroupAuth: editGroupAuth,
        addGameToGroupAuth: addGameToGroupAuth,
        removeGameFromGroupAuth: removeGameFromGroupAuth,
        gamesBetweenMinMaxAuth: gamesBetweenMinMaxAuth,
        removeGroupAuth: removeGroupAuth,
        deleteAccount: deleteAccount
    }

    //*******************Funcoes API********************//
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

    //*******************Funcoes AUTH********************//
    function createGroupAuth(userId, group) {
        return authDB.createGroupAuth(userId, group)
    }

    function listAllGroupsAuth(userId) {
        return authDB.listAllGroupsAuth(userId)
    }

    function editGroupAuth(userId, group) {
        return authDB.editGroupAuth(userId, group)
    }

    function addGameToGroupAuth(game, userId, groupId) {
        return authDB.addGameToGroupAuth(game, userId, groupId)
    }

    function removeGameFromGroupAuth(game, userId, groupId) {
        return authDB.removeGameFromGroupAuth(game, userId, groupId)
    }

    function gamesBetweenMinMaxAuth(userId, groupId, minRating, maxRating) {
        return authDB.gamesBetweenMinMaxAuth(userId, groupId, minRating, maxRating)
    }

    function removeGroupAuth(userId, groupId) {
        return authDB.removeGroupAuth(userId, groupId)
    }

    function deleteAccount(userId) {
        return authDB.deleteAccount(userId)
    }
}