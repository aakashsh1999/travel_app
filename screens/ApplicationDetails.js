import { Text, Icon, Radio, Body, Card, Left, Button, H3, ListItem, List} from 'native-base';
import React from 'react';
import { ScrollView, View, Image, StyleSheet} from 'react-native';
import { useHistory } from 'react-router';
import TouristGrid from '../component/TouristCardGrid';

export default ApplicationDetails = () => {
    const history= useHistory();
        return (
            <>
            <View style={{borderBottomColor:'#e6e6e6',borderBottomWidth:1, paddingLeft:16, paddingBottom:24}}>
                    <View style={{marginTop:20}}>
                            <View style={style.title}>
                                <Icon type='FontAwesome' name="arrow-circle-o-left" style={{fontSize:16, marginBottom:7,}} onPress={()=>history.push('/history')}/>
                                <Text style={style.heading}>Application Details</Text>
                                </View>
                        <Image source={require('../assets/clipath.png')} />
                    </View>
            <ScrollView>
            <View style={style.listContainer}>   
                    <View>
                    <Text style={style.itemHeading}>Date</Text>
                    <Text style={style.itemText}>22/01/2021</Text>
                    </View>
                    <View style={{marginLeft:106}}>
                    <Text style={style.itemHeading}>Transaction ID</Text>
                    <Text style={style.itemText}>XMBC3457XNT0</Text>
                    </View>
                </View>
                <View style={style.listContainer}>
                <View> 
                    <Text style={style.itemHeading}>Service Id</Text>
                    <Text style={style.itemText}>BXCJCR34</Text>
                    </View>
                    <View style={{marginLeft:115}}> 
                    <Text style={style.itemHeading}>Service Name</Text>
                    <Text style={style.itemText}>BXCJCR34</Text>
                    </View>
                </View>

                <View style={style.listContainer}>                
                    <View>
                    <Text style={style.itemHeading}>Mode</Text>
                    <Text style={style.itemText}>Debit Card</Text>
                    </View>
                    <View style={{marginLeft:120}}>
                    <Text style={style.itemHeading}>Amount(AED)</Text>
                    <Text style={style.itemText}>350.00</Text>
                    </View>
                </View>
                <View style={{width:100}}>
                    <Text style={style.itemHeading}>Status</Text>
                    <View style={{borderRadius:24, backgroundColor:'#4ca0dd', marginTop:10, paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:14, color:'blue', opacity:1.0}}>In-Progress</Text>
                    </View>
                 </View>
                 </ScrollView>
            </View>
            <ScrollView>
            <View style={{padding:15}}>
            <View style={style.stepIndicator}>
            <Radio selected={true} />
            <Text style={{fontSize:12,marginLeft:10}}>Appointment Booked</Text>
            </View>
            <View style={{marginLeft:30, marginBottom:10, borderColor:'#e6e6e6', borderWidth:1, padding:14, flexDirection:'row'}}>
                <Image source={require('../assets/checked.png')} style={{width:24, height:24}}/>
                <Body>
                <Text style={{fontSize:14, color:'#9d9494', marginLeft:10}}>Your payment was successful and we have also reserved the slot for your appointment.
                    You can keep track of your application from your “History”.</Text>
                </Body>
            </View>
            <View style={style.stepIndicator}>
            <Radio selected={true} />
            <Text style={{fontSize:12,marginLeft:10}}>Appointment Date</Text>
            </View>
            <View style={{marginLeft:30}}>
            <Card style={style.card}>
            <Left>
                <View style={style.labelBox}>
                    <H3 style={style.labelheading}>23</H3>
                    <Text style={{fontSize:12}}>Jan 21</Text>
                </View>
            </Left>
            <View style={{width:200, marginRight:40}}>
                <Button rounded style={{ height:19, justifyContent:'center', backgroundColor:'yellow', marginTop:2}}>
                    <Text style={{color:'#000'}}>Upcoming</Text>
                </Button>
                <Text style={{fontSize:14, fontWeight:'500', marginBottom:10, marginTop:14}}>Appointment with AMER 
                executive in Dubai Media City</Text>
                <Text style={{color:"#9d9494"}}>11:00 - 12:00</Text>
             </View>
            </Card>
            </View>
            
            <View style={style.stepIndicator}>
            <Radio selected={true} />
            <Text style={{fontSize:12,marginLeft:10}}>Documents Uploaded</Text>
            </View>
                <View style={{marginLeft:30, marginBottom:10, borderColor:'#e6e6e6', borderWidth:1, padding:20}}>
                    <ListItem style={{borderColor:'#fff'}} >
                        <Icon type='Feather' name='square' style={style.iconStyle}/>
                        <Text style={style.listText}>Emirates ID.jpg</Text>
                    </ListItem>
                    <ListItem style={{borderColor:'#fff'}} >
                        <Icon type='Feather' name='square' style={style.iconStyle}/>
                        <Text style={style.listText}>Emirates ID.jpg</Text>
                    </ListItem>
                    <ListItem style={{borderColor:'#fff'}} >
                        <Icon type='Feather' name='square' style={style.iconStyle}/>
                        <Text style={style.listText}>Emirates ID.jpg</Text>
                    </ListItem>
                    <ListItem style={{borderColor:'#fff'}} >
                        <Icon type='Feather' name='square' style={style.iconStyle}/>
                        <Text style={style.listText}>Emirates ID.jpg</Text>
                    </ListItem>
                 </View>
            <View style={style.stepIndicator}>
            <Radio selected={true} />
            <Text style={{fontSize:12,marginLeft:10}}>Details Provided</Text>
            </View>
            <View style={{marginLeft:30, marginBottom:10, borderColor:'#e6e6e6', borderWidth:1, padding:20}}>
                    <View>
                    <Text style={style.infoHeading}>Name</Text>
                    <Text style={style.infoText}>Vikas Sharma</Text>
                    </View>
                    <View>
                    <Text style={style.infoHeading}>Date of Birth</Text>
                    <Text style={style.infoText}>14 Sep 1987</Text>
                    </View>
                    <View>
                    <Text style={style.infoHeading}>Address</Text>
                    <Text style={style.infoText}>Marina Crown, King Salman Bin</Text>
                    <Text style={style.infoText}>Abdulaziz Al Saud St</Text>
                    <Text style={style.infoText}>Dubai, United Arab Emirates</Text>
                    </View>
            </View>
            <View style={style.stepIndicator}>
            <Radio selected={true} />
            <Text style={{fontSize:12,marginLeft:10}}>Service Chosen</Text>
            </View>
            <View style={{marginLeft:30, marginBottom:120, borderColor:'#e6e6e6', borderWidth:1, padding:20}}>
            <Text style={{fontWeight:'bold', fontSize:16}}>Company Formation Services</Text>
            <TouristGrid/>
            </View>
            </View>
            </ScrollView>
            </>
        );
}

