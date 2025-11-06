import { Alert, Button, Text, TextInput, View } from "react-native";
import { fetchCep } from "../api/CepApi.js";

export default function CepForm({
  handleCepChange,
  setCepValue,
  cepValue,
  nomeUsuario,
  setNomeUsuario,
}) {
  const handleChangeCep = (text) => {
    setCepValue(text);
  };

  const handleChangeNome = (nome) => {
    setNomeUsuario(nome);
  };

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
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
        width: "100%",
        height: "30%",
        marginTop:'3rem'
      }}
    >
      <View
        style={{
          display: "flex",
          width: "100%",
          paddingLeft: "2rem",
        }}
      >
        <Text
          style={{ fontSize: "20px", fontWeight: "bold", marginTop: "2rem" }}
        >
          Salve seu Endereço Favorito
        </Text>
      </View>

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
            width: "300px",
            padding: "1rem",
            borderColor: "#324376",
            borderRadius: "2rem",
            borderWidth: 1,
            marginBottom: "1rem",
          }}
          onChangeText={handleChangeNome}
          value={nomeUsuario}
          placeholder="Digite seu Nome"
        />
        <TextInput
          style={{
            width: "300px",
            padding: "1rem",
            borderColor: "#324376",
            borderRadius: "2rem",
            borderWidth: 1,
          }}
          onChangeText={handleChangeCep}
          value={cepValue}
          placeholder="Digite seu cep"
          keyboardType="numeric"
        />
      </View>
      <View style={{ width: 300, marginVertical: 10 }}>
        <Button title="consultar" color="#324376" onPress={handleSubmit} />
      </View>
    </View>
  );
}
