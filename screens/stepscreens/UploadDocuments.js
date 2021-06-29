import React from "react";
import {
  Icon,
  Body,
  Button,
  List,
  H3,
  ListItem,
  Content,
  Form,
  Picker,
  Item,
  Label,
  Right,
} from "native-base";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  BackHandler,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useHistory } from "react-router-dom";
import Stepper from "./Stepper";
import * as DocumentPicker from "expo-document-picker";
import CardHeader from "../../component/CardHeader";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default UploadDocuments = () => {
  const history = useHistory();

  let token, requestId, file;
  const [filename, setFilename] = React.useState("");
  const [docsArray, updateMyArray] = React.useState([]);
  const [services, setService] = React.useState(null);
  const [reqDocs, setDocs] = React.useState([]);

  React.useEffect(() => {
    getServices();
  }, []);

  React.useEffect(() => {
    const backAction = () => {
      history.push("/fill");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  const selectFile = async () => {
    try {
      token = await AsyncStorage.getItem("token");
      requestId = await AsyncStorage.getItem("applicationId");
      const url = `http://13.234.123.221/api/service/upload/${requestId}`;

      file = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: false,
        type: "application/*",
      });
      let formData = new FormData();
      const type = file.name.split(".");
      if (filename === "") {
        alert("Please select the document first.");
      } else {
        formData.append("name", filename);
        formData.append("file", {
          uri: file.uri,
          name: file.name,
          type: `application/${type[type.length - 1]}`,
        });
      }

      if (file.type === "success") {
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
          body: formData,
        });
        const response = await res.json();
        if (response.status === 1) {
          updateMyArray((oldArray) => [...oldArray, filename]);
        } else {
          alert("File already uploaded");
        }
      }
    } catch (err) {
      // Expo didn't build with iCloud, expo turtle fallback
    }
  };
  //Getting the List of Document
  const getServices = async () => {
    requestId = await AsyncStorage.getItem("applicationId");
    const slug = await AsyncStorage.getItem("serviceSlug");
    const service_url = `http://13.234.123.221/api/serviceCategory/${slug}`;
    const service = await (await fetch(service_url, { method: "GET" })).json();
    const serviceData = service.data;
    setService(serviceData);
    await getDocuments();
  };

  const getDocuments = async () => {
    let application = await (
      await fetch(`http://13.234.123.221/api/admin/application/${requestId}`, {
        method: "GET",
        headers: {
          "x-access-token": await AsyncStorage.getItem("token"),
        },
      })
    ).json();
    application = application.data[0].docs;
    updateMyArray(application || []);
  };

  // const generateLink = async (key, name) => {
  //   const jsonPostData = {
  //     'key': key
  //   }
  //   const url = `http://13.234.123.221/api/download`
  //   const resu = await (await fetch(url, {
  //     method: 'PUT',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(jsonPostData)
  //   })).json();
  // const downloadData = await FileSystem.downloadAsync(
  // resu.data,
  // FileSystem.documentDirectory + name
  // )
  // }

  if (!services) {
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
      <Content>
        <H3 style={style.heading}>Upload Documents</H3>
        <Stepper active="/upload" />
        <View style={{ padding: 16 }}>
          {docsArray.length !== services.serviceDetail.reqDocs.length ? (
            <View>
              <Label style={style.label}>Choose a document</Label>
              <Form>
                <Picker
                  mode="dropdown"
                  placeholderStyle={{ color: "red" }}
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: "100%", height: 40 }}
                  selectedValue={filename}
                  onValueChange={(value) => {
                    setFilename(value);
                  }}
                >
                  <Picker.Item
                    label="Please select a document"
                    disabled
                    value=""
                    key={0}
                  ></Picker.Item>
                  {services.serviceDetail &&
                    services.serviceDetail.reqDocs.map((ele, index) => (
                      <Picker.Item label={ele} value={ele} key={index + 1} />
                    ))}
                </Picker>
              </Form>
            </View>
          ) : null}
          <View style={style.uploadContainer}>
            <Text
              style={
                (style.label,
                { textAlign: "center", margin: 20, fontFamily: "Lato" })
              }
            >
              Scan and Upload Documents
            </Text>
            <View style={style.uploadInput}>
              <TouchableOpacity
                disabled={!filename}
                onPress={async () => await selectFile()}
              >
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    fontSize: 16,
                    color: "#9d9494",
                  }}
                >
                  {"Upload file(s) from your computer"}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <Button rounded style={style.button} onPress={() => handleSubmitForm()}> 
                    <Text style={{fontWeight:'bold', fontSize:15, color:"#000"}}>UPLOAD</Text>
                </Button>  */}
          </View>
          <View style={{ marginTop: 40, marginBottom: 10 }}>
            <Text style={style.label}>Documents Required</Text>
            {services.serviceDetail &&
              services.serviceDetail.reqDocs.map((data, index) => (
                <ListItem
                  style={{ height: 52, borderBottomColor: "#fff" }}
                  key={index}
                >
                  <Icon type="Feather" name="square" style={style.iconStyle} />
                  <Body>
                    <Text
                      style={{ fontSize: 14, marginLeft: 16, color: "#9d9494" }}
                    >
                      {data}
                    </Text>
                  </Body>
                </ListItem>
              ))}
          </View>
          <View style={{ marginTop: 10, marginBottom: 40 }}>
            <Text style={style.label}>Documents Submitted</Text>
            {docsArray ? (
              docsArray.map((data, index) => (
                <ListItem
                  style={{ height: 52, borderBottomColor: "#fff" }}
                  key={index}
                >
                  <Icon type="Feather" name="square" style={style.iconStyle} />
                  <Body>
                    <Text
                      style={{ fontSize: 14, marginLeft: 16, color: "#9d9494" }}
                    >
                      {data.name || data}
                    </Text>
                  </Body>
                  {/* {data.name ? <Right>
                      <Button onPress={()=>generateLink(data.key, data.name)}>
                        <Text>Download</Text>
                      </Button>
                    </Right> :null} */}
                </ListItem>
              ))
            ) : (
              <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 10 }}>
                Sorry! You don't have any submitted document
              </Text>
            )}
          </View>
        </View>
      </Content>
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
        <TouchableOpacity onPress={() => history.push("/fill")}>
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
        <TouchableOpacity
          onPress={() => {
            services.serviceDetail.reqDocs.length === docsArray.length
              ? history.push("/book")
              : alert("Please upload all required documents!");
          }}
        >
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
    fontWeight: "500",
    fontFamily: "Lato",
  },
  input: {
    height: 40,
    borderColor: "#e9e9e9",
    borderWidth: 1,
    textAlign: "center",
    paddingLeft: 15,
    marginBottom: 20,
  },
  button: {
    width: 137,
    alignSelf: "center",
    margin: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    fontFamily: "Lato",
    justifyContent: "center",
  },
  uploadContainer: {
    marginTop: 25,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#e6e6e6",
    justifyContent: "center",
    padding: 20,
  },
  iconStyle: {
    transform: [{ rotate: "135deg" }],
    fontSize: 10,
    backgroundColor: "#9d9494",
    color: "#9d9494",
  },
  listText: {
    fontSize: 16,
    marginLeft: 13,
    color: "#9d9494",
    fontFamily: "OpenSans",
  },
  heading: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Lato",
  },
  uploadInput: {
    height: 40,
    borderColor: "#e9e9e9",
    borderWidth: 1,
    paddingLeft: 15,
    marginBottom: 20,
  },
});
