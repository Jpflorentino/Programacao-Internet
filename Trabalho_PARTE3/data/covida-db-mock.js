'use strict'
module.exports = () => {

    let groups = []
    let index = 0

    return {
        createGroup: createGroup,
        listAllGroups: listAllGroups,
        getSpecificGroup: getSpecificGroup,
        editGroup: editGroup,
        addGameToGroup: addGameToGroup,
        removeGameFromGroup: removeGameFromGroup,
        gamesBetweenMinMax: gamesBetweenMinMax,
        removeGroup: removeGroup
    }

    function createGroup(name, description) {
        return new Promise((resolve, reject) => {
            let group = groups
            const g = {
                "id": ++index,
                "name": name,
                "description": description,
                "games": []
            }
            if (g.name === "" || g.description === "" || g.name === undefined || g.description === undefined) {
                return reject({
                    code: 400,
                    message: "Bad Request: Missing Group Name or Group Description"
                })
            } else if (!group) {
                return reject({
                    code: 500,
                    message: "Internal Problem: Games Array Missing"
                })

            }
            group.push(g)
            resolve(g)
        })
    }

    function listAllGroups() {
        return new Promise((resolve, reject) => {
            let group = groups
            if (group.length === 0) {
                return reject({
                    code: 404,
                    message: "Not Found: There are no groups"
                })
            } else if (!group) {
                return reject({
                    code: 500,
                    message: "Internal Problem: Games Array Missing"
                })
            }
            resolve(group)
        })
    }

    function getSpecificGroup(groupId) {
        return new Promise((resolve, reject) => {
            let group = groups
            let idx = group.findIndex(element => element.id.toString() === groupId)
            let g = group[idx]
            if (groupId === "" || groupId === undefined || groupId === null) {
                return reject({
                    code: 400,
                    message: "Bad Request: Missing Group ID"
                })
            } else if (!group) {
                return reject({
                    code: 500,
                    message: "Internal Problem: Group Array Missing"
                })
            } else if (g === undefined) {
                return reject({
                    code: 404,
                    message: "Not Found: Group Doesn't Exists"
                })
            }
            resolve(g)
        })
    }

    function editGroup(groupId, name, description) {
        return new Promise((resolve, reject) => {
            let group = groups
            let idx = group.findIndex(element => element.id.toString() === groupId)
            let g = group[idx]
            if (groupId === "" || groupId === undefined || groupId === null) {
                return reject({
                    code: 400,
                    message: "Bad Request: Missing Group ID"
                })
            } else if (!group) {
                return reject({
                    code: 500,
                    message: "Internal Problem: Group Array Missing"
                })
            } else if (g === undefined) {
                return reject({
                    code: 404,
                    message: "Not Found: Group Doesn't Exist"
                })
            }
            g.name = name
            g.description = description
            const newGroup = {
                "group": g,
                "message": "Group " + groupId + ":" + " Successfully Updated"
            }
            resolve(newGroup)
        })
    }

    function addGameToGroup(game, groupId) {
        return new Promise((resolve, reject) => {
            let group = groups
            let idx = group.findIndex(element => element.id.toString() === groupId)
            let g = group[idx]

            if (groupId === "" || groupId === undefined || groupId === null) {
                return reject({
                    code: 400,
                    message: "Bad Request: Missing Group ID"
                })
            } else if (!group) {
                return reject({
                    code: 500,
                    message: "Internal Problem: Group Array Missing"
                })
            } else if (g === undefined) {
                return reject({
                    code: 404,
                    message: "Not Found: Group Doesn't Exist"
                })
            }
            g.games.push(game[0])
            let newGroup = {
                "group": g,
                "message": "Game " + game[0].name + " Successfully Added to Group " + groupId
            }
            resolve(newGroup)
        })
    }

    function removeGameFromGroup(game, groupId) {
        return new Promise((resolve, reject) => {
            let group = groups
            let idx = group.findIndex(element => element.id.toString() === groupId)
            let g = group[idx]
            if (groupId === "" || groupId === undefined || groupId === null) {
                return reject({
                    code: 400,
                    message: "Bad Request: Missing Group ID"
                })
            } else if (!group) {
                return reject({
                    code: 500,
                    message: "Internal Problem: Group Array Missing"
                })
            } else if (g === undefined) {
                return reject({
                    code: 404,
                    message: "Not Found: Group Doesn't Exist"
                })
            }
            let index = g.games.findIndex(element => element.name === game[0].name)
            g.games.splice(index, 1)
            let newGroup = {
                "group": g,
                "message": "Game " + game[0].name + " Successfully Deleted from Group " + groupId
            }
            resolve(newGroup)
        })
    }

    function gamesBetweenMinMax(groupId, minRating, maxRating) {
        return new Promise((resolve, reject) => {
            let group = groups
            let idx = group.findIndex(element => element.id.toString() === groupId)
            let g = group[idx]
            const gamesByRating = g.games.filter(game => game.total_rating >= minRating && game.total_rating <= maxRating)
            if (groupId === "" || groupId === undefined || groupId === null || minRating < 0 || maxRating > 100 || minRating === "" || maxRating === "") {
                return reject({
                    code: 400,
                    message: "Bad Request: Missing Group ID or min_rating and max_rating out of bounds"
                })
            } else if (!group) {
                return reject({
                    code: 500,
                    message: "Internal Problem: Group Array Missing"
                })
            } else if (g === undefined || gamesByRating.length === 0) {
                return reject({
                    code: 404,
                    message: "Not Found: Group Doesn't Exist or No Games"
                })
            }
            resolve(gamesByRating)
        })
    }

    function removeGroup(groupId) {
        return new Promise((resolve, reject) => {
            let group = groups
            let idx = group.findIndex(element => element.id.toString() === groupId)
            group.splice(idx, 1)

            if (groupId === "" || groupId === undefined || groupId === null) {
                return reject({
                    code: 400,
                    message: "Bad Request: Missing Group ID"
                })
            } else if (!group) {
                return reject({
                    code: 500,
                    message: "Internal Problem: Group Array Missing"
                })
            } else if (idx === undefined) {
                return reject({
                    code: 404,
                    message: "Not Found: Group Doesn't Exist"
                })
            }
            resolve("Successfully Deleted Group " + groupId)
        })
    }
}