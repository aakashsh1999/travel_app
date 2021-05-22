import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, CardItem, H3, Icon} from 'native-base';

const ModalCard = () => {
  return (
    <Card>
      <CardItem style={{justifyContent:'space-between', borderBottomColor:'#e6e6e6', borderBottomWidth:1}}>
        <H3 style={{fontSize:16, fontFamily:'Lato', fontWeight:'bold'}}>Company Formation Services</H3>
        <Icon type='Feather' name='x'/>
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