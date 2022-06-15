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
} from "@egomobile/http-server";
import { apiResponse, parseListQuery } from '@egomobile/api-utils';
import { exampleUsers } from './_data';

@Controller()
export default class SerializerController extends ControllerBase {
    // the full path is: http://localhost:8080/utils/lists
    //
    // because:
    // - the relative path is `/utils/lists.ts`
    //   so `list` is added as first suffix
    // - method is called `index`, so no additional suffix is added
    // - we defined no explicit path with `@GET()`
    @GET([parseListQuery({
        validFieldNames: ['lastName', 'firstName', 'email']
    })])
    async index(
        request: IHttpRequest, response: IHttpResponse,
    ) {
        // examples:
        // 1.) http://localhost:8080/utils/lists?limit=5&offset=7&sort=lastName%3BfirstName%2Cdesc%3Bemail%2Casc
        // 2.) http://localhost:8080/utils/lists?limit=5&offset=7&sort=lastName%2Cdesc%3BfirstName%3Bemail%2Casc
        //
        // the unescaped value of `sort` (1) is: sort=lastName;firstName,desc;email,asc
        // the unescaped value of `sort` (2) is: sort=lastName,desc;firstName;email,asc

        const listQuery = request.listQuery!;
        console.log('listQuery', this.__file, listQuery);

        const offset: number = listQuery.offset as number;
        const limit: number = listQuery.limit || 10;

        const allUsers = [...exampleUsers];

        const filteredUsers = _(allUsers)
            .orderBy(
                Object.entries(listQuery.sort).map((entry) => entry[0] as any),
                Object.entries(listQuery.sort).map((entry) => entry[1] as any),
            )
            .drop(offset)
            .take(limit)
            .value();

        apiResponse(request, response)
            .withList({
                items: filteredUsers,
                limit,
                offset,
                totalCount: allUsers.length,
            })
            .send();
    }
}
