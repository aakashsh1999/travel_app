import React, { useState } from "react";
import Stepper from "react-native-stepper-ui";
import { View, Alert, Text, StyleSheet, ScrollView } from "react-native";
import ApplyNow from "./ApplyNow";
import { H3 } from "native-base";
import FillDetails from "./FillDetails";
import BookAppointment from './BookAppointment';
import UploadDocuments from './UploadDocuments';
import Payment from './Payment';
import Success from './Success';
import {useHistory} from 'react-router-dom';

const content = [
  <ApplyNow/>,
  <FillDetails/>,
  <UploadDocuments/>,
  <BookAppointment/>,
  <Payment/>,
  <Success/>,
];
export default StepScreen = () => {
  let history= useHistory();
  const [active, setActive] = useState(0);
  return (
    <ScrollView>
     <H3 style={style.heading}><Text>Choose Service</Text></H3>
      <Stepper
        active={active}
        content={content}
        onNext={() => setActive((p) => p + 1)}
        onBack={() => setActive((p) => p - 1)}
        onFinish={() => history.push('/')}
      />
    </ScrollView>
  );
};

const style = StyleSheet.create({
    heading:{
        marginTop:20,
        fontSize:16, 
        fontWeight:'bold',
        marginBottom:10,
        textAlign:'center'
    }
});