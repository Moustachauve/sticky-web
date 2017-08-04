'use strict'

const jsonfile = require('jsonfile')
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const EventEmitter = require('events').EventEmitter
const os = require('os')

module.exports = function () {
  var dataFile = new EventEmitter()

  dataFile.load = function (callback, fileName) {
    if (!fileName) {
      fileName = dataFile.getFileName()
    }
    let filePath = path.join(dataFile.getFileFolder(), fileName)

    dataFile.ensureFolderExists(function (err) {
      if (err) { return callback(err) }

      fs.access(filePath, function (err) {
        if (err && err.code === 'ENOENT') {
          return callback(null, dataFile.getDefaultObject())
        }

        jsonfile.readFile(filePath, function (err, data) {
          return callback(err, data)
        })
      })
    })
  }

  dataFile.getDefaultObject = function () {
    return {
      version: dataFile.getFileVersion()
    }
  }

  dataFile.save = function (data, callback, fileName) {
    if (!fileName) {
      fileName = dataFile.getFileName()
    }
    let filePath = path.join(dataFile.getFileFolder(), fileName)

    dataFile.ensureFolderExists(function (err) {
      if (err) { return callback(err) }
      jsonfile.writeFile(filePath, data, {spaces: 2}, function (err) {
        if (err) { return callback(err) }
        return callback()
      })
    })
  }

  dataFile.delete = function (callback, fileName) {
    if (!fileName) {
      fileName = dataFile.getFileName()
    }

    let filePath = path.join(dataFile.getFileFolder(), fileName)
    dataFile.ensureFolderExists(function (err) {
      if (err) { return callback(err) }
      fs.unlink(filePath, function (err) {
        callback(err)
      })
    })
  }

  dataFile.getFileVersion = function () {
    return 1
  }

  dataFile.getFileFolder = function () {
    return path.join(os.homedir(), 'sticky-web')
  }

  dataFile.getFileName = function () {
    return 'file.json'
  }

  dataFile.ensureFolderExists = function (callback) {
    mkdirp(dataFile.getFileFolder(), function (err) {
      return callback(err)
    })
  }

  return dataFile
}
