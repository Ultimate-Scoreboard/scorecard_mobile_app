import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { defaultStyles, clicks } from "../../config";
import AppText from "../text/AppText";
import { allowables } from "../../functions";
import IconRender from "../icon/IconRender";

function HorizontalTabs({ tabs, onSelect, selected, perRow }) {
  const { width } = defaultStyles.sizes.screenDimensions;
  const numberOfRows = perRow
    ? (tabs.length - (tabs.length % perRow)) / perRow + 1
    : 1;
  let splitTabs = [];
  let j = 0;
  for (let i = 1; i <= numberOfRows; i++) {
    splitTabs.push(tabs.slice(j, i * perRow));
    j = i * perRow;
  }
  splitTabs = perRow ? splitTabs : [tabs];

  return (
    <View>
      {splitTabs.map((e, i) => {
        return (
          <View style={styles.container} key={String(i)}>
            {e.map((tab) => {
              const isSelected = selected === tab.name;
              return (
                <TouchableOpacity
                  activeOpacity={clicks.clickOpacity}
                  key={tab.name + String(i)}
                  onPress={() => onSelect(tab)}
                  style={[styles.tabStyle, { width: width / tabs.length - 20 }]}
                >
                  <IconRender
                    icon={tab.icon}
                    iconType={tab.iconType}
                    color={
                      isSelected
                        ? defaultStyles.colors.holdDark
                        : defaultStyles.colors.holdLight
                    }
                  />
                  <AppText
                    style={[
                      styles.text,
                      {
                        backgroundColor: defaultStyles.colors.info,
                        color: defaultStyles.colors.holdLight,
                      },
                      isSelected
                        ? { color: defaultStyles.colors.holdDark }
                        : {},
                    ]}
                  >
                    {allowables.capLetterOne(tab.name)}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    backgroundColor: defaultStyles.colors.info,
  },
  tabStyle: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    fontSize: 14,
  },
});

export default HorizontalTabs;
