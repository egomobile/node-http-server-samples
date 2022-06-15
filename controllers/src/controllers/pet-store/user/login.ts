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
import { sendGenericSwaggerResponse } from "../_share";

@Controller()
export default class SwaggerUserLoginController extends ControllerBase {
    @GET({
        path: '/',
        documentation: {
            "tags": [
                "user"
            ],
            "summary": "Logs user into the system",
            "description": "",
            "operationId": "loginUser",
            "parameters": [
                {
                    "name": "username",
                    "in": "query",
                    "description": "The user name for login",
                    "required": false,
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "password",
                    "in": "query",
                    "description": "The password for login in clear text",
                    "required": false,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "successful operation",
                    "headers": {
                        "X-Rate-Limit": {
                            "description": "calls per hour allowed by the user",
                            "schema": {
                                "type": "integer",
                                "format": "int32"
                            }
                        },
                        "X-Expires-After": {
                            "description": "date in UTC when token expires",
                            "schema": {
                                "type": "string",
                                "format": "date-time"
                            }
                        }
                    },
                    "content": {
                        "application/xml": {
                            "schema": {
                                "type": "string"
                            }
                        },
                        "application/json": {
                            "schema": {
                                "type": "string"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Invalid username/password supplied"
                }
            }
        }
    })
    async loginUser(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }
}
