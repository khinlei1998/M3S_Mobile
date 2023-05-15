import { View, Text } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { Checkbox } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

export default function CheckBoxFile(props) {
    const { old_value, data, testcheck, input } = props
    const [checked, setChecked] = useState([]);

    const isFocused = useIsFocused();

    useLayoutEffect(() => {
        old_value ? setChecked(old_value) : null
    }, [isFocused]);


    return (
        <>
            {data.map((val, index) => {
                return (
                    <View key={index} style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 10
                    }}
                    >
                        <Checkbox
                            uncheckedColor='#000'
                            color="#232D57"
                            // status={input.value ? 'checked' : 'unchecked'}
                            status={
                                checked.find(item => item === val.id) ? 'checked' : 'unchecked'
                            }
                            // onPress={() => {
                            //     testcheck()
                            //     input.onChange(!input.value)
                            // }}
                            onPress={() => {
                                if (checked.find(item => item === val.id)) {
                                    input.onChange(checked.filter(item => item !== val.id));
                                    setChecked(checked.filter(item => item !== val.id));
                                } else {
                                    setChecked([...checked, val.id]);
                                    input.onChange([...checked, val.id]);
                                }
                            }
                            }


                        />
                        <Text style={{ color: 'black', flex: 1 }}>{val.name}</Text>
                    </View>
                )

            })}

        </>
    )
}