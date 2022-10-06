import { DefaultTheme } from "@react-navigation/native";
import Colors from "../config/Colors";

export default NavyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.white,
  },
};
