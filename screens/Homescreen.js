import React, { useEffect, useState } from 'react';
import { Card, H1, H2, } from 'native-base';
import { Image, Text, ScrollView, StyleSheet, View, LogBox, ActivityIndicator, TouchableOpacity } from 'react-native';
import ServiceGrid from '../component/Grid';
import TouristGrid from '../component/TouristCardGrid';
import Bottombar from '../component/Bottombar';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useHistory } from 'react-router-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
export default Homescreen = () => {

  const video = React.useRef(null);
  const offerUrl = 'http://13.234.123.221:8000/admin/offer'
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  useEffect(() => {
       getoffers();
  }, [])

  const getoffers = async () => {
    const offer = await (
      await fetch(`http://13.234.123.221:8000/admin/offer`, { method: "GET" })
    ).json();
      setCarouselState(offer.data)
  };
  const [offer, setOffer] = useState(null);

  const [carouselState, setCarouselState] = useState([]);


  const carouselRef = React.useRef(null);

  const renderItem = ({ item, index }) => {
    return (
      <View 
        style={{
          backgroundColor: 'pink',
          borderRadius: 20,
          height: 200,
          width: '100%',
          marginBottom: 16,
        }}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{ uri: "data:image/png;base64," +item.data}}
        />

      </View>
    );
  };


  return (
    <>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <Card>
          {/* <Image style={{width:"100%", position: 'relative'}}
                source={require('../assets/homeBg.png')}
                /> */}
          <Video
            style={{ width: '100%', height: 300, opacity: 0.6 }}
            ref={video}
            source={require('../assets/demo.mp4')}
            resizeMode='cover'
            status={'Play'}
            isMuted
            shouldPlay={true}
            isLooping
          />
          <View style={{ position: 'absolute', bottom: 24, left: 15 }}>
            <H1 style={style.heading}>Leading Immigration</H1>
            <H1 style={style.heading}>Consultants in Dubai</H1>
            <View style={{width:'100%', paddingRight:15}}>
            <Text style={{ fontSize: 16, color: "#ffffff", fontFamily: 'Lato', marginTop: 5}}>Our business is to make your business easier in the UAE.</Text>
          </View>
          </View>
        </Card>
        <View style={{ marginTop: 20, marginLeft: 16, backgroundColor: "#fff" }}>
          <H2 style={style.ourServices}>Our Services</H2>
          <Image source={require('../assets/clipath.png')} />
        </View>
        <View style={{ width: "100%", paddingLeft: 16, paddingRight: 16, paddingTop: 10 }}>
          <Text style={style.paraText}>
            We provide all types services ranging from your tourist visa needs to forming a company in UAE.
          </Text>
        </View>
        <ServiceGrid />
        <View style={{ marginTop: 20, marginLeft: 16, marginBottom: 16, backgroundColor: "#fff" }}>
          <H2 style={style.ourServices}>Offers</H2>
          <Image source={require('../assets/clipath.png')} />
        </View>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        {carouselState && carouselState.length > 0 ? 
        <Carousel
          layout={'default'}
          ref={carouselRef}
          data={carouselState}
          sliderWidth={300}
          itemWidth={300}
          renderItem={renderItem}
          useScrollView={true}
        /> : <ActivityIndicator size="large" color="yellow" style={{alignSelf:'center', margin:20}} />
          }
        </View>
      </ScrollView>

      <Bottombar />
    </>
  );
}
const style = StyleSheet.create({
  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    color: '#ffffff'
  },
  ourServices: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 7,
    fontFamily: 'Lato'
  },
  paraText: {
    fontSize: 14,
    color: '#9d9494',
    fontFamily: 'OpenSans'
  }
});
