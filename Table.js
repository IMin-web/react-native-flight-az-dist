import { View, StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import { Table, Row } from "react-native-table-component";
import { useSelector } from "react-redux";
import { selectData } from "./dataSlice";

export default function TableComponent() {
  const locBase = useSelector(selectData);
  //шапка таблицы
  const data = {
    tableHead: ["Азимут", "Дальность", "Высота", "Скорость", "Курс"],
  };

  return (
    <ScrollView>
      {locBase.value[0] !== undefined
        ? locBase.value.map((item) => (
            <View key={item[0]}>
              <Text style={styles.tableName}>{item[17] || "Без названия"}</Text>
              <View style={styles.container}>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
                  <Row
                    data={data.tableHead}
                    style={styles.head}
                    textStyle={styles.text}
                  />
                  <Row
                    style={styles.data}
                    data={[
                      `${Math.round(item[20])}`,
                      `${Math.round(item[19] / 100) / 10}`,
                      `${Math.round(item[5] / 0.33) / 10}`,
                      `${Math.round(item[6] * 1.87)}`,
                      `${item[4]}`,
                    ]}
                    textStyle={styles.text}
                  />
                </Table>
              </View>
            </View>
          ))
        : null}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  tableName: {
    color: "tomato",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  container: { flex: 3, marginBottom: 10, backgroundColor: "#fff" },
  head: { height: 30, backgroundColor: "#f1f8ff" },
  text: { margin: 2, textAlign: "center", fontSize: 16 },
  data: { height: 40, backgroundColor: "#fff" },
});
