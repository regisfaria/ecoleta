import React, { useEffect, useState } from 'react'
import { Feather as Icon} from '@expo/vector-icons'
import { View, ImageBackground, Text, StyleSheet, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'
import axios from 'axios'

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const Home = () => {
  const navigation = useNavigation()
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState('0')
  const [selectedUf, setSelectedUF] = useState('0')
  
  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla)

      setUfs(ufInitials)
    })
  }, [])

  useEffect(() => {
    if(selectedUf === '0') {
      return
    }
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const ufCities = response.data.map(city => city.nome)
      
      setCities(ufCities)
    })
  }, [selectedUf])

  function handleNavigateToCollectionNodes() {
    navigation.navigate('CollectionNodes', { uf: selectedUf, city: selectedCity })
  }

  function handleSelectedUF(uf: string) {
    setSelectedUF(uf)
  }
  
  function handleSelectedCity(city: string) {
    setSelectedCity(city)
  }

  return (
    //ImageBackground are the same as View, but they recieve a img as param to add it to the background of that 'View'
    //Views work the same as HTML divs
    <ImageBackground source={require('../../assets/home-background.png')} imageStyle={{ width: 274, height: 368 }} style={styles.container}> 
      <View style={styles.main}> 
        <Image source={require('../../assets/logo.png')}/>
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de formas eficiente</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.input}>
          <RNPickerSelect
            onValueChange={value => handleSelectedUF(value)}
            items={ufs.map(uf => ({
              value: uf,
              label: uf
            }))}
            placeholder={{
              label: "Selecione um estado",
              value: 0
            }}
          />
        </View>
        
        <View style={styles.input}>
          <RNPickerSelect 
            onValueChange={value => handleSelectedCity(value)}
            items={cities.map(city => ({
              label: city,
              value: city
            }))}
            placeholder={{
              label: "Selecione uma cidade",
              value: 0
            }}
          />
        </View>

        <RectButton style={styles.button} onPress={handleNavigateToCollectionNodes}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" />
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});