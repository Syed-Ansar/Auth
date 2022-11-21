import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {UserContext} from '../../App';
import auth from '@react-native-firebase/auth';
import ClipboardComp from './Clipboard';
import ShareExample from './Share';
import * as ScreenOrientation from 'expo-screen-orientation';

function Home() {
  const {user, setUser} = useContext(UserContext);
  //   console.log(user.user);

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    setUser(null);
  };

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      (ScreenOrientation.OrientationLock.ALL = 1),
    );
  }
  async function getScreenOrientation() {
    const ori = await ScreenOrientation.getOrientationAsync();
    console.log(ori);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'black'} />
      <View style={styles.wrapper}>
        <Text style={styles.textlg}>Google Authentication</Text>
      </View>
      <View>
        <View style={styles.userInfo}>
          <Image source={{uri: user.user.photoURL}} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.textlg}>{user.user.displayName}</Text>
            <Text style={styles.textsm}>{user.user.email}</Text>
          </View>
        </View>
        <Pressable style={styles.logoutWrapper} onPress={logout}>
          <Text style={[styles.textlg, styles.logout]}>Logout</Text>
        </Pressable>
        <View style={{marginTop: 40}}>
          {/* <ClipboardComp name={user.user.displayName} email={user.user.email} />
          <ShareExample name={user.user.displayName} email={user.user.email} /> */}
          <Pressable onPress={changeScreenOrientation}>
            <Text style={[styles.textlg, styles.logout]}>orientation</Text>
          </Pressable>
          <Pressable onPress={getScreenOrientation}>
            <Text style={[styles.textlg, styles.logout]}>Get orientation</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  wrapper: {
    alignItems: 'center',
    marginBottom: 50,
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 25,
    marginRight: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  info: {},
  textlg: {
    fontSize: 20,
    color: 'white',
    fontWeight: '800',
  },
  textsm: {
    fontSize: 15,
    color: 'white',
  },
  logoutWrapper: {
    alignItems: 'center',
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
    marginHorizontal: 20,
    alignItems: 'center',
  },
});
