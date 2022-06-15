# @egomobile/http-server samples :: Controllers

## About

Demonstrates how to setup [controllers](https://github.com/egomobile/node-http-server/wiki/Controllers) with things like [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html).

Run

```bash
npm install
npm start
```

from this directory (maybe in a terminal) to initialize and start the application, and keep sure that port `8080` is currently not in use.

## Topics

| Topic | Description | Notes |
|-------|-------------|-------|
| [Setup](./src/index.ts) | Initialize and setup controllers. | |
| [Basics](./src/controllers) | The `.ts` files in this folder demonstrate the basics, especially how the path mapping works. | |
| [URL parameters](./src/controllers/url-parameters) | Shows [url parameters](https://egomobile.github.io/node-http-server/interfaces/IHttpRequest.html#params) in action. | |
| [Middlewares](./src/controllers/middlewares) | Endpoints demonstrating the usage of [build-in middlesware](https://github.com/egomobile/node-http-server/tree/master/src/middlewares). | |
| [Error handling](./src/controllers/errors) | Different ways and types of error handling. | |
| [Swagger / Open API](./src/controllers/pet-store) | This is an adaption of the official [Pet Store example](https://petstore3.swagger.io/). | |
| [Dependency injection](./src/controllers/imports) | How to work with [@Import() decorator](https://egomobile.github.io/node-http-server/modules.html#Import). | |
| [Import request data as parameters](./src/controllers/parameter-decorator) | How to work with [@Parameter() decorator](https://egomobile.github.io/node-http-server/modules.html#Parameter) and their shorthands. | |
| [Serialization](./src/controllers/serializer) | How to work with [@Serializer() decorator](https://egomobile.github.io/node-http-server/modules.html#Serializer), which can automatically take each result data of a request handler method, prepare it and send it back to the client in a standarized way. | |
| [API utility](./src/controllers/utils) | Different endpoints, which show, how to use the [api-utils extension](https://github.com/egomobile/node-api-utils). | |

## Documentation

The API documentation can be found
[here](https://egomobile.github.io/node-http-server/).

## Credits

- [randomuser.me](https://randomuser.me/)
- [Swagger Petstore v3](https://petstore3.swagger.io/)

## License

MIT © [e.GO Mobile](https://e-go-mobile.com/), Aachen, Germany
