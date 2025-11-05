import * as Clipboard from "expo-clipboard";
import { Alert, Button, Image, Text, View } from "react-native";
import jiji from "../assets/images/jiji.png";

export default function CepResult({
  cepInfo,
  clearInput,
  nomeUsuario,
  onSave,
  savedCeps,
}) {
  if (!cepInfo) {
    return null;
  }

  const copyToClipboard = async () => {
    if (cepInfo) {
      const complementoText =
        cepInfo.complemento && cepInfo.complemento !== ""
          ? cepInfo.complemento
          : "não encontrado";

      const cepText = `
        CEP: ${cepInfo.cep}
        Logradouro: ${cepInfo.logradouro}
        Bairro: ${cepInfo.bairro}
        Cidade: ${cepInfo.localidade}
        Estado: ${cepInfo.uf}
        Complemento: ${complementoText}
        DDD: ${cepInfo.ddd}
      `.trim();

      try {
        // API do Clipboard do Expo
        await Clipboard.setStringAsync(cepText);

        Alert.alert(
          "Copiado",
          "Informações do CEP copiadas para a área de transferência!"
        );
      } catch (err) {
        console.error("Erro ao copiar para o clipboard", err);
        Alert.alert("Erro", "Não foi possível copiar as informações.");
      }
    }
  };

  const saveForm = () => {
    if (!cepInfo) {
      Alert.alert("Erro", "Nenhuma informação de CEP para salvar.");
      return;
    }

    console.log({ ...cepInfo, nomeUsuario: nomeUsuario });
    onSave({ ...cepInfo, nomeUsuario: nomeUsuario });

    Alert.alert("Sucesso", "CEP salvo na lista de sessão!");
  };

  return (
    <View
      style={{
        width: "100%",
        marginTop: "4rem",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 20,
        }}
      >
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Nome:</Text>
          <Text style={{ fontWeight: "bold" }}>CEP:</Text>
          <Text style={{ fontWeight: "bold" }}>Logradouro:</Text>
          <Text style={{ fontWeight: "bold" }}>Complemento:</Text>
          <Text style={{ fontWeight: "bold" }}>Bairro:</Text>
          <Text style={{ fontWeight: "bold" }}>Localidade:</Text>
          <Text style={{ fontWeight: "bold" }}>UF:</Text>
          <Text style={{ fontWeight: "bold" }}>DDD:</Text>
        </View>
        {/* Coluna de Valores */}
        <View style={{ flex: 2 }}>
          <Text>{!nomeUsuario === "" ? "não encontrado" : nomeUsuario}</Text>
          <Text>{cepInfo.cep}</Text>
          <Text>{cepInfo.logradouro}</Text>
          <Text>
            {cepInfo.complemento === ""
              ? "não encontrado"
              : cepInfo.complemento}
          </Text>
          <Text>{cepInfo.bairro}</Text>
          <Text>{cepInfo.localidade}</Text>
          <Text>{cepInfo.uf}</Text>
          <Text>{cepInfo.ddd}</Text>
        </View>
      </View>

      {/* Botões */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "90%",
        }}
      >
        <Button title="Salvar" onPress={saveForm} color="rgb(68, 167, 206)" />
        <Button
          title="Copiar Informações"
          onPress={copyToClipboard}
          color="rgb(68, 167, 206)"
        />
        <Button
          title="Nova Busca"
          onPress={clearInput}
          color="rgb(68, 167, 206)"
        />
      </View>

      {savedCeps && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", padding: "15px" }}>
            CEPs Salvos:
          </Text>
          {savedCeps.map((item, index) => (
            <View
              key={item.id || index}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
              }}
            >
              <div 
              style={{ width:"100%",display: "flex", borderWidth:"1px", borderColo:"#fff" }}>
                <Image
                  source={jiji}
                  style={{ width: "100px", height: "100px", marginTop:"1rem" }}
                  resizeMode="contain"
                />
                <div style={{ width:"100%", display: "flex", flexDirection: "column", marginRight:"3rem"}}>
                  <Text style={{fontSize:"18px"}}>Nome: {item.nomeUsuario || "Não Informado"}</Text>
                  <Text style={{fontSize:"18px"}}>
                    CEP: {item.cep} - {item.localidade}
                  </Text>
                  <Text style={{fontSize:"18px"}}>
                    Logradouro: {item.logradouro} - Bairro: {item.bairro}
                  </Text>
                  <Text style={{fontSize:"18px"}}>
                    Complemento: {item.complemento || "N/A"}</Text>
                  <Text style={{fontSize:"18px"}}>
                    UF: {item.uf} - DDD: {item.ddd}
                  </Text>
                </div>
              </div>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
