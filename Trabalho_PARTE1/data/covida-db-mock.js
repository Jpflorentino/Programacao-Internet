'use strict'
module.exports = () => {

    let groups = []

    return {
        createGroup: createGroup,
        listAllGroups: listAllGroups,
        getSpecificGroup: getSpecificGroup,
        editGroup: editGroup,
        addGameToGroup: addGameToGroup,
        removeGameFromGroup: removeGameFromGroup,
        gamesBetweenMinMax: gamesBetweenMinMax
    }

    function createGroup(name, description, callback) {
        let group = groups
        const g = {
            "id": group.length + 1,
            "name": name,
            "description": description,
            "games": []
        }
        if (g.name === "" || g.description === "" || g.name === undefined || g.description === undefined) {
            return callback({
                code: 400,
                message: "Bad Request: Missing Group Name or Group Description"
            })

        } else if (!group) {
            return callback({
                code: 500,
                message: "Internal Problem: Games Array Missing"
            })

        }
        group.push(g)
        callback(null, g)
    }

    function listAllGroups(callback) {
        let group = groups
        if (group.length === 0) {
            return callback({
                code: 404,
                message: "Not Found: There are no groups"
            })

        } else if (!group) {
            return callback({
                code: 500,
                message: "Internal Problem: Games Array Missing"
            })
        }
        callback(null, group)
    }

    function getSpecificGroup(groupId, callback) {
        let group = groups
        let g = group[groupId - 1]
        if (groupId === "" || groupId === undefined || groupId === null) {
            return callback({
                code: 400,
                message: "Bad Request: Missing Group ID"
            })
        } else if (!group) {
            return callback({
                code: 500,
                message: "Internal Problem: Group Array Missing"
            })
        } else if (g === undefined) {
            return callback({
                code: 404,
                message: "Not Found: Group Doesn't Exists"
            })
        }
        callback(null, g)
    }

    function editGroup(groupId, name, description, callback) {
        let group = groups
        let g = group[groupId - 1]
        if (groupId === "" || groupId === undefined || groupId === null) {
            return callback({
                code: 400,
                message: "Bad Request: Missing Group ID"
            })
        } else if (!group) {
            return callback({
                code: 500,
                message: "Internal Problem: Group Array Missing"
            })
        } else if (g === undefined) {
            return callback({
                code: 404,
                message: "Not Found: Group Doesn't Exist"
            })
        }
        g.name = name
        g.description = description
        const newGroup = {
            "group": g,
            "message": "Group " + groupId + " Successfully Updated"
        }
        callback(null, newGroup)
    }

    function addGameToGroup(game, groupId, callback) {
        let group = groups
        let g = group[groupId - 1]
        if (groupId === "" || groupId === undefined || groupId === null) {
            return callback({
                code: 400,
                message: "Bad Request: Missing Group ID"
            })
        } else if (!group) {
            return callback({
                code: 500,
                message: "Internal Problem: Group Array Missing"
            })
        } else if (g === undefined) {
            return callback({
                code: 404,
                message: "Not Found: Group Doesn't Exist"
            })
        }
        g.games.push(game[0])
        let newGroup = {
            "group": groups,
            "message": "Game " + game[0].name + " Successfully Added to Group " + groupId
        }
        callback(null, newGroup)
    }

    function removeGameFromGroup(game, groupId, callback) {
        let group = groups
        let g = group[groupId - 1]
        if (groupId === "" || groupId === undefined || groupId === null) {
            return callback({
                code: 400,
                message: "Bad Request: Missing Group ID"
            })
        } else if (!group) {
            return callback({
                code: 500,
                message: "Internal Problem: Group Array Missing"
            })
        } else if (g === undefined) {
            return callback({
                code: 404,
                message: "Not Found: Group Doesn't Exist"
            })
        }
        let idx = g.games.findIndex(element => element.name === game[0].name)
        g.games.splice(idx, 1)
        let newGroup = {
            "group": groups,
            "message": "Game " + game[0].name + " Successfully Deleted from Group " + groupId
        }
        callback(null, newGroup)
    }

    function gamesBetweenMinMax(groupId, minRating, maxRating, callback) {
        let group = groups
        let g = group[groupId - 1]
        const gamesByRating = g.games.filter(game => game.total_rating >= minRating && game.total_rating <= maxRating)
        if (groupId === "" || groupId === undefined || groupId === null || minRating < 0 || maxRating > 100 || minRating === "" || maxRating === "") {
            return callback({
                code: 400,
                message: "Bad Request: Missing Group ID or min_rating and max_rating out of bounds"
            })
        } else if (!group) {
            return callback({
                code: 500,
                message: "Internal Problem: Group Array Missing"
            })
        } else if (g === undefined || gamesByRating.length === 0) {
            return callback({
                code: 404,
                message: "Not Found: Group Doesn't Exist or No Games"
            })
        }
        callback(null, gamesByRating)
    }
}