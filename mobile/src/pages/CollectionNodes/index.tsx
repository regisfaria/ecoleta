import React, { useState, useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import * as Location from 'expo-location'
import api from '../../services/api'

interface Item {
  id: number
  title: string
  expo_image_url: string
}

interface CollectionNode {
  id: number
  image: string
  latitude: number
  longitude: number
  nome: string
}

const CollectionNodes = () => {
  const navigation = useNavigation()
  const [items, setItems] = useState<Item[]>([])
  const [collectionNodes, setCollectionNodes] = useState<CollectionNode[]>([])
  const [selectedItems, setSelectedItems] = useState<Number[]>([])
  const [initialPos, setInitialPos] = useState<[number, number]>([0, 0])

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Ops...', 'Precisamos de sua permisão para obter sua localização')
        return
      }

      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords
      
      setInitialPos([latitude, longitude])
    }

    loadPosition();
  }, [])

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data)
    })
  }, [])

  useEffect(() => {
    api.get('collection_nodes', {
      params: {
        uf: "AM"
      }
    }).then(response => {
        setCollectionNodes(response.data)
    })
  }, [])

  function hadleNavigateBack() {
    navigation.goBack()
  }

  function handleNavigateToDetail() {
    navigation.navigate('Detail')
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

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={hadleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79"/>
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          { initialPos[0] !== 0 && (
            <MapView style={styles.map} loadingEnabled={initialPos[0] === 0} initialRegion={{latitude: initialPos[0], longitude: initialPos[1], latitudeDelta: 0.014, longitudeDelta: 0.014}}>
            {collectionNodes.map(collectionNode => (
              <Marker key={String(collectionNode.id)} style={styles.mapMarker} onPress={handleNavigateToDetail} coordinate={{ latitude:collectionNode.latitude, longitude:collectionNode.longitude }}>
                <View style={styles.mapMarkerContainer}>
                  <Image style={styles.mapMarkerImage} source={{ uri: collectionNode.image }} />
                  <Text style={styles.mapMarkerTitle}>collectionNode.nome</Text>
                </View>
              </Marker>
            ))}
          </MapView>
          ) }
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView horizontal showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 20 }}>
          {items.map(item =>(
            <TouchableOpacity key={String(item.id)} activeOpacity={0.6} style={[styles.item, selectedItems.includes(item.id) ? styles.selectedItem : {}]} onPress={() => {handleSelectedItem(item.id)}}>
              <SvgUri width={42} height={42} uri={item.expo_image_url}/>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  )
}

export default CollectionNodes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});
