import React, {useState} from 'react'
import {Text,
View,
StyleSheet,
StatusBar,
TouchableOpacity,
Image,
Button
} from 'react-native';

import {RNCamera} from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome5';

const PendingView = () =>(
  <View style={{flex:1,
  justifyContent: 'center',
  alignItems: 'center'}}>
    <Text style={{fontSize:30,
    color: 'black'}}>Loading...</Text>
  </View>
)


const App = () => {

  const [image, setImage] = useState(null)

  const takePicture = async (camera) => {
    try{
      const options = {quality: 0.9, base64: false}
      const data = await camera.takePictureAsync(options)
      setImage(data.uri)

    }catch (error){
      console.warn(error)
    }
  }
  return (
    <>
    <View style={styles.container}>
      {image ? (
        <View style={styles.preview}>
        <Text style={styles.camtext}>Hey Buddy Your New Profile</Text>

        <Image 
        style={styles.clicked}
        source={{uri: image, width: '100%', height: '80%'}}/>
        <Button title="Click new Image"
        onPress={() => setImage(null)}
        color='#8D3DAF'>

        </Button>
        </View>
      ) : (
        <RNCamera style={styles.preview}
        type={RNCamera.Constants.Type.front}
        captureAudio={false}
        flashMode={RNCamera.Constants.FlashMode.auto}
        fixOrientation={true}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'To capture your photo',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel'
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio',
          message: 'To record your audio',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel'
        }}>

          {({camera, status}) => {
            if(status !== 'READY') return <PendingView/>
            return(
              <View styles={styles.iconView}>
                <TouchableOpacity 
                style={styles.capture}
                onPress={() => takePicture(camera)}>
                 <Icon name="camera" size={50} color='#CAD5E2' style={styles.icon}>
                   </Icon>
                </TouchableOpacity>
               
              </View>
            )
          }}

        </RNCamera>
      )}
    </View>
    </>
  )
}



export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#242B2E'
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  capture: {
    flex: 1,
    //backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'column-reverse'
  },
  camtext :{
    backgroundColor: '#CAD5E2',
    color: '#000000',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 20
  },
  clicked: {
    width: 300,
    height: 300,
    borderRadius: 150
  },
  newImage: {
    backgroundColor: '#8D3DAF'
  },
  icon: {
   
  },
  iconView: {
  
  }

})