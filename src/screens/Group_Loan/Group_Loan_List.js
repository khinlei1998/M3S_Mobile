import { View, Text, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { style } from '../../style/Group_Loan_style'
import { List, Button } from 'react-native-paper';
export default function Group_Loan_List() {
    const [Grouplist_expand, setGroupListExpand] = useState(true);

    const handleGroupListToggle = () => {
        setGroupListExpand(!Grouplist_expand);
    };
    return (
        <>
            <List.Accordion
                expanded={Grouplist_expand}
                onPress={handleGroupListToggle}
                style={style.list_container}
                titleStyle={style.list_title}
                title="List of loan application by Group Memebers">
                <View style={style.sub_container}>
                    <Button
                        onPress={() => ToastAndroid.show(
                            'You have to save application First!',
                            ToastAndroid.SHORT,
                        )}
                        mode="contained"
                        buttonColor={'#6870C3'}
                        style={{
                            width: 300,
                            borderRadius: 0,
                            marginTop: 10,
                            color: 'black',
                            borderRadius: 5,
                            padding: 5,
                        }}>
                        INDIVIDUAL LOAN APPLICATION
                    </Button>
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: '#D7D8DC',
                            borderRadius: 5,
                            padding: 5,
                            margin: 10,
                        }}>
                        <Text
                            style={{
                                padding: 10,
                                flex: 1,
                                fontWeight: 'bold',
                            }}>
                            #
                        </Text>
                        <Text
                            style={{
                                flex: 1,

                                padding: 10,
                                fontWeight: 'bold',
                            }}>
                            Loan Type
                        </Text>
                        <Text
                            style={{
                                flex: 1,

                                padding: 10,
                                fontWeight: 'bold',
                            }}>
                            Application No
                        </Text>
                        <Text
                            style={{
                                flex: 1,

                                padding: 10,
                                fontWeight: 'bold',
                            }}>
                            Borrower Name
                        </Text>

                        <Text
                            style={{
                                flex: 1,

                                padding: 10,
                                fontWeight: 'bold',
                            }}>
                            Application amount
                        </Text>

                        <Text
                            style={{
                                flex: 1,

                                padding: 10,
                                fontWeight: 'bold',
                            }}>
                            Sync
                        </Text>
                    </View>

                </View>
            </List.Accordion >
        </>
    )
}