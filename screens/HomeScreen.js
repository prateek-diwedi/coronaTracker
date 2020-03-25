import React from "react";
import {
StyleSheet,
View,
ActivityIndicator,
FlatList,
Text,
TouchableOpacity
} from "react-native";
// import Icon from 'react-native-vector-icons/Ionicons';

export default class HomeScreen extends React.Component {
static navigationOptions = ({ navigation }) => {
return {
  title: "Novid Corona Update",
  headerStyle: {backgroundColor: "#fff"},
  headerTitleStyle: {textAlign: "center",flex: 1}
 };
};
constructor(props) {
 super(props);
 this.state = {
   loading: true,
   dataSource:[]
  };
}
getDateNow(datems){
  var date = new Date(datems);
  return date.toString();
}
componentDidMount= async()=>{
//   await Expo.Font.loadAsync({
//     Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
// });
fetch("https://corona.lmao.ninja/all")
.then(response => response.json())
.then((responseJson)=> {
  console.log('data fropm api ', responseJson )
  let dataArr = [];
  dataArr.push(responseJson);
  this.setState({
   loading: false,
   dataSource: dataArr
  })
})
.catch(error=>console.log(error)) //to catch the errors if any
}

FlatListItemSeparator = () => {
  return (
    <View style={{
      height: .5,
      width:"100%",
      backgroundColor:"rgba(0,0,0,0.5)",
    }}
/>
);
}

renderItem=(data)=>
<TouchableOpacity style={styles.list}>
<Text style={styles.lightText}> Cases : {data.item.cases}</Text>
<Text style={styles.lightText}> Deaths : {data.item.deaths}</Text>
<Text style={styles.lightText}> Recovered : {data.item.recovered}</Text>
<Text style={styles.lightText}> Updated : {this.getDateNow(data.item.updated)} </Text>
</TouchableOpacity>
render(){
 if(this.state.loading){
  return( 
    <View style={styles.loader}> 
      <ActivityIndicator size="large" color="#0c9"/>
    </View>
)}
return(
 <View style={styles.container}>
 <FlatList
    data= {this.state.dataSource}
    ItemSeparatorComponent = {this.FlatListItemSeparator}
    renderItem= {item=> this.renderItem(item)}
    keyExtractor= {item=>item.cases.toString()}
 />
</View>
)}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
   },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
  list:{
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff"
   }
});