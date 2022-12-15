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
import {
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

function Home({navigation}) {
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
        <View
          style={{
            marginTop: responsiveWidth(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <ClipboardComp name={user.user.displayName} email={user.user.email} />
          <ShareExample name={user.user.displayName} email={user.user.email} /> */}
          {/* <Pressable onPress={changeScreenOrientation}>
            <Text style={[styles.textlg, styles.logout]}>orientation</Text>
          </Pressable>
          <Pressable onPress={getScreenOrientation}>
            <Text style={[styles.textlg, styles.logout]}>Get orientation</Text>
          </Pressable>
          <Pressable onPress={changeScreenOrientation}>
            <Text style={[styles.textlg, styles.logout]}>orientation</Text>
          </Pressable>
          <Pressable onPress={getScreenOrientation}>
            <Text style={[styles.textlg, styles.logout]}>Get orientation</Text>
          </Pressable>
          <Pressable onPress={changeScreenOrientation}>
            <Text style={[styles.textlg, styles.logout]}>orientation</Text>
          </Pressable>
          <Pressable onPress={getScreenOrientation}>
            <Text style={[styles.textlg, styles.logout]}>Get orientation</Text>
          </Pressable>
          <Pressable onPress={changeScreenOrientation}>
            <Text style={[styles.textlg, styles.logout]}>orientation</Text>
          </Pressable> */}
          <Text
            style={{
              fontSize: responsiveFontSize(1.8),
              marginLeft: responsiveWidth(5),
              marginRight: responsiveWidth(5),
            }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
            temporibus eveniet magni, ea in provident, dolore soluta ut
            reprehenderit quod at eum asperiores illum molestiae eius rerum
            eligendi. Necessitatibus, nam! Soluta quis ducimus eum voluptate
            nemo, quo animi ipsa atque. Neque, ipsum hic ab totam repellendus
            provident! Quia eaque nisi itaque esse vero similique iure suscipit
            quos. Accusantium, repudiandae illo? Molestias eaque quia eveniet
            dele
          </Text>
          <Pressable
            style={{
              backgroundColor: 'black',
              // height: responsiveHeight(10),
              // width: responsiveWidth(80),
              height: 100,
              width: 200,
            }}
            onPress={() => navigation.navigate('ThreeJS')}></Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  wrapper: {
    alignItems: 'center',
    marginBottom: responsiveWidth(10),
  },
  image: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    borderRadius: responsiveWidth(10) / 2,
    marginRight: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  info: {},
  textlg: {
    fontSize: responsiveFontSize(2),
    // fontSize: 14,
    color: 'white',
    // fontWeight: '800',
  },
  textsm: {
    fontSize: responsiveFontSize(1.5),
    color: 'white',
  },
  logoutWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    width: responsiveWidth(80),
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
    padding: responsiveHeight(1),
    marginTop: responsiveWidth(10),
    borderRadius: 15,
  },
});
