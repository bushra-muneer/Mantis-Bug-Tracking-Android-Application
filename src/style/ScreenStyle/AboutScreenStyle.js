import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    about_container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: 'white',
        padding: 4,
        color: 'black',
      },
      about_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '50%',
      },
      about_view: {
        width: '100%', marginTop: 4
      },
      about_text: {
        color: 'black', marginLeft: 10, fontSize: 15
      },
});