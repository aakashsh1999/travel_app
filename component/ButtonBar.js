import {Button, Content} from 'native-base';
import {Text, TouchableOpacity, View} from 'react-native';
import {useHistory, useLocation} from 'react-router-dom';

import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {useFonts} from 'expo-font';

export default ButtonBar = () =>{
    const [loaded] = useFonts({
        OpenSans: require('../assets/fonts/openSans.ttf'),
        Lato: require('../assets/fonts/lato.ttf'),
      });

    const location = useLocation();
    const history = useHistory();
    const [prevPath, setPrevPath] = React.useState(null);
    const [nextPath, setNextPath] = React.useState(null);
    const arr = ["/", "/apply", "/fill", "/upload", "/book", "/payment", "/"]

    React.useEffect(() => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === location.pathname) {
                setPrevPath(arr[i - 1]);
                setNextPath(arr[i + 1]);
            }
        }

    },[]);


        return (
                <View style={{backgroundColor:'#fff', height:70, justifyContent:'space-between', alignItems:'center', paddingLeft:16, paddingRight:16 ,flexDirection:'row'}}>                
                <TouchableOpacity onPress={() => history.push(prevPath)}>
                <View style={{width:137, justifyContent:'center', height:38, borderWidth:1, backgroundColor:'#fff', borderRadius:50}}>
                        <Text style={{fontSize:15, fontWeight:'bold', fontFamily:'OpenSans', textAlign:'center'}} >PREV</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => history.push(nextPath)}>
                <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5]} style={{width:137, height:38, borderRadius:20, }}>
                <Text style={{fontSize:15, fontWeight:'bold', fontFamily:'OpenSans', textAlign:'center',marginTop:9}}>NEXT</Text>
                </LinearGradient>
                </TouchableOpacity>
                 </View>
        );
}
