# City Search App

A sample application written in Java and Typescript that let's you search for
cities by their name. It uses the [Geonames](https://www.geonames.org/)
services and visualizes the result via
[Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)
and as a table data.

### Contents

* [Live Demo](#live-demo)
* [Dev Requirements](#requirements)
* [Building & Running](#building--running)
* [Development](#development)
* [Submitting Changes](#submitting-a-change)

### Live Demo

Live demo is available at https://butchyyyy-city-search.herokuapp.com/

**Note:** The app uses free dyno hours and goes into sleep mode after 30 minutes of inactivity.
Web requests can take longer than expected till the server becomes active again.

### Requirements

If you want to develop or build the application you'll need following
software installed:
* [Java SE Development Kit 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* [NodeJS LTS Version](https://nodejs.org/en/download/)

For the application to work properly you also need:
* [API key to access the Google Map Javascript API](https://developers.google.com/maps/documentation/javascript/get-api-key)
* [Geonames Account](http://www.geonames.org/login)

### Building & Running 

The application uses the [Gradle Build Tool](https://gradle.org/). To create Spring Boot Jar
run:
```
java -jar backend\build\libs\citysearch-app-<version>.jar
```

You can provide the application secrets either via command line arguments:

```
java -jar backend\build\libs\citysearch-app-<version>.jar \
  -Dcitysearch.googlemap.apiKey=<Your Google Map API Key>
  -Dcitysearch.geonames.userName=<Your Geonames username>
```

or by setting following environment variables
(for Windows users prefix the commands with ```set ```):
```
MAP_API_KEY=<Your Google Map API Key>
GEONAMES_USERNAME=<Your Geonames username>
```

The application is available on http://localhost:8090 by default.
You can adjust the port by adding ```-Dserver.port=<Your desired port>``` to the command line
or by setting ```PORT``` environment variable.  

### Development

To develop the application you can start the frontend and backend part of the
project independently either from your favourite IDE or by gradle tasks:

##### Backend 

```
gradlew bootRun
```

The backend is available on http://localhost:8090 by default.\
Note that this will start just the backend services and static front end assets won't be available
since they're baked into the Spring Boot Jar in the assembly phase.

To change the port or pass secrets to the application use ```--args``` command line argument
with the bootRun task, e.g.:

```
gradlew bootRun --args="--server.port=8099 --citysearch.googlemap.apiKey=topsecret" 
```

To test the backend services without running front end you can use Swagger UI
available on http://localhost:8090/swagger-ui.html
You can of course use any other of your preference (Soap-UI, Postman etc.) 

##### Frontend

```
gradlew start
```

The frontend is available on http://localhost:8080. Api requests are proxied
to backend's default address http://localhost:8090.

Changing the frontend port when starting dev server by a gradle task is not supported
at the moment. If you have local yarn installation, you can however start the dev server
on custom port by running following in the frontend folder:

```
yarn start --port 8088
```

The backend address dev server proxies requests to can be only changed
by locally editing ```webpack.dev.js``` file.


### Submitting a change 

Before submitting a change, make sure your application lints and all tests are passing:

```
gradlew lint test
```

You should also check test coverage reports to see if all new code is properly
covered by tests by running:

```
gradlew testCoverage
```

You can find the coverage reports in ```frontend/coverage``` and ```backend/build/reports/jacoco/test/html```
``