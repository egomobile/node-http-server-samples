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
    POST,
} from "@egomobile/http-server";
import { sendGenericSwaggerResponse } from "../_share";

@Controller()
export default class SwaggerUserCreateWithListController extends ControllerBase {
    @POST({
        path: '/',
        documentation: {
            "tags": [
                "user"
            ],
            "summary": "Creates list of users with given input array",
            "description": "Creates list of users with given input array",
            "operationId": "createUsersWithListInput",
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/components/schemas/User"
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Successful operation",
                    "content": {
                        "application/xml": {
                            "schema": {
                                "$ref": "#/components/schemas/User"
                            }
                        },
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/User"
                            }
                        }
                    }
                },
                "default": {
                    "description": "successful operation"
                }
            }
        }
    })
    async createUsersWithListInput(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }
}
