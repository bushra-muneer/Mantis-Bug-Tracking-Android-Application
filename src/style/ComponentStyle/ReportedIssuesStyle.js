import { StyleSheet,Dimensions } from 'react-native';
const { width } = Dimensions.get("window");
export default StyleSheet.create({
    inputBox: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 6,
      
        borderColor:"grey",
        alignItems: "center",
        justifyContent: "center"
      },
      inputLeftIcon: {
        color: "#000",
        fontSize: 20,
        alignSelf: "center",
        paddingLeft: 5,
        paddingRight: 5
      },
      inputStyle: {
        height: 40,
        marginLeft:15,
        alignSelf: "center",
        fontSize: 14,
        lineHeight: 16,
        color: "black",
        
        flex: 1
      },
      cupertinoSearchBarBasic2: {
            marginTop:8,
            marginBottom:5,
            width: 343,
            height: 41.5,
          //  marginTop: -610,
            alignSelf: "center"
          },
      
        title: {
            fontSize: 13,
            color: 'white',
          
            paddingHorizontal:124,
            paddingVertical:3,
            alignSelf:'center',
            backgroundColor:'#848c9c'
        }, container: {
            flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 80
          },
          horizontal: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 70
          },searchInput:{
            marginTop:5,
            borderRadius:25,
            padding: 10,
            color:'black',
            borderColor: 'grey',
            borderWidth: 1
          }
});