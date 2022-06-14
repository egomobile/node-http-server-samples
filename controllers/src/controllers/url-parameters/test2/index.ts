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

@Controller()
export default class Test2ParameterController extends ControllerBase {
    // the full path is: http://localhost:8080/url-parameters/test2/:foo
    // while value of `foo` will be written to `request.params.foo`
    //
    // because:
    // - the relative path is `/url-parameters/test2/index.ts`
    // - we defined an explicit path in `@GET()`
    // - anything else is ignored
    @GET('/:foo')
    async index(request: IHttpRequest, response: IHttpResponse) {
        // example: http://localhost:8080/url-parameters/test2/Marcel%20K
        //
        // `request.params.foo` would have the value `Marcel K`
        response.write(`Hello, ${request.params!.foo}! (${this.__file})`);
    }
}
