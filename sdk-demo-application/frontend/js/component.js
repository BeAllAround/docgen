import JSONDOMViewer from "./json-dom-viewer.js"
import createTable from "./DataTable.js"

const SDK_NAME = 'TrelloSDK'

// TODO: Figure the best way to export this globally
window.createForm = createForm

function createForm(config, data_item) {
  let form = document.createElement('form')

  const { fields = {}, op = 'Create' } = config
  const handler = config.handler || (() => {})


  if(data_item.id != null) {
    form.dataset.id = data_item.id
  }
  // form.classList.add('ford-grid')

  form.style.display = 'grid'
  // TODO: Should come from config
  form.style.gridTemplateColumns = '1fr '.repeat(2).trim()
  form.style.gap = '1em'

  for(let key in data_item) {
    /*
    if(key == 'id') {
      continue
    }
    */

    let div = document.createElement('div')
    let value = data_item[key]

    // TODO: Dynamically build the style
    div.classList.add('form-group')

    let label = document.createElement('label')
    let input = document.createElement('input')

    // TODO: password, email, tel, etc.
    input.type = 'text'

    // NOTE: NEEDED for FormData
    input.name = key
    input.id = key

    let field_options = fields[key]
    if(field_options) {
      if(field_options.disabled) {
        input.disabled = true
        input.style.backgroundColor = '#ccc'
      }
    }

    label.textContent = key
    input.defaultValue = value != null && value || ''

    div.appendChild(label)
    div.appendChild(input)

    form.appendChild(div)

  }

  let div_button = $create({
    elem: 'div',
    classes: [ 'form-group' ],
    style: {
      display: 'grid',
      gridColumn: '1 / -1',
      gap: '1em',
      // TODO: Depending on the number of operations - usually save and delete
      gridTemplateColumns: '1fr 1fr'
    },
    children: [
      $create({
        elem: 'button',
        textContent: op,
        // onclick: () => console.log('op: ', op),
        props: {
          type: 'submit',
          dataset: {
            'op': op.toLowerCase()
          }
        }
      }),
      $create({
        elem: 'button',
        textContent: 'Delete',
        // NOTE: ONLY For DELETE
        style: {
          backgroundColor: '#dd1010'
        },
        props: {
          type: 'submit',
          dataset: {
            'op': 'Delete'.toLowerCase()
          }
        }
      })
    ]
  })

  form.appendChild(div_button)

  attachSubmitHandler(form, handler)

  return form
}

function attachSubmitHandler(form, userHandler) {

  const formToJSON = (form) => {
    const data = new FormData(form)
    // console.log(form, data)
    let result = {}
    let data_keys = data.keys()
    for(let key of data_keys) {
      result[key] = data.get(key)
    }
    return result
  }

  const handler = async (event) => {
    event.preventDefault()
    const result = formToJSON(event.target)

    result.id = form.dataset.id != null ? form.dataset.id : ''

    await userHandler(event.submitter.dataset.op || '', result)
  }

  form.addEventListener('submit', handler)
}


function injectDataEditor(data, handler) {
  let dataEditorDivContainer = document.querySelector('#dataEditor')
  let formContainer;

  // console.log('data: ', data)

  dataEditorDivContainer.innerHTML = ''

  let form = createForm({
    fields: {
      'id': { disabled: true },
      'lastModified': { disabled: true }
    },
    op: 'Save', // TODO: ops: ['Save', 'Delete']
    handler: handler || ((op, json_data) => console.log('result: ', op, json_data))
  }, data)


  let div = $create({
    elem: 'div',
    children: [
      $create({
        elem: 'h1',
        textContent: 'Editor'
      }),
      $create({
        elem: 'div',
        id: 'formEditor',
        children: () => form
      }),
      $create({
        elem: 'h3',
        textContent: 'Json Viewer'
      }),
      $create({
        elem: 'div',
        classes: ['terminal'],
        children: () => JSONDOMViewer(data)
      })
    ]
  })
  dataEditorDivContainer.appendChild(div)

}

function injectForm(form) {
  let formContainer = document.querySelector('#formEditor')

  // See https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
  formContainer.innerHTML = ''

  formContainer.appendChild(form)
}


