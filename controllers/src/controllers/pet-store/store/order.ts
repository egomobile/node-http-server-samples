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
import { sendGenericSwaggerResponse } from "../_share";

@Controller()
export default class SwaggerStoreOrderController extends ControllerBase {
    @POST({
        path: '/',
        documentation: {
            "tags": [
                "store"
            ],
            "summary": "Place an order for a pet",
            "description": "Place a new order in the store",
            "operationId": "placeOrder",
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Order"
                        }
                    },
                    "application/xml": {
                        "schema": {
                            "$ref": "#/components/schemas/Order"
                        }
                    },
                    "application/x-www-form-urlencoded": {
                        "schema": {
                            "$ref": "#/components/schemas/Order"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "successful operation",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Order"
                            }
                        }
                    }
                },
                "405": {
                    "description": "Invalid input"
                }
            }
        }
    })
    async placeOrder(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }

    @GET({
        path: '/:orderId',
        documentation: {
            "tags": [
                "store"
            ],
            "summary": "Find purchase order by ID",
            "description": "For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.",
            "operationId": "getOrderById",
            "parameters": [
                {
                    "name": "orderId",
                    "in": "path",
                    "description": "ID of order that needs to be fetched",
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
                                "$ref": "#/components/schemas/Order"
                            }
                        },
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Order"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Invalid ID supplied"
                },
                "404": {
                    "description": "Order not found"
                }
            }
        }
    })
    async getOrderById(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }

    @DELETE({
        path: '/:orderId',
        documentation: {
            "tags": [
                "store"
            ],
            "summary": "Delete purchase order by ID",
            "description": "For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors",
            "operationId": "deleteOrder",
            "parameters": [
                {
                    "name": "orderId",
                    "in": "path",
                    "description": "ID of the order that needs to be deleted",
                    "required": true,
                    "schema": {
                        "type": "integer",
                        "format": "int64"
                    }
                }
            ],
            "responses": {
                "400": {
                    "description": "Invalid ID supplied"
                },
                "404": {
                    "description": "Order not found"
                }
            }
        }
    })
    async deleteOrder(request: IHttpRequest, response: IHttpResponse) {
        await sendGenericSwaggerResponse({ controller: this, request, response });
    }
}
