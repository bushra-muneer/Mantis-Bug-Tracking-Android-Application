import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    user_view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading_text:
    {
        color: 'black'
    },
    send_reminder_view:
    {
        padding: 2,
        paddingTop: 10,
        paddingHorizontal: 10
    },

    project_view:
    {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
    },

    project_text:
    {
        fontSize: 15,
        color: 'black',
        textAlign: 'justify',
        fontWeight: 'bold',
    },
    text_style: {
        fontSize: 15,
        color: 'black',
        textAlign: 'justify',
    },
    notes_container: {
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        backgroundColor: '#c8cad0',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    notes_wrapper: {
        flexDirection: 'row',
        backgroundColor: '#142c44',
        paddingVertical: 5,
        paddingLeft: 4,
        marginBottom: 4,
    },
    notes_attachment: {
        marginRight: 5,
        paddingLeft: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    notes_text: {
        marginRight: 16,
        marginLeft: 4,
        color: 'white',
        fontSize: 16,
    },
    issue_id_text: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'justify',
    },
    icon: {
        color: "#142c44",
        // fontSize: 50,
        height: 55,
        width: 45,
    }

});