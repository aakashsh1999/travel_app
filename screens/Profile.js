import { H2, Container, Text, Content, Card, CardItem, Left, ListItem, Icon, Button } from 'native-base';
import { View, Image, StyleSheet, ImageBackground, ScrollView, BackHandler, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useHistory } from 'react-router-native';
import Bottombar from '../component/Bottombar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default Profile = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = React.useState(false);
  const [user, setUser] = React.useState([]);
  const [Id, setId] = React.useState(null);
  const [application, setApplication] = React.useState([]);
  const [address, setAddress] = React.useState("");



  useEffect(() => {
    getData();
  }, [])

  React.useEffect(() => {
    const backAction = () => {
      history.push('/');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  const getData = async () => {
    const id = await AsyncStorage.getItem('id');
    setId(id);
    const token = await AsyncStorage.getItem('token');
    let user = await (
      await fetch(`http://3.109.106.108:8000/users/${id}`, {
        method: "GET",
        headers: {
          "x-access-token": token
        },
      })
    ).json();
    setUser(user.data);
    setAddress(user.data.address);

    let application = await (
      await fetch(
        `http://3.109.106.108:8000/service/application/${id}`,
        {
          method: "GET",
          headers: {
            "x-access-token": token
          },
        }
      )
    ).json();
    setApplication(application)

    if (await AsyncStorage.getItem('token')) {
      setIsLogin(true);
    }
  }
  const logout = async () => {
    Alert.alert("Hold on!", "Are you sure you want to logout?", [
      {
        text: "NO",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: async () => { await AsyncStorage.clear(); history.push('/login') } }
    ]);
  }

  if (!user && !application && !address) {
    return <ActivityIndicator size="large" color="yellow" style={{ alignSelf: 'center', margin: 20 }} />
  }
  return (
    <Container>
      <Content >
        <View style={{ marginTop: 20, marginLeft: 16 }}>
          <H2 style={style.profileHeading}>Profile</H2>
          <Image source={require('../assets/clipath.png')} />
        </View>
        <ScrollView style={{ padding: 16 }}>
          <Card style={style.card}>
            <ImageBackground source={require('../assets/profilebg.png')} style={style.image}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
                <View style={{ marginLeft: 20 }}>
                  <View>
                    <Text style={{ fontSize: 12, color: "#ffffff", marginTop: 20 }}>Name</Text>
                    <Text style={{ color: '#fff', fontSize: 16, marginTop: 4 }}>{user && user.name}</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: '#ffffff', marginTop: 20 }}>Total Number of applications</Text>
                    <Text style={{ color: '#fff', fontSize: 16, marginTop: 4 }}>{application.count}</Text>
                  </View>
                </View>
              </View>
              {/* <TouchableOpacity style={{
                marginLeft:'15%',
                marginTop:5
              }}
              onPress={() => history.push('/edit_profile')}
              >
              <Text style={{ color: '#ffffff', fontSize:12, textDecorationLine:'underline'}}>Edit Profile</Text>
              </TouchableOpacity> */}
            </ImageBackground>
            <Content style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
              <View>
                <Text style={style.infoHeading}>Phone Number</Text>
                <Text style={style.infoText}>{user && user.phone}</Text>
              </View>
              <View>
                <Text style={style.infoHeading}>Email</Text>
                <Text style={style.infoText}>{user && user.email}</Text>
              </View>
              <View>
                <Text style={style.infoHeading}>Address</Text>
                <Text style={style.infoText}>{address ? address.addressLineOne : ""}</Text>
                <Text style={style.infoText}>{address ? address.addressLineTwo : ""} {address ? address.city : ""}</Text>
                <Text style={style.infoText}>{address ? address.state : ""} {address ? address.country : ""}</Text>
              </View>
            </Content>
          </Card>
          <View style={{ borderColor: "#f4f4f4", borderWidth: 1 }}>
            <TouchableOpacity onPress={() => history.push('/appointment')}>
              <ListItem style={style.list}>
                <Text>Appointments</Text>
              </ListItem>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=> history.push('/mydocument')}>
            <ListItem style={style.list}>
                <Text>My Documents</Text>
            </ListItem>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => history.push('/history')}>
              <ListItem style={style.list}>
                <Text>History</Text>
              </ListItem >
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logout()}>
              <ListItem style={style.list}>
                <Text>Logout</Text>
              </ListItem>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Content>
      <Bottombar />
    </Container>
  )
}

const style = StyleSheet.create({
  profileHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7
  },
  image: {
    width: "100%",
    height: 150
  },
  profileImage: {
    width: 92,
    height: 92,
    borderRadius: 50,
  },
  infoHeading: {
    fontSize: 12, color: '#707070', marginTop: 20
  },
  infoText: {
    color: '#000', fontSize: 16, marginTop: 4
  },
  card: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    marginBottom: 20
  },
  list: {
    borderColor: '#fff',
    height: 62
  }
})

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});