'use strict'

const { createServer } = require('http')
const { get } = require('request')
const { load } = require('cheerio')

const { readFile } = require('fs')


const server = createServer()

let storedHTML = null;

server.on('request', (req, res) => {

    let path = req.url
    path = path.slice(-1) === '/'
    ? path.slice(1).concat('index.html')
    : path.slice(1)

    console.log("path", path)

    let getThisURL = 'https://www.github.com/' + path

    get(getThisURL, (err, _, body) => {
      const $ = load(body)
      res.end($.html())

  })
})



server.listen(8080)
