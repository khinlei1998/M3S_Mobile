




import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  title_style: {
    textAlign: 'center',
    fontSize: 23,
    marginTop: 20,
    color: '#273050',
    fontWeight:'bold'
  },
  continer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  btnStyle: {
    borderRadius: 0,
    width: 100,
    marginTop: 10,
    color: 'black',
  },
  title_emp_style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginLeft: 30,
    marginRight: 20,
    marginTop: 15,
  },
  list_container: {
    backgroundColor: '#fff',
    marginLeft: 35,
    marginRight: 35,
  },
  list_title: {
    color: '#000', fontWeight: 'bold', fontSize: 17
  },
  sub_container: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  sub_list_container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
  },
  modal_container: {
    backgroundColor: '#e8e8e8',
    width: '85%',
    alignSelf: 'center',
  },
  modal_header: {
    backgroundColor: '#232D57', padding: 25
  },
  cancel_icon_style: {
    marginLeft: 20,
    position: 'absolute',
    top: 0,
    right: 10,
    top: 10,
  },
  modal_body_container:{
    padding: 10, height: 550
  },
  radio_title_style: {
    marginTop: 10,
    fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 15,
  },
  collasible_container: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FAFAFA',
    margin: 10,
  },
  input_container_style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginRight: 17,
    marginLeft: 15,
  },
});
