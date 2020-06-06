import { Request, Response } from 'express'
import knex from '../db/connection'

const api_address = 'http://localhost:3001/'

class ItemController {
  // Always use await when getting info from DB
  // IF we're using await, then we need to declar async for the route
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*')
  
    // Serialize is a process of getting info out of the database and applying
    // a transformation when delivering to the user or application, to be presented in a better way
    const serialized_items = items.map(item => {
      return {
        title: item.title,
        id: item.id,
        image_url: api_address + `uploads/${item.image}`
      }
    })

    return response.json(serialized_items)
  }
}

export default ItemController