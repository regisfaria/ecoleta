import express from 'express'

import CollectionNodeController from './controllers/collectionNodePointController'
import ItemsController from './controllers/itemsController'

const routes = express.Router()
const collection_node_controller = new CollectionNodeController()
const items_controller = new ItemsController()

routes.get("/", (request, response) => {
  response.json({ ERROR: "Not implemented" })
})

routes.get("/items", items_controller.index)
routes.get("/collection_nodes_filtred", collection_node_controller.filtred_nodes)
routes.get("/collection_node/:id", collection_node_controller.show)
routes.get("/collection_nodes", collection_node_controller.index)

routes.post("/collection_node", collection_node_controller.create)

export default routes
