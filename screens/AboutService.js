import {
  Body,
  H2,
  H3,
  Icon,
  Picker,
  Select,
  CheckIcon,
  ListItem,
  Card,
  CardItem,
  View,
} from "native-base";
import { Image, ScrollView, StyleSheet, Text, BackHandler } from "react-native";
import React from "react";
import { useParams, useHistory } from "react-router-dom";

const AboutService = () => {
  const history = useHistory();
  const [service, setService] = React.useState({});
  const [serviceType, setServiceType] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const [subCat, setSubCat] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const { slug } = useParams();
  const service_url = `http://13.234.123.221/api/serviceCategory/${slug}`;
  React.useEffect(() => {
    getServiceSlugDetail();
  }, []);
  const getServiceSlugDetail = async () => {
    const services = await (await fetch(service_url, { method: "GET" })).json();
    const serviceData = services.data;
    setService(serviceData);

    let serviceOptions = services.data.serviceDetail.map((e) => ({
      text: e.name,
      value: e._id,
      key: e._id,
    }));
    setOptions(serviceOptions);
    setService(serviceData);
  };

  const getserviceType = async (val) => {
    let sub = service.serviceDetail.find((o) => o._id === val);
    if(val!==null){
    setShow(true);
    setServiceType(sub);
    }
  };

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

  return (
    <>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View
          style={{
            paddingTop: 20,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: "#000",
          }}
        >
          <H2 style={style.ourServices}>{service.name}</H2>
          <Image source={require("../assets/clipath.png")} />
          <Text style={style.paraText}>{service?.description}</Text>
        </View>
        <View>
          <H3 style={style.subheading}>Overview</H3>
          <Text style={style.paraText2}>{service?.overview}</Text>
        </View>
        <View style={{ padding: 16}}>
          <View style={{borderColor:'#e6e6e6', borderWidth:1, borderRadius:4}}>
          <Picker
            mode="dropdown"
            placeholderStyle={{ color: "red" }}
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: "100%", height: 40}}
            selectedValue={subCat}      
            onValueChange={(value) => {
              setSubCat(value)
              getserviceType(value);
            }}
          >
          <Picker.Item
              label="Select Type"
              disabled
              value={null}
              key={0}
            ></Picker.Item>
              {options.map((ele, index)=>(<Picker.Item label={ele.text} value={ele.value} key={index+1} />))}
          </Picker>
          </View>
      </View>
       {show ? <View style={{ marginBottom: 20 }}>
          <H3 style={style.subheading}>Documents Required</H3>
       {serviceType?.reqDocs.map((data, index) => <ListItem  key={index} style={{ height: 52, borderBottomColor: "#fff" }}>
            <Icon type="Feather" name="square" style={style.iconStyle} />
            <Body>
              <Text style={{ fontSize: 14, marginLeft: 16, color: "#9d9494" }}>
              {data}
              </Text>
            </Body>
          </ListItem> )}
        </View> : <View></View> }
        <View style={{ padding: 16 }}>
        {show ? <Card
            style={{ marginBottom: 20, alignSelf: "center", width: "100%" }}
          >
            <CardItem
              style={{
                justifyContent: "space-between",
                borderBottomColor: "#e6e6e6",
                borderBottomWidth: 1,
              }}
            >
              <H3
                style={{
                  fontSize: 16,
                  fontFamily: "Lato",
                  fontWeight: "bold",
                  color: "#000",
                }}
              >
                {serviceType.name}
              </H3>
            </CardItem>
            {/* <CardItem style={{ flexDirection: "column" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <View style={{ width: 120 }}>
                  <Text style={style.itemHeading}>Processing Time:</Text>
                </View>
                <Text style={style.itemText}>
                  {serviceType?.processT}{" "}
                  Hours
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <View style={{ width: 120 }}>
                  <Text style={style.itemHeading}>Stay Period:</Text>
                </View>
                <Text style={style.itemText}>
                  {serviceType?.stayPeriod} days
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <View style={{ width: 120 }}>
                  <Text style={style.itemHeading}>Validity:</Text>
                </View>
                <Text style={style.itemText}>
                {serviceType?.validity} days
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  width: "100%",
                }}
              >
                <View style={{ width: 120 }}>
                  <Text style={style.itemHeading}>Entry:</Text>
                </View>
                <Text style={style.itemText}>
                {serviceType?.entry} days
                </Text>
              </View>
            </CardItem> */}
            <CardItem
              style={{
                paddingTop: 15,
                paddingBottom: 15,
                borderTopWidth: 1,
                borderTopColor: "#e6e6e6",
                borderBottomWidth: 1,
                borderBottomColor: "#e6e6e6",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View style={{ width: 120 }}>
                  <Text style={{ color: "#000", fontFamily: "Lato" }}>
                    Fees
                  </Text>
                </View>
                <Text
                  style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}
                >
                  {serviceType?.price} AED
                </Text>
              </View>
            </CardItem>
          </Card> : <View></View> }
        </View>
      </ScrollView>
    </>
  );
};
export default AboutService;

const style = StyleSheet.create({
  subheading: {
    marginLeft: 16,
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Lato",
    color: "#000",
  },
  iconStyle: {
    transform: [{ rotate: "135deg" }],
    fontSize: 10,
    backgroundColor: "#9d9494",
    color: "#9d9494",
  },
  ourServices: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 7,
    fontFamily: "Lato",
    color: "#fff",
  },
  paraText: {
    fontSize: 16,
    marginTop: 20,
    color: "#fff",
    fontFamily: "Lato",
    marginBottom: 20,
  },

  paraText2: {
    fontSize: 16,
    marginTop: 10,
    color: "#9d9494",
    fontFamily: "Lato",
    marginBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
  },
  itemHeading: {
    fontSize: 14,
    color: "#9d9494",
    marginTop: 10,
    fontFamily: "OpenSans",
  },
  itemText: {
    color: "#000",
    fontSize: 14,
    marginTop: 5,
    fontWeight: "500",
    fontFamily: "OpenSans",
    marginLeft: 10,
  },
});
