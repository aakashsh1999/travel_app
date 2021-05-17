import { Container, Content, Icon, List, ListItem, Body, Radio, Left, View, DatePicker, Picker, } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput} from 'react-native';

export default FillDetails= () =>{
    return (
        <ScrollView style={{padding:16}}>
            <View style={{flexDirection:'row', marginTop:25}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Radio selected={true} />
                <Text style={{fontSize:14,marginLeft:10}}>Self</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginLeft:40}}>
                <Radio selected={true} />
                <Text style={{fontSize:14,marginLeft:10}}>Other</Text>
                </View>
            </View>            
            <View style={{marginTop:20}}>
                 <Text style={style.label}>Name*</Text>
                 <TextInput style={style.input} placeholder='Enter name' />
                 <View>
                 <Text style={style.label}>Date of Birth*</Text>
                 <TextInput style={style.input} placeholder='Choose Date of Birth' />
                </View>       
           </View>
           <View style={{flexDirection:'row', marginTop:15, justifyContent:'space-between'}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Radio selected={true} />
                <Text style={{fontSize:14,marginLeft:10}}>Address 1</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center',}}>
                <Radio selected={true} />
                <Text style={{fontSize:14,marginLeft:10}}>Address 2</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Radio selected={true} />
                <Text style={{fontSize:14,marginLeft:10}}>Address 3</Text>
                </View>
            </View>         
                <View style={{marginTop:20}}>
                 <Text style={style.label}>Address Line 1*</Text>
                 <TextInput style={style.input} placeholder='Enter address line 1' />
                </View>
                 <View>
                 <Text style={style.label}>Address Line 2*</Text>
                 <TextInput style={style.input} placeholder='Enter address line 2' />
                </View>    
                
                <View>
                 <Text style={style.label}>City*</Text>
                 <TextInput style={style.input} placeholder='Enter city' />
                </View>    
                <View>
                 <Text style={style.label}>PIN Code*</Text>
                 <TextInput style={style.input} placeholder='Enter pin code' />
               </View>    

               <View>
                 <Text style={style.label}>PIN Code*</Text>
                 <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="chevron-down" type='Feather' />}
                        placeholderStyle={{color:'red'}}
                        style={style.input}
                >
              <Picker.Item label="India" value="key0" />
              <Picker.Item label="USA" value="key1" />
              <Picker.Item label="China" value="key2" />
              <Picker.Item label="UAE" value="key3" />
              <Picker.Item label="Australia" value="key4" />
            </Picker>

                </View>    


        </ScrollView>
    );
}

const style= StyleSheet.create({
    label:{
        fontSize:14, 
        marginBottom:7,
        marginTop:6
    }, 
    input:{
        height:40,
        borderColor:'#e9e9e9',
        borderWidth:1,
        paddingLeft:15,
        marginBottom:18
    },
});