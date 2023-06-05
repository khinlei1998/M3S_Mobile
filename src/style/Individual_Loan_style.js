import {StyleSheet} from 'react-native';

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
      list_container:{
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
      },
      list_title:{
        color: '#000', fontWeight: 'bold', fontSize: 17
      },
      sub_container:{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#FAFAFA',
        padding: 10,
      },
      sub_list_container:{
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
      }
})