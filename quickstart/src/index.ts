// MIT License
// 
// Copyright (c) 2022 Next.e.GO Mobile SE, Aachen, Germany (https://e-go-mobile.com/)
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import cors from 'cors';  // npm i cors && npm i -D @types/cors
import createServer, { json, params, query, yaml } from '@egomobile/http-server';

async function main() {
    const app = createServer();

    // global middlewares
    //
    // cors() => 3rd party middleware
    app.use(cors());

    // simple GET request
    //
    // example: http://localhost:8080/hello
    app.get('/hello', async (request, response) => {
        response.write('Hello!');
    });

    // GET request with URL parameters
    //
    // example: http://localhost:8080/hello/Tanja
    app.get(params('/hello/:name'), async (request, response) => {
        response.write(`Hello, ${request.params!.name}!`);
    });

    // GET request with query parameters
    // this requires the `query()` middleware
    //
    // example: http://localhost:8080/query?foo=bar&buzz=42
    app.get('/query', [query()], async (request, response) => {
        response.write(`You submitted the following parameters with the URL:\n\n`);

        // request.query is an URLSearchParams object
        request.query!.forEach((value, name) => {
            response.write(`${name} = ${value}\n`);
        });
    });

    // POST requests, which demonstrate how to work
    // with JSON and YAML input data
    //
    // JSON: http://localhost:8080/json
    // YAML: http://localhost:8080/yaml
    app.post('/json', [json()], async (request, response) => {
        response.write(`You submitted the following JSON data:\n\n${JSON.stringify(request.body, null, 2)}`);
    });
    app.post('/yaml', [yaml()], async (request, response) => {
        // the parsed object in request.body will
        // always be an array of objects

        response.write(`You submitted the following YAML data:\n\n${JSON.stringify(request.body, null, 2)}`);
    });

    await app.listen(8080);
    console.error(`Server now listens on port ${app.port} ...`);
}

main().catch(console.error.bind(null, '[UNHANDLED EXCEPTION]'));