async function loadComponents(current_entity) {

  let entityTableContainer = document.querySelector('#entityTable')
  let dataEditor = document.querySelector('#dataEditor')

  entityTableContainer.innerHTML = ''
  dataEditor.innerHTML = ''

  // Default DataEditor Container for now
  dataEditor.appendChild($create({
    elem: 'div',
    children: [
      $create({
        elem: 'h1',
        textContent: 'Editor'
      })
    ]
  }))


  /*
  <!-- For example, this is the static HTML presentation of $create for the following element: -->
  <div>
    <h1>Entity Table</h1>
    <button id="openSidebarEntities" class="openbtn" onclick="openNav()">&#187; Show Entities</button>
  </div>
  */
  let entityTable = $create({
    elem: 'div',
    children: [
      $create({
        elem: 'h1',
        textContent: 'Entity Table'
      }),
      $create({
        elem: 'div',
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40em'
        },
        children: [
          $create({
            elem: 'button',
            id: 'openSidebarEntities',
            classes: ['openbtn'],
            innerHTML: window.SDK_NAME.ui.navtab.opened 
            ? "&#171; Hide Entities" : "&#187; Show Entities",
            onclick: function() {
              let navopened = window.SDK_NAME.ui.navtab.opened
              if(!navopened) {
                SideNav.style.width = "25vh"
                this.innerHTML = "&#171; Hide Entities"
                window.SDK_NAME.ui.navtab.opened = true
              } else {
                SideNav.style.width = '0'
                this.innerHTML = "&#187; Show Entities"
                window.SDK_NAME.ui.navtab.opened = false
              }
            }
          }),
          $create({
            elem: 'button',
            classes: ['openbtn'],
            textContent: 'Add Entity',
            onclick: function() {
              let new_entity = window.SDK_NAME.ui.current_entity.formFields.reduce((acc, item) => {
                acc[item] = ''
                return acc
              }, {})

              console.log('new entity: ', new_entity)

              // TODO: Exclude delete button/op, Only create button
              injectDataEditor(new_entity, async (op, item) => {

                if(op == 'save') {
                  let post_item = await fetch(`/api/${SDK_NAME}/${window.SDK_NAME.ui.current_entity.name}/create`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      ...item
                    })
                  })
                  let json_out = await post_item.json()
                  console.log('post: ', json_out)


                }

              })

            }
          })
        ]
      })
    ]

  })

  entityTableContainer.appendChild(entityTable)
  
  const query_entries = Object.entries(current_entity.op.list.query)
  const query = query_entries.reduce((acc, entry, i) => {
    acc += entry[0] + '=' + entry[1].default
    if(i < query_entries.length-1) acc += '&'
    
    return acc
  }, '')

  let out = await fetch(`/api/${SDK_NAME}/${current_entity.name}/list?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let json_out = await out.json()

  // TODO: Explicit transformed header from the model
  let header = json_out[0] != null && Object.keys(json_out[0].data).map(key=>({title: key, key}))

  // [ { title: ..., key: ..., }, ... ]

  console.log(header)

  // See if we need to do this
  // loadForm(json_out[0] || {})

  let table = createTable(header,
    json_out.map(item => item.data),
    async function (event, item) {

      // console.log('selected row: ', this)

      console.log('item.id: ', item.id)

      let out = await fetch(`/api/${SDK_NAME}/${window.SDK_NAME.ui.current_entity.name}/load/${item.id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET',
      })

      let load_entity = await out.json()

      console.log('load_entity: ', load_entity)

      injectDataEditor(load_entity, async (op, item) => { 
        console.log('ddd: ', op, item) // { ...item }

        if(op == 'save') {
          let put_item = await fetch(`/api/${SDK_NAME}/${window.SDK_NAME.ui.current_entity.name}/save/${item.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...item
            })
          })
          let json_out = await put_item.json()
          console.log('put: ', json_out)


        } else if(op == 'delete') {
          let remove_item = await fetch(`/api/${SDK_NAME}/${window.SDK_NAME.ui.current_entity.name}/remove/${item.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...item
            })
          })
          let json_out = await remove_item.json()
          console.log('remove: ', json_out)
        }

      })


      // console.log('item::::', item)

    }
  )

  entityTable.appendChild(table)

  let terminal = $create({
    elem: 'div',
    classes: ['terminal'],
    children: [
      JSONDOMViewer(json_out)
    ]
  })

  entityTable.appendChild(
    $create({
      elem: 'h3',
      textContent: 'Json Viewer'
    })
  )
  entityTable.appendChild(terminal)

}

/*
function loadForm(data_item) {

*/

