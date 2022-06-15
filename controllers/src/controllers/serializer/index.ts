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
    Serializer,
} from "@egomobile/http-server";

@Controller()
export default class SerializerController extends ControllerBase {
    // the full path is: http://localhost:8080/serializer
    //
    // because:
    // - method is called `index`, so no suffix is used
    // - we defined no explicit path with `@GET()`
    @GET()
    async index(
        request: IHttpRequest, response: IHttpResponse,
    ) {
        // s. `serializeResponse()`
        return {
            foo: request.query?.get('foo'),
            bar: request.query?.get('bar'),
        };
    }

    // the full path is: http://localhost:8080/serializer/array
    //
    // because:
    // - method is called `foo`, so this is added as suffix
    // - we defined no explicit path with `@GET()`
    @GET()
    async array(
        request: IHttpRequest, response: IHttpResponse,
    ) {
        // s. `serializeResponse()`
        return ["foo", "bar", "buzz"];
    }

    // for technical reasons the serializer must be defined at the end
    // of the controller, otherwise `index()` method will not serialize
    // that this serializer is setuped
    @Serializer()
    async serializeResponse(result: any, request: IHttpRequest, response: IHttpResponse) {
        // will receive the method results of
        // any request handler into 'result', defined in this controller
        // so this method is able to prepare and send this
        // data back to the client

        response.write(JSON.stringify(result));
    }
}
