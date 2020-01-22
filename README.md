# GoogleDriveTest
GoogleDriveTest is a mobile application that reads specific .xml files on your Google Drive and is powered by Expo and React Native. The app was built over the course of a week in Summer 2018 for me to learn and practice calling APIs.

## Video
[![Watch the video](https://lh3.googleusercontent.com/86nCunxqWx-0WpzsmS-IC0pZ5tawy9SwYDLGvSYMagPubIR8wurgrVmemjH-dyJI1dKihydQw5CxouzxdJRnjKHCzh-_d1lwLJsSdG7NiYv_mD2IhtSwJWko9juAhtLwRJAZo5SUI5aehn6we4t5ETbXo5JH6v1zVZ3POKtORMxmuY8LZj4skzw6PWalzjtE4jdOXH0dvw-ck4vIqQvey8_wsRWDvpWmSV5CeIsIPIgeuk1M4dui38EhSGty3nSWaDYl7qA4sRKT__hhUnprhcszuTeWLbcdbUUxdwJ26MIGRz31sGHbEI3rMHkFOtphPxDVxnCPtAJ8muWanEjup0Q7chHVi3tUlJ77cLjRT4UkipIeI1S52oN0u6oSNLYIyFXZBPbhfVYDvr4yWYaul2KkJSiNGCvp0ZJNgFeTf6LaltqL5qEkPAbOveKbPQXpOCZuI0OUjF5qIUUedEm19SlWYPAliQoz1AAwU22_B_jyjIz7mMPCJGee_etgsf2Qcb9z2vBqK29ItrXPDzQJAzyQwYDryKHjgEgwhgURw73C2WjGpLYIpSsblIgyaoZ4weMXBL52WWynOc_uoAJglz1t6TCqz2bwi6J4-khqB1QeyBG8Ui_u-omZyN6fwQnWl1d1aiRkTkQg2Bhls5DzTvNF5TOw1OBOmuSxAeTuLeiY93_THvvSERP0j5cU5aU=w3000-h1780-ft)](https://youtu.be/rheqIyUQZ-U)

## Project Description
GoogleDriveTest authenticates users by calling Google's OAuth API and then uses the user's credientials to call the Google Drive API to retrieve a list of all the user's folders and .xml files in Google Drive. If an .xml file is selected, the app then parses the .xml files and displays the contents of the .xml file's 'name' and 'city' tags in the file.

## Tech
- [Expo](https://docs.expo.io/versions/v36.0.0/) (Google, Securestore, Filesystem)
- React Native
- Google OAuth2 API
- Google Drive API (v3) 

## Try it out 
[Click here to run the project in your browser](https://snack.expo.io/@s178984/google-drive-test)
