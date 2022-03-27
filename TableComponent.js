import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Table, Row } from "react-native-table-component";
import { useSelector } from "react-redux";
import { selectData } from "./store/dataSlice";
import { tableStyle } from "./styles";


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
              <Text style={tableStyle.tableName}>{item[17] || "Без названия"}</Text>
              <View style={tableStyle.containerTable}>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
                  <Row
                    data={data.tableHead}
                    style={tableStyle.head}
                    textStyle={tableStyle.text}
                  />
                  <Row
                    style={tableStyle.data}
                    data={[
                      `${Math.round(item[20])}`,
                      `${Math.round(item[19] / 100) / 10}`,
                      `${Math.round(item[5] / 0.33) / 10}`,
                      `${Math.round(item[6] * 1.87)}`,
                      `${item[4]}`,
                    ]}
                    textStyle={tableStyle.text}
                  />
                </Table>
              </View>
            </View>
          ))
        : null}
    </ScrollView>
  );
}
