'use strict'

const { createServer } = require('http')
const { get } = require('request')
const { load } = require('cheerio')

const { readFile } = require('fs')

const server = createServer()

server.on('request', (req, res) => {

    let path = req.url
    path = path.slice(-1) === '/'
    ? path.slice(1).concat('index.html')
    : path.slice(1)

    console.log("path", path)

    let getThisURL = 'https://www.github.com/' + path

    let weeklyContrib = getThisURL + '?tab=overview&period=weekly'

    let monthlyContrib = getThisURL + '?tab=overview&period=monthly'

    get(monthlyContrib, (err, _, body) => {
      const $ = load(body)

      let x = Array.from($('.text-emphasized'))

      let commits = x[0].children[0].data

      console.log("commits:", commits)

      res.end($.html())

  })
})



server.listen(8080)
