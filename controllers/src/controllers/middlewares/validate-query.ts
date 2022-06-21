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
    schema,
    validateQuery,
    ValidationFailedHandler,
} from "@egomobile/http-server";

const querySchema = schema.object({
    foo: schema.string().strict().trim().required(),
    buzz: schema.string().strict().trim().pattern(new RegExp("^[\\d]+", "i")).optional(),
}).required();

const handleValidationError: ValidationFailedHandler = async (error, request, response) => {
    response.write(`VALIDATION ERROR: ${error.message}`);
};

@Controller()
export default class ValidateMiddlewareController extends ControllerBase {
    // the full path is: http://localhost:8080/middlewares/validate-query
    //
    // because:
    // - relative path is `/middlewares/validate-query.ts`
    //   and `validate-query` is used as first suffix
    // - method is called `index`, so no additional suffix is used
    // - we defined no explicit path with `@GET()`
    @GET([
        validateQuery(querySchema, handleValidationError)
    ])
    async index(
        request: IHttpRequest, response: IHttpResponse,
    ) {
        // examples:
        // - http://localhost:8080/middlewares/validate-query?foo=bar&buzz=42
        // - http://localhost:8080/middlewares/validate-query?foo=bar

        const queryEntries = [...request.query!];

        response.write(`queryEntries: ${JSON.stringify(queryEntries, null, 2)} - ${this.__file}`);
    }
}
