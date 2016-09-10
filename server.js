'use strict'

const { createServer } = require('http')
const { get } = require('request')
const { load } = require('cheerio')

const { readFile } = require('fs')

const fetch = require('node-fetch');

const server = createServer()

server.on('request', (req, res) => {

    let path = req.url
    path = path.slice(-1) === '/'
    ? path.slice(1).concat('index.html')
    : path.slice(1)

    let getThisURL = 'https://www.github.com/' + path
    let weeklyContrib = getThisURL + '?tab=overview&period=weekly'
    let monthlyContrib = getThisURL + '?tab=overview&period=monthly'

    let weekly = null;
    let monthly = null;

    fetch(monthlyContrib)
      .then(function(res) {
        return res.text();
    }).then(function(body) {
      let z = load(body)
      let y = Array.from(z('.text-emphasized'))
      monthly = y[0].children[0].data
      console.log("monthly:", monthly)
      fetchWeekly()
      })

    let fetchWeekly = function() {
       fetch(weeklyContrib)
        .then(function(res) {
          return res.text();
      }).then(function(body) {
        let z = load(body)
        let y = Array.from(z('.text-emphasized'))

        let firstName = Array.from(z('.vcard-fullname'))

        firstName = firstName[0].children[0].data
        firstName = firstName.split(' ')[0]

        weekly = y[0].children[0].data
        console.log("weekly", weekly)
        console.log("name:", firstName)
          res.end(`<h1>${firstName} has made ${weekly} commits in the last 7 days and ${monthly} commits in the last 30 days.</h1>`)
        })
      }

  })

server.listen(8080)
