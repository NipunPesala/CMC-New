import React, { Component } from "react";
import {
    StyleSheet,
    Animated,
    ImageBackground,
    Dimensions,
    View,
    Image
} from "react-native";
import ComponentsStyles from "../../Constant/Components.styles";
const { width, height } = Dimensions.get("window");
class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
        this.animatedValue2 = new Animated.Value(0);

        //TODO: nisal remove these after testing
        // AsyncStorage.clear();
        // if (auth().currentUser) auth().signOut();
    }

    async componentDidMount() {

        Animated.spring(this.animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            delay: 1500
        }).start(() => {
            this.props.navigation.navigate('Login');
        });

        Animated.timing(this.animatedValue2, {
            toValue: 1,
            delay: 200,
            duration: 2000,
            useNativeDriver: true
        }).start();
    }


    render() {
        const scaleText = {
            transform: [{ scale: this.animatedValue2 }]
        };

        // Second interpolate beginning and end values (in this case 0 and 1)
        const spin = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-20deg'],
        });

        const truckStyle = {
            transform: [{ scale: this.animatedValue2 }]
        };

        return (
            <View style={ComponentsStyles.CONTAINER}>
                <View style={{ alignItems: 'center', width: '100%', height: '90%', backgroundColor: ComponentsStyles.COLORS.WHITE, justifyContent:"center" }}>
                   
                    <Animated.View style={[truckStyle]}>
                        <Animated.Image
                            source={require('../../assets/images/image0032_removebg.png')}

                            style={[
                                {
                                    resizeMode: "contain",
                                    width: 400,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }
                            ]}
                        />
                    </Animated.View>

                    <Animated.View
                        style={[
                            {
                                position: "absolute",
                                bottom: 70,
                                width: width - (width / 2.5),
                                height: 2,
                                backgroundColor: ComponentsStyles.COLORS.ICON_BLUE,
                                borderRadius: 2
                            },
                            scaleText
                        ]} />
                </View>
                <View style={{alignItems: 'center', width: '100%', height: '90%', backgroundColor: ComponentsStyles.COLORS.WHITE }}>
                <Image source={require('../../assets/images/logo.png')}  />
                </View>
            </View>

        );
    }
}

export default SplashScreen;