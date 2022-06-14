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
    Controller,
    ControllerBase,
    GET,
    IHttpRequest,
    IHttpResponse,
} from "@egomobile/http-server";

// all controller classes have to be exported as 'default'
// and be marked with `@Controller()` decorator
@Controller()
export default class IndexController extends ControllerBase {
    // the full path is: http://localhost:8080
    //
    // because:
    // 1.) the relative path of this file is `/index.ts`
    //     so we do not have a suffix here
    // 2.) the name of this method is `index`
    //     so we also do not have a suffix here
    // 3.) we do not have an explicit path defined
    //     with `@GET()`
    @GET()
    async index(request: IHttpRequest, response: IHttpResponse) {
        response.write(`Hello! ${this.__file}`);
    }

    // the full path is: http://localhost:8080/FOO
    //
    // because:
    // 1.) the relative path of this file is `/index.ts`
    //     so we do not have a suffix here
    // 2.) the name of this method is `FOO`
    //     so we add this as suffix
    // 3.) we do not have an explicit path defined
    //     with `@GET()`
    @GET()
    async FOO(request: IHttpRequest, response: IHttpResponse) {
        response.write(`Hello, FOO! ${this.__file}`);
    }

    // the full path is: http://localhost:8080/BAR
    //
    // because:
    // 1.) the relative path of this file is `/index.ts`
    //     so we do not have a suffix here
    // 2.) we defined an explicit path with `@GET()`
    // 3.) anything else will be ignored
    @GET('/BAR')
    async lorem(request: IHttpRequest, response: IHttpResponse) {
        response.write(`Hello, BAR! ${this.__file}`);
    }
}
