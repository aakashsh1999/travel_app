import React, { useState } from "react";
import {StyleSheet, Text, View} from  'react-native';
import {useLocation} from 'react-router-dom';
import {LinearGradient} from 'expo-linear-gradient';

export default StepScreen = ({active}) => {   
  return (
    <View style={{width:"100%", flexDirection:'row', justifyContent:'space-between', padding:20}}>
        <>
          {(active==='/apply' || active ==='/type' || active==='/fill' || active === '/mode' || active==='/upload' || active==='/book' || active==='/payment') ?  
            <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5]} style={style.stepperCircle}>
               <Text style={style.stepperTextActive}>1</Text>
            </LinearGradient>
               :<View style={style.stepperCircle}>
               <Text style={style.stepperText}>1</Text>
              </View>   
              }
            {(active==='/type' || active==='/fill' || active === '/mode' || active==='/upload' || active==='/book' || active==='/payment')  ? <View style={style.activeLine}></View> : <View style={style.line}></View>}
            
            
          {(active ==='/type' || active==='/fill' || active === '/mode' || active==='/upload' || active==='/book' || active==='/payment') ?  
            <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5]} style={style.stepperCircle}>
               <Text style={style.stepperTextActive}>2</Text>
            </LinearGradient>
               :<View style={style.stepperCircle}>
               <Text style={style.stepperText}>2</Text>
              </View>   
              }
            {(active==='/fill' || active === '/mode' || active==='/upload' || active==='/book' || active==='/payment')  ? <View style={style.activeLine}></View> : <View style={style.line}></View>}
            
          {(active==='/fill' || active === '/mode' || active==='/upload' || active==='/book' || active==='/payment') ?  
            <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5]} style={style.stepperCircle}>
               <Text style={style.stepperTextActive}>3</Text>
            </LinearGradient>
               :<View style={style.stepperCircle}>
               <Text style={style.stepperText}>3</Text>
              </View>   
              }
            {(active === '/mode' || active==='/upload' || active==='/book' || active==='/payment')  ? <View style={style.activeLine}></View> : <View style={style.line}></View>}
            
            
          {(active === '/mode' || active==='/upload' || active==='/book' || active==='/payment') ?  
            <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5]} style={style.stepperCircle}>
               <Text style={style.stepperTextActive}>4</Text>
            </LinearGradient>
               :<View style={style.stepperCircle}>
               <Text style={style.stepperText}>4</Text>
              </View>   
              }
            {/* {(active==='/upload' || active==='/book' || active==='/payment')  ? <View style={style.activeLine}></View> : <View style={style.line}></View>}
            
            
          {(active==='/upload' || active==='/book' || active==='/payment') ?  
            <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5]} style={style.stepperCircle}>
               <Text style={style.stepperTextActive}>5</Text>
            </LinearGradient>
               :<View style={style.stepperCircle}>
               <Text style={style.stepperText}>5</Text>
              </View>   
              } */}
            {(active==='/book' || active==='/upload' || active==='/payment')  ? <View style={style.activeLine}></View> : <View style={style.line}></View>}
              
            
          {(active==='/book' || active==='/upload'  || active==='/payment') ?  
            <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5]} style={style.stepperCircle}>
               <Text style={style.stepperTextActive}>5</Text>
            </LinearGradient>
               :<View style={style.stepperCircle}>
               <Text style={style.stepperText}>5</Text>
              </View>   
              }
            {(active==='/payment')  ? <View style={style.activeLine}></View> : <View style={style.line}></View>}
            
          {(active==='/payment') ?  
            <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5]} style={style.stepperCircle}>
               <Text style={style.stepperTextActive}>6</Text>
            </LinearGradient>
               :<View style={style.stepperCircle}>
               <Text style={style.stepperText}>6</Text>
              </View>   
              }
            </>
       </View>
        );
};

const style=StyleSheet.create({
  stepperCircle:{
    width:30, height:30,
    backgroundColor:'#fff', 
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    borderWidth:1, 
    borderColor:'#d5d5d5'
    }, 
    stepperText:{
      fontSize:13,
      fontWeight:'bold',
      fontFamily:'Lato',
      color:"#d5d5d5"
    }, 
    
    stepperTextActive:{
      fontSize:13,
      fontWeight:'bold',
      fontFamily:'Lato',
      color:"#000"
    }, 
    line:{
      width:20, height:1, backgroundColor:'#e6e6e6',
      position:'relative',
      top:14,
    },
    activeLine:{
      width:20, height:2, backgroundColor:'#000000',
      position:'relative',
      top:14,
    }
});