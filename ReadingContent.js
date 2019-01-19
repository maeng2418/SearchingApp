import React, { Component } from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

export class ReadingContent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello this is content view</Text>
        <Button title="Go Back" onPress={() => this.props.navigation.navigate('InitialScreen')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03CF5D',
    alignItems: 'center',
    justifyContent: "center",
  },
});

export default ReadingContent