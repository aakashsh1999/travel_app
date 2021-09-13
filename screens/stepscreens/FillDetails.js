import {
  Container,
  Content,
  Icon,
  List,
  H3,
  ListItem,
  Body,
  Radio,
  Left,
  View,
  Picker,
  Form,
  Button,
} from "native-base";
import React, { useRef } from "react";
import DatePicker from "react-native-datepicker";
import {
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  BackHandler,
} from "react-native";
import { useHistory, useLocation } from "react-router";
import Stepper from "./Stepper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import CardHeader from "../../component/CardHeader";

export default FillDetails = () => {
  const scroll = useRef();
  const history = useHistory();
  const [application, setApplication] = React.useState(null);
  const [validation, setValidation] = React.useState(true);
  const [user, setUser] = React.useState("");
  const [name, setName] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

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

  React.useEffect(() => {
    getUser();
  }, []);

  const invalidData = () =>
    name === "" ||
    dob === "" ||
    alias === "" ||
    email === "" ||
    phone === "" ||
    state === "" ||
    city === "" ||
    pincode === "" ||
    country === "";

  const getUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const applicationId = await AsyncStorage.getItem("applicationId");
    let user = await (
      await fetch(`http://13.234.123.221:8000/users/${id}`, {
        method: "GET",
        headers: {
          "x-access-token": await AsyncStorage.getItem("token"),
        },
      })
    ).json();
    let application = await (
      await fetch(`http://13.234.123.221:8000/service/${applicationId}`, {
        method: "GET",
        headers: {
          "x-access-token": await AsyncStorage.getItem("token"),
        },
      })
    ).json();
    setApplication(application);
    user = user.data;
    setUser(user);
    setName(user.name);
    setDob(application.dob);
    application?.otherAddress?.alias
      ? setAlias(application?.otherAddress?.alias)
      : setAlias("");
    setEmail(user.email);
    setPhone(user.phone);
    user?.address?.city
      ? setCity(user.address.city)
      : setCity(application.otherAddress.city);
    user?.address?.state
      ? setState(user.address.state)
      : setState(application.otherAddress.state);
    user?.address?.pincode
      ? setPincode(user.address.pincode)
      : setPincode(application.otherAddress.pincode);
    user?.address?.country
      ? setCountry(user.address.country)
      : setCountry(application.otherAddress.country);
  };

  const jsonPostData = {
    name: application?.name ? application.name : name,
    dob: application?.dob ? application.dob : dob,
    email: application?.email ? application.email : email,
    mobile: application?.mobile ? application.mobile : phone,
    address: {
      alias: alias,
      // "addressLineOne": lineOne ? lineOne : user && user.address?.addressLineOne,
      // "addressLineTwo": lineTwo ? lineTwo : user && user.address?.addressLineTwo,
      state: application?.otherAddress?.state
        ? application.otherAddress.state
        : state,
      city: application?.otherAddress?.city
        ? application.otherAddress.city
        : city,
      pincode: application?.otherAddress?.pincode
        ? application.otherAddress.pincode
        : pincode,
      country: application?.otherAddress?.country
        ? application.otherAddress.country
        : country,
    },
  };
  const handleSubmitForm = async () => {
    setSubmitted(true);
    if (invalidData()) {
      scroll.current.scrollTo({ y: 0, animated: true });
      setValidation(true);
    } else {
      const requestId = await AsyncStorage.getItem("applicationId");
      const url = `http://13.234.123.221:8000/service/fill/${requestId}`;
      const result = await (
        await fetch(url, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": await AsyncStorage.getItem("token"),
          },
          body: JSON.stringify(jsonPostData),
        })
      ).json();
      alert("Details saved successfully");
      history.push("/mode");
    }
  };
  if (!user) {
    return (
      <ActivityIndicator
        size="large"
        color="yellow"
        style={{ alignSelf: "center", margin: 20 }}
      />
    );
  }
  return (
    <>
      <ScrollView style={{ backgroundColor: "#fff" }} ref={scroll}>
        <H3 style={style.heading}>Fill Details</H3>
        <Stepper active="/fill" />
        {validation && invalidData() && submitted && (
          <View style={{ padding: 16 }}>
            <View
              style={{
                width: "100%",
                backgroundColor: "rgba(229, 24, 26, 0.1)",
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
                padding: 8,
                marginBottom: 10,
              }}
            >
              <Icon
                type="Feather"
                name="x"
                onPress={() => setValidation(false)}
              />
              <Text
                style={{
                  marginLeft: 10,
                  marginRight: 5,
                  color: "#e5181a",
                  fontSize: 15,
                  fontFamily: "Lato",
                }}
              >
                Please fill all the mandatory fields in order to proceed and
                complete the application request.
              </Text>
            </View>
          </View>
        )}
        {/* <View style={{flexDirection:'row', marginTop:25, paddingLeft:16, paddingRight:16}}>
                <View>
                <TouchableOpacity onPress={() => setType('self')} style={{flexDirection:'row', alignItems:'center'}}>
                <Radio selected={type === 'self'} selectedColor="#c7a006" color='#000000' />
                <Text style={{fontSize:14,marginLeft:10, fontFamily:'OpenSans'}}>Self</Text>
                </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity onPress={()=> setType('other')} style={{flexDirection:'row', alignItems:'center', marginLeft:40}}>
                <Radio selectedColor="#c7a006" selected={type === 'other'} color="#000000"/>
                <Text style={{fontSize:14,marginLeft:10, fontFamily:'OpenSans'}}>Other</Text>
                </TouchableOpacity>
                </View>
            </View>             */}
        <View style={{ marginTop: 20, paddingLeft: 16, paddingRight: 16 }}>
          <Text style={style.label}>Name*</Text>
          <TextInput
            style={style.input}
            placeholder="Enter name"
            onChangeText={setName}
            defaultValue={application.name ? application.name : user.name}
          />
          <View>
            <Text style={style.label}>Date of Birth*</Text>
            <DatePicker
              style={{ width: "100%" }}
              mode="date"
              placeholder="Choose date of Birth"
              format="DD-MM-YYYY"
              minDate="01-01-1950"
              maxDate="01-01-2021"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              date={application?.dob ? application.dob : dob}
              customStyles={{
                dateIcon: {
                  display: "none",
                },
                dateInput: {
                  borderWidth: 1,
                  paddingRight: "60%",
                  borderColor: "#e6e6e6",
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => setDob(date)}
              defaultValue={application?.dob}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            justifyContent: "flex-start",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <View>
            <TouchableOpacity
              onPress={() => setAlias("Home")}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Radio
                selectedColor="#c7a006"
                color="#000000"
                selected={alias === "Home"}
              />
              <Text
                style={{ fontSize: 14, marginLeft: 10, fontFamily: "OpenSans" }}
              >
                Home
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setAlias("Office")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 40,
              }}
            >
              <Radio
                selectedColor="#c7a006"
                color="#000000"
                selected={alias === "Office"}
              />
              <Text
                style={{ fontSize: 14, marginLeft: 10, fontFamily: "OpenSans" }}
              >
                Office
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 20, paddingLeft: 16, paddingRight: 16 }}>
          <Text style={style.label}>Email*</Text>
          <TextInput
            style={style.input}
            placeholder="Enter email"
            onChangeText={setEmail}
            defaultValue={application.email ? application.email : user.email}
          />
        </View>
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          <Text style={style.label}>Mobile Number*</Text>
          <TextInput
            style={style.input}
            placeholder="Enter mobile number"
            onChangeText={setPhone}
            defaultValue={`${
              application.mobile ? application.mobile : user.phone
            }`}
          />
        </View>

        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          <Text style={style.label}>City*</Text>
          <TextInput
            style={style.input}
            placeholder="Enter city"
            onChangeText={setCity}
            defaultValue={
              application?.otherAddress?.city
                ? application.otherAddress.city
                : user?.address?.city
            }
          />
        </View>

        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          <Text style={style.label}>State*</Text>
          <TextInput
            style={style.input}
            placeholder="Enter city"
            onChangeText={setState}
            defaultValue={
              application?.otherAddress?.state
                ? application.otherAddress.state
                : user?.address?.state
            }
          />
        </View>

        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          <Text style={style.label}>P. O. Box*</Text>
          <TextInput
            style={style.input}
            placeholder="Enter P.O. box"
            onChangeText={setPincode}
            defaultValue={
              application?.otherAddress?.pincode
                ? application.otherAddress.pincode.toString()
                : user?.address?.pincode.toString()
            }
          />
        </View>

        <View style={{ marginBottom: 20, paddingLeft: 16, paddingRight: 16 }}>
          <Text style={style.label}>Country*</Text>
          <TextInput
            style={style.input}
            placeholder="Enter country name"
            onChangeText={setCountry}
            defaultValue={
              application?.otherAddress?.country
                ? application.otherAddress.country
                : user?.address?.country
            }
          />
        </View>
      </ScrollView>
      <CardHeader />
      <View
        style={{
          backgroundColor: "#fff",
          height: 70,
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 16,
          paddingRight: 16,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => history.push("/")}>
          <View
            style={{
              width: 137,
              justifyContent: "center",
              height: 38,
              borderWidth: 1,
              backgroundColor: "#fff",
              borderRadius: 50,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                fontFamily: "OpenSans",
                textAlign: "center",
              }}
            >
              PREV
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmitForm}>
          <LinearGradient
            colors={["#c7a006", "#e7ed32", "#c7a006"]}
            start={[1, 0]}
            end={[0, 1.5]}
            style={{ width: 137, height: 38, borderRadius: 20 }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                fontFamily: "OpenSans",
                textAlign: "center",
                marginTop: 9,
              }}
            >
              NEXT
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 7,
    marginTop: 6,
    fontFamily: "Lato",
  },
  input: {
    height: 40,
    borderColor: "#e9e9e9",
    borderWidth: 1,
    paddingLeft: 15,
    marginBottom: 18,
    fontFamily: "Lato",
  },
  heading: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Lato",
  },
});
