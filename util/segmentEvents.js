import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@segment/analytics-react-native';

/**
 * This event will not work for these pages below
 * You would have to write them out manually
 * Authenication page
 *
 * ~Sign Up
 * ~Log In
 * ~Create PIN
 * ~Enter PIN
 */

const getUserData = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const user = JSON.parse(userData).user;
  return user;
};

/**
 * @returns
 * @param eventName
 */
const TrackEvent = async (eventName) => {
  const user = await getUserData();

  return analytics.track(eventName, {
    email: user.email,
  });
};

export {TrackEvent};
