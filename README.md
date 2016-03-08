# refire-forum

Serverless discussion forum built with React, Redux and Firebase using [refire](https://github.com/hoppula/refire) and [refire-app](https://github.com/hoppula/refire-app).

I challenged myself to build as good forum as possible in 37.5 hours (normal work week hours, but split over multiple weekends and nights in this case), version 1.0 is the result.

Base UI components are from excellent [Elemental UI](http://elemental-ui.com/).

## Live demo

[https://refire.firebaseapp.com](https://refire.firebaseapp.com)

## Features

* Categories, boards and threads
* Paging for boards and threads
* Quoting when replying to posts
* Thread and Post previews
* Markdown support :thumbsup:
* Emoji support :fire:
* User profile pages
* Login with Google account
* Admin tools (delete threads & single posts, lock/unlock threads)

## Deploying your own instance

1. Create your new app in [Firebase dashboard](https://www.firebase.com/account/)

2. Change `firebase` value to your app name in `firebase.json`

3. Run `npm install` and `npm run build`

4. Run `npm run login` to login to Firebase

5. Run `npm run bootstrap` to copy initial data structure to Firebase

6. Run `npm run deploy` to deploy the app and security rules to Firebase

7. Enable Google Authentication in your Firebase instance's `Login & Auth` settings

## Adding admin users

Create `adminUsers` path in your Firebase and set your admin user's `uid` as key and `true` as value:

```
"adminUsers": {
  "google:123456789": true
}
```

## Customizing settings

You can edit default paging settings by changing `settings/BOARD_PAGE_SIZE`, `settings/THREAD_PAGE_SIZE` and `settings/THREAD_PAGE_LIMIT`.

You can configure date format by changing `settings/DATE_FORMAT`.

## License

MIT
