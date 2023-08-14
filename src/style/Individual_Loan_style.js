import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  title_style: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    color: '#273050',
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
  list_container: {
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
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
  }
})