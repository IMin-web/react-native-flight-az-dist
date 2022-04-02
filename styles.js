import { StyleSheet, Dimensions } from "react-native";

export const mapStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  coordinate: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2196F3",
    marginBottom: 5,
  },
  slider: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    right: 50,
    width: 250,
  },
  mapMenu: {
    width: 45,
    height: 45,
  },
});

export const tableStyle = StyleSheet.create({
  tableName: {
    color: "#2196F3",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  container: { flex: 3, marginBottom: 10, backgroundColor: "#fff" },
  head: { height: 30, backgroundColor: "#f1f8ff" },
  text: { margin: 2, textAlign: "center", fontSize: 16 },
  data: { height: 40, backgroundColor: "#fff" },
});

export const settingsStyle = StyleSheet.create({
  navButton: {
    alignItems: 'center', paddingBottom:10, paddingTop:10,
  },
  container: {
    borderWidth: 2,
    borderColor: "gray",
  },
  separator: {
    marginTop: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 0.3 * Dimensions.get("window").height,
  },
  header: {
    fontSize: 36,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2196F3",
    marginTop: 20,
  },
  text: {
    textAlign: "center",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
  },
  textButton: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
    color: "white",
  },
});

export const markerStyle = StyleSheet.create({
  marker: {
    position: "absolute",
    backgroundColor: "#fff",
    width: 120,
  },
});
