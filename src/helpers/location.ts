import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native/types';
import Geolocation from 'react-native-geolocation-service';

export const requestPermissionLocation = async () => {
  const result = await check(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE || PERMISSIONS.IOS.LOCATION_ALWAYS
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  );

  switch (result) {
    case RESULTS.GRANTED:
      return true;
    case RESULTS.UNAVAILABLE:
      return true;
    case RESULTS.DENIED:
      const granted = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (granted === RESULTS.GRANTED) {
        return true;
      }
  }
  return false;
};

export const getLocation = async () => {
  await requestPermissionLocation();
  Geolocation.getCurrentPosition(
    position => {
      console.log(position);
    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 1500,
      maximumAge: 10000,
      accuracy: {
        android: 'high',
        ios: 'nearestTenMeters',
      },
    },
  );
};

export const urlMaps = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) =>
  `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
