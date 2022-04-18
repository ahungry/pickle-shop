# Pickle Shop

Working sample of testcafe + cucumberjs (updated for 2022 to use POM).

# Installation/Usage

Requires nodejs/npm.

Clone the repository:

```
git clone https://github.com/ahungry/pickle-shop.git
```

Change into the directory:

```
cd pickle-shop
```

and run the tests with GNU Make:

```
make test
```

Alternatively, if you do not have "make" installed, you can do it by
hand with npm:

```
npm install
npm run test
```

# Code layout walkthrough

## Page Object Models (POMs)

You can find the POMs (Page Object Models) in:

```
❯ tree src/models
src/models
└── ExampleHome.js
```

This is where you can map out a page's structure.  Take a look at ExampleHome.js.

## Step Definitions

You can find the step definitions in:

```
❯ tree src/step_definitions
src/step_definitions
├── example.js
└── hooks.js
```

Ignore the hooks.js - that's just for internal glue in this approach -
take a look at example.js.

## Feature Files

You can find the feature files (Gherkin/Cucumber syntax) in:

```
❯ tree features
features
└── example.feature
```

This is where you can see the defined acceptance criteria.

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
