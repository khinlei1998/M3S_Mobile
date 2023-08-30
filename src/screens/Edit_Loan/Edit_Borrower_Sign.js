import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { reduxForm, } from 'redux-form';
import { connect} from 'react-redux';
import moment from 'moment';
function Borrower_Sign(props) {
  const {
    update_status,
    coborrower_sign_path,
    show_coborrower_sign,
    show_borrower_sign,
    borrower_sign_path,
    setCanvas,
    show_canvas,
    setCoBorrowerCanvas,
    show_co_borrower_canvas,
    borrower_name,
    coborrower_name,
    retrive_loan_data
  } = props;

  const queryParam = `?timestamp=${Date.now()}`;

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
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                Borrower Name
              </Text>
              <Text style={{ color: '#A1B5DC', fontSize: 18, marginLeft: 10 }}>
                {borrower_name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                Date
              </Text>
              <Text style={{ color: '#A1B5DC', fontSize: 18, marginLeft: 10 }}>
                <Text>{moment(retrive_loan_data.create_datetime).format('YYYY-MM-DD')}</Text>
              </Text>
            </View>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>
            {borrower_sign_path == null && (
              <TouchableOpacity
                onPress={() =>
                  update_status == true && setCanvas(!show_canvas)
                }>
                <Image
                  source={require('../../../assets/images/default-sign.png')}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            )}
            {borrower_sign_path ? (
              <TouchableOpacity
                onPress={() =>
                  update_status == true && setCanvas(!show_canvas)
                }>
                <Image
                  source={{ uri: `file://${borrower_sign_path}${queryParam}` }}
                  // source={{ uri: `data:image/png;base64,${show_borrower_sign}` }}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            ) : (
              show_borrower_sign !== '' && (
                <TouchableOpacity onPress={() => setCanvas(!show_canvas)}>
                  <Image
                    // source={{uri: `file://${borrower_sign_path}`}}
                    source={{
                      uri: `data:image/png;base64,${show_borrower_sign}`,
                    }}
                    style={{ width: 100, height: 50 }}
                  />
                </TouchableOpacity>
              )
            )}
            {/* <View style={{width: 300, height: 300,backgroundColor:'red'}}>
            <SketchCanvas
              style={{flex: 1}}
              strokeColor="#000000"
              strokeWidth={3}
            />
          </View> */}
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
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                {t("Co Borrower Name")}
              </Text>
              <Text style={{ color: '#A1B5DC', fontSize: 18, marginLeft: 10 }}>
                {coborrower_name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                Date
              </Text>
              <Text style={{ color: '#A1B5DC', fontSize: 18, marginLeft: 10 }}>
              <Text>{moment(retrive_loan_data.create_datetime).format('YYYY-MM-DD')}</Text>
              </Text>
            </View>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Sign</Text>
            {coborrower_sign_path == null && (
              <TouchableOpacity
                onPress={() =>
                  update_status == true &&
                  setCoBorrowerCanvas(!show_co_borrower_canvas)
                }>
                <Image
                  source={require('../../../assets/images/default-sign.png')}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            )}
            {coborrower_sign_path ? (
              <TouchableOpacity
                onPress={() =>
                  update_status == true &&
                  setCoBorrowerCanvas(!show_co_borrower_canvas)
                }>
                <Image
                  source={{ uri: `file://${coborrower_sign_path}${queryParam}` }}
                  style={{ width: 100, height: 50 }}
                />
              </TouchableOpacity>
            ) : (
              show_coborrower_sign !== '' && (
                <TouchableOpacity onPress={() => setCanvas(!show_canvas)}>
                  <Image
                    // source={{uri: `file://${borrower_sign_path}`}}
                    source={{
                      uri: `data:image/png;base64,${show_coborrower_sign}`,
                    }}
                    style={{ width: 100, height: 50 }}
                  />
                </TouchableOpacity>
              )
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
    retrive_loan_data: state.loan.edit_loandata,
  };
}

export default reduxForm({
  form: 'Edit_Individual_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Borrower_Sign));
