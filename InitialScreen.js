import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity, ScrollView, Platform, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import List from './List';

const { height, width } = Dimensions.get("window");

export default class InitialScreen extends Component {
  state = {
    data:[],
    searchWord : "",
    isSearched: false,
    //이부분은 테스트 입니다.
    /*
    addData:{
      Name:"test",
      Subject:"test",
      Major:"test",
      Title:"test",
      Contents:"test"
    }
    */
  }

  componentDidMount() {
    
  }

  _getContent(){
    return fetch('http://34.80.165.41:80/content')
      .then((response) => response.json())
      .then(responseData => this.setState({ data: responseData }))
      
      .then((responseJson) => {
        console.log(responseJson);
      }).catch((error) => {
        console.error(error);
        alert(error);
      });
  }

  // 글작성용.
  _addContent(){
    const {data, addData} = this.state;
    fetch(`http://34.80.165.41:80/content/add?name=${encodeURIComponent(addData.Name)}&subject=${encodeURIComponent(addData.Subject)}&major=${encodeURIComponent(addData.Major)}&title=${encodeURIComponent(addData.Title)}&contents=${encodeURIComponent(addData.Contents)}`)
      .then((response) => response.json())
      //.then(this._getContent())
      //.then(this._renderContent())
      .catch(err => console.error(err))
  }

  //검색
  _searchContent(){
    const {searchWord} = this.state;
    fetch(`http://34.80.165.41:80/content/search?title=%${encodeURIComponent(searchWord)}%`)
    .then((response) => response.json())
    .then(responseData => this.setState({ data: responseData }))
  }

  _renderContent(){
    return this.state.data.map(data => 
      <TouchableOpacity  key={data.No}>
        <List title={data.Title}/>
      </TouchableOpacity>
    )
  }

  _renderAutoComplete(){
    if(this.state.data.length > 5){
      newData = new Array;
      for(let i=0;i<5;i++){
        newData.push(this.state.data[i]);
      }
      return newData.map(newData =>
      <Text>{newData.Title}</Text>
      )
    }

    else{
      return this.state.data.map(data =>
        <Text key ={data.No}>{data.Title}</Text>
      )
    }
  }

  render() {
    const {searchWord, isSearched} = this.state; //state에 만든거 활용하기 위함.
    return (
      <View style={styles.container}>
        {/*위의 상태표시줄 하얗게*/}
        <StatusBar barStyle="light-content"></StatusBar>
        <Text style={styles.title}>BOARD</Text>
        <View style = {styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder={"SEARCH"}
            value={searchWord} //기본값은 searchWord에 담음.
            onChangeText={this._controlSearch}
            returnKeyType={"done"} //엔터키를 완료로.
            //onBlur={this._outSearch} //입력창 벗어나면 초기화
          >
          </TextInput>
            <TouchableOpacity onPressOut={this._searching}>
              <Text style={styles.actionSearch}>🔍</Text>
          </TouchableOpacity>
        </View>
        {this._renderAutoComplete()}
        {/* view로 card 만들어줘야 아래 끝까지 감. */}
        <View style = {styles.card}>
          <ScrollView contentContainerStyle={styles.searchList}>
            {isSearched ? this._renderContent() : null}
          </ScrollView>
        </View>
      </View>
    );
  }

  _controlSearch = async (text) => {
    await this.setState({
      searchWord: text
    });
    await this._searchContent()
  }

  _outSearch = () => {
    this.setState({
      searchWord: ""
    })
  }

  _searching = async () => {
    const {searchWord, isSearched} = this.state;
    
    //이부분은 테스트 입니다.
    if(searchWord != ""){
      await this.setState({
        isSearched: true
      })
      //await this._addContent()
      await this._searchContent()
      await this.setState({
        searchWord:""
      })
    }
    Keyboard.dismiss()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03CF5D',
    alignItems: 'center',
  },

  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "500",
    marginBottom: 30
  },

  searchBar: {
    width: width - 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor : "white",
    flexDirection: "row", //옆에
  },

  input: {
    padding: 20,
    fontSize: 25,
    backgroundColor: "white",
    marginLeft : 10
  },

  actionSearch: {
    fontSize: 30,
    marginRight: 10
  },

  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { height: -1, width: 0 }
      },
      android: {
        elevation: 3
      }
    }),
    marginTop: 30,
    alignItems: "center"
  },
});
