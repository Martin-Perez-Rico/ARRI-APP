import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight } from 'react-native';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';

const Main =({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const flashMessageRef = useRef();

  const handleNameChange = (inputText) => {
    setName(inputText);
  };

  const handleUsernameChange = (inputText) => {
    setUsername(inputText);
  };

  const handlePasswordChange = (inputText) => {
    setPassword(inputText);
  };

  const handleRepeatPasswordChange = (inputText) => {
    setRepeatPassword(inputText);
  };

  const showPopup = () => {
    flashMessageRef.current.showMessage({
      message: '¡Confirmacion de Contraseña!',
      description: 'Por favor ingresa la misma contraseña en ambos campos.',
      type: 'danger', // 'success', 'info', 'warning' o 'danger'
      duration: 3000, // Duración en milisegundos
      autoHide: true, // Ocultar automáticamente el mensaje
    });
  };

  const showPopup2 = () => {
    flashMessageRef.current.showMessage({
      message: '¡Datos No Ingresados!',
      description: 'Por favor revise que todos los campos esten ingresados y correctos.',
      type: 'warning', // 'success', 'info', 'warning' o 'danger'
      duration: 3000, // Duración en milisegundos
      autoHide: true, // Ocultar automáticamente el mensaje
    });
  };

  const handleRegister = async () => {
    const url = 'http://192.168.1.7:4000/api/arri/register';
    const state = {
      nombre:name,
      correo:username,
      contraseña:password,
    }

    try {
      const config = {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify(state)
      }
      if(state.nombre!="" && state.correo!="" && state.contraseña!=""){
        if(password==repeatPassword){
          const response = await fetch(url,config);
          const json = await response.json();
          navigation.navigate('Inicio',{
            nombre: json.nombre,
            token: json.token
          });
        }else{
          showPopup();
        }
      }else{
        showPopup2();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../img/zyro-image2.png')} style={styles.img}/>
      <View style={styles.seccion}>
        <Text style={styles.textos}>Nombre</Text>
        <TextInput style={styles.inputs}
          value={name}
          onChangeText={handleNameChange}
          placeholder="Ingrese su nombre"
          placeholderTextColor="#D9EDEE"
        />
        <Text style={styles.textos}>Correo</Text>
        <TextInput style={styles.inputs}
          value={username}
          onChangeText={handleUsernameChange}
          placeholder="Ingrese su correo"
          placeholderTextColor="#D9EDEE"
        />
        <Text style={styles.textos}>Contraseña</Text>
        <TextInput style={styles.inputs}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Ingrese su contraseña"
          placeholderTextColor="#D9EDEE"
          secureTextEntry={true}
        />
        <Text style={styles.textos}>Confirmacion de Contraseña</Text>
        <TextInput style={styles.inputs}
          value={repeatPassword}
          onChangeText={handleRepeatPasswordChange}
          placeholder="Ingrese nuevamente su contraseña"
          placeholderTextColor="#D9EDEE"
          secureTextEntry={true}
        />
      </View>
      <TouchableHighlight style={styles.botonRegistrar} onPress={handleRegister}>
        <Text style={styles.texto}>Registrarse</Text>
      </TouchableHighlight>

      <FlashMessage ref={flashMessageRef} position="bottom" />
    </View>
  );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    seccion: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40,
    },
    espacio: {
      margin: 60,
    },
    img: {
      objectFit: 'contain',
      marginBottom: 40,
      width: 200,
      height: 200,
    },
    textos: {
      margin: 10,
    },
    inputs: {
      backgroundColor: 'black',
      color:'white',
      padding:10,
      borderRadius:25,
      width:300,
    },
    botonRegistrar: {
      backgroundColor: 'black',
      padding:10,
      borderRadius:25,
      width:100,
      alignItems: 'center',
    },
    texto: {
      color:'white'
    },
  });

export default Main