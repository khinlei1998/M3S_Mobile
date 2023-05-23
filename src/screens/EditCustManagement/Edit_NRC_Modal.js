import { View, Text } from 'react-native';
import React from 'react';
import { Provider, Portal, Modal, Button } from 'react-native-paper';
import DropDownPicker from '../../components/DropDownPicker';
import { gender } from '../../common';
import { Field, reduxForm, setInitialValues, initialize } from 'redux-form';
import { connect } from 'react-redux';

import TextInputFile from '../../components/TextInputFile';
function ShowNRC_Modal(props) {
    const { hideNRCModal, nrc_visible, nrc_statecode, nrc_prefix_code, update_status } = props;
    return (
        <Provider>
            <Portal>
                <Modal
                    visible={nrc_visible}
                    onDismiss={hideNRCModal}
                    contentContainerStyle={{
                        backgroundColor: '#FFF',
                        width: '95%',
                        alignSelf: 'center',
                        padding: 15,
                        borderColor: '#0E162E',
                        borderWidth: 1,
                        margin: 20,
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '50%',
                            }}>
                            <Field
                                data={nrc_statecode}
                                name={'nrc_statecode'}
                                title={'Select State COde'}
                                component={DropDownPicker}
                                pickerStyle={{
                                    width: 160,
                                    marginRight: 10,
                                }}
                                enabled={update_status == true ? false : true}

                            />

                            <Field
                                data={nrc_prefix_code}
                                name={'nrc_prefix'}
                                title={'Select Prefix'}
                                component={DropDownPicker}
                                pickerStyle={{
                                    width: 160,
                                }}
                                enabled={update_status == true ? false : true}

                            />
                        </View>
                        <Field
                            name={'nrc_no'}
                            title={'NRC Number'}
                            component={TextInputFile}
                            input_mode
                            inputmax={100}
                            enabled={update_status == true ? false : true}

                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 20,
                        }}>
                        <Button
                            mode="contained"
                            contentStyle={{ width: 100, padding: 3 }}
                            onPress={hideNRCModal}
                            buttonColor={'#6870C3'}
                            style={{ borderRadius: 0, margin: 10 }}>
                            OK
                        </Button>
                        <Button
                            mode="contained"
                            contentStyle={{ width: 100, padding: 4 }}
                            onPress={hideNRCModal}
                            buttonColor={'#6870C3'}
                            style={{ borderRadius: 0, margin: 10 }}>
                            Cancel
                        </Button>
                    </View>
                </Modal>
            </Portal>
        </Provider>
    );
}
function mapStateToProps(state) {
    return {
        update_status: state.customers.update_status,
    };
}

export default reduxForm({
    form: 'Customer_ManagementForm',
})(connect(mapStateToProps, {})(ShowNRC_Modal));
