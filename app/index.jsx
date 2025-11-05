import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import kiki from "../assets/images/kiki.png";
import CepForm from "./cepForm";
import CepResult from "./cepResult";

export default function Index() {
  const [cepInfo, setCepInfo] = useState(null);
  const [cepValue, setCepValue] = useState("");
  const [savedCeps, setSavedCeps] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState("");

  
  const handleCepChange = async (info) => {
    setCepInfo(info);
  };

  const clearInput = () => {
    setCepValue("");
    setCepInfo(null);
    setNomeUsuario("")
  };

 // Função para adicionar o CEP atual à lista
  const addCepToList = (cepData) => {
    const newEntry = {
      id: Date.now().toString(), 
      ...cepData,
    };
    // Adiciona no início da lista para que o mais recente apareça primeiro
    setSavedCeps(prevCeps => [newEntry, ...prevCeps]); 
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={{width:"100%", alignSelf:"center", flex: 1}} >
      {/* Cabeçalho com imagem */}
      <div style={{ 
        display:"flex",
        alignItems:"center",
        width:"100%",
        // height:"14%", 
        backgroundColor:"#BB0A21"}}>
        <Image 
        source={kiki} 
        style={{width:"200px", height:"100px"}} 
        resizeMode="contain" />
        <Text 
        style={{
          padding:".4rem",
          fontSize:"25px",
          borderRadius:"5px",
          fontWeight:'bold',
          color:"#E6E8E6"
        }}>Serviços de CEP da
        <span style={{
          color: "#ffffff",
          fontSize:"40px",
          fontWeight:'bold',
          marginLeft:".5rem",
        }}>Kiki</span>
        </Text>
      </div>

      {/* Formulario */}
        <CepForm
          handleCepChange={handleCepChange}
          cepValue={cepValue}
          setCepValue={setCepValue}
          nomeUsuario={nomeUsuario}
          setNomeUsuario={setNomeUsuario}
        />

        {/* Mostrar as informações e Salvos */}
        {cepInfo && (
          <CepResult
            cepInfo={cepInfo}
            clearInput={clearInput}
            onSave={addCepToList}
            savedCeps={savedCeps}
            nomeUsuario={nomeUsuario}
          />
          )}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        // flexGrow: 1 garante que o conteúdo pode rolar, mesmo que seja maior que a tela
        flexGrow: 1, 
        width: '100%',
        alignItems: 'center',
        paddingBottom: 40, // Espaço extra no final da rolagem
    },
    header: {
        // Substitui display:"flex" e height:"14%"
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 100, // Altura fixa em dp
        backgroundColor: "#BB0A21",
        paddingHorizontal: 10,
    },
    headerText: {
        padding: 4, 
        fontSize: 25,
        borderRadius: 5,
        fontWeight: 'bold',
        color: "#E6E8E6"
    },
    kikiText: {
        color: "#ffffff",
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: 5, // Substitui ".5rem"
    },
});