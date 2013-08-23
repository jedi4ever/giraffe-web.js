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
