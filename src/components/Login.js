import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {UserContext} from '../../App';
import ClipboardComp from './Clipboard';

function Login() {
  const {user, setUser} = useContext(UserContext);
  const navigation = useNavigation();

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable onPress={SignInWithGoogle} style={styles.btn}>
          <Text style={styles.textlg}>Google Sign-In</Text>
        </Pressable>
        <ClipboardComp />
      </View>
    </SafeAreaView>
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
});
