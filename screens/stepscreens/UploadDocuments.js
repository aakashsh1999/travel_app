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
  SnackBar,
  Right,
  Modal
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
import { useHistory } from "react-router-native";
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
  const [serviceDetail, setServiceDetail] = React.useState(null);
  const [progress, setProgress] = React.useState(0);


  React.useEffect(() => {
    const backAction = () => {
      history.push("/mode");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  React.useEffect(() => {
    getServices();
    getDocumentList();
  }, []);




  const selectFile = async () => {
    try {
      token = await AsyncStorage.getItem("token");
      requestId = await AsyncStorage.getItem("applicationId");
      const url = `http://3.109.106.108:8000/service/upload/${requestId}`;

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
        console.log(url);
        const res = await postData(url, formData, token);
        const response = JSON.parse(res);
        setProgress(0)
        if (response.status === 1) {
          updateMyArray((oldArray) => [...oldArray, filename]);
        } else {
          alert("File already uploaded");
        }
      }
    } catch (err) {
      console.log(err);
      // Expo didn't build with iCloud, expo turtle fallback
    }
  };


  const postData = async (url, data, token) => {
    const xhr = new XMLHttpRequest();
    const success = await new Promise((resolve) => {
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded * 100) / event.total));
        }
      });
      xhr.addEventListener("loadend", () => {
        alert(filename + ' uploaded successfully.')
        resolve(xhr.responseText);
      });
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", "multipart/form-data");
      xhr.setRequestHeader("x-access-token", token);
      xhr.send(data);
    });
    return success;
  }
  const getServices = async () => {
    let slug = await AsyncStorage.getItem('slug');
    let subCatId = await AsyncStorage.getItem('subCatId')
    const service_url = `http://3.109.106.108:8000/serviceCategory/${slug}`;
    const service = await (await fetch(service_url, { method: "GET" })).json();
    let application = await (
      await fetch(
        `http://3.109.106.108:8000/service/${requestId}`,
        {
          method: "GET"
        })).json();
    setService(application?.data)
    let subCatdata = service.data.serviceDetail.find(e => e.name === application.serviceDetail ? application.serviceDetail : subCatId);
    const serviceData = {
      reqDocs: subCatdata.reqDocs
    };
    setServiceDetail(serviceData)
    await AsyncStorage.setItem("subCatId", subCatdata._id);
  };

  //Function for getting uploaded Document List
  const getDocumentList = async () => {
    let applicationId = await AsyncStorage.getItem('applicationId');
    let application = await (
      await fetch(`http://3.109.106.108:8000/service/${applicationId}`, {
        method: "GET",
        headers: {
          "x-access-token": await AsyncStorage.getItem("token"),
        },
      })
    ).json();
    let docList = application?.docs.map(el => el?.name);
    updateMyArray(docList);
  }



  if (!serviceDetail) {
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
          {docsArray.length !== serviceDetail && serviceDetail?.reqDocs.length ? (
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
                  {serviceDetail &&
                    serviceDetail?.reqDocs.map((ele, index) => (
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
                    fontSize: 16,
                    color: "#9d9494",
                  }}
                >
                  {"Upload file(s) from your computer"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {progress !== 0 && 
          <View style={{marginTop:10}}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>Uploading {filename}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#00ff00', textAlign: 'center' }}>{progress}%</Text></View>}

          <View style={{ marginTop: 40, marginBottom: 10 }}>
            <Text style={style.label}>Documents Required</Text>
            {serviceDetail && serviceDetail.reqDocs.map((data, index) => (
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
            {docsArray.length !== 0 ? (
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
                </ListItem>
              ))
            ) : (
              <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 10 }}>
                Sorry! You haven't submitted any documents yet.
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
        <TouchableOpacity onPress={() => history.push("/mode")}>
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
            serviceDetail && serviceDetail.reqDocs.length === docsArray.length
              ? history.push("/payment")
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
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "#e9e9e9",
    borderWidth: 1,
    marginBottom: 20,
  },
});
