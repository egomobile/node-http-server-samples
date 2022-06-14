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
    Parameter,
} from "@egomobile/http-server";

@Controller()
export default class ParameterDecoratorController extends ControllerBase {
    // the full path is: http://localhost:8080/parameter-decorator/test1/:foo/test2/:bar
    //
    // because:
    // - we defined an explicit with `@GET()`
    // - anything else is ignored
    @GET('/test1/:foo/test2/:bar')
    async fooBarUrlParameters(
        request: IHttpRequest, response: IHttpResponse,

        // extract `foo` and `bar` from `request.params`
        // and convert `bar` to a float number
        @Parameter() foo: string,
        @Parameter({ transformTo: 'float' }) bar: number
    ) {
        // example: http://localhost:8080/parameter-decorator/test1/Bill/test2/19551028
        //
        // `foo` would have the value `Bill`
        // `bar` would have the value `19551028`
        response.write(`foo: ${foo} (${typeof foo})\n`);
        response.write(`bar: ${bar} (${typeof bar})\n`);
    }

    // the full path is: http://localhost:8080/parameter-decorator/test2
    //
    // because:
    // - we defined an explicit with `@GET()`
    // - anything else is ignored
    @GET('/test2')
    async fooBarQueryParameters(
        request: IHttpRequest, response: IHttpResponse,

        // extract `foo` and `bar` from `request.query`
        // and convert `bar` to a float number
        @Parameter('query') foo: string | null | undefined,
        @Parameter({ source: 'query', transformTo: 'float' }) bar: number | null | undefined
    ) {
        // example: http://localhost:8080/parameter-decorator/test2?foo=William%20Henry%20Gates%20III.&bar=19551028
        //
        // `foo` would have the value `William Henry Gates III.`
        // `bar` would have the value `19551028`
        response.write(`foo: ${foo} (${typeof foo})\n`);
        response.write(`bar: ${bar} (${typeof bar})\n`);
    }

    // the full path is: http://localhost:8080/parameter-decorator/test3/headers
    //
    // because:
    // - we defined an explicit with `@GET()`
    // - anything else is ignored
    @GET('/test3/headers')
    async headers(
        request: IHttpRequest, response: IHttpResponse,

        // extract `x-ego-1` and `x-ego-2` from `request.headers`
        // and convert `x-ego-2` to a float number
        @Parameter('header', 'x-ego-1') xEgo1: string | null | undefined,
        @Parameter('header', 'x-ego-2', 'float') xEgo2: number | null | undefined
    ) {
        // example: http://localhost:8080/parameter-decorator/test4
        //          and submit the following HTTP headers:
        //          - x-ego-1
        //          - x-ego-2

        response.write(`xEgo1: ${xEgo1} (${typeof xEgo1})\n`);
        response.write(`xEgo2: ${xEgo2} (${typeof xEgo2})`);
    }
}
