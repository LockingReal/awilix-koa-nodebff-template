const Koa = require('koa');
import * as render from 'koa-swig';
import * as serve from 'koa-static';
import { createContainer,Lifetime } from 'awilix';
let  {scopePerRequest,loadControllers} = require('awilix-koa');
const { historyApiFallback } = require('koa2-connect-history-api-fallback');
import { join } from 'path';
import co from 'co';

const app = new Koa();

app.context.render = co.wrap(
    render({
        root:join(__dirname,'views'),
        autoescape:true,
        writeBody:false,
        ext:'html',
    })
);

app.use(serve(__dirname + '/assets'));

const container = createContainer();
container.loadModules([__dirname+'/services/*.ts'],{
    formatName:'camelCase',
    resolverOptions:{
        lifetime:Lifetime.SCOPED
    }
});

app.use(scopePerRequest(container));
app.use(historyApiFallback({ index:'/',whiteList:['/api']}));
app.use(loadControllers(__dirname+'/routers/*.ts'));
const config = {
    port:3000
}

app.listen(config.port,()=>{
    console.log('server Bff');
})