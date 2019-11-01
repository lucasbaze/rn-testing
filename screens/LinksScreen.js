import React, { useState, useEffect, useRef } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { ExpoLinksView } from '@expo/samples';
import { Camera } from 'expo-camera';

export default function LinksScreen() {
    const [state, setState] = useState({
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    });

    useEffect(() => {
        Permissions.askAsync(Permissions.CAMERA).then(res => {
            let { status } = res;
            console.log(status);
            setState({ ...state, hasCameraPermission: status === 'granted' });
        });
    }, []);

    const cameraRef = useRef();

    const snap = async () => {
        if (cameraRef.current) {
            console.log(cameraRef.current);
            let photo = await cameraRef.current.takePictureAsync();
            console.log(photo);
        }
    };

    return (
        <View style={styles.container}>
            {state.hasCameraPermission === false ? (
                <Text>No access to camera</Text>
            ) : (
                <Camera
                    ref={ref => {
                        cameraRef.current = ref;
                    }}
                    style={{ flex: 1 }}
                    type={state.type}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                console.log('State', state);
                                setState({
                                    ...state,
                                    type:
                                        state.type ===
                                        Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                });
                                console.log(cameraRef.current);
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    marginBottom: 10,
                                    color: 'white',
                                }}
                            >
                                Flip{' '}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                snap();
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    marginBottom: 10,
                                    color: 'white',
                                }}
                            >
                                Snap{' '}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
        </View>
    );
}

LinksScreen.navigationOptions = {
    title: 'Links',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
