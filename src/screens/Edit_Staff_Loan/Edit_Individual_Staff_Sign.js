import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { reduxForm, Field, change, reset } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
function Edit_Individual_Staff_Sign(props) {
  const {
    coborrower_sign_path,
    show_coborrower_sign,
    show_borrower_sign,
    borrower_sign_path,
    setCanvas,
    show_canvas,
    showCanvas,
    navigation,
    filePath,
    setCoBorrowerCanvas,
    co_borrower_filePath,
    show_co_borrower_canvas,
    update_status
  } = props;
  console.log('coborrower_sign_path',coborrower_sign_path);
  return (
    <>
      <View style={{ flex: 1, padding: 5, margin: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            margin: 10,
          }}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
              Borrower Name
            </Text>
            <Text> Date 17/05/2023</Text>
          </View>
          {/* <Text>{borrower_sign_path}</Text> */}

          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>
            {!borrower_sign_path && (

              <TouchableOpacity onPress={() => update_status == true && setCanvas(!show_canvas)}>
                <Image
                  source={require('../../../assets/images/default-sign.png')}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            )}
            {borrower_sign_path ? (

              <TouchableOpacity onPress={() => update_status == true && setCanvas(!show_canvas)}>
                <Image
                  source={{ uri: `file://${borrower_sign_path}` }}
                  // source={{ uri: `data:image/png;base64,${show_borrower_sign}` }}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            )
              :
              show_borrower_sign !== '' && (
                <TouchableOpacity onPress={() => setCanvas(!show_canvas)}>
                  <Image
                    // source={{uri: `file://${borrower_sign_path}`}}
                    source={{ uri: `data:image/png;base64,${show_borrower_sign}` }}
                    style={{ width: 100, height: 50 }}
                  />
                </TouchableOpacity>
              )}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            margin: 10,
          }}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
              Co Borrower Name
            </Text>
            <Text> Date 17/05/2023</Text>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>
            {!coborrower_sign_path && (
              <TouchableOpacity onPress={() => update_status == true && setCoBorrowerCanvas(!show_co_borrower_canvas)}>
                <Image
                  source={require('../../../assets/images/default-sign.png')}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            )}
            {coborrower_sign_path ? (
              <TouchableOpacity onPress={() => update_status == true && setCoBorrowerCanvas(!show_co_borrower_canvas)}>
                <Image
                  source={{ uri: `file://${coborrower_sign_path}` }}
                  // source={{ uri: `data:image/png;base64,${show_borrower_sign}` }}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            )
              :
              show_coborrower_sign !== '' && (
                <TouchableOpacity onPress={() => setCanvas(!show_canvas)}>
                  <Image
                    // source={{uri: `file://${borrower_sign_path}`}}
                    source={{ uri: `data:image/png;base64,${show_coborrower_sign}` }}
                    style={{ width: 100, height: 50 }}
                  />
                </TouchableOpacity>
              )}
          </View>
        </View>
      </View>
    </>
  );
}
function mapStateToProps(state) {
  return {
    update_status: state.loan.update_status,
  };
}

export default reduxForm({
  form: 'Edit_Individual_Staff_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Edit_Individual_Staff_Sign));
