'use strict'

const expect = require('chai').expect
const covidaDBMock = require('../data/covida-db-mock')()
const igdbDataMock = require('../data/igdb-data-mock')()
const serviceCreator = require('../covida-services/covida-services')(covidaDBMock, igdbDataMock)

describe('Service', function () {

    describe('getMostPopularGames', function () {
        it('It should return Games', function (done) {
            serviceCreator.getMostPopularGames((err, games) => {
                expect(games[0].name).to.be.equal("Project +")
                done()
            })
        })
    })

    describe('getSpecificGame', function () {
        it('It should return "Project +"', function (done) {
            serviceCreator.getSpecificGame("Project +", (err, games) => {
                expect(games[0].name).to.be.equal("Project +")
                done()
            })
        })
    })

    describe('createGroup', function () {
        it('It should create a group', function (done) {
            serviceCreator.createGroup("Name", "description", (err, group) => {
                expect(group.id).to.be.equal(1)
                expect(group.name).to.be.equal("Name")
                expect(group.description).to.be.equal("description")
                done()
            })
        })
    })

    describe('listAllGroups', function () {
        it('It should list a group with name "Name"', function (done) {
            serviceCreator.listAllGroups((err, groups) => {
                expect(groups.length).to.be.equal(1)
                done()
            })
        })
    })

    describe('getSpecificGroup', function () {
        it('It should get a group with ID "1"', function (done) {
            serviceCreator.getSpecificGroup(1, (err, group) => {
                expect(group.id).to.be.equal(1)
                done()
            })
        })
    })

    describe('editGroup', function () {
        it('It should edit group with ID "1"', function (done) {
            serviceCreator.editGroup(1, "Pedro", "Group1", (err, group) => {
                expect(group.group.id).to.be.equal(1)
                expect(group.group.name).to.be.equal("Pedro")
                expect(group.group.description).to.be.equal("Group1")
                done()
            })
        })
    })

    describe('addGameToGroup', function () {
        it('It should add game "Project +" and "Heartbound" to group "1"', function (done) {
            serviceCreator.addGameToGroup("Project +", 1, (err, group) => {
                serviceCreator.addGameToGroup("Heartbound", 1, (err, group) => {
                    expect(group.group[0].id).to.be.equal(1)
                    expect(group.group[0].name).to.be.equal("Pedro")
                    expect(group.group[0].description).to.be.equal("Group1")
                    expect(group.group[0].games.length).to.be.equal(2)
                    done()
                })
            })
        })
    })

    describe('removeGameFromGroup', function () {
        it('It should remove game "Project +" to group "1"', function (done) {
            serviceCreator.removeGameFromGroup("Project +", 1, (err, group) => {
                expect(group.group[0].id).to.be.equal(1)
                expect(group.group[0].name).to.be.equal("Pedro")
                expect(group.group[0].description).to.be.equal("Group1")
                expect(group.group[0].games.length).to.be.equal(1)
                done()
            })
        })
    })

    describe('gamesBetweenMinMax', function () {
        it('It should obtain games between min and max rating values', function (done) {
            serviceCreator.gamesBetweenMinMax(1, 50, 100, (err, games) => {
                expect(games[0].name).to.be.equal("Heartbound")
                expect(games.length).to.be.equal(1)
                done()
            })
        })
    })
})