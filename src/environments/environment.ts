// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// `npm run ng s -c=stag` replaces `environment.ts` with `environment.stag.ts`.
// `npm run ng s -c=prod` replaces `environment.ts` with `environment.prod.ts`.

export const environment = {
  production: false,
  url_api: 'https://zapacommerce-dev.azurewebsites.net/api',
  firebase: {
    apiKey: "AIzaSyA_kFFPmpckJREKP25AEKx3bybbdXjsHBU",
    authDomain: "zapacommerce.firebaseapp.com",
    databaseURL: "https://zapacommerce-default-rtdb.firebaseio.com/",
    projectId: "zapacommerce",
    storageBucket: "zapacommerce.appspot.com",
    messagingSenderId: "880717923673",
    appId: "1:880717923673:web:b97a2e25e6af1de857f848",
    measurementId: "G-PTGYEX605Q"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
