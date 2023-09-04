import { View, Text } from 'react-native'
import React from 'react'
import { style } from '../style/Customer_Mang_style'
import { operations } from '../common'
import {RadioButton, Button} from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function Update_Operation(props) {
    const {btnChangeOperation,show_operation,filtered_cus_data,update_status,handleSubmit}=props
    const { t } = useTranslation();
    return (
        <View style={style.continer}>
            <View
                style={{
                    flexDirection: 'row',
                }}>
                {operations.map((option, index) => (
                    <RadioButton.Group
                        key={index}
                        onValueChange={newValue =>
                            btnChangeOperation(newValue, filtered_cus_data)
                        }
                        value={show_operation}>
                        <View
                            key={option.value}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <RadioButton.Item
                                uncheckedColor="#636Dc6"
                                color="#636Dc6"
                                disabled={
                                    option.value == '1' ||
                                    (filtered_cus_data.tablet_sync_sts === '01' &&
                                        option.value == 3)
                                }
                                label={option.label}
                                value={option.value}
                                labelStyle={{ marginLeft: 5 }}
                            />
                        </View>
                    </RadioButton.Group>
                ))}
            </View>
            <Button
                disabled={
                    update_status == true && show_operation == '3'
                        ? false
                        : update_status == false && show_operation == '4'
                            ? false
                            : true
                }
                onPress={handleSubmit}
                mode="contained"
                buttonColor={'#21316C'}
                style={style.btnStyle}>
                {t("OK")}
            </Button>
        </View>
    )
}