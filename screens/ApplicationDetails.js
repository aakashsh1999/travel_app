import {
  Text,
  Icon,
  Radio,
  Body,
  Card,
  Left,
  Button,
  CardItem,
  H3,
  ListItem,
  List,
} from "native-base";
import React from "react";
import {
  ScrollView,
  View,
  Image,
  Platform,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import TouristGrid from "../component/TouristCardGrid";
import { useFonts } from "expo-font";
import { useParams } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import { useHistory } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ApplicationDetails = () => {
  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/openSans.ttf"),
    Lato: require("../assets/fonts/lato.ttf"),
  });

  const history = useHistory();
  let { applicationId } = useParams();
  const [application, setapplication] = React.useState(null);
  const [serviceCard, setServiceCard] = React.useState(null);
  React.useEffect(() => {
    getapplication();
  }, []);

  React.useEffect(() => {
    const backAction = () => {
      history.push("/history");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  const getapplication = async () => {
    let application = await (
      await fetch(`http://13.234.123.221:8000/service/${applicationId}`, {
        method: "GET",
        headers: {
          "x-access-token": await AsyncStorage.getItem("token"),
        },
      })
    ).json();
    setapplication(application);
    const serviceDetail = application.serviceCategory.serviceDetail;
    let sub = serviceDetail.find(ele=>ele.name==application.serviceDetail )
    setServiceCard([sub]);
  };
  
  function dateFormat(d) {
    const month_names_short= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let da= new Date(d);
    const ye = da.getFullYear();
    const mo = month_names_short[da.getMonth()-1];
    const day = da.getDate();

    return `${day} ${mo}, ${ye}`;
  }

  if (!application) {
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
      <View
        style={{
          borderBottomColor: "#e6e6e6",
          borderBottomWidth: 1,
          paddingLeft: 16,
          paddingBottom: 24,
        }}
      >
        <View style={{ marginTop: 20 }}>
          <View style={style.title}>
            <Icon
              type="FontAwesome"
              name="arrow-circle-o-left"
              style={{ fontSize: 24, marginBottom: 7 }}
              onPress={() => history.push("/history")}
            />
            <Text style={style.heading}>Application Details</Text>
          </View>
          <Image source={require("../assets/clipath.png")} />
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <View>
              <View>
                <Text style={style.itemHeading}>Date</Text>
                <Text style={style.itemText}>
                  {dateFormat(application.createdAt)}
                </Text>
              </View>
              <View>
                <Text style={style.itemHeading}>Service Id</Text>
                <Text style={style.itemText}>
                  {application.serviceCategory.scode}
                </Text>
              </View>
              <View>
                <Text style={style.itemHeading}>Mode</Text>
                <Text style={style.itemText}>
                  {application.transaction && application.transaction.ptype}
                </Text>
              </View>
            </View>
            <View style={{ width: "50%" }}>
              <View>
                <Text style={style.itemHeading}>Transaction ID</Text>
                <Text style={style.itemText}>
                  {(application.transaction && application.transaction._id)}
                </Text>
              </View>
              <View>
                <Text style={style.itemHeading}>Service Name</Text>
                <Text style={style.itemText}>
                  {application.serviceCategory.name}
                </Text>
              </View>
              <View>
                <Text style={style.itemHeading}>Amount(AED)</Text>
                <Text style={style.itemText}>
                  {(application.transaction &&
                    application.transaction.amount) ||
                    "0"}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={style.itemHeading}>Status</Text>
            <View
              style={
                application.status == "Success"
                  ? style.successChip
                  : style.pendingChip
              }
            >
              <Text
                style={
                  application.status == "Success"
                    ? style.successStyle
                    : style.pendingStyle
                }
              >
                {application.status}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <ScrollView>
        <View style={{ padding: 15 }}>
          <View style={style.stepIndicator}>
            <Radio selected={true} selectedColor="#c7a006" />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>
              Appointment Booked
            </Text>
          </View>
          <View
            style={{
              marginLeft: 30,
              marginBottom: 10,
              borderColor: "#e6e6e6",
              borderWidth: 1,
              padding: 14,
              flexDirection: "row",
            }}
          >
            {application.status !== "Success" ? (
              <Image
                source={require("../assets/clock.png")}
                style={{ width: 30, height: 30, marginTop: 2 }}
              />
            ) : (
              <Image
                source={require("../assets/checked.png")}
                style={{ width: 24, height: 24 }}
              />
            )}
            <Body>
              {application.status !== "Success" ? (
                <Text
                  style={{ fontSize: 14, color: "#9d9494", marginLeft: 10 }}
                >
                  Your {application.status}. You can keep track of your
                  application from your “History”.
                </Text>
              ) : (
                <Text
                  style={{ fontSize: 14, color: "#9d9494", marginLeft: 10 }}
                >
                  Your payment was successful and we have also reserved the slot
                  for your appointment. You can keep track of your application
                  from your “History”.
                </Text>
              )}
            </Body>
          </View>
          <View style={style.stepIndicator}>
            <Radio selected={true} selectedColor="#c7a006" />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>
              Appointment Date
            </Text>
          </View>
          <View style={{ marginLeft: 30 }}>
            {application.appointment ? (
              <Card style={style.card}>
                <Left>
                  <View style={style.labelBox}>
                    <H3 style={style.labelheading}>
                      {application.appointment.appt_date}
                    </H3>
                    <Text style={{ fontSize: 12 }}>
                      {application.appointment.appt_month}{" "}
                      {application.appointment.appt_year}
                    </Text>
                  </View>
                </Left>
                <View style={{ width: 200, marginRight: 20 }}>
                  <LinearGradient
                    style={{
                      width: 90,
                      height: 19,
                      justifyContent: "center",
                      marginTop: 2,
                      borderRadius: 50,
                    }}
                    colors={["#c7a006", "yellow", "#c7a006"]}
                    start={[1, 0]}
                    end={[0, 2.57]}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        fontFamily: "Lato",
                        padding: 5,
                        textTransform: "uppercase",
                        fontWeight: "500",
                      }}
                    >
                      Upcoming
                    </Text>
                  </LinearGradient>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      marginBottom: 10,
                      marginTop: 14,
                    }}
                  >
                    {application.appointment.title}
                  </Text>
                  <Text style={{ color: "#9d9494" }}>11:00 - 12:00</Text>
                </View>
              </Card>
            ) : (
              <View
                style={{
                  width: "100%",
                  marginBottom: 10,
                  borderColor: "#e6e6e6",
                  borderWidth: 1,
                }}
              >
                <ListItem style={{ padding: 5, borderColor: "#fff" }}>
                  <Text
                    style={{ fontSize: 14, color: "#9d9494", marginLeft: 10 }}
                  >
                    You dont have any Appointment.
                  </Text>
                </ListItem>
              </View>
            )}
          </View>

      {application.docs.length !== 0 ?<View>
      <View style={style.stepIndicator}>
            <Radio selected={true} selectedColor="#c7a006" />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>
              Documents Uploaded
            </Text>
          </View>

          <View
            style={{
              marginLeft: 30,
              marginBottom: 10,
              borderColor: "#e6e6e6",
              borderWidth: 1,
            }}
          >
            {application.docs.length !== 0 ? (
              application.docs.map((data, index) => (
                <ListItem
                  style={{ padding: 5, borderColor: "#fff" }}
                  key={index}
                >
                  <Icon type="Feather" name="square" style={style.iconStyle} />
                  <Text style={style.listText}>{data.name}</Text>
                </ListItem>
              ))
            ) : (
              <ListItem style={{ borderColor: "#fff" }}>
                <Text
                  style={{ fontSize: 14, color: "#9d9494", marginLeft: 10 }}
                >
                  No documents uploaded.
                </Text>
              </ListItem>
            )}
          </View> 
          </View> : <View></View>}
          <View style={style.stepIndicator}>
            <Radio selected={true} selectedColor="#c7a006" />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>
              Details Provided
            </Text>
          </View>
          <View
            style={{
              marginLeft: 30,
              marginBottom: 10,
              borderColor: "#e6e6e6",
              borderWidth: 1,
              padding: 20,
            }}
          >
            <View>
              <Text style={style.infoHeading}>Name</Text>
              <Text style={style.infoText}>
                {application && application.users.name}
              </Text>
            </View>
            <View>
              <Text style={style.infoHeading}>Date of Birth</Text>
              <Text style={style.infoText}>
                {application.dob ? application.dob : ""}
              </Text>
            </View>
            <View>
              <Text style={style.infoHeading}>Address</Text>
              <Text style={style.infoText}>
                {application.users.address !== undefined
                  ? application.users.address.addressLineOne
                  : ""}
              </Text>
              <Text style={style.infoText}>
                {application.users.address !== undefined
                  ? application.users.address.addressLineTwo
                  : ""}{" "}
                {application.users.address !== undefined
                  ? application.users.address.city
                  : ""}
              </Text>
              <Text style={style.infoText}>
                {application.users.address !== undefined
                  ? application.users.address.state
                  : ""}{" "}
                {application.users.address !== undefined
                  ? application.users.address.country
                  : ""}
              </Text>
            </View>
          </View>
          <View style={style.stepIndicator}>
            <Radio selected={true} selectedColor="#c7a006" />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>Service Chosen</Text>
          </View>
          <View
            style={{
              marginLeft: 30,
              marginBottom: 120,
              borderColor: "#e6e6e6",
              borderWidth: 1,
              padding: 20,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {application && application.serviceCategory.name}
            </Text>
           
         {serviceCard && Array.isArray(serviceCard) && serviceCard.map((data, index) => 
              <Card
                style={{
                  borderWidth: 1,
                  borderColor: "#e6e6e6",
                  marginBottom: 20,
                }}
                key={index}
              >
                <CardItem
                  style={{ borderBottomWidth: 1, borderColor: "#e6e6e6" }}
                >
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <H3 style={{ fontFamily: "Lato",  fontSize:16}}>
                    {data?.name}
                    </H3>
                    </View>
                    {/* <H3 style={{ fontSize:14, fontFamily: "Lato", fontWeight: "500", marginBottom:10, marginTop:10 }}>
                      {data?.hours} Hours
                    </H3>
                  </View>
                </CardItem>
                <CardItem body>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <View style={{ backgroundColor: "#fff" }}>
                      <Text style={style.gridHeading}>Processing Time</Text>
                      <Text style={style.text}>
                        Upto {data?.processT} Days
                      </Text>
                    </View>

                    <View style={{ backgroundColor: "#fff" }}>
                      <Text style={style.gridHeading}>Stay Period</Text>
                      <Text style={style.text}>
                        {data?.stayPeriod} Days
                      </Text>
                    </View>

                    <View style={{ backgroundColor: "#fff" }}>
                      <Text style={style.gridHeading}>Validity</Text>
                      <Text style={style.text}>
                         {data?.validity} Days
                      </Text>
                    </View>
                  </View>
                </CardItem>
                <CardItem>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <View style={{ backgroundColor: "#fff" }}>
                      <Text style={style.gridHeading}>Entry</Text>
                      <Text style={style.text}>
                        {data?.entry}
                      </Text>
                    </View>
                    <View
                      style={{ backgroundColor: "#fff", marginLeft: "37%" }}
                    >
                      <Text style={style.gridHeading}>Fees</Text>
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 20,
                          fontWeight: "bold",
                          marginTop: 5,
                          fontFamily: "OpenSans",
                        }}
                      >
                        {data?.price} AED
                      </Text>
                    </View>
                  </View> */}
                </CardItem>
              </Card>)
           }
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 7,
    marginLeft: 5,
    fontFamily: "Lato",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemHeading: {
    fontSize: 12,
    color: "#9d9494",
    marginTop: 10,
  },
  itemText: {
    color: "#000",
    fontSize: 14,
    marginTop: 10,
    fontWeight: "500",
  },
  card: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    marginBottom: 15,
  },
  laodingButton: {
    margin: 40,
    width: 190,
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    alignSelf: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 15,
    textTransform: "uppercase",
  },
  listContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
  },
  labelBox: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
  },
  labelheading: {
    fontWeight: "bold",
    fontSize: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    padding: 10,
    flexDirection: "row",
    marginBottom: 20,
  },
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  iconStyle: {
    transform: [{ rotate: "135deg" }],
    fontSize: 10,
    backgroundColor: "#9d9494",
    color: "#9d9494",
  },
  label: {
    fontSize: 14,
    marginBottom: 7,
    marginTop: 6,
    fontWeight: "500",
  },
  listText: { fontSize: 16, marginLeft: 13 },
  infoHeading: {
    fontSize: 12,
    color: "#707070",
    marginTop: 20,
  },
  infoText: {
    color: "#000",
    fontSize: 14,
    marginTop: 4,
  },
  gridHeading: {
    fontSize: 12,
    color: "#9d9494",
    fontFamily: "OpenSans",
  },
  text: { color: "#000", fontSize: 14, marginTop: 5, fontFamily: "OpenSans" },
  successStyle: {
    fontSize: 14,
    color: "rgb(12, 190, 12)",
  },
  successChip: {
    borderRadius: 24,
    width: 140,
    backgroundColor: "rgba(12,190,12, 0.2)",
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  pendingChip: {
    borderRadius: 24,
    width: 140,
    backgroundColor: "rgba(76, 160, 221, 0.2)",
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  pendingStyle: {
    fontSize: 14,
    color: "rgb(76,160,221)",
  },
  gridView: {
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    flex:1,
    justifyContent:'center'
  },
  text:{color:'#000', fontSize:14, marginTop:5, fontFamily:'OpenSans'}
});
