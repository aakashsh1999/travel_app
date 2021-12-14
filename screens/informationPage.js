import {
  Content,
  Text,
  View,
  H2,
  Card,
  CardItem,
  Body,
  ListItem,
  Textarea,
} from "native-base";
import React from "react";
import {
  StyleSheet,
  Image,
  BackHandler,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useHistory } from "react-router-native";
import { WebView } from "react-native-webview";
import { useValidation } from 'react-native-form-validator';
import { LinearGradient } from "expo-linear-gradient";

export default InformationPage = () => {
  const url = `http://13.234.123.221:8000/contact/create`;
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [query, setQuery] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    const backAction = () => {
      history.push("/");
      return true;
    };


    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });


  const { validate, isFieldInError } =
    useValidation({
      state: { name, email, query },
    });

  const _onPressButton = () => {
    if (!validate({
      name: { minlength: 3, maxlength: 7, required: true },
      email: { minlength: 4, email: true, require: true },
      query: { minlength: 2, require: true },
    }))
    return;
    if(name ==='' || email === '' || query === ''){
      alert('Please fill all the details.')
    }else{
      createContact();
    }
  };


  const createContact = async () => {
    console.log(name);
    const jsonData = { name: name, email: email, query: query };
    const res = await (
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
    ).json();
    alert("Query submitted successfully.");
    history.push("/");
    // }
  };

  const validateEmail = () => {
    const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (reg.test(email) === true) {
      setIsEmail(false);
    }
    else {
      setIsEmail(true)
    }
  }
  return (
    <ScrollView>
      <View style={{ marginTop: 20, marginLeft: 16 }}>
        <H2 style={style.heading}>Contact</H2>
        <Image source={require("../assets/clipath.png")} />
      </View>
      <View style={{ padding: 16 }}>
        <Card style={style.card}>
          <ListItem style={{ padding: 20 }}>
            <Image source={require("../assets/location.png")} />
            <View style={{ marginLeft: 20, width: "70%" }}>
              <Text style={style.infoText}>
                Kalari Documents Clearing Services
              </Text>
              <Text style={style.infoText}>Dragon Mart 1,Shop No DHOFF16</Text>
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
      </View>
      <View
        style={{ width: "100%", marginTop: 10, marginBottom: 50, padding: 16 }}
      >
        <WebView
          style={{ height: 300, width: "100%" }}
          source={{
            html: `<iframe width="100%" height="100%" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.8211987464706!2d55.410161214484!3d25.175514538758975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f61ce99959ff3%3A0x9f391776b31195c4!2sKALARI%20DCS!5e0!3m2!1sen!2sin!4v1619901723581!5m2!1sen!2sin"></iframe>`,
          }}
        />
      </View>
      <View style={{ backgroundColor: "#000" }}>
        <View style={{ marginTop: 20, marginLeft: 16 }}>
          <H2
            style={{
              color: "#fff",
              fontSize: 26,
              marginTop: 40,
              fontWeight: "bold",
              fontFamily: "Lato",
            }}
          >
            Reach out to Us
          </H2>
          <Image source={require("../assets/clipath.png")} />
        </View>
        <View style={{ padding: 16 }}>
          <Text style={style.infoText2}>
            Kalari Documents Clearing Services
          </Text>
          <Text style={style.infoText2}>Dragon Mart 1,Shop No DHOFF16</Text>
          <Text style={style.infoText2}>Dubai, United Arab Emirates </Text>
        </View>
        <View style={{ padding: 16 }}>
          <Text style={style.infoText2}>care@askepro.ae</Text>
        </View>
        <View style={{ padding: 16 }}>
          <Text style={style.infoText2}>+97180073232</Text>
        </View>
        <View style={{ padding: 16 }}>
          <Card style={style.card}>
            <Body style={{ padding: 24 }}>
              <TextInput
                style={style.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
              {isFieldInError('name') &&
                <Text style={style.error}>{'Please enter a valid name'}</Text>
              }
              <TextInput
                style={style.input}
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
              />
              {isFieldInError('email') &&
                <Text style={style.error}>{'Please enter a valid email'}</Text>
              }
              <Textarea
                style={{
                  width: 280,
                  paddingLeft: 20,
                  paddingTop: 20,
                  borderColor: "#e6e6e6",
                }}
                rowSpan={7}
                bordered
                placeholder="Describe your query"
                placeholderTextColor="#9d9494"
                value={query}
                onChangeText={setQuery}
              />
              {isFieldInError('query') &&
                <Text style={[style.error, {marginTop:5}]}>{'Please enter a valid query'}</Text>
              }
              <View style={{ width: "70%", marginRight: 65, marginTop: 5 }}>
                <Text style={{ color: "#9d9494", fontSize: 14 }}>
                  By Clicking on 'Submit' you will agree to T & C of Askepro
                </Text>
              </View>
            </Body>
            <TouchableOpacity onPress={() => {
              _onPressButton()
            }}>
              <LinearGradient
                colors={["#c7a006", "#e7ed32", "#c7a006"]}
                start={[1, 0]}
                end={[0, 1.5]}
                style={style.loginButton}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    fontFamily: "Lato",
                  }}
                >
                  SUBMIT
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 7,
    fontFamily: "Lato",
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
  infoText2: {
    color: "#fff",
    fontSize: 15,
    marginTop: 4,
  },
  input: {
    width: 280,
    height: 45,
    borderColor: "#e9e9e9",
    borderWidth: 1,
    color: "#000",
    paddingLeft: 20,
    marginBottom: 10,
  },

  loginButton: {
    width: 137,
    height: 38,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
    fontFamily: "Lato",
    marginBottom: 50,
  },
  error: { color: '#e5181a', fontSize: 15, fontFamily: 'Lato', marginBottom: 5 }
});
