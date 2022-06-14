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
export default class Test1FooBarParameterController extends ControllerBase {
    // the full path is: http://localhost:8080/url-parameters/:foo/:bar
    // while value of `foo` will be written to `request.params.foo`
    //
    // because:
    // - all directories with `@` prefix in a path,
    //   will be converted to URL parameters
    @GET()
    async index(request: IHttpRequest, response: IHttpResponse) {
        // example: http://localhost:8080/url-parameters/test1/Tanja/M
        //
        // `request.params.foo` would have the value `Tanja`
        // `request.params.bar` would have the value `M`
        response.write(`Hello, ${request.params!.foo} ${request.params!.bar}! (${this.__file})`);
    }

    // the full path is: http://localhost:8080/url-parameters/test1/:foo/:bar/buzz
    // while value of `foo` will be written to `request.params.foo`
    //
    // because:
    // - all directories with `@` prefix in a path,
    //   will be converted to URL parameters
    // - the method is called `buzz`, which is used as suffix here
    // - there is no explicit path defined in `@GET()`
    @GET()
    async buzz(request: IHttpRequest, response: IHttpResponse) {
        // example: http://localhost:8080/url-parameters/test1/Tanja/M/buzz
        //
        // `request.params.foo` would have the value `Tanja`
        // `request.params.bar` would have the value `M`
        response.write(`Hello, ${request.params!.foo} ${request.params!.bar} (buzz)! (${this.__file})`);
    }

    // the full path is: http://localhost:8080/url-parameters/test1/:foo/:bar/lorem
    // while value of `foo` will be written to `request.params.foo`
    //
    // because:
    // - all directories with `@` prefix in a path,
    //   will be converted to URL parameters
    // - there is anexplicit path defined in `@GET()`
    // - anything else will be ignored
    @GET('/lorem')
    async ipsum(request: IHttpRequest, response: IHttpResponse) {
        // example: http://localhost:8080/url-parameters/test1/Tanja/M/lorem
        //
        // `request.params.foo` would have the value `Tanja`
        // `request.params.bar` would have the value `M`
        response.write(`Hello, ${request.params!.foo} ${request.params!.bar} (lorem)! (${this.__file})`);
    }
}
