import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7',
    },

    filterButtonContainer: {
        borderBottomColor: 'rgba(152, 113, 245, 0.5)',
        borderBottomWidth: 1,
        marginTop: -20,
        marginBottom: 32,
    },

    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },

    filterButtonText: {
        color: "#D4C2FF",
        fontFamily: "Archivo_400Regular",
        fontSize: 16,
    },

    teacherList: {
        marginTop: -40,
    },
    
    searchForm: {
        marginBottom: 24,
    },

    label: {
        color: '#d4c2ff',
        fontFamily: 'Poppins_400Regular'
    },

    input: {
        height: 54,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16,
    },

    inputGroup: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },

    inputBlock: {
        width: '48%'
    },
})

export default styles