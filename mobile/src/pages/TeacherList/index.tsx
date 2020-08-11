import React, { useState, useEffect } from 'react'
import {View, ScrollView, Text} from 'react-native'
import { TextInput, BorderlessButton, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'
import api from '../../services/api'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { useFocusEffect } from '@react-navigation/native'

function TeacherList() {
    const [isFiltersVisible, setIsFilterVisible] = useState(false)
    const [favorites, setFavorites] = useState<number[]>([])
    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')
    
    function loadFavorites () {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })

                setFavorites(favoritedTeachersIds)
            }
        })
    }

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
    )

    useEffect(() => {
        async function searchTeachers() {
            loadFavorites()
    
            const response = await api.get('classes', {
                params: {
                   subject,
                   week_day,
                   time 
                }
            })
            setTeachers(response.data)
        }
        
        searchTeachers()
    }, [subject, week_day, time])

    function handleToggleFiltersVisible() {
        setIsFilterVisible(!isFiltersVisible)
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis">
                <View style={styles.filterButtonContainer}>
                    <TouchableOpacity style={styles.filterButton} onPress={handleToggleFiltersVisible} activeOpacity={0.7}>
                        <Feather name="filter" size={20} color="#04D361" />
                        <Text style={styles.filterButtonText}>Filtrar por dia, hora e matéria</Text>
                        {isFiltersVisible ? <Feather name="chevron-up" size={20} color="#A380F6" /> : <Feather name="chevron-down" size={20} color="#A380F6" />}
                    </TouchableOpacity>
                </View>
                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput style={styles.input} value={subject} onChangeText={text => setSubject(text)} placeholder="Qual a matéria?" placeholderTextColor='#c1bccc'></TextInput>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput style={styles.input} value={week_day} onChangeText={text => setWeekDay(text)} placeholder="Qual o dia?" placeholderTextColor='#c1bccc'></TextInput>
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput style={styles.input} value={time} onChangeText={text => setTime(text)} placeholder="Qual horário?" placeholderTextColor='#c1bccc'></TextInput>
                            </View>
                        </View>
                    </View>
                )}
            </PageHeader>

            <ScrollView style={styles.teacherList} contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}>
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)}/>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList