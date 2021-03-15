'use strict'

const fetch = require('node-fetch')

module.exports = (elasticSearch) => {

    const usersUrl = `http://${elasticSearch.host}:${elasticSearch.port}/users`

    return {
        //********AUTH METHODS*********/
        register: register,
        login: login,
        getUser: getUser,
        //********FIM*********//
        createGroupAuth: createGroupAuth,
        listAllGroupsAuth: listAllGroupsAuth,
        editGroupAuth: editGroupAuth,
        addGameToGroupAuth: addGameToGroupAuth,
        removeGameFromGroupAuth: removeGameFromGroupAuth,
        gamesBetweenMinMaxAuth: gamesBetweenMinMaxAuth,
        removeGroupAuth: removeGroupAuth,
        deleteAccount: deleteAccount
    }

    function register(fullname, username, password) {

        const url = usersUrl + '/_doc' + '?refresh=wait_for'

        const user = {
            'fullname': fullname,
            'username': username,
            'password': password,
            'groups': []
        }

        return listAllUsers().then(users => {
            const specificUser = users.some(element => element._source.username === user.username)

            if (specificUser) {
                return Promise.reject({
                    code: 400,
                    message: "Username already exists"
                })
            }

            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            }

            return fetch(url, options).then(res => res.json()).then(body => {
                return {
                    //...user,
                    "id": body._id
                }
            })
        })
    }

    function login(username, password) {
        const url = usersUrl + '/_search'

        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        }

        return fetch(url, options).then(res => res.json()).then(body => {
            const user = body.hits.hits.filter(element => element._source.username === username && element._source.password === password)
            if (user.length === 0) {
                return Promise.reject({
                    code: 400,
                    message: "Wrong Credentials!"
                })
            }

            return {
                "id": user[0]._id
            }
        })
    }

    function getUser(userId) {
        const url = `${usersUrl}/_doc/${userId}?refresh=true`
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }

        return fetch(url, options).then(res => res.json()).then(body => {
            return {
                '_id': body._id,
                'fullname': body._source.fullname,
                'username': body._source.username,
                'password': body._source.password,
                'groups': body._source.groups,
                //OU
                //...body._source
            }
        })
    }

    //*********AUXILIAR**********/
    function listAllUsers() {
        const url = usersUrl + '/_search'

        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        }
        return fetch(url, options).then(res => res.json()).then(body => {
            return body.hits.hits
        })
    }

    function getSpecificUserAuth(userId) {
        const url = usersUrl + '/_doc' + `/${userId}`

        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        }

        return fetch(url, options).then(res => res.json()).then(body => {
            if (!body.found) {
                return Promise.reject({
                    code: 404,
                    message: "Not Found: User Doesn't Exist"
                })
            }

            return ({
                "fullname": body._source.fullname,
                "username": body._source.username,
                "password": body._source.password,
                "groups": body._source.groups
            })
        })
    }
    //*********FIM**********/

    //DONE
    function createGroupAuth(userId, group) {
        const url = usersUrl + '/_doc/' + `${userId}` + '?refresh=wait_for'

        return getSpecificUserAuth(userId).then(user => {

            user.groups.push(group)

            const options = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            }

            return fetch(url, options).then(res => res.json())
        })
    }

    //DONE
    function listAllGroupsAuth(userId) {
        const url = usersUrl + '/_doc' + `/${userId}`
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }
        return fetch(url, options).then(res => res.json()).then(body => body._source.groups)
    }

    //DONE
    function editGroupAuth(userId, groups) {

        const url = usersUrl + '/_doc' + `/${userId}` + '?refresh=wait_for'

        return getSpecificUserAuth(userId).then(user => {

            const group = user.groups.find(element => element.id === groups.id)

            group.name = groups.name
            group.description = groups.description

            const options = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            }
            return fetch(url, options).then(res => res.json())
        })
    }

    //DONE
    function addGameToGroupAuth(game, userId, groupId) {

        const url = usersUrl + '/_doc' + `/${userId}` + '?refresh=wait_for'

        return getSpecificUserAuth(userId).then(user => {
            const group = user.groups.find(element => element.id === groupId)

            group.games.push(game[0])

            const options = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            }

            return fetch(url, options).then(res => res.json())
        })
    }

    //DONE
    function removeGameFromGroupAuth(game, userId, groupId) {

        const url = usersUrl + '/_doc' + `/${userId}` + '?refresh=wait_for'

        return getSpecificUserAuth(userId).then(user => {

            const group = user.groups.find(element => element.id === groupId)

            const idx = group.games.findIndex(g => g.id === game[0].id)

            group.games.splice(idx, 1)

            const options = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            }

            return fetch(url, options).then(res => res.json())
        })
    }

    //DONE
    function gamesBetweenMinMaxAuth(userId, groupId, minRating, maxRating) {

        return getSpecificUserAuth(userId).then(user => {

            const group = user.groups.find(element => element.id === groupId)

            const games = group.games.filter(game => game.total_rating >= minRating && game.total_rating <= maxRating)
            if (games.length === 0) {
                return Promise.reject({
                    code: 404,
                    message: `Not Found: No games in group with rating between ${minRating} and ${maxRating}`
                })
            }
            return games
        })
    }

    //DONE
    function removeGroupAuth(userId, groupId) {
        const url = usersUrl + '/_doc' + `/${userId}` + '?refresh=wait_for'

        return getSpecificUserAuth(userId).then(user => {

            const idxOfGroup = user.groups.findIndex(element => element.id === groupId)
            user.groups.splice(idxOfGroup, 1)

            const options = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            }

            return fetch(url, options).then(res => res.json())
        })
    }

    //DONE
    function deleteAccount(userId) {
        const url = usersUrl + '/_doc' + `/${userId}` + '?refresh=wait_for'
        return getSpecificUserAuth(userId).then(user => {
            const ids = user.groups.map(group => group.id)
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            }
            return fetch(url, options).then(res => res.json()).then(() => {
                return ids
            })
        })

    }
}