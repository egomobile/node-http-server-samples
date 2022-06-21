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

import {
    apiKey,
    Controller,
    ControllerBase,
    GET,
    IHttpRequest,
    IHttpResponse,
} from "@egomobile/http-server";

@Controller()
export default class ApiKeyMiddlewareController extends ControllerBase {
    // the full path is: http://localhost:8080/middlewares/api-key
    //
    // because:
    // - relative path is `/middlewares/api-key.ts`
    //   and `api-key` is used as first suffix
    // - method is called `index`, so no additional suffix is used
    // - we defined no explicit path with `@GET()`
    @GET([
        apiKey('myAPIKey')
    ])
    async index(
        request: IHttpRequest, response: IHttpResponse,
    ) {
        // example: http://localhost:8080/middlewares/api-key
        //          and submit the following HTTP headers:
        //          - x-api-key: myAPIKey

        response.write(`Access granated ${this.__file}`);
    }
}
