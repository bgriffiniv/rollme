FLOW:
- anon account (contact list under `/static/users`)
- side menu
- login/logout
- user data
- add users button (adds entry under `/users`)
- user account (personal contact list)



TODO:
- general layout on home
  - image bug in a card element
  - css issues
- user card
  - fetching data from firebase
  - CRUD methods
- rolodex (scrolling from bottom back to top)
- TDD; unit tests
















This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myBlank blank
```

Then, to run it, cd into `myBlank` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

