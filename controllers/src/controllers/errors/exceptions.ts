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

import _ from 'lodash';
import {
    Controller,
    ControllerBase,
    ErrorHandler,
    GET,
    IHttpRequest,
    IHttpResponse,
} from "@egomobile/http-server";

@Controller()
export default class ExceptionsController extends ControllerBase {
    // the full path is: http://localhost:8080/errors/exceptions
    //
    // because:
    // - the relative path is `/errors/exceptions.ts`
    //   so `exceptions` is added as first suffix
    // - method is called `index`, so no additional suffix is added
    // - we defined no explicit path with `@GET()`
    @GET()
    async index(
        request: IHttpRequest, response: IHttpResponse,
    ) {
        throw new Error('You send following query parameters: ' + JSON.stringify(request.query!, null, 2));
    }

    // for technical reasons the error handler must be defined at the end
    // of the controller, otherwise the other methods will not realize
    // that this method has been setuped
    @ErrorHandler()
    async handleError(
        error: any,
        request: IHttpRequest, response: IHttpResponse,
    ) {
        response.write(`ERROR: ${error} (${this.__file})`);
    }
}
