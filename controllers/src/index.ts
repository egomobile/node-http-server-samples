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

import { handleApiError, handleApiNotFound } from '@egomobile/api-utils';
import cors from 'cors';  // npm i cors && npm i -D @types/cors
import createServer from '@egomobile/http-server';
import path from 'path';

function getBaz(): string {
    return 'Kloubert';
}

async function main() {
    const app = createServer();

    // we can define custom error handlers
    // (maybe from @egomobile/api-utils), which
    // gives us more information
    app.setErrorHandler(handleApiError());
    app.setNotFoundHandler(handleApiNotFound());

    // global middlewares
    //
    // cors() => 3rd party middleware
    app.use(cors());

    // load and initialize all
    // script files, containing controller classes
    // inside /controllers sub directory
    app.controllers({
        rootDir: path.join(__dirname, 'controllers'),
        patterns: '*.+(ts)',  // in this scenarios we only want .ts files
        // s. https://github.com/isaacs/minimatch for more information

        // s. controllers/imports/index.ts
        imports: {
            foo: 'Marcel',
            'bar-BuZZ': 42,
            // functions must be wrapped into a getter
            baz: () => getBaz,
        },

        // the following handlers can be used for some debugging
        onControllerInitialized: ({ controllerClass, relativePath }) => {
            const controllerClassName = controllerClass.name;

            console.log('[🧰] Controller:', relativePath, controllerClassName );
            console.log(`  - controller: ${controllerClassName}`);

            console.log();
        },
        onControllerMethodInitialized: ({ controllerClass, methods, name, relativePath }) => {
            const path = methods[0]?.path;

            console.log(
                '[⛏] Controller method:', relativePath,
            );

            console.log(`  - path: ${typeof path === 'function' ? `(${path})` : path}`);
            console.log(`  - HTTP methods: ${methods.map((m) => m.method.toUpperCase()).join(', ')}`);
            console.log(`  - controller method: ${controllerClass.name}.${name}`);

            console.log();
        },
        onSwaggerInitialized: ({}) => {
            console.log('[📚] Swagger documentation initialized');
        }
    });

    await app.listen(8080);
    console.error(`Server now listens on port ${app.port} ...`);
}

main().catch(console.error.bind(null, '[UNHANDLED EXCEPTION]'));
