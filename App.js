import { AndroidBackButton, NativeRouter, Route } from 'react-router-native';
import React,{useEffect} from 'react';
import {BackHandler, Alert} from 'react-native';
import AboutScreen from './screens/AboutScreen';
import AboutService from './screens/AboutService';
import ApplicationDetails from './screens/ApplicationDetails';
import ApplyNow from './screens/stepscreens/ApplyNow';
import Appointment from './screens/Appointment';
import BookAppointment from './screens/stepscreens/BookAppointment';
import Contact from './screens/Contact';
import CreateAccount from './screens/CreateAccount';
import FillDetails from './screens/stepscreens/FillDetails';
import ForgetAccount from './screens/ForgetAccount';
import History from "./screens/History";
import Homescreen from "./screens/Homescreen";
import Login from './screens/Login';
import MyDocument from './screens/MyDocument';
import Payment from './screens/stepscreens/Payment'
import Profile from './screens/Profile';
import ResetPassword from './screens/ResetPassword';
import SplashScreen from './component/SplashScreen'
import Stepper from "./screens/stepscreens/Stepper";
import Success from './screens/stepscreens/Success';
import TopHeader from './component/TopHeader';
import UploadDocuments from './screens/stepscreens/UploadDocuments';
import {useFonts} from 'expo-font';

export default function App() {

  const [loaded] = useFonts({
    OpenSans: require('./assets/fonts/openSans.ttf'),
    Lato: require('./assets/fonts/lato.ttf'),
  });
  //Splash Screen
  const [isVisible, setIsVisible] =React.useState(true);
  const Hide_Splash_Screen=()=>{  
      setIsVisible(false);
  }  
  React.useEffect(()=>{
    setTimeout(Hide_Splash_Screen,5000);
    
    const backAction = () => {
     Alert.alert("Hold on!", "Are you sure you want to exit App?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  })

  if(isVisible){
  return <SplashScreen/>
  }
  return (
    <NativeRouter>
      
      <TopHeader>
      <Route exact path="/" component={Homescreen}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/appointment" component={Appointment}/>
      <Route exact path="/profile" component={Profile}/>
      {/* <Route exact path="/mydocument" component={MyDocument}/>  */}
      <Route exact path="/history" component={History}/>
      <Route exact path="/apply" component={ApplyNow}/>
      <Route exact path="/about" component={AboutScreen}/>
      <Route exact path="/contact" component={Contact}/>
      <Route exact path="/application/:applicationId" component={ApplicationDetails}/>
      <Route exact path="/create" component={CreateAccount}/>
      <Route exact path="/forget" component={ForgetAccount}/>
      <Route exact path="/reset" component={ResetPassword}/>
      <Route exact path="/fill" component={FillDetails}/>
      <Route exact path="/aboutservice/:slug" component={AboutService}/>
      <Route exact path="/upload" component={UploadDocuments}/>
      <Route exact path="/book" component={BookAppointment}/>
      <Route exact path="/payment" component={Payment}/>
      <Route exact path='/stepper' component={Stepper}/>
      <Route exact path='/success' component={Success}/>
    </TopHeader>
    </NativeRouter>
  );
}

