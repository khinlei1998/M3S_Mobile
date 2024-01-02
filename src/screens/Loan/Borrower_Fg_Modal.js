import { View, Text, Image, Button } from 'react-native';
import React from 'react';
import {
    RadioButton,
    List,
    Modal,
    Provider,
    Portal,
    TextInput,
} from 'react-native-paper';
import { style } from '../../style/Individual_Loan_style';
import Icon from 'react-native-vector-icons/Feather';

export default function Borrower_Fg_Modal(props) {
    const { boreower_fg_visible, hideBorrFigModal, timerCount, show_borrower_fig, imageSource } = props;

    return (
        <Modal
            useNativeDriver
            hideModalContentWhileAnimating
            dismissable={false}
            visible={boreower_fg_visible}
            onDismiss={hideBorrFigModal}
            contentContainerStyle={style.modal_container}>
            <View
                style={style.modal_header}
                onStartShouldSetResponder={() => hideBorrFigModal()}
            >
                <Icon
                    name="x-circle"
                    size={25}
                    color="#fff"
                    style={style.cancel_icon_style}
                />
            </View>
            <View style={{ padding: 10, height: 550, backgroundColor: '#fff' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>00:0{timerCount}</Text>
                        {show_borrower_fig &&
                            <Image
                                source={imageSource}
                                style={{ marginVertical: 20, height: 300 }}

                            />

                        }
                    </View>
                </View>
            </View>
        </Modal>
    );
}
