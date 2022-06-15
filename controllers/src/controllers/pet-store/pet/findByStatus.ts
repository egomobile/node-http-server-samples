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
export default class SwaggerPetFindByStatusController extends ControllerBase {
    @GET({
        path: '/',
        documentation: {
            "tags": [
                "pet"
            ],
            "summary": "Finds Pets by status",
            "description": "Multiple status values can be provided with comma separated strings",
            "operationId": "findPetsByStatus",
            "parameters": [
                {
                    "name": "status",
                    "in": "query",
                    "description": "Status values that need to be considered for filter",
                    "required": false,
                    "explode": true,
                    "schema": {
                        "type": "string",
                        "default": "available",
                        "enum": [
                            "available",
                            "pending",
                            "sold"
                        ]
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "successful operation",
                    "content": {
                        "application/xml": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/Pet"
                                }
                            }
                        },
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/Pet"
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Invalid status value"
                }
            },
            "security": [
                {
                    "petstore_auth": [
                        "write:pets",
                        "read:pets"
                    ]
                }
            ]
        }
    })
    async findPetsByStatus(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }
}
