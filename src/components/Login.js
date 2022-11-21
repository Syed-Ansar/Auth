import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {UserContext} from '../../App';
import ClipboardComp from './Clipboard';
import * as ScreenOrientation from 'expo-screen-orientation';

function Login() {
  const {user, setUser} = useContext(UserContext);
  const navigation = useNavigation();
  const [orientations, setOrientation] = useState(null);

  GoogleSignin.configure({
    webClientId:
      '322535332988-k55tjkepr4e1mpjj218lljjumj7lcr05.apps.googleusercontent.com',
  });
  // 322535332988-k55tjkepr4e1mpjj218lljjumj7lcr05.apps.googleusercontent.com

  const SignInWithGoogle = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_signin = auth().signInWithCredential(googleCredential);

    user_signin
      .then(result => {
        // console.log('result' + result);
        setUser(result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  async function changeScreenOrientationToPotratit() {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.DEFAULT,
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function changeScreenOrientationToLandscape() {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE,
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function changeScreenOrientationListener() {
    try {
      await ScreenOrientation.addOrientationChangeListener();
    } catch (error) {
      console.log(error);
    }
  }
  async function changeScreenOrientation() {
    try {
      const ori = await ScreenOrientation.getOrientationAsync();
      if (ori === 1) {
        try {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE,
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT,
          );
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getScreenOrientation() {
    const ori = await ScreenOrientation.getOrientationAsync();
    console.log(ori);
  }

  useEffect(() => {
    (async () => {
      const ori = await ScreenOrientation.getOrientationAsync();
      console.log(ori);
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable onPress={SignInWithGoogle} style={styles.btn}>
          <Text style={styles.textlg}>Google Sign-In</Text>
        </Pressable>
        <ClipboardComp />
      </View>
      <Pressable onPress={changeScreenOrientationToPotratit}>
        <Text style={[styles.textlg, styles.logout]}>Orientation Potrait</Text>
      </Pressable>
      <Pressable onPress={changeScreenOrientation}>
        <Text style={[styles.textlg, styles.logout]}>
          Orientation change event
        </Text>
      </Pressable>
      <Pressable onPress={changeScreenOrientationToLandscape}>
        <Text style={[styles.textlg, styles.logout]}>
          Orientation Landscape
        </Text>
      </Pressable>
      <Pressable onPress={getScreenOrientation}>
        <Text style={[styles.textlg, styles.logout]}>Get orientation</Text>
      </Pressable>
    </ScrollView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  wrapper: {
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '80%',
    borderRadius: 5,
    marginTop: 100,
  },
  textlg: {
    fontSize: 18,
    color: '#4287f5',
    fontWeight: '700',
  },
  logout: {
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
    padding: 10,
    marginTop: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
