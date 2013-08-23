# giraffe-web 

> Giraffe dashboard for Graphite wrapped in a webserver

## Jump to Section

* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
* [Configuration](#configuration)
* [Building and Testing](#building-and-testing)
* [License](#license)

## Introduction
[[Back To Top]](#jump-to-section)

[Giraffe](https://github.com/kenhub/giraffe) is an awesome dashboard for [Graphite](http://graphite.wikidot.com/)

Big Kudos to [@kenhub](https://github.com/kenhub)

This project :
- merely extends it into **a webserver**
- allows you to **specify your own config file** without changing the Giraffe content
- allows you to **proxy requests** to an internal Graphite server
- provides a self executable version requiring nothing but bash to run it

This project is maintained at:

<http://github.com/jedi4ever/giraffe-web.js>


## Installation
[[Back To Top]](#jump-to-section)

a) Installing giraffe-web is easy. You can install it like any other npm module

`npm install - giraffe-web`

b) For your convenience we provide a `bashpack` allowing you to run it without having node installed.

Download it for your platform:

- [graphite-web-darwin-x64.run](https://github.com/jedi4ever/giraffe-web.js/raw/master/dist/giraffe-web-darwin-x64.run)
- [graphite-web-linux-x64.run](https://github.com/jedi4ever/giraffe-web.js/raw/master/dist/giraffe-web-linux-x64.run)

Note: [Bashpacks](http://github.com/jedi4ever/bashpack) are nodejs applications wrapped in a simple shell-executable.


## Usage
[[Back To Top]](#jump-to-section)

## CLI options
    $ ./bin/giraffe-web

      Usage: giraffe-web [options]

      Options:

        -h, --help                       output usage information
        -V, --version                    output the version number
        -p, --port <port>                port to listen on [9000]
        -c , --config-file [configFile]  Giraffe dashboard.js file containing the dashboards
        --graphite-url [url]             Graphite Host to connect to [http://localhost:8080]
        --proxy-graphite                 If enabled, this server will proxy graphite requests to the Graphite host specified [false]

## Running it

    ./bin/giraffe-web -c dashboard.js --proxy-graphite --graphite-url=http://your-graphite-url


## Configuration
[[Back To Top]](#jump-to-section)

You need to create your own Giraffe `dashboards.js` file.

Checkout the detailed description on configuring Giraffe

<https://github.com/kenhub/giraffe#configuration>


## Building and Testing
[[Back To Top]](#jump-to-section)

We rely on Grunt tasks to do our job

## Testing
    grunt test

We currently only lint testing

## Updating Giraffe code
We fetch the giraffe into `vendor`/giraffe
Updating can be done via

    grunt bower

## Building Documentation
We generate the Readme and the Jsdocs

    grunt docs

## Building Bashpacks
We generate two bashpacks (that go into dist)

    grunt bashpack:linux
    grunt bashpack:darwin

## Releasing
Updates the package version, commits to git, pushes to github , adds tag , and publishes to npm

    grunt gh-pages
    grunt release


## License
[[Back To Top]](#jump-to-section)

Copyright (c) 2010-2013 Patrick Debois

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


