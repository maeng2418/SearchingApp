import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("window");

export default class List extends Component{

    render(){
        const {title} = this.props;
        return(
            <View style={styles.container}>
                <Text style = {styles.text}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width -50,
        alignItems: "center",
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: "space-between",
        flexDirection: "row" // 가운데정렬 -> 오른쪽정렬
    },

    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20,
        marginLeft: 20
    }
})