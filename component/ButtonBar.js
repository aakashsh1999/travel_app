import {Button, Content } from 'native-base';
import React from 'react';
import {View, TouchableOpacity, Text, Touchable } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useLocation, useHistory} from 'react-router-dom';

export default ButtonBar = () =>{
    const location = useLocation();
    const history = useHistory();
    const [prevPath, setPrevPath] = React.useState(null);
    const [nextPath, setNextPath] = React.useState(null);
    const arr = ["/", "/apply", "/fill", "/upload", "/book", "/payment", "/"]

    React.useEffect(() => {
        console.log(location)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === location.pathname) {
                setPrevPath(arr[i - 1]);
                setNextPath(arr[i + 1]);
            }
        }

    },[]);


        return (
                <View style={{backgroundColor:'#fff', height:70, justifyContent:'space-between', paddingLeft:16, paddingRight:16 ,flexDirection:'row'}}>                
                <Button rounded style={{width:137, justifyContent:'center', height:38, borderWidth:1, backgroundColor:'#fff' ,alignSelf:'center'}} onPress={() => history.push(prevPath)}>
                        <Text style={{fontSize:15, fontWeight:'bold', fontFamily:'Lato'}} >Prev</Text>
                </Button>
                <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5]}  style={{width:137, height:38, borderRadius:20,alignItems:'center',alignSelf:'center'}} onPress={() => history.push(nextPath)}>
                        <Text style={{fontSize:15, marginTop:8, fontWeight:'bold', fontFamily:'Lato', textAlign:'center'}}>Next</Text>
                </LinearGradient>
                 </View>
        );
}
