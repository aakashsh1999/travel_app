import React from "react";
import { ScrollView, Text, StyleSheet, View, Image, TextInput } from "react-native";
import {
  H2,
  Container,
  Content,
  Card,
  Left,
  Right,
  Body,
  Icon,
  ListItem,
  Button,
  Textarea,
} from "native-base";

export default Contact = () => {
  return (
    <Container>
      <Content>
        <View style={{ marginTop: 20, marginLeft: 16 }}>
          <H2 style={style.heading}>Contact</H2>
          <Image source={require("../assets/clipath.png")} />
        </View>
        <ScrollView style={{ padding: 16 }}>
          <View style={{ marginBottom: 30 }}>
            <Text style={{ fontSize: 16, color: "#9d9494", lineHeight: 22 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five ce
            </Text>
          </View>
          <Card style={style.card}>
            <ListItem style={{ padding: 20 }}>
              <Image source={require("../assets/location.png")} />
              <View style={{ marginLeft: 20, width: "70%" }}>
                <Text style={style.infoText}>
                  Marina Crown, King Salman Bin
                </Text>
                <Text style={style.infoText}>Abdulaziz Al Saud St</Text>
                <Text style={style.infoText}>Dubai, United Arab Emirates</Text>
              </View>
            </ListItem>
          </Card>

          <Card style={style.card}>
            <ListItem style={{ padding: 20 }}>
              <Image source={require("../assets/call.png")} />
              <View style={{ marginLeft: 20 }}>
                <Text style={style.infoText}>+97180073232</Text>
              </View>
            </ListItem>
          </Card>

          <Card style={style.card}>
            <ListItem style={{ padding: 20 }}>
              <Image source={require("../assets/mail.png")} />
              <View style={{ marginLeft: 20 }}>
                <Text style={style.infoText}>care@askepro.ae</Text>
              </View>
            </ListItem>
          </Card>
          <Image
            source={require("../assets/map.png")}
            style={{ marginTop: 30, marginBottom: 30 }}
          />
        </ScrollView>
        <View style={{backgroundColor:'#000'}}>
          <View style={{ marginTop: 20, marginLeft: 16 }}>
            <H2
              style={{
                color: "#fff",
                fontSize: 26,
                marginTop: 40,
                fontWeight: "bold",
              }}
            >
              Reach out to Us
            </H2>
            <Image source={require("../assets/clipath.png")} />
          </View>
          <View style={{padding:16}}>
                <Text style={style.infoText2}>Marina Crown, King Salman Bin </Text>
                <Text style={style.infoText2}>Abdulaziz Al Saud St</Text>
                <Text style={style.infoText2}>Dubai, United Arab Emirates</Text>
              </View>
            <View style={{ padding:16 }}>
                <Text style={style.infoText2}>care@askepro.ae</Text>
              </View>
              <View style={{ padding:16}}>
                <Text style={style.infoText2}>+97180073232</Text>
              </View>
            <View style={{padding:16}}>
            <Card style={style.card}>
                <Body style={{padding:24}}>
                <TextInput style={style.input} placeholder='Enter your name' />
                <TextInput style={style.input} placeholder='Enter email address' />
                <Textarea style={{width:280, paddingLeft:20, paddingTop:20, borderColor:"#e6e6e6"}} rowSpan={7} bordered placeholder="Describe your query"  placeholderTextColor="#9d9494"/>
                    <View style={{width:"70%", marginRight:65, marginTop:10}}>
                    <Text style={{color:'#9d9494'}}>By Clicking on 'Submit' you will agree to T & C of Askepro</Text>
                    </View>
                </Body>
                <Button rounded warning style={{width:135, alignSelf:'center', margin:30, justifyContent:"center"}}>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Submit</Text>
                    </Button>
            </Card>
            </View>
          </View>
      </Content>
    </Container>
  );
}


const style = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 7,
  },
  infoText: {
    color: "#000",
    fontSize: 16,
    marginTop: 4,
  },
  card: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    marginBottom: 30,
  },
  infoText2:{
    color: "#fff",
    fontSize: 15,
    marginTop: 4,
  },
  input:{
    width:280,
    height:45,
    borderColor:'#e9e9e9',
    borderWidth:1,
    color:"#0000",
    paddingLeft:20,
    marginBottom:10
},
});
