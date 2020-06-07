import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
// To create SPA(single page application) redirects | useHistory is to redirect user without button
import { Link, useHistory } from 'react-router-dom'
// Icons
import { FiArrowLeft } from 'react-icons/fi'
// Map
import { Map, TileLayer, Marker } from 'react-leaflet'
// To get a mouse click event on the map
import { LeafletMouseEvent } from 'leaflet'
// To make API requisitions
import axios from 'axios'
// To make API requisitions to my server
import api from '../../services/api'

import './styles.css'

import logo from '../../assets/logo.svg'

// Always declare a interface to specify the format of a item
interface Item {
  id: number,
  title: string,
  image_url: string
}

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const CCN = () => {
  // Below are my States
  // States always recives 2 params: 1st variable_value, 2nd function to change 'variable_value' content
  // always declare the var type when declaring a array or object
  const [items, setItems] = useState<Item[]>([])
  const [uf, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  const [selectedCity, setSelectedCity] = useState('0')
  const [selectedUf, setSelectedUF] = useState('0')
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  
  // Below is to set the current location to the map innitial location for the user
  // but is unused because It dont worked well
  const [innitalPosition, setInnitialPosition] = useState<[number, number]>([0, 0])

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: ''
  })

  const history = useHistory()
  
  // Use effects = Make API requisitions to get information
  // Below function recieves as 1 param what to execute and as 2nd param when
  // IF we pass a empty array, it means 'once'
  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla)

      setUfs(ufInitials)
    })
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      
      setInnitialPosition([latitude, longitude])
    })
  }, [])

  // We must load the citys whenever the UF changes
  // So passing "selectedUf" tells react to only update it whenever we have a value to seletedUf
  useEffect(() => {
    if(selectedUf === '0') {
      return
    }
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const ufCities = response.data.map(city => city.nome)
      
      setCities(ufCities)
    })
  }, [selectedUf])

  // Handler functions are used when we want to execute javascript code in a HTML element click
  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value
    setSelectedUF(uf)
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value
    setSelectedCity(city)
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ])
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    
    // "..." is called spread operator, this will copy the next variable afterwards the last '.'
    setFormData({ ...formData, [name]: value })
  }

  function handleSelectedItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id)

    if (alreadySelected >= 0) {
      const filtredItems = selectedItems.filter(item => item !== id)
      setSelectedItems(filtredItems)
    } else {
      setSelectedItems([...selectedItems, id ])
    }
  }

  async function handleSubmit(event: FormEvent) {
    // Below is to prevent a page reload
    event.preventDefault()

    const { nome, email, whatsapp } = formData
    const uf = selectedUf
    const city = selectedCity
    const [latitude, longitude] = selectedPosition
    const items = selectedItems

    const data = {
      nome,
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items
    }

    await api.post('collection_node', data)

    alert('Ponto de coleta criado!')
    
    // Return the user to Home page
    history.push('/')
  }
  
  // CCN main
  return(
    <div id="page-create-cn">
      <header>
        <img src={logo} alt="Ecoleta"/>

        <Link to='/'>
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
          <h1>Cadastro do<br />ponto de coleta</h1>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input
                type="text"
                id="nome"
                name="nome"
                onChange={handleInputChange}
              />
            </div>
            
            <div className="field-group">
              <div className="field">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                />
              </div>

              <div className="field">
                <label htmlFor="name">WhatsApp</label>
                <input
                  type="text"
                  id="whatsapp"
                  name="whatsapp"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>

            <Map center={[-23.5489, -46.6388]} zoom={5} onClick={handleMapClick}>
              <TileLayer 
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={selectedPosition} />
            </Map>

            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado(UF)</label>
                <select onChange={handleSelectedUf} value={selectedUf} name="uf" id="uf">
                  <option value="0">Selecione uma UF</option>
                  {uf.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select onChange={handleSelectedCity} value={selectedCity} name="city" id="city">
                  <option value="0">Selecione uma cidade</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Itens de coleta</h2>
              <span>Selecione um ou mais itens abaixo</span>
            </legend>

            <ul className="items-grid">
              {items.map(item => (
                // React always needs a key value to the first item in a map statement
                // this key value must be unique
                <li key={item.id} onClick={() => handleSelectedItem(item.id)} className={selectedItems.includes(item.id) ? 'selected' : ''}>
                  <img src={item.image_url} alt={item.title}/>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </fieldset>

          <button type='submit'>
            Cadastrar ponto de coleta
          </button>
      </form>
    </div>
  )
}

export default CCN