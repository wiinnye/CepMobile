import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import CepForm from "./cepForm";
import CepResult from "./cepResult";

export default function Index() {
  const [cepInfo, setCepInfo] = useState(null);
  const [cepValue, setCepValue] = useState("");
  const [savedCeps, setSavedCeps] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState("");

  // seta as informações do cep informado 
  const handleCepChange = async (info) => {
    setCepInfo(info);
  };

  // Limpa os inputs
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
  
  
    //Funcao para excluir um item da lista
  const removeCepFromList = (idToRemove) => {
    setSavedCeps(prevCeps => 
      prevCeps.filter(cep => cep.id !== idToRemove)
    );
    Alert.alert("Removido", "CEP excluído com sucesso!"); 
  };
  return (
    <ScrollView >
    <View style={{width:"100%", alignSelf:"center", flex: 1}} >
      {/* Cabeçalho com imagem */}
      <View style={{ 
        display:"flex",
        alignItems:"center",
        width:"100%",
        marginBottom:"1rem" ,
        backgroundColor:"#BB0A21"}}>
        <Image 
        source={{ uri: '/kiki.png' }}
        style={{width:"300px", height:"150px"}} 
        resizeMode="contain" />
        <Text 
        style={{
          padding:".2rem",
          fontSize:"22px",
          borderRadius:"5px",
          fontWeight:'bold',
          color:"#fff"
        }}>Serviços de CEP da
        <Text style={{
          color: "#fff",
          fontSize:"42px",
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

        {/* Mostrar as informações e Cep Salvos */}
          <CepResult
            cepInfo={cepInfo}
            clearInput={clearInput}
            onSave={addCepToList}
            onRemove={removeCepFromList}
            savedCeps={savedCeps}
            nomeUsuario={nomeUsuario}
          />
    </View>
    </ScrollView>
  );
}
