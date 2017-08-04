'use strict'

const DataFile = require('./dataFile')
const { ipcMain } = require('electron')
const uuidv4 = require('uuid/v4')
const fs = require('fs')

let testFile = new DataFile()
module.exports = testFile

testFile.createTest = function (testData, callback) {
  testData.uuid = uuidv4()
  testData.lastRun = ''
  testData.created = new Date()
  testData.updated = new Date()
  testData.status = ''
  testFile.save(testData, function (err) {
    if (callback) {
      callback(err, testData)
    }
  }, testData.uuid + '.json')
}

testFile.loadAllTests = function (callback) {
  var folder = testFile.getFileFolder()
  fs.readdir(folder, function (err, files) {
    if (err) return callback(err)

    var tests = []
    readAddFileRecursive(files, tests, function (err, tests) {
      callback(err, tests)
    })
  })
}

function readAddFileRecursive (files, tests, callback) {
  if (files.length === 0) {
    return callback(null, tests)
  }
  var currentFile = files.shift()
  testFile.load(function (err, test) {
    if (err) return callback(err, tests)

    tests.push(test)
    readAddFileRecursive(files, tests, callback)
  }, currentFile)
}

function deleteTest (test, callback) {
  testFile.delete(function (err) {
    callback(err)
  }, test.uuid + '.json')
}

ipcMain.on('createNewTest', (event, testData) => {
  console.log('Creating new test...')
  testFile.createTest(testData, function (err, testData) {
    if (err) throw err
    event.sender.send('createNewTestDone', testData)
  })
})

ipcMain.on('loadAllTests', (event, testData) => {
  console.log('Loading all tests...')
  testFile.loadAllTests(function (err, tests) {
    if (err) throw err
    event.sender.send('loadAllTestsResult', tests)
  })
})

ipcMain.on('deleteTest', (event, test) => {
  console.log('Deleting test "' + test.uuid + '"...')
  deleteTest(test, function (err) {
    if (err) throw err
  })
})
