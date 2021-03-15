const fetch = require('node-fetch')

module.exports = (elasticSearch) => {
    const baseUrl = 'http://' + elasticSearch.host + ':' + elasticSearch.port + '/' + elasticSearch.index

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

    //DONE
    function createGroup(name, description) {
        const url = baseUrl + '/_doc'

        const group = {
            "name": name,
            "description": description,
            "games": []
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(group)
        }

        if (name === "" || description === "" || name === undefined || description === undefined) {
            return Promise.resolve({
                code: 400,
                message: "Bad Request: Missing Group Name or Group Description"
            })
        }

        return fetch(url, options).then(res => res.json()).then(body => body._id)
    }

    //DONE
    function listAllGroups() {
        const url = baseUrl + '/_search'
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }
        return fetch(url, options).then(res => res.json()).then(body => body.hits.hits)
    }

    //DONE
    function getSpecificGroup(groupId) {

        if (groupId === "" || groupId === undefined || groupId === null) {
            return Promise.resolve({
                code: 400,
                message: "Bad Request: Missing Group ID"
            })
        }

        const url = baseUrl + '/_doc' + `/${groupId}`

        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        }

        return fetch(url, options).then(res => res.json()).then(body => {
            if (!body.found) {
                return {
                    code: 404,
                    message: "Not Found: Group Doesn't Exist"
                }
            }
            return body._source
        })
    }

    //DONE
    function editGroup(groupId, name, description) {

        if (name === "" || description === "" || name === undefined || description === undefined) {
            return Promise.resolve({
                code: 400,
                message: "Bad Request: Missing Group Name or Group Description"
            })
        }

        const url = baseUrl + '/_doc' + `/${groupId}`

        return getSpecificGroup(groupId).then(group => {

            group.name = name
            group.description = description

            const options = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(group)
            }
            return fetch(url, options).then(res => res.json()).then(body => ({
                id: body._id,
                result: body.result
            }))
        })
    }

    //DONE
    function addGameToGroup(game, groupId) {

        if (groupId === "" || groupId === undefined || groupId === null) {
            return Promise.resolve({
                code: 400,
                message: "Bad Request: Missing Group ID"
            })
        }

        const url = baseUrl + '/_doc' + `/${groupId}`

        return getSpecificGroup(groupId).then(group => {

            group.games.push(game[0])

            const options = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(group)
            }

            return fetch(url, options).then(res => res.json()).then(body => ({
                id: body._id,
                result: body.result
            }))
        })
    }

    //DONE
    function removeGameFromGroup(game, groupId) {

        if (groupId === "" || groupId === undefined || groupId === null) {
            return Promise.resolve({
                code: 400,
                message: "Bad Request: Missing Group ID"
            })
        }

        const url = baseUrl + '/_doc' + `/${groupId}`

        return getSpecificGroup(groupId).then(group => {
            const idx = group.games.findIndex(g => g.id === game[0].id)

            if (idx < 0) {
                return Promise.resolve({
                    code: 404,
                    message: "Not Found: Missing Game in Group"
                })
            }

            group.games.splice(idx, 1)

            const options = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(group)
            }

            return fetch(url, options).then(res => res.json()).then(body => ({
                id: body._id,
                result: body.result
            }))
        })
    }

    //DONE
    function gamesBetweenMinMax(groupId, minRating, maxRating) {
        if (groupId === "" || groupId === undefined || groupId === null || minRating < 0 || maxRating > 100 || minRating === "" || maxRating === "") {
            return Promise.resolve({
                code: 400,
                message: "Bad Request: Missing Group ID or min_rating and max_rating out of bounds"
            })
        }
        return getSpecificGroup(groupId).then(group => {
            return group.games.filter(game => game.total_rating >= minRating && game.total_rating <= maxRating)
        })
    }

    //DONE
    function removeGroup(groupId) {
        if (groupId === "" || groupId === undefined || groupId === null) {
            return Promise.resolve({
                code: 400,
                message: "Bad Request: Missing Group ID"
            })
        }

        const url = baseUrl + '/_doc' + `/${groupId}`
        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }
        return fetch(url, options).then(res => res.json()).then(body => {
            if (!body.found) {
                return {
                    code: 404,
                    message: "Not Found: Group Doesn't Exist"
                }
            }
            return ({
                id: body._id,
                result: body.result
            })
        })
    }
}