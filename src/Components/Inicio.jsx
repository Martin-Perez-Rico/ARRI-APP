import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Alert } from 'react-native';

const Main = ({ navigation, route }) => {
  const {nombre,token} = route.params;
  const [data, setData] = useState([]);

  const consultarInstituciones = async () => {
    const url = 'http://192.168.1.7:4000/api/arri/instiUser';

    try {
      const config = {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'x-access-token':token
        }
      }

      const response = await fetch(url,config);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }

  };

  const estadisticasInstitucion = async (institucion) => {
    const url = 'http://192.168.1.7:4000/api/arri/estadisticas';
    const state = { institucion }
    
    try {
      const config = {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'x-access-token':token
        },
        body: JSON.stringify(state)
      }

      const response = await fetch(url,config);
      const json = await response.json();

      const p = [];
      const i = [];
      const m = [];
      const s = [];
      const n = [];
      const l = [];

      for (const key in json.PromedioPeriodos) {
        if (json.PromedioPeriodos.hasOwnProperty(key)) {
          p.push(json.PromedioPeriodos[key].Periodo);
          i.push(json.PromedioPeriodos[key].Ingles);
          m.push(json.PromedioPeriodos[key].Matematicas);
          s.push(json.PromedioPeriodos[key].Sociales);
          n.push(json.PromedioPeriodos[key].Naturales);
          l.push(json.PromedioPeriodos[key].Lectura);
        }
      }

      navigation.navigate('Estadisticas',{
        nombre,
        periodos: p,
        ingles: i,
        inglesPorcentaje: json.PromedioAreas.Porcentaje.Ingles,
        inglesPromedio: json.PromedioAreas.Promedios.Ingles,
        matematicas: m,
        matematicasPorcentaje: json.PromedioAreas.Porcentaje.Matematicas,
        matematicasPromedio: json.PromedioAreas.Promedios.Matematicas,
        sociales: s,
        socialesPorcentaje: json.PromedioAreas.Porcentaje.Sociales,
        socialesPromedio: json.PromedioAreas.Promedios.Sociales,
        naturales: n,
        naturalesPorcentaje: json.PromedioAreas.Porcentaje.Naturales,
        naturalesPromedio: json.PromedioAreas.Promedios.Naturales,
        lectura: l,
        lecturaPorcentaje: json.PromedioAreas.Porcentaje.Lectura,
        lecturaPromedio: json.PromedioAreas.Promedios.Lectura,
        global: json.PromedioAreas.Promedios.Global,
      })

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    consultarInstituciones(); 
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.usuario}>{nombre}</Text>
        <TouchableHighlight style={styles.sesion} onPress={() => navigation.navigate('Login')}>
          <Text>Cerrar Sesion</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.body}>
      <Text style={styles.titulos}>Lista de Instituciones Consultadas</Text>
        {data.map((i, index) => (
          <TouchableHighlight key={index} style={styles.instituciones} onPress={() => estadisticasInstitucion(i["nombre_institucion"])}>
            <Text style={styles.nombre}>{i["nombre_institucion"]}</Text>
          </TouchableHighlight>
        ))}
      </View>
    </ScrollView>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      flex: 1,
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between'
    },
    body: {
      flex: 9,
      marginTop:20,
    },
    usuario: {
      alignSelf:'flex-end',
      alignContent:'flex-start',
      fontSize:25,
      paddingLeft:10,
    },
    sesion: {
      alignSelf:'flex-end',
      alignContent:'flex-end',
      paddingRight:10,
    },
    instituciones:{
      padding:5,
      alignItems:'center',
      fontSize:25,
      backgroundColor:'black',
      margin:10,
      height:50,
      borderRadius:15,
    },
    nombre:{
      color:'white',
      marginTop:7,
      fontSize:15,
    },
    titulos:{
      alignSelf:'center',
      fontSize:20,
      marginBottom:10,
      fontWeight:'bold',
    },
  });

export default Main