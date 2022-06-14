import {
    Controller,
    ControllerBase,
    GET,
    IHttpRequest,
    IHttpResponse,
} from "@egomobile/http-server";

// all controller classes have to be exported as 'default'
// and be marked with `@Controller()` decorator
@Controller()
export default class IndexController extends ControllerBase {
    // the full path is: http://localhost:8080/buzz
    //
    // because:
    // 1.) the relative path of this file is `/buzz.ts`
    //     so `buzz` is added as suffix
    // 2.) the name of this method is `index`
    //     so we do not have an additional suffix here
    // 3.) we do not have an explicit path defined
    //     with `@GET()`
    @GET()
    async index(request: IHttpRequest, response: IHttpResponse) {
        response.write("Hello! (buzz)");
    }

    // the full path is: http://localhost:8080/buzz/foo
    //
    // because:
    // 1.) the relative path of this file is `/buzz.ts`
    //     so `buzz` is added as suffix
    // 2.) the name of this method is `foo`
    //     so we also add this as suffix
    // 3.) we do not have an explicit path defined
    //     with `@GET()`
    @GET()
    async foo(request: IHttpRequest, response: IHttpResponse) {
        response.write("Hello, foo! (buzz)");
    }

    // the full path is: http://localhost:8080/buzz/bar
    //
    // because:
    // 1.) the relative path of this file is `/buzz.ts`
    //     so `buzz` is added as suffix
    // 2.) we defined an explicit path with `@GET()`
    // 3.) anything else will be ignored
    @GET('/bar')
    async lorem(request: IHttpRequest, response: IHttpResponse) {
        response.write("Hello, bar! (buzz)");
    }
}
