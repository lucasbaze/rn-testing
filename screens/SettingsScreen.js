import React, { useState, useEffect } from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';

export default function SettingsScreen() {
    const [state, setState] = useState({
        location: null,
        errorMessage: null,
    });

    useEffect(() => {
        console.log(state.location);
        Permissions.askAsync(Permissions.LOCATION).then(res => {
            let { status } = res;
            if (status !== 'granted') {
                setState({
                    ...state,
                    errorMessage: 'Permission to access location was denied',
                });
            }

            Location.getCurrentPositionAsync({}).then(location => {
                setState({ ...state, location });
            });
        });
    }, []);

    let text = 'Waiting...';
    if (state.errorMessage) {
        text = state.errorMessage;
    } else if (state.location) {
        text = JSON.stringify(state.location);
    }

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Text style={{ color: 'red' }}>{text}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <MapView
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }}
                    initialRegion={{
                        latitude: 43.617877,
                        longitude: -116.207183,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
        </ScrollView>
    );
}

SettingsScreen.navigationOptions = {
    title: 'app.json',
};
