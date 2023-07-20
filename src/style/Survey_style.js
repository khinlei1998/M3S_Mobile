import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    width: '90%',
    height: 800,
    backgroundColor: '#fff',
    marginTop: 50,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    margin: 10,

  },
  title: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  surveyTitle: {
    flex: 5,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    margin: 10,
  },
  cell: {
    flex: 0.3,
    padding: 5,
  },
  surveyCell: {
    flex: 1, // Adjust the flex value to allocate more space for the "Survey" column
    padding: 5,

  },
})