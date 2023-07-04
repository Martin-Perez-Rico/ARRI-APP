import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const Main = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const flashMessageRef = useRef();

  const handleUsernameChange = (inputText) => {
    setUsername(inputText);
  };

  const handlePasswordChange = (inputText) => {
    setPassword(inputText);
  };

  const showPopup = () => {
    flashMessageRef.current.showMessage({
      message: '¡Datos No Ingresados!',
      description: 'Por favor revise que todos los campos esten ingresados.',
      type: 'warning', // 'success', 'info', 'warning' o 'danger'
      duration: 3000, // Duración en milisegundos
      autoHide: true, // Ocultar automáticamente el mensaje
    });
  };

  const showPopup2 = () => {
    flashMessageRef.current.showMessage({
      message: '¡Datos Incorrectos!',
      description: 'Por favor revise el correo y la contraseña.',
      type: 'danger', // 'success', 'info', 'warning' o 'danger'
      duration: 3000, // Duración en milisegundos
      autoHide: true, // Ocultar automáticamente el mensaje
    });
  };

  const handleLogin = async () => {
    const url = 'http://192.168.1.7:4000/api/arri/login';
    const state = {
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
      
      if(state.correo!="" && state.contraseña!=""){
        const response = await fetch(url,config);
        const json = await response.json();
        if(json.token){
          navigation.navigate('Inicio',{
            nombre: json.nombre,
            token: json.token
          })
        }else{
          showPopup2();
        }
      }else{
        showPopup();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../img/zyro-image2.png')} style={styles.img}/>
      <View style={styles.seccion}>
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
      </View>
      <TouchableHighlight style={styles.botonEnviar} onPress={handleLogin}>
        <Text style={styles.texto}>Enviar</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.botonRegistrar} onPress={() => navigation.navigate('Register')}>
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
      marginBottom: 30,
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
    botonEnviar: {
      backgroundColor: 'black',
      padding:10,
      borderRadius:25,
      width:100,
      marginBottom:50,
      alignItems: 'center',
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