import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
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
    <ScrollView >
    <View style={{width:"100%", alignSelf:"center", flex: 1}} >
      {/* Cabeçalho com imagem */}
      <View style={{ 
        display:"flex",
        alignItems:"center",
        width:"100%",
        // height:"14%", 
        backgroundColor:"#BB0A21"}}>
        <Image 
        source={{ uri: '/kiki.png' }}
        style={{width:"200px", height:"100px"}} 
        resizeMode="contain" />
        <Text 
        style={{
          padding:".4rem",
          fontSize:"25px",
          borderRadius:"5px",
          fontWeight:'bold',
          color:"#fff"
        }}>Serviços de CEP da
        <Text style={{
          color: "#fff",
          fontSize:"40px",
          fontWeight:'bold',
          marginLeft:".5rem",
        }}>Kiki</Text>
        </Text>
      </View>

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
