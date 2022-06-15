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
    DELETE,
    GET,
    IHttpRequest,
    IHttpResponse,
    PUT,
} from "@egomobile/http-server";
import { sendGenericSwaggerResponse } from "../../_share";

@Controller()
export default class SwaggerUserUsernameController extends ControllerBase {
    @GET({
        path: '/',
        documentation: {
            "tags": [
                "user"
            ],
            "summary": "Get user by user name",
            "description": "",
            "operationId": "getUserByName",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "description": "The name that needs to be fetched. Use user1 for testing. ",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "successful operation",
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
                "400": {
                    "description": "Invalid username supplied"
                },
                "404": {
                    "description": "User not found"
                }
            }
        }
    })
    async getUserByName(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }

    @PUT({
        path: '/',
        documentation: {
            "tags": [
                "user"
            ],
            "summary": "Update user",
            "description": "This can only be done by the logged in user.",
            "operationId": "updateUser",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "description": "name that need to be deleted",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "requestBody": {
                "description": "Update an existent user in the store",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    },
                    "application/xml": {
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    },
                    "application/x-www-form-urlencoded": {
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "responses": {
                "default": {
                    "description": "successful operation"
                }
            }
        }
    })
    async updateUser(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }

    @DELETE({
        path: '/',
        documentation: {
            "tags": [
                "user"
            ],
            "summary": "Delete user",
            "description": "This can only be done by the logged in user.",
            "operationId": "deleteUser",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "description": "The name that needs to be deleted",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "400": {
                    "description": "Invalid username supplied"
                },
                "404": {
                    "description": "User not found"
                }
            }
        }
    })
    async deleteUser(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }
}
