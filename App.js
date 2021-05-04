/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState ,useEffect ,useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import 'react-native-gesture-handler';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity
} from 'react-native';
import Carousel from './src/Carousel';

const Loading = () => {
  return(
    <ActivityIndicator
    style={[styles.container ,styles.loading]}
    color="blue"
    size="large"
    />
  )
}

const Home = ({navigation}) => {
  return(
    <>
    <View style={styles.container}>
      <Button
      onPress={() => navigation.replace('webview')}
      title="START"
      />
       <Button
       
      onPress={() => navigation.navigate('carousel')}
      title="carousel"
      />
    </View>
    </>
  )
}

const WebviewScreen = ({navigation}) => {
  const webviewref = useRef(null);
  const [kembali , setKembali] = useState(false);
  const [maju , setMaju] = useState(false);
  const [urlSekarang , setUrlSekarang] = useState('https://niomic.com/');
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress",backAction);

    () => BackHandler.removeEventListener("hardwareBackPress",backAction);
  },[kembali])

  const backAction = () => {
    if(kembali){
      webviewref.current.goBack();
    }else if(!kembali){
      BackHandler.exitApp();
    }else{
      navigation.goBack();
      // BackHandler.exitApp();
    }
    return true;
   }

   const forwardAction = () => {
     if(webviewref.current) webviewref.current.goForward();
   }
   

  return(
    <>
    {console.log('maju ',maju)}
   <WebView
   ref={webviewref}
   source={{uri: 'https://niomic.com/'}}
   startInLoadingState
   renderLoading={Loading}
   onNavigationStateChange={navState => {
     setKembali(navState.canGoBack);
     setMaju(navState.canGoForward);
     setUrlSekarang(navState.url);

   }}
   />
   <View style={styles.navigationContainer}>
     <TouchableOpacity disabled={!kembali} onPress={backAction}> 
       <Text style={[styles.btn, !kembali && {color:'grey'}]}>Back</Text>
     </TouchableOpacity>

     <TouchableOpacity disabled={!maju} onPress={forwardAction} >
       <Text style={[styles.btn, !maju && {color:'grey'}]}>Forward</Text>
      </TouchableOpacity>
   </View>
    </>
  )
}

const Stack = createStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen name ="Home" component={Home}/>
         <Stack.Screen name ="webview" component={WebviewScreen}/>
         <Stack.Screen name ="carousel" component={Carousel}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  loading:{
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  navigationContainer: {
    backgroundColor: '#b43575',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btn: {
    color: 'white',
    fontSize: 24
  }
})

export default App;
