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
  BackHandler
} from 'react-native';

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
      onPress={() => navigation.navigate('webview')}
      title="GO TO INFINITE"
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
    }else{
      navigation.goBack();
    }
    return true;
   }
   

  return(
    <>
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
  }
})

export default App;
