"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const jostraca_1 = require("jostraca");
// import { resolvePath } from '../utility'
const Server = (0, jostraca_1.cmp)(function Server(props) {
    const { ctx$ } = props;
    const { model } = ctx$;
    const { entity } = model.main.sdk;
    // console.log('Index', model.test)
    console.log('Server: guide:', ctx$.meta.spec.config.guideModel.guide.manual);
    // TODO: Will have to look for alternative solutions as this is developer-defined.
    const { entities } = ctx$.meta.spec.config.guideModel.guide.manual.sampleapp.backend;
    // TODO: selected features should be active by default!
    const featureOptions = (0, jostraca_1.each)(model.main.sdk.feature)
        .filter((f) => f.active)
        .reduce((a, f) => a + `\n    ${f.name}: { active: true },`, '');
    console.log('entities: ', entities, model.Name, model.name);
    // console.log('Server entity op: ', entity.board.op)
    const SDK_NAME = model.Name + 'SDK';
    (0, jostraca_1.Folder)({ name: 'backend' }, () => {
        (0, jostraca_1.Copy)({ from: `${__dirname}/../../src/sample_app/backend/package.json`, exclude: true });
        (0, jostraca_1.File)({ name: 'server.js' }, () => {
            (0, jostraca_1.Content)(`
const express = require('express')

const { TrelloSDK } = require('trello-sdk')


const app = express()

const port = 8000

app.use(express.json())


const client = ${model.Name}SDK.make({
  endpoint: process.env.${model.NAME}_ENDPOINT,
  apikey: process.env.${model.NAME}_APIKEY,
  token: process.env.${model.NAME}_TOKEN, // NOTE: Hardcoded only for Trello
  ${featureOptions}
})
`);
            for (let entity_name in entities) {
                let entity = entities[entity_name];
                for (let op_key in entity.op) {
                    let op = entity.op[op_key];
                    console.log('op: ', entity_name, op_key, op);
                    if (op_key == 'list') {
                        (0, jostraca_1.Content)(`
app.get('/api/${SDK_NAME}/${entity_name.toLowerCase()}/${op_key}', async (req, res) => {
`);
                        if (op.query) {
                            for (let query_key in op.query) {
                                (0, jostraca_1.Content)(`
  if(!req.query['${query_key}']) {
    res.status(400)
    return res.send(JSON.stringify('${query_key + ': Required'}'))
  }
                  
                `);
                            }
                        }
                        (0, jostraca_1.Content)(`
  try {
    let list = await client.${(0, jostraca_1.camelify)(entity_name)}().list(req.query)
    list = list.map(item => item.data)
    res.status(200)
    return res.send(JSON.stringify(list))
  } catch(err) {
    console.log(err)
    res.status(400)
    res.send(JSON.stringify("error occured"))
  }

})
`);
                    }
                    else if (op_key == 'load') {
                        (0, jostraca_1.Content)(`
app.get('/api/${SDK_NAME}/${entity_name.toLowerCase()}/${op_key}/:uid', async (req, res) => {
`);
                        if (op.query) {
                            for (let query_key in op.query) {
                                (0, jostraca_1.Content)(`
  if(!req.query['${query_key}']) {
    res.status(400)
    return res.send(JSON.stringify('${query_key + ': Required'}'))
  }
                  
                `);
                            }
                        }
                        (0, jostraca_1.Content)(`
  try {
    const id = req.params.uid
    let item = await client.${(0, jostraca_1.camelify)(entity_name)}().load({ id, })
    // console.log('load item: ', item)
    res.status(200)
    return res.send(JSON.stringify(item.data ? item.data : item))
  } catch(err) {
    console.log(err)
    res.status(400)
    res.send(JSON.stringify("error occured"))
  }
})`);
                    }
                    else if (op_key == 'save') {
                        (0, jostraca_1.Content)(`
app.put('/api/${SDK_NAME}/${entity_name.toLowerCase()}/${op_key}/:uid', async (req, res) => {
  try {
    const id = req.params.uid
    const body = req.body
    
    
    
    // delete body.prefs
    // delete body.labelNames
    
    console.log('SAVE', id, body)
    
    let item = await client.${(0, jostraca_1.camelify)(entity_name)}().save({ id, ...body })
    
    
    res.status(200)
    return res.send(JSON.stringify(item.data ? item.data : item))
  } catch(err) {
    console.log(err)
    res.status(400)
    res.send(JSON.stringify("error occured"))
  }
  
  
})
`);
                    }
                    else if (op_key == 'create') {
                        (0, jostraca_1.Content)(`
app.post('/api/${SDK_NAME}/${entity_name.toLowerCase()}/${op_key}', async (req, res) => {
  try {
    const body = req.body
    
    
    
    // delete body.prefs
    // delete body.labelNames
    
    console.log('CREATE', body)
    
    let item = await client.${(0, jostraca_1.camelify)(entity_name)}().create({ ...body })
    
    
    res.status(200)
    return res.send(JSON.stringify(item.data ? item.data : item))
  } catch(err) {
    console.log(err)
    res.status(400)
    res.send(JSON.stringify("error occured"))
  }
  
  
})
`);
                    }
                    else if (op_key == 'remove') {
                        (0, jostraca_1.Content)(`
app.delete('/api/${SDK_NAME}/${entity_name.toLowerCase()}/${op_key}/:uid', async (req, res) => {
  try {
    const id = req.params.uid
    
    console.log('REMOVE', id)
    
    let item = await client.${(0, jostraca_1.camelify)(entity_name)}().remove({ id })
    
    
    res.status(200)
    return res.send(JSON.stringify(item))
  } catch(err) {
    console.log(err)
    res.status(400)
    res.send(JSON.stringify("error occured"))
  }
  
  
})
`);
                    }
                }
            }
            (0, jostraca_1.Content)(`
app.listen(port, () => {
  console.log('Sample Backend App listening on port 127.0.0.1:' + port)
})`);
        });
    });
});
exports.Server = Server;
//# sourceMappingURL=Server.js.map