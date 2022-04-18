# Pickle Shop

Working sample of testcafe + cucumberjs (updated for 2022 to use POM).

# Installation/Usage

Requires nodejs/npm.

Clone the repository:

```
git clone https://github.com/ahungry/pickle-shop.git
```

Change into the directory and run the tests with GNU Make:

```
make test
```

Alternatively, if you do not have "make" installed, you can do it by
hand with npm:

```
npm install
npm run test
```

# General notes/findings

## Assertion Issue

A failed assertion with the testcafe controller's `expect`
will crash future tests with a repeated failure message.

Best to just use a different assertion library (chai) to avoid
the problem entirely.

## World.js

Even though the file isn't used, cucumberjs won't run properly
unless it finds a world.js in one of the included directories in it's
run command (maybe there is a good workaround for it).

# License

GPLv3
