import { Request, Response} from 'express'
import knex from '../db/connection'

class CollectionNodeController {
  async create(request: Request, response: Response) {
    const {
      nome, 
      email, 
      whatsapp,
      latitude,
      longitude,
      city,
      uf, 
      items
    } = request.body
  
    // trx = Transaction. Works like a try~Catch for the database
    // if any of the trx.inserts find a error, no records will be inserted into the database
    const trx = await knex.transaction()
    
    const collection_node = {
      image: 'https://images.unsplash.com/photo-1557333610-90ee4a951ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      nome, 
      email, 
      whatsapp,
      latitude,
      longitude, 
      city,
      uf
    }

    const inserted_ids = await trx('collection_node').insert(collection_node)
  
    const collection_node_id = inserted_ids[0]
  
    const collection_node_items = items.map((item_id: number) => {
      return {
        collection_node_id,
        item_id
      }
    })
  
    await trx('collection_node_items').insert(collection_node_items)

    await trx.commit()
  
    return response.json({
      id: collection_node_id,
      ...collection_node
    })
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const collection_node = await knex('collection_node').where('id', id).first()

    if (!collection_node) {
      return response.status(400).json({ message: 'Collection node not found.'})
    }

    const items = await knex('items')
      .join('collection_node_items', 'items.id', '=', 'collection_node_items.item_id')
      .where('collection_node_items.collection_node_id', id)
      .select('items.title')

    return response.json({ collection_node, items })
  }

  // Quick note: Below may cause trouble IF we don't pass one of thoses request.query params
  async index(request: Request, response: Response) {
    // cidade, uf, items filters {QUERY PARAMS}
    const { city, uf, items } = request.query

    const parsed_items = String(items).split(',').map(item => Number(item.trim()))

    const collection_nodes = await knex('collection_node')
    .select('*')
    .join('collection_node_items', 'collection_node.id', '=', 'collection_node_items.collection_node_id')
    .whereIn('collection_node_items.item_id', parsed_items)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()
    .select('collection_node.*')

    return response.json(collection_nodes)
  }
}

export default CollectionNodeController