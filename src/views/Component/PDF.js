import { Page, Text, Image, Document, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    margin: 10,
    height: 150,
    width: 150,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  explanation: {
    fontSize: 10,
    marginBottom: 10,
  },
});

const PDF = ({data, country}) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{country} Analysis Report</Text>
          {Object.keys(data).map((key) => (
            <View key={key}>
              <Text style={styles.title}>{data[key].title}</Text>
              <Image style={styles.image} src={`data:image/png;base64,${data[key].image}`} />
              <Text style={styles.explanation}>{data[key].explanation}</Text>
            </View >
          ))}
          <View>
            <Text style={styles.explanation} >{data.recommendation !== null ? data.recommendation : null}</Text>
        </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDF;