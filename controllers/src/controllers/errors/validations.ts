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
    IHttpRequest,
    IHttpResponse,
    JoiValidationError,
    PUT,
    schema,
    ValidationErrorHandler,
} from "@egomobile/http-server";

const putSchema = schema.object({
    "email": schema.string().strict().trim().email().required()
});

@Controller()
export default class ExceptionsController extends ControllerBase {
    // the full path is: http://localhost:8080/errors/validations
    //
    // because:
    // - the relative path is `/errors/validations.ts`
    //   so `validations` is added as first suffix
    // - method is called `index`, so no additional suffix is added
    // - we defined no explicit path with `@GET()`
    @PUT(putSchema)
    async index(
        request: IHttpRequest, response: IHttpResponse,
    ) {
        response.write('You should not be able to read this text as response');
    }

    // for technical reasons the error handler must be defined at the end
    // of the controller, otherwise the other methods will not realize
    // that this method has been setuped
    @ValidationErrorHandler()
    async handleValidationError(
        error: JoiValidationError,
        request: IHttpRequest, response: IHttpResponse,
    ) {
        if (!response.headersSent) {
            response.writeHead(400, {
                'Content-Type': 'text/plain; charset=UTF-8'
            });
        }

        response.write(`ERROR: ${error.message} (${this.__file})`);
    }
}
