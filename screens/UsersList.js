import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, ScrollView, Button } from 'react-native';
import { diffClamp } from 'react-native-reanimated';
import firebase from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements'

const UsersList = (props) => {

    const [ users, setUsers ] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const usuarios = [];
            querySnapshot.docs.forEach( doc => {
                const {name, email, phone} = doc.data();
                usuarios.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                });
            });

            setUsers(usuarios);
            setLoading(false);
        });
    }, []);

    if(loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
    };

    return (
        <ScrollView>
            <Button 
            title = "Registrar Usuario" 
            onPress={() => props.navigation.navigate('Registrar Usuario')}
            />

            {
                users.map( user => {
                    return (
                      <ListItem key={user.id} bottomDivider onPress={() => {
                          props.navigation.navigate('Modificar Usuario', {
                              userId: user.id
                          })
                      }}>
                        <ListItem.Chevron />
                        <Avatar
                          source={{
                            uri:
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpSlKAZCOkXICzCApIHFXE0ZiWBzZ8cuBZXA&usqp=CAU"
                          }}
                          rounded
                        />
                        <ListItem.Content>
                          <ListItem.Title>{user.name}</ListItem.Title>
                          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    );
                })
            }

        </ScrollView>
    )
}

export default UsersList
