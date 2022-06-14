# @egomobile/http-server samples :: Core API :: Quickstart

## About

[Shows](./src/index.ts) how to setup an HTTP server quickly.

Run

```bash
npm install
npm start
```

from this directory (maybe in a terminal) to initialize and start the application, and keep sure that port `8080` is currently not in use.

## Endpoints

| Path | Description | Notes |
|------|-------------|-------|
| [GET /hello](http://localhost:8080/hello) | Outputs a simple text. | |
| [GET /hello/:name](http://localhost:8080/hello/Tanja) | Outputs a simple text with the submitted `:name` parameter. | |
| [GET /query](http://localhost:8080/query?foo=bar&buzz=42) | Shows how to work with query parameters. | |
| `POST /json` (`http://localhost:8080/json`) | Demonstrates how to submit [JSON data](https://en.wikipedia.org/wiki/JSON) via a `POST`. | |
| `POST /yaml` (`http://localhost:8080/yaml`) | Demonstrates how to submit [YAML data](https://en.wikipedia.org/wiki/YAML) via a `POST`. | |

## License

MIT © [e.GO Mobile](https://e-go-mobile.com/), Aachen, Germany
