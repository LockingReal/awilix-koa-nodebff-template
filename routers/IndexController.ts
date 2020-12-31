let {GET,route} = require('awilix-koa');
import * as Router from 'koa-router';
import { Context } from '../interface/IKoa';

@route('/')
class IndexController {
    @route('/')
    @route('/index.html')
    @GET()
    async actionList(ctx:Context,next:() => Promise<any>):Promise<any>{
        // ctx.body = {
        //     data: '京城一灯'
        // }
        ctx.body = await ctx.render('index');
    }
}

export default IndexController;