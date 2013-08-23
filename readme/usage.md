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
