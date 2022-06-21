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
    GET,
    IHttpRequest,
    IHttpResponse,
    JsonSchemaValidationFailedHandler,
    POST,
    schema,
    ValidationFailedHandler
} from "@egomobile/http-server";

const postSchema = schema.object({
    email: schema.string().strict().trim().email().min(1).required(),
    notes: schema.string().strict().allow('', null).optional(),
}).required();

// this custom error handler is optional
const onValidationWithDocumentationFailed: JsonSchemaValidationFailedHandler =
    async (errors, request, response) => {
        response.write('[SWAGGER VALIDATION ERRORS]: ' + errors.map((error) => error.message).join(', '));

        response.end();
    };

const onValidationFailed: ValidationFailedHandler =
    async (error, request, response) => {
        response.write('[JOI VALIDATION ERROR]: ' + error.message);

        response.end();
    };

@Controller()
export default class ValidationsController extends ControllerBase {
    // the full path is: http://localhost:8080/validations/swagger
    //
    // because:
    // - the relative path is `/validations/index.ts`
    //   so no first suffix is added
    // - method is called `swagger`, so this is added as suffix
    // - we defined no explicit path with `@GET()`
    @GET({
        "documentation": {
            "tags": ["_validations"],
            "parameters": [
                {
                    "in": "query",
                    "name": "foo",
                    "schema": {
                        "type": "string",
                        "enum": ["bar", "42"]
                    },
                    "required": true
                }
            ],
            "responses": {},
        },
        "onValidationWithDocumentationFailed": onValidationWithDocumentationFailed,
        "validateWithDocumentation": true
    })
    async swagger(
        request: IHttpRequest, response: IHttpResponse,
    ) {
        // valid example (1): http://localhost:8080/validations/swagger?foo=bar
        // valid example (2): http://localhost:8080/validations/swagger?foo=42

        // in-valid example (1): http://localhost:8080/validations/swagger
        // in-valid example (2): http://localhost:8080/validations/swagger?bar=foo
        // in-valid example (3): http://localhost:8080/validations/swagger?foo=buzz

        response.write(`OK.swagger: ${request.query!.get('foo')}`);
    }

    @POST({
        "schema": postSchema,
        onValidationFailed
    })
    async joi(
        request: IHttpRequest, response: IHttpResponse,
    ) {
        response.write(`OK.joi: ${JSON.stringify(request.body!, null, 2)} (${typeof request.body})`);
    }
}
