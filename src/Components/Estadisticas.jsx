import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Alert,Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const Main = ({ navigation, route }) => {
  const {nombre,periodos,ingles,inglesPorcentaje,inglesPromedio,matematicas,matematicasPorcentaje,matematicasPromedio,sociales,socialesPorcentaje,socialesPromedio,naturales,naturalesPorcentaje,naturalesPromedio,lectura,lecturaPorcentaje,lecturaPromedio,global} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.usuario}>{nombre}</Text>
        <TouchableHighlight style={styles.sesion} onPress={() => navigation.navigate('Login')}>
          <Text>Cerrar Sesion</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.titulos}>Comportamiento a lo Largo de los Periodos</Text>
          <LineChart
            data={{
              labels: periodos,
              datasets: [
                {
                  data: ingles,
                  color: (opacity = 1) => `rgba(255, 185, 36, ${opacity})`,
                },
                {
                  data: matematicas,
                  color: (opacity = 1) => `rgba(255, 36, 36, ${opacity})`,
                },
                {
                  data: sociales,
                  color: (opacity = 1) => `rgba(162, 255, 36, ${opacity})`,
                },
                {
                  data: naturales,
                  color: (opacity = 1) => `rgba(36, 126, 255, ${opacity})`,
                },
                {
                  data: lectura,
                  color: (opacity = 1) => `rgba(191, 36, 255, ${opacity})`,
                },
              ],
              legend:["Ingles","Matematicas","Sociales","Naturales","Lectura"]
            }}

            width={Dimensions.get("window").width} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: "#272727",
              backgroundGradientFrom: "#D9EDEE",
              backgroundGradientTo: "#D9EDEE",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
        <View>
          <Text style={styles.titulos}>Porcentaje Notas Totales</Text>
          <Text style={styles.subtitulos}>Puntaje Global: {parseInt(global)}</Text>
          <PieChart
            data={[
              {
                name: "Ingles",
                population: parseInt(inglesPorcentaje),
                color: "rgba(131, 167, 234, 1)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Matematicas",
                population: parseInt(matematicasPorcentaje),
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Sociales",
                population: parseInt(socialesPorcentaje),
                color: "#FF9F15",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Naturales",
                population: parseInt(naturalesPorcentaje),
                color: "#6BCF6C",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Lectura",
                population: parseInt(lecturaPorcentaje),
                color: "rgb(0, 0, 255)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              }
            ]}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={{
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            center={[10, 10]}
            absolute
          />
        </View>
        <View>
          <Text style={styles.titulos}>Promedios Notas Totales</Text>
          <Text style={styles.subtitulos}>Puntaje Global: {parseInt(global)}</Text>
          <PieChart
            data={[
              {
                name: "Ingles",
                population: parseInt(inglesPromedio),
                color: "rgba(131, 167, 234, 1)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Matematicas",
                population: parseInt(matematicasPromedio),
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Sociales",
                population: parseInt(socialesPromedio),
                color: "#FF9F15",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Naturales",
                population: parseInt(naturalesPromedio),
                color: "#6BCF6C",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Lectura",
                population: parseInt(lecturaPromedio),
                color: "rgb(0, 0, 255)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              }
            ]}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={{
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            center={[10, 10]}
            absolute
          />
        </View>
      </View>
    </ScrollView>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'white',
    },
    header: {
      flex: 1,
      top:50,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    body: {
      flex: 9,
      marginTop:70,
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
    nombre:{
      marginTop:7,
      fontSize:15,
    },
    titulos:{
      alignSelf:'center',
      fontSize:17,
    },
    subtitulos:{
      alignSelf:'center',
    },
  });

export default Main