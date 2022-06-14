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
    Body,
    Controller,
    ControllerBase,
    GET,
    Headers,
    IHttpRequest,
    IHttpResponse,
    json,
    PATCH,
    POST,
    Query,
    Request,
    Response,
    Url,
    yaml,
} from "@egomobile/http-server";

@Controller()
export default class ParameterDecoratorShorthandsController extends ControllerBase {
    // the full path is: http://localhost:8080/parameter-decorator/shorthands/headers
    //
    // because:
    // - relative path is `/parameter-decorator/shorthands.ts`
    //   and `shorthands` will be used as first suffix
    // - method name is `headers`
    // - we defined no explicit path with `@GET()`
    @GET()
    async headers(
        request: IHttpRequest, response: IHttpResponse,

        // all headers
        @Headers()
        headers: Record<string, string | string[]>,
        // only a white list of
        @Headers('x-ego-1', 'x-ego-2', 'x-ego-2')
        someHeaders: Record<'x-ego-1' | 'x-ego-2' | 'x-ego-3', string | string[]>,
    ) {
        response.write(`headers: ${JSON.stringify(headers, null, 2)} (${typeof headers})\n`);
        response.write(`someHeaders: ${JSON.stringify(someHeaders, null, 2)} (${typeof someHeaders})`);
    }

    // the full path is: http://localhost:8080/parameter-decorator/shorthands/url
    //
    // because:
    // - relative path is `/parameter-decorator/shorthands.ts`
    //   and `shorthands` will be used as first suffix
    // - we defined an explicit path with `@GET()`
    @GET('/url/:foo/:bar')
    async url(
        request: IHttpRequest, response: IHttpResponse,

        // all url parameters
        @Url()
        params: Record<string, string>,
        // only a white list of
        @Url('foo')
        someParams: Record<'foo', string>,
    ) {
        response.write(`params: ${JSON.stringify(params, null, 2)} (${typeof params})\n`);
        response.write(`someParams: ${JSON.stringify(someParams, null, 2)} (${typeof someParams})`);
    }

    // the full path is: http://localhost:8080/parameter-decorator/shorthands/query
    //
    // because:
    // - relative path is `/parameter-decorator/shorthands.ts`
    //   and `shorthands` will be used as first suffix
    // - method name is `query`
    // - we defined no explicit path with `@GET()`
    @GET()
    async query(
        request: IHttpRequest, response: IHttpResponse,

        // all query parameters
        @Query()
        queryParams: Record<string, string>,
        // only a white list of
        @Query('foo')
        someQueryParams: Record<'foo', string>,
    ) {
        // example: http://localhost:8080/parameter-decorator/shorthands/query?foo=1&bar=2
        //
        // `queryParams` will contain { "foo": "1", "bar": "2" }
        // `someParams` will contain { "foo": "1" }

        response.write(`queryParams: ${JSON.stringify(queryParams, null, 2)} (${typeof queryParams})\n`);
        response.write(`someParams: ${JSON.stringify(someQueryParams, null, 2)} (${typeof someQueryParams})`);
    }

    // the full path is: http://localhost:8080/parameter-decorator/shorthands/body/json
    //
    // because:
    // - relative path is `/parameter-decorator/shorthands.ts`
    //   and `shorthands` will be used as first suffix
    // - we defined an explicit path with `@POST()`, which is used as 2nd suffix
    // - anything else is ignored
    @POST({
        path: '/body/json',
        use: [json()]
    })
    async jsonBody(
        request: IHttpRequest, response: IHttpResponse,

        // extract value `request.body`
        @Body() body: any,
    ) {
        response.write(`JSON body: ${JSON.stringify(body, null, 2)} (${typeof body})`);
    }

    // the full path is: http://localhost:8080/parameter-decorator/shorthands/body/yaml
    //
    // because:
    // - relative path is `/parameter-decorator/shorthands.ts`
    //   and `shorthands` will be used as first suffix
    // - we defined an explicit path with `@PATCH()`, which is used as 2nd suffix
    // - anything else is ignored
    @PATCH({
        path: '/body/yaml',
        use: [yaml()]
    })
    async yamlBody(
        request: IHttpRequest, response: IHttpResponse,

        // extract parsed object(s) in `request.body`
        // and convert to a JSON string
        // before write to `body` parameter of this method
        @Body(({ source }) => JSON.stringify(source, null, 2))
        body: string
    ) {
        // YAML data will always converted into an array
        // of objects, even if there is only one
        response.write(`YAML body: ${body} (${typeof body})`);
    }

    // the full path is: http://localhost:8080/parameter-decorator/shorthands/request-response?foo=1&bar=2
    //
    // because:
    // - relative path is `/parameter-decorator/shorthands.ts`
    //   and `shorthands` will be used as first suffix
    // - we defined an explicit path with `@GET()`, which is used as 2nd suffix
    // - anything else is ignored
    @GET('/request-response')
    async reorderRequestAndResponse(
        // these are explicit imports
        //
        // in this case, we simply change the order
        @Response() response: IHttpResponse,
        @Request() request: IHttpRequest
    ) {
        response.write(`request.url: ${request.url}`);
    }
}