const style =StyleSheet.create({
    heading:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:7,
        marginLeft:5,
        fontFamily:'Lato',
    },
    title:{
        flexDirection:'row',
        alignItems:'center',
    }, 
    itemHeading:{
        fontSize:12, color:'#9d9494', marginTop:10
    },
    itemText:{
        color:'#000', fontSize:14, marginTop:10,
        fontWeight:'500'
    },
    card:{
        borderWidth:1,
        borderColor:'#e6e6e6', 
        marginBottom:15
    },
    laodingButton:{
    margin:40,
    width:190,
     justifyContent:'center', backgroundColor:'#fff', height:40, borderColor:'#000', borderWidth:1, alignSelf:'center',
    },
    buttonText:{
        fontWeight:'bold', 
        color:'#000',
        fontSize:15,
        textTransform:'uppercase'
    },
    listContainer:{justifyContent:'flex-start', flexDirection:'row',marginTop:10}
    ,
    labelBox:{
        width:70,
        height:70,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:30,
        backgroundColor:'#f7f7f7',
        borderRadius:5
    },
    labelheading:{
        fontWeight:'bold',
        fontSize:20
    }, 
    card:{
        borderWidth:1, 
        borderColor:'#e6e6e6',
        padding:10,
       flexDirection:'row',
        marginBottom:20,
    }, 
    stepIndicator:{flexDirection:'row', alignItems:'center', marginBottom:10, marginTop:10},
    iconStyle:{
        rotation:135,
        fontSize:10,  backgroundColor:"#9d9494", color:"#9d9494"
    },
    label:{
        fontSize:14, 
        marginBottom:7,
        marginTop:6,
        fontWeight:'500'
    }, 
    listText:{fontSize:16,marginLeft:13},
    infoHeading:{
        fontSize:12, color:'#707070', marginTop:20
      },
      infoText:{
        color:'#000', fontSize:14, marginTop:4
      }, 
});