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
    PUT,
} from "@egomobile/http-server";
import { sendGenericSwaggerResponse } from "../_share";

@Controller()
export default class SwaggerPetController extends ControllerBase {
    @PUT({
        path: '/',
        documentation: {
            "tags": [
                "pet"
            ],
            "summary": "Update an existing pet",
            "description": "Update an existing pet by Id",
            "operationId": "updatePet",
            "requestBody": {
                "description": "Update an existent pet in the store",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Pet"
                        }
                    },
                    "application/xml": {
                        "schema": {
                            "$ref": "#/components/schemas/Pet"
                        }
                    },
                    "application/x-www-form-urlencoded": {
                        "schema": {
                            "$ref": "#/components/schemas/Pet"
                        }
                    }
                },
                "required": true
            },
            "responses": {
                "200": {
                    "description": "Successful operation",
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
                },
                "405": {
                    "description": "Validation exception"
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
    async updatePet(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }

    @POST({
        path: '/',
        documentation: {
            "tags": [
                "pet"
            ],
            "summary": "Add a new pet to the store",
            "description": "Add a new pet to the store",
            "operationId": "addPet",
            "requestBody": {
                "description": "Create a new pet in the store",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Pet"
                        }
                    },
                    "application/xml": {
                        "schema": {
                            "$ref": "#/components/schemas/Pet"
                        }
                    },
                    "application/x-www-form-urlencoded": {
                        "schema": {
                            "$ref": "#/components/schemas/Pet"
                        }
                    }
                },
                "required": true
            },
            "responses": {
                "200": {
                    "description": "Successful operation",
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
    async addPet(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }
}