/*
  let data_item = {
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": 1234567890,
    "address": "123 Elm Street",
    "city": "Springfield",
    "country": "USA",
    lastModified: Date.now()
  }
  */

/*
  let config = {
    fields: {
      'lastModified': { disabled: true }
    },
    op: 'Save', // TODO: ops: ['Save', 'Delete']
    handler: (op, data) => console.log('data: ', op, data),
  }

  let form = createForm(config, data_item)

  injectForm(form)
}
*/

;(async function load_root() {

  let entities = [
    {
      name: 'board',
      title: 'Board', // just capitalized
      
      // TODO: Transform from model
      op: {
        list: {
          query: {
            idMember: { 
              type: String,
              // HARDCODED - make a query button/form
              default: 'me'
            }
          }
        }
      },
      
      // TODO: Transform from model
      formFields: [
        'id',
        'firstName',
        'lastName',
        'phoneNumber',
        'address',
        'city',
        'country',
        'lastModified'
      ]
    },
    {
      name: 'list',
      title: 'List',
      
      // TODO: Transform from model
      op: {
        list: {
          query: {
            idBoard: { 
              type: String,
              // HARDCODED - make a query button/form
              default: '6735f4225f8fbbd10bba2da0'
            }
          }
        }
      },
      
      formFields: [
        'id',
        'firstName',
        'lastName',
        'phoneNumber',
        'lastModified'
      ]
    }
  ]

  console.log(window.SDK_NAME)
  window.SDK_NAME.ui.current_entity = entities[0] // DEFAULT

  await loadComponents(window.SDK_NAME.ui.current_entity)

  let sideNav = $create({
    elem: 'div',
    id: 'SideNav',
    classes: ['sidenav'],
    children: [
      $create({
        elem: 'div',
        classes: ['sidenav-header'],
        children: [
          $create({
            elem: 'h2',
            textContent: 'Entities'
          }),
          /*
          // TODO: access parent by "this.prior" feature
          $create({
            elem: 'span',
            innerHTML: '&#171;',
            classes: ['closebtn'],
            onclick: function(event) {
              let SideNav = event.target.parentNode.parentNode
              SideNav.style.width = '0'
              document.querySelector('#openSidebarEntities').style.display = "block"
            }

          })
          */
        ]

      }),
      function* () {
        for(let entity of entities) {
          let switch_entity = $create({
            elem: 'a',
            textContent: entity.title
          })

          switch_entity.addEventListener('click', async function () {
            console.log('entity: ', entity)

            window.SDK_NAME.ui.current_entity = entity

            console.log(window.SDK_NAME)

            await loadComponents(window.SDK_NAME.ui.current_entity)
          })

          yield switch_entity
        }
      }

    ]

  })

  let split_side_bar = document.querySelector('#sidebar.split')

  console.log(sideNav, split_side_bar)

  split_side_bar.appendChild(sideNav)

})();

function $create(config) {
  const {
    classes = [], 
    style = {},
    children = [],
    props = {}
  } = config

  let elem = document.createElement(config.elem || 'div')

  config.id != null && (elem.id = config.id)
  config.textContent != null
    && (elem.textContent = config.textContent)

  Object.assign(elem.style, style)

  for(let prop in props) {
    if(prop == 'dataset') {
      let dataset = props[prop]
      for(let set_key in dataset) {
        elem.dataset[set_key] = dataset[set_key]
      }
    } else {
      elem[prop] = props[prop]
    }
  }

  for(let i = 0; i < classes.length; i++) {
    let cssClass = config.classes[i]
    elem.classList.add(cssClass)
  }

  if(typeof config.onclick == 'function') {
    elem.addEventListener('click', config.onclick)
  }

  // NOTE: innerHTML take priority over children
  // TODO: Unless it is actually a String ( &233; )
  if(config.innerHTML != null) {
    elem.innerHTML = config.innerHTML
    return elem
  }



  if(typeof children == 'function') {
    elem.appendChild(children())
    return elem
  }

  for(let i = 0; i < children.length; i++) {
    let child = children[i]
    if(typeof child == 'function') {
      let node = child()
      // if node is "iterateable"
      if(node[Symbol.iterator] != null) {
        for(let item of node) {
          elem.appendChild(item)
        }
      } else {
        elem.appendChild(node)
      }
    } else {
      elem.appendChild(child)
    }
  }

  return elem

}