import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'

const CollectionNodes = () => {
  const navigation = useNavigation()
  
  function hadleNavigateBack() {
    navigation.goBack()
  }

  function handleNavigateToDetail() {
    navigation.navigate('Detail')
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
          <MapView style={styles.map} initialRegion={{latitude: -28.9540583, longitude: -49.45677, latitudeDelta: 0.014, longitudeDelta: 0.014}}>
            <Marker style={styles.mapMarker} onPress={handleNavigateToDetail} coordinate={{ latitude:-28.9540583, longitude:-49.45677 }}>
              <View style={styles.mapMarkerContainer}>
                <Image style={styles.mapMarkerImage} source={{ uri: 'https://images.unsplash.com/photo-1557333610-90ee4a951ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'}} />
                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
            </Marker>
          </MapView>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView horizontal showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 20 }}>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://192.168.1.11:3001/uploads/lampadas.svg"/>
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://192.168.1.11:3001/uploads/lampadas.svg"/>
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://192.168.1.11:3001/uploads/lampadas.svg"/>
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://192.168.1.11:3001/uploads/lampadas.svg"/>
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://192.168.1.11:3001/uploads/lampadas.svg"/>
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://192.168.1.11:3001/uploads/lampadas.svg"/>
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
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
