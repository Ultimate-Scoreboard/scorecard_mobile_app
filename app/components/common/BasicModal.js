import React from "react";
import { StyleSheet, Modal } from "react-native";

import BlockButton from "./../button/BlockButton";
import Screen from "./../Screen";

function BasicModal({ visible, setVisible, header, footer, children }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <Screen
        paddingTop={0}
        scroll={true}
        header={
          <>
            <BlockButton
              title="Close"
              onPress={() => setVisible(false)}
              bolor="btnPrimary"
              size="small"
            />
            {header}
          </>
        }
        footer={footer}
      >
        {children}
      </Screen>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default BasicModal;
