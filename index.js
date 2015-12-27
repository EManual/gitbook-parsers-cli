#!/usr/bin/env node

var gitbookParsers = require("gitbook-parsers")
var program = require('commander')
var pkg = require('./package.json')
var fs = require('fs')

program.version(pkg.version)

program
    .command('summary [file]')
    .description('Create the summary json')
    .option("-f, --format", "Which exec mode to use")
    .action(function(file, options) {
        var content = fs.readFileSync(file, {
            encoding: 'utf-8'
        })
        var parser = gitbookParsers.getForFile(file)

        parser.summary(content)
            .then(function(summary) {
                if (options.format) {
                    console.log(JSON.stringify(summary, null, 4))
                } else {
                    console.log(JSON.stringify(summary, null, 0))
                }

            })
    })

program.parse(process.argv)