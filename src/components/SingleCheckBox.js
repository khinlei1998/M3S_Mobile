import { View, Text } from 'react-native'
import React,{useState} from 'react'
import { Checkbox } from 'react-native-paper';
export default function SingleCheckBox(props) {
    const { label, input, ...rest } = props
    const [checked, setChecked] = useState(false);

    const handleCheckboxToggle = () => {
        setChecked(!checked)
        input.onChange(1);
        console.log('input',input);

    };
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Checkbox
                {...rest}
                status={checked ? 'checked' : 'unchecked'}
                onPress={handleCheckboxToggle} />
            <Text style={{ color: 'black', }}>{label}</Text>
        </View>

    )
}