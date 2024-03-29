import {Card, CardItem, H3, Icon} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ModalCard = (props) => {
  return (
    <Card>
      <CardItem style={{justifyContent:'space-between', borderBottomColor:'#e6e6e6', borderBottomWidth:1}}>
        <H3 style={{fontSize:16, fontFamily:'Lato', fontWeight:'bold'}}>Company Formation Services</H3>
        <TouchableOpacity onPress={()=>props.setShowCard(false)}>
        <Icon type='Feather' name='x'/>
        </TouchableOpacity>
      </CardItem>
            <CardItem style={{flexDirection:'column'}}>  
                    <View style={{flexDirection:'row', alignItems:'baseline', width:"100%",  marginBottom:20} }>
                    <View style={{width:120 }}>
                    <Text style={style.itemHeading}>Processing Time:</Text>
                    </View>
                    <Text style={style.itemText}>Upto 10Days</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'baseline', width:"100%", marginBottom:20} } >
                      <View style={{width:120}}>
                    <Text style={style.itemHeading}>Stay Period:</Text>
                    </View>
                    <Text style={style.itemText}>14 days</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'baseline', width:"100%", marginBottom:20} } >
                      <View style={{width:120}}>
                    <Text style={style.itemHeading}>Validity:</Text>
                    </View>
                    <Text style={style.itemText}>58days</Text>
                    </View>
          
                    <View style={{flexDirection:'row', alignItems:'baseline', width:"100%", marginBottom:20} } >
                    <View style={{width:120}}>
                    <Text style={style.itemHeading}>Entry:</Text>
                    </View>
                    <Text style={style.itemText}>Single</Text>
                    </View>
          
                  </CardItem>
    </Card> 
  );
}
export default ModalCard;

const style=StyleSheet.create({
  itemHeading:{
    fontSize:14, color:'#9d9494', marginTop:10,
    fontFamily:'OpenSans'
},
itemText:{
    color:'#000', fontSize:14, marginTop:5,
    fontWeight:'500',
    fontFamily:'OpenSans',
    marginLeft:10
},
});