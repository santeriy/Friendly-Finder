// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebase:{
    apiKey: "AIzaSyCbRB73YZ7ZCo_FCg8-SKeMNBAGkZ3wHfQ",
    authDomain: "friendly-finder-fd1b1.firebaseapp.com",
    databaseURL: "https://friendly-finder-fd1b1.firebaseio.com",
    projectId: "friendly-finder-fd1b1",
    storageBucket: "friendly-finder-fd1b1.appspot.com",
    messagingSenderId: "661051652006",
    appId: "1:661051652006:web:6b6331838ac68e72d10167"
  },

  mapbox:{
    accessToken: 'pk.eyJ1Ijoiampva2luIiwiYSI6ImNrOGQ5Y251cDBhMHIzZ21sYzJtMXpzbWMifQ.G0IsmZYFQ4Zh-coPvpMYlw'
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
