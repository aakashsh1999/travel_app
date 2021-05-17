import React from 'react';
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

export default function App() {
  return (
    <>
    <NativeRouter>
      <TopHeader/>
      <Route exact path="/" component={Login}/>
      <Route exact path="/home" component={Homescreen}/>
      <Route exact path="/drawer" component={SlideDrawer}/>
      <Route exact path="/appointment" component={Appointment}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/mydocument" component={MyDocument}/>
      <Route exact path="/history" component={History}/>
      <Route exact path="/applynow" component={Stepper}/>
      <Route exact path="/about" component={AboutScreen}/>
      <Route exact path="/contact" component={Contact}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/create" component={CreateAccount}/>
      <Route exact path="/forget" component={ForgetAccount}/>
    </NativeRouter>
  </>
  );
}

