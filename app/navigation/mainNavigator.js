import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { defaultStyles } from "../config";
import routes from "./routes";
import CustomTabBar from "./customTabBar";
import Home from "../screens/Home";
import Scorecard from "../screens/Scorecard";
import Settings from "./../screens/Settings";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={routes.HOME}
      tabBar={(props) => <CustomTabBar {...props} />}
      backBehavior="history"
    >
      <Tab.Screen name={routes.HOME} component={Home} />
      <Tab.Screen name={routes.SCORECARD} component={Scorecard} />
      <Tab.Screen name={routes.SETTINGS} component={Settings} />
    </Tab.Navigator>
  );
}
