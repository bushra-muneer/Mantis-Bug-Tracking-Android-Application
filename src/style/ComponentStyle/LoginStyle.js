import { StyleSheet,Dimensions } from 'react-native';
const { width } = Dimensions.get("window");
export default StyleSheet.create({
    textstyle: {
        color: '#707B7C',
        fontSize: 15,
      },
    
      textInputStyle: {
        height: 36,
        borderBottomColor: 'black',
        color: 'black',
        borderBottomWidth: 1,
        marginHorizontal: 5,
      },
      forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
      },
     
      forgot: {
        fontSize: 13,
        color: 'black'
      },
      body: {
        flex: 1,
        backgroundColor: '#c8cad0',
      },
      container_m: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      },
      button_m: {
        backgroundColor: '#142c44',
        width: '60%',
        height: 40
      },
      button_m1: {
        backgroundColor: '#142c44',
        width: '60%',
        height: 40
      },
      modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "40%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.45) },
        { translateY: -90 }],
        height: 340,
        width: width * 0.88,
        backgroundColor: "#c8cad0",
        borderRadius: 7,
      },
      textInput_m: {
        width: "90%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
        color: 'black',
    
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginVertical: 20,
        marginHorizontal: 10,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#142c44',
    
        // backgroundColor: '#D5D8DC ',
      },
      container:{backgroundColor: '#c8cad0', marginHorizontal:20}
});