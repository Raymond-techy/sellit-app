import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function UseLocation() {
  const [location, setLocation] = useState();
  useEffect(() => {
    const locationPermission = async () => {
      try {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) return null;
        const {
          coords: { latitude, longitude },
        } = await Location.getLastKnownPositionAsync();
        setLocation({ latitude, longitude });
      } catch (error) {
        console.log(error);
      }
    };
    locationPermission();
  }, []);
  return location;
}
