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
    IHttpRequest,
    IHttpResponse,
    ParseErrorHandler,
    PATCH,
    yaml,
} from "@egomobile/http-server";

const handleParseError: ParseErrorHandler = async (error, request, response) => {
    response.write(`PARSE ERROR: ${error.innerError?.message || error}`);
};

@Controller()
export default class YamlMiddlewareController extends ControllerBase {
    // the full path is: http://localhost:8080/middlewares/yaml
    //
    // because:
    // - relative path is `/middlewares/yaml.ts`
    //   and `yaml` is used as first suffix
    // - method is called `index`, so no additional suffix is used
    // - we defined no explicit path with `@PATCH()`
    @PATCH([
        yaml({onParsingFailed: handleParseError})
    ])
    async index(
        request: IHttpRequest, response: IHttpResponse,
    ) {
        const body = request.body as any;

        response.write(`body: ${JSON.stringify(body, null, 2)} (${typeof body}) - ${this.__file}`);
    }
}
