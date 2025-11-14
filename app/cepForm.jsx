import { Alert, Button, Text, TextInput, View } from "react-native";
import { fetchCep } from "../api/CepApi.js";

export default function CepForm({
  handleCepChange,
  setCepValue,
  cepValue,
  nomeUsuario,
  setNomeUsuario,
}) {
  // pegar o valor do Cep digitado 
  const handleChangeCep = (text) => {
    setCepValue(text);
  };
  // pegar o valor do Nome digitado 
  const handleChangeNome = (nome) => {
    setNomeUsuario(nome);
  };
  // PARA ENCONTRAR O CEP DIGITADO
  const handleSubmit = async () => {
    if (cepValue.length !== 8 || !/^\d+$/.test(cepValue)) {
      Alert.alert(
        "CEP inválido",
        "Por favor, insira um CEP válido com 8 dígitos numéricos.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      const result = await fetchCep(cepValue);

      if (!result) {
        Alert.alert("Erro", "CEP não encontrado ou inválido.", [
          { text: "OK" },
        ]);
        // Garante que o estado é limpo ou atualizado no componente pai
        handleCepChange(null);
        return;
      }

      handleCepChange(result);
      Alert.alert("Sucesso!", "CEP encontrado com sucesso.", [{ text: "OK" }]);
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert(
        "Erro na requisição",
        "Não foi possível buscar o CEP. Tente novamente mais tarde.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={{ alignSelf: "center", marginBottom:"2rem"}}>

      {/* Titulo  */}
      <View
        style={{
          display: "flex",
          width: "100%"
        }}
      >
        <Text
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginTop: "2rem",
            color:"#0675B0",
          }}
        >
          Salve seu Endereço Favorito
        </Text>
      </View>

      {/* Inputs */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: "2rem",
        }}
      >
        <TextInput
          style={{
            width: "210px",
            padding: "1rem",
            color:"#000",
            backgroundColor:"#b9d3d8",
            borderColor: "#324376",
            borderRadius: ".5rem",
            borderWidth: 1,
            marginBottom: "1rem",
          }}
          onChangeText={handleChangeNome}
          value={nomeUsuario}
          placeholder="Digite seu Nome"
        />
        <TextInput
          style={{
            width: "210px",
            padding: "1rem",
            color:"#000",
            backgroundColor:"#b9d3d8",
            borderColor: "#324376",
            borderColor: "#324376",
            borderRadius: ".5rem",
            borderWidth: 1,
          }}
          onChangeText={handleChangeCep}
          value={cepValue}
          placeholder="Digite o CEP"
          keyboardType="numeric"
        />
      </View>

      {/* Botão */}
      <View style={{ width: 200, marginVertical: 10, alignSelf: "center" }}>
        <Button title="consultar" color="#324376" onPress={handleSubmit} />
      </View>
    </View>
  );
}
