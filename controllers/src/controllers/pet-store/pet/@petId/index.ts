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
    POST,
} from "@egomobile/http-server";
import { sendGenericSwaggerResponse } from "../../_share";

@Controller()
export default class SwaggerPetIdController extends ControllerBase {
    @GET({
        path: '/',
        documentation: {
            "tags": [
                "pet"
            ],
            "summary": "Find pet by ID",
            "description": "Returns a single pet",
            "operationId": "getPetById",
            "parameters": [
                {
                    "name": "petId",
                    "in": "path",
                    "description": "ID of pet to return",
                    "required": true,
                    "schema": {
                        "type": "integer",
                        "format": "int64"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "successful operation",
                    "content": {
                        "application/xml": {
                            "schema": {
                                "$ref": "#/components/schemas/Pet"
                            }
                        },
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Pet"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Invalid ID supplied"
                },
                "404": {
                    "description": "Pet not found"
                }
            },
            "security": [
                {
                    "api_key": []
                },
                {
                    "petstore_auth": [
                        "write:pets",
                        "read:pets"
                    ]
                }
            ]
        }
    })
    async getPetById(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }

    @POST({
        path: '/',
        documentation: {
            "tags": [
                "pet"
            ],
            "summary": "Updates a pet in the store with form data",
            "description": "",
            "operationId": "updatePetWithForm",
            "parameters": [
                {
                    "name": "petId",
                    "in": "path",
                    "description": "ID of pet that needs to be updated",
                    "required": true,
                    "schema": {
                        "type": "integer",
                        "format": "int64"
                    }
                },
                {
                    "name": "name",
                    "in": "query",
                    "description": "Name of pet that needs to be updated",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "status",
                    "in": "query",
                    "description": "Status of pet that needs to be updated",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "405": {
                    "description": "Invalid input"
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
    async updatePetWithForm(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }

    @DELETE({
        path: '/',
        documentation: {
            "tags": [
                "pet"
            ],
            "summary": "Deletes a pet",
            "description": "",
            "operationId": "deletePet",
            "parameters": [
                {
                    "name": "api_key",
                    "in": "header",
                    "description": "",
                    "required": false,
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "petId",
                    "in": "path",
                    "description": "Pet id to delete",
                    "required": true,
                    "schema": {
                        "type": "integer",
                        "format": "int64"
                    }
                }
            ],
            "responses": {
                "400": {
                    "description": "Invalid pet value"
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
    async deletePet(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }
}
