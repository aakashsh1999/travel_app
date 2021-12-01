import { Container, Content, View, H2, Icon } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, Image, Text, TouchableOpacity, BackHandler, TextInput, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-native';
import * as DocumentPicker from "expo-document-picker";

const EditProfile = () => {

    const history = useHistory();
    const scroll = useRef();
    const [user, setUser] = React.useState(null);
    const [data, setData] = React.useState(null);   
    const [file, setFile] = React.useState(null)
    const [id, setId] = React.useState(null);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [addressLineOne, setAddressLineOne] = React.useState(null);
    const [addressLineTwo, setAddressLineTwo] = React.useState(null)
    const [phone, setPhone] = React.useState("");
    const [state, setState] = React.useState("");
    const [city, setCity] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [pincode, setPincode] = React.useState("");
    const [validation, setValidation] = React.useState(true);
    const [submitted, setSubmitted] = React.useState(false);


    const getMimeType = (ext) => {
        // mime type mapping for few of the sample file types
        switch (ext) {
          case 'jpg': return 'image/jpeg';
          case 'jpeg': return 'image/jpeg';
          case 'png': return 'image/png';
        }
      }


      const selectFile = async () => {
        try {
          let result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
            type: "image/*",
            multiple: false,
          });
          let formData = new FormData();
          // formData.append('file', file)
          let value = result?.name.split('.').pop();
          formData.append('file', {
            uri: result.uri,
            name: result.name,
            type: getMimeType(value),
          })
          formData.append('name', result.name)
          setData(formData);
          setFile(result);

          let id = await AsyncStorage.getItem('id')
          let url = `http://13.234.123.221:8000/users/upload/${id}`;
          let token = await AsyncStorage.getItem("token");
            if (file.type === "success") {
              try {
                const res = await fetch(url, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": token,
                  },
                  body: data,
                });
                const response = await res.json();
                if (response.status === 1) {
                  alert("Document Added Successfully");
                 history.push('/profile')
                } else {
                  alert("There has been an error");
                }
              } catch (e) {
                console.log(e)
              }
          }
          // console.log(result)
        } catch (err) {
        }
      }

    


    const invalidData = () =>
        name === "" ||
        email === "" ||
        phone === "" ||
        state === "" ||
        addressLineOne ==="" ||
        addressLineTwo === ""
        city === "" ||
        pincode === "" ||
        country === "";

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        const backAction = () => {
            history.push('/profile');
            return true;
        }
        const backHandler = BackHandler.addEventListener('hardwaerBackPress',
            backAction);
        return () => backHandler.remove();
    })


    const getData = async () => {
        const id = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('token');
        let user = await (
            await fetch(`http://13.234.123.221:8000/users/${id}`, {
                method: "GET",
                headers: {
                    "x-access-token": token
                },
            })
        ).json();
        setUser(user?.data);
        setName(user?.data?.name);
        setEmail(user?.data?.email);
        setPhone(user?.data?.phone);
        setAddressLineOne(user?.data?.address?.addressLineOne);
        setAddressLineTwo(user?.data?.address?.addressLineTwo);
        setState(user?.data?.address?.state);
        setCity(user?.data?.address?.city);
        setCountry(user?.data?.address?.country);
        setPincode(user?.data?.address?.pincode);
    }

    const jsonPostData = {
        name: name || '',
        email: email || '',
        mobile: parseInt(phone) || '',
        address: {
            addressLineOne: addressLineOne || '',
            addressLineTwo: addressLineTwo || '',
            state: state || '',
            city: city || '',
            pincode: parseInt(pincode) || '',
            country: country || '',
        },
    };
    const UpdateData = async () => {
        setSubmitted(true);
        if (invalidData()) {
            scroll.current.scrollTo({ y: 0, animated: true });
            setValidation(true);
        } else {
            const id = await AsyncStorage.getItem('id');
            const url = `http://13.234.123.221:8000/users/${id}`
           const result = await ( await fetch(url, {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "x-access-token": await AsyncStorage.getItem("token"),
                },
                body: JSON.stringify(jsonPostData),
              })
            ).json();
            alert("Details updated successfully");
            history.push("/profile");
        }
    }
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
            <Container>
                <Content>
                    <View style={{ marginTop: 20, marginLeft: 16 }}>
                        <H2 style={style.profileHeading}> Edit Profile</H2>
                        <Image source={require('../assets/clipath.png')} />
                    </View>
                    <ScrollView ref={scroll}>
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
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {user && user.profilePicture ?
                                <LinearGradient colors={['#c7a006', 'yellow', '#c7a006']} start={[1, 0]} end={[0, 2.57]} style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={{ uri: 'data:image/png;base64,' + user.profilePicture }} style={style.profileImage} />
                                </LinearGradient>
                                :
                                <LinearGradient colors={['#c7a006', 'yellow', '#c7a006']} start={[1, 0]} end={[0, 2.57]} style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 92, height: 92, borderRadius: 50, color: '#fff', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon type='Feather' name='user' style={{ fontSize: 70 }} />
                                    </View>
                                </LinearGradient>
                            }
                            
                            <View>
                            <TouchableOpacity onPress={() => {selectFile();}}>
                                <Text style={{ textDecorationLine: 'underline', marginTop: 5 }}>Change Profile Picture</Text>
                                </TouchableOpacity></View>
                        </View>
                        
                        <View style={{ marginTop: 20, paddingLeft: 16, paddingRight: 16 }}>
                            <Text style={style.label}>Name*</Text>
                            <TextInput
                                style={style.input}
                                placeholder="Enter name"
                                onChangeText={setName}
                                defaultValue={name || ''}
                            />
                        </View>
                        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                            <Text style={style.label}>Email*</Text>
                            <TextInput
                                style={style.input}
                                placeholder="Enter email"
                                onChangeText={setEmail}
                                defaultValue={email || ''}
                            />
                        </View>
                        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                            <Text style={style.label}>Mobile Number*</Text>
                            <TextInput
                                style={style.input}
                                placeholder="Enter mobile number"
                                onChangeText={setPhone}
                                defaultValue={phone.toString() || ''}
                            />
                        </View>

                        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                            <Text style={style.label}>Address Line One*</Text>
                            <TextInput
                                style={style.input}
                                placeholder="Enter address line one"
                                onChangeText={setAddressLineOne}
                                defaultValue={
                                    addressLineOne || ''
                                }
                            />
                        </View>

                        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                            <Text style={style.label}>Address Line Two*</Text>
                            <TextInput
                                style={style.input}
                                placeholder="Enter address line two"
                                onChangeText={setAddressLineTwo}
                                defaultValue={
                                    addressLineTwo || ''
                                }
                            />
                        </View>

                        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                            <Text style={style.label}>City*</Text>
                            <TextInput
                                style={style.input}
                                placeholder="Enter city"
                                onChangeText={setCity}
                                defaultValue={
                                    city || ''
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
                                    state || ''
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
                                    pincode.toString() || ''
                                }
                            />
                        </View>

                        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                            <Text style={style.label}>Country*</Text>
                            <TextInput
                                style={style.input}
                                placeholder="Enter country name"
                                onChangeText={setCountry}
                                defaultValue={
                                    country || ''
                                }
                            />
                        </View>
                        <View>
                        </View>
                    </ScrollView>
                </Content>
                <View
                    style={{
                        backgroundColor: "#ffffff",
                        height: 70,
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingLeft: 16,
                        paddingRight: 16,
                        flexDirection: "row",
                        borderWidth: 0.5,
                        borderColor: '#000000',

                    }}
                >
                    <TouchableOpacity onPress={() => history.push("/profile")}>
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
                                CANCEL
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => UpdateData()}>
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
                                UPDATE
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </Container>
        )
    }

    export default EditProfile;

    const style = StyleSheet.create({
        profileHeading: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 7,
            marginLeft: -4
        },

        profileImage: {
            width: 92,
            height: 92,
            borderRadius: 50,
        },

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

    });