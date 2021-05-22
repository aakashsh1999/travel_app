import React,{useEffect} from 'react';
import { AndroidBackButton, NativeRouter, Route} from 'react-router-native';
import TopHeader from './component/TopHeader';
import Profile from './screens/Profile';
import SlideDrawer from './component/Drawer';
import Appointment from './screens/Appointment';
import MyDocument from './screens/MyDocument';
import Homescreen from "./screens/Homescreen";
import CreateAccount from './screens/CreateAccount';
import ForgetAccount from './screens/ForgetAccount';
import Login from './screens/Login';
import Contact from './screens/Contact';
import AboutScreen from './screens/AboutScreen';
import History from "./screens/History";
import Stepper from "./screens/stepscreens/Stepper";
import ApplicationDetails from './screens/ApplicationDetails';
import ResetPassword from './screens/ResetPassword';
import Success from './screens/stepscreens/Success';
import AboutService from './screens/AboutService';
import FillDetails from './screens/stepscreens/FillDetails';
import ApplyNow from './screens/stepscreens/ApplyNow';
import UploadDocuments from './screens/stepscreens/UploadDocuments';
import BookAppointment from './screens/stepscreens/BookAppointment';
import Payment from './screens/stepscreens/Payment'
import SplashScreen from './component/SplashScreen'
import ModalCard from './component/ModalCard';

export default function App() {
  //Splash Screen
  const [isVisible, setIsVisible] =React.useState(true);
  const Hide_Splash_Screen=()=>{  
      setIsVisible(false);
  }  
  React.useEffect(()=>{
    setTimeout(Hide_Splash_Screen,5000);
  })

  if(isVisible){
  return <SplashScreen/>
  }
  return (
    <>
    <NativeRouter>
      <TopHeader/>
      <Route exact path="/" component={Homescreen}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/drawer" component={SlideDrawer}/>
      <Route exact path="/appointment" component={Appointment}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/mydocument" component={MyDocument}/>
      <Route exact path="/history" component={History}/>
      <Route exact path="/apply" component={ApplyNow}/>
      <Route exact path="/about" component={AboutScreen}/>
      <Route exact path="/contact" component={Contact}/>
      <Route exact path="/application" component={ApplicationDetails}/>
      <Route exact path="/create" component={CreateAccount}/>
      <Route exact path="/forget" component={ForgetAccount}/>
      <Route exact path="/reset" component={ResetPassword}/>
      <Route exact path="/fill" component={FillDetails}/>
      <Route exact path="/success" component={Success}/>
      <Route exact path="/aboutservice/:slug" component={AboutService}/>
      <Route exact path="/upload" component={UploadDocuments}/>
      <Route exact path="/book" component={BookAppointment}/>
      <Route exact path="/payment" component={Payment}/>
      <Route exact path='/stepper' component={Stepper}/>
      <Route exact path='/success' component={Success}/>
      <Route exact path='/model' component={ModalCard}/>
    </NativeRouter>
  </>
  );
}

