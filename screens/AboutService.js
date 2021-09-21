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
import { Image, ScrollView, StyleSheet, Text, BackHandler, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { useParams, useHistory } from "react-router";
import AsyncStorage from '@react-native-async-storage/async-storage'

const AboutService = (props) => {
  const history = useHistory();
  const [service, setService] = React.useState({});
  const [serviceType, setServiceType] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [toContact, setToContact] = React.useState(null);
  const [subOpt, setSubOpt] = React.useState(null);

  const { slug } = useParams();
  const service_url = `http://13.234.123.221:8000/serviceCategory/${slug}`;
  React.useEffect(() => {
    getServiceSlugDetail();
  }, []);
  const getServiceSlugDetail = async () => {
    const services = await (await fetch(service_url, { method: "GET" })).json();


    if (services.data.category.length > 0) {
      const serviceData = {
        deleted: services.data.raw.deleted,
        _id: services.data.raw._id,
        name: services.data.raw.name,
        scode: services.data.raw.scode,
        overview: services.data.raw.overview,
        serviceDetail: services.data.raw.serviceDetail,
        description: services.data.raw.description,
        slug: services.data.raw.slug,
      };
      setService(serviceData);
      setSubOpt(
        services.data.category.map((e) => ({
          text: e,
          value: e,
          key: e,
        }))
      );
    } else {
      const serviceData = {
        deleted: services.data.raw.deleted,
        _id: services.data.raw._id,
        name: services.data.raw.name,
        scode: services.data.raw.scode,
        overview: services.data.raw.overview,
        serviceDetail: services.data.raw.serviceDetail,
        description: services.data.raw.description,
        slug: services.data.raw.slug,
      };
      let serviceOptions = services.data.raw.serviceDetail.map((e) => ({
        text: e.name,
        value: e._id,
        key: e._id,
      }));
      setOptions(serviceOptions);
      setService(serviceData);
    }
  };
  const getserviceType = async (val) => {
    let sub = service.serviceDetail.find((o) => o._id === val);
    setShow(true);
    setServiceType(sub);
  };
  console.log(service?.name)
  const handleSub = async (ele) => {
    setOptions(
      service.serviceDetail
        .filter((x) => x.type.toString() === ele.toString())
        .map((e) => ({
          text: e.name,
          value: e._id,
          key: e._id,
        }))
    );
    // getserviceType(val);
  };
  const handleSubmit = async (slug, name, subCatId, subCatName, type) => {
    let token = await AsyncStorage.getItem('token');
    if (!token) {
      history.push('/login');
    }
    await AsyncStorage.setItem("serviceSlug", slug);

    let jsonPostData = {
      serviceName: name,
    };
    let userId = await AsyncStorage.getItem("id");
    console.log(userId)
    if(!userId){
      AsyncStorage.clear();
      history.push('/login');
    }
    let url = `http://13.234.123.221:8000/service/${userId}`;
    const result = await (
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'x-access-token': await AsyncStorage.getItem('token'),
        },
        body: JSON.stringify(jsonPostData),
      })
    ).json();
    console.log(result)

    await AsyncStorage.setItem("applicationId", result?.data?._id);
    await AsyncStorage.setItem("subCatId", subCatId);
    jsonPostData = {
      subCat: subCatName,
      cat: type,
    };

    url = `http://13.234.123.221:8000/service/type/${result.data._id}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': await AsyncStorage.getItem('token'),
      },
      body: JSON.stringify(jsonPostData),
    });

    history.push(`/fill`);
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

  function toggleSubCategory() {
    setOptions("");
    setShow(!show)
  }
  function redirectToContact(name) {
    if (name?.toLowerCase() === 'company stamp' || name?.toLowerCase() === 'pro services' || name?.toLowerCase() === 'company formation' || name?.toLowerCase() === 'dubai economic servies') {
      setToContact(true)
    }
    else {
      setToContact(false)
    }
  }
  React.useEffect(() => { 
    redirectToContact(service?.name);
  })
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
        <View style={{ padding: 10 }}>
        </View>
        {toContact ?
        <View style={{padding:16,   flex:2}}>
         <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0, 1.5]} style={{ width: "100%", height: 50, borderRadius: 25, padding:18}}>
          <TouchableOpacity onPress={() => history.push('/info')}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', fontFamily: 'OpenSans',textAlignVertical:'center', textAlign: 'center', margin: 'auto' }}>APPLY NOW</Text>
          </TouchableOpacity>
        </LinearGradient> 
        </View>
        :
          <View style={{ padding: 16}}>
            <View style={{ borderColor: '#e6e6e6', borderWidth: 1, borderRadius: 4 }}>
              <Picker
                mode="dropdown"
                placeholderStyle={{ color: "red" }}
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: "100%", height: 40 }}
                selectedValue={subOpt}
                onValueChange={(value, key) => {
                  {
                    key === 0 ?
                      toggleSubCategory()
                      : handleSub(value);
                  }
                }}
              >
                <Picker.Item
                  label="Select Category"
                  disabled
                  value={null}
                  key={0}
                ></Picker.Item>
                {subOpt?.map((ele, index) => (<Picker.Item label={ele.text} value={ele.value} key={index + 1} />))}
              </Picker>
            </View>
            <View style={{ margin: 15 }}></View>
            {options.length >= 1 && <View style={{ borderColor: '#e6e6e6', borderWidth: 1, borderRadius: 4 }}>
              <Picker
                mode="dropdown"
                placeholderStyle={{ color: "red" }}
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: "100%", height: 40 }}
                selectedValue={options}
                onValueChange={(value) => {
                  getserviceType(value);
                }}
              >
                <Picker.Item
                  label="Select SubCategory"
                  disabled
                  value={null}
                  key={0}
                ></Picker.Item>
                {options.map((ele, index) => (<Picker.Item label={ele.text} value={ele.value} key={index + 1} />))}
              </Picker>
            </View>}
          </View>}
        {show ? <View style={{ marginBottom: 20 }}>
          <H3 style={style.subheading}>Documents Required</H3>
          {serviceType?.reqDocs.map((data, index) => <ListItem key={index} style={{ height: 52, borderBottomColor: "#fff" }}>
            <Icon type="Feather" name="square" style={style.iconStyle} />
            <Body>
              <Text style={{ fontSize: 14, marginLeft: 16, color: "#9d9494" }}>
                {data}
              </Text>
            </Body>
          </ListItem>)}
        </View> : <View></View>}
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
                  width: '70%'
                }}
              >
                {serviceType?.name}
              </H3>
              <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0, 1.5]} style={{ width: 100, height: 30, paddingTop: 7, borderRadius: 20 }}>
                <TouchableOpacity onPress={() => handleSubmit(
                  service?.slug,
                  service?.name,
                  serviceType?._id,
                  serviceType?.name,
                  serviceType?.type
                )}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'OpenSans', textAlign: 'center', margin: 'auto' }}>APPLY NOW</Text>
                </TouchableOpacity>
              </LinearGradient>
            </CardItem>
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
          </Card> : <View></View>}
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
