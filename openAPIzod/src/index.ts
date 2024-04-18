import {createRoute, OpenAPIHono} from '@hono/zod-openapi';
import { ParamsSchema } from './inputs';
import { UserSchema } from './outputs';
import {Hono} from 'hono';
import {swaggerUI} from '@hono/swagger-UI'

const app = new OpenAPIHono();


const getUserRoute = createRoute({
  method:'get',
  path:"/user/:id",
  request:{
    params:ParamsSchema
  },
  responses:{
    200:{
      content:{
        'application/json':{
          schema:UserSchema
        }
      },
      description:"Get the user details"
    }
  }
})

const postUserRoute = createRoute({
  method:'post',
  path:"/user/:id",
  request:{
    params:ParamsSchema
  },
  responses:{
    200:{
      content:{
        'application/json':{
          schema:UserSchema
        }
      },
      description:"Get the user details"
    }
  }
})

app.openapi(getUserRoute,(c)=>{
  const {id}  = c.req.valid("param");
  return c.json({
    id,
    age:20,
    name:'Ultra-man',
  })
})


app.openapi(postUserRoute, (c)=>{
  const {id}  = c.req.valid("param");
  
  return c.json({
    id,
    age:20,
    name:'Ultra-man'
  })
})

app.get('/ui',swaggerUI({url:'/doc'}));

app.doc('/doc',{
  openapi:'3.0.0',
  info:{
    version:'1.0.0',
    title:'MY API'
  }
})

export default app;