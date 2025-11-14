import * as Clipboard from "expo-clipboard";
import {
  Alert,
  Button,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function CepResult({
  cepInfo,
  clearInput,
  nomeUsuario,
  onSave,
  onRemove,
  savedCeps,
}) {
  const isCepInfoVisible = cepInfo !== null;
  const isSavedCepsVisible = savedCeps && savedCeps.length > 0;

  if (!isCepInfoVisible && !isSavedCepsVisible) {
    return null;
  }

  //logica para fazer copia e cola das informações
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
        if (typeof window !== "undefined") {
          await Clipboard.setStringAsync(cepText);

          Alert.alert(
            "Copiado",
            "Informações do CEP copiadas para a área de transferência!"
          );
        } else {
          console.log("Clipboard não disponível no ambiente do servidor.");
          return;
        }
      } catch (err) {
        console.error("Erro ao copiar para o clipboard", err);
        Alert.alert("Erro", "Não foi possível copiar as informações.");
      }
    }
  };

  //salva o cep favorito
  const saveForm = () => {
    if (!cepInfo) {
      Alert.alert("Erro", "Nenhuma informação de CEP para salvar.");
      return;
    }

    console.log({ ...cepInfo, nomeUsuario: nomeUsuario });
    onSave({ ...cepInfo, nomeUsuario: nomeUsuario });

    Alert.alert("Sucesso", "CEP salvo na lista de sessão!");
  };

  // funcao para auxiliar para renderizar cada linha no resultado do cep - lista
  const renderInfoRow = (category, value) => (
    <View
      key={category}
      style={{
        flexDirection: "row",
        marginBottom: 4,
        margin: ".5rem",
        paddingVertical: 2,
        justifyContent: "flex-start",
      }}
    >
      <Text style={{ fontWeight: "bold", width: 120 }}>{category}:</Text>
      <Text style={{ flex: 1 }}>{value}</Text>
    </View>
  );

  return (
    <View style={{ width: "100%", alignSelf: "center", flex: 1 }}>
      {/* Mostrar Resultado do Cep */}
      {isCepInfoVisible && (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "auto",
              alignSelf: "center",
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#ccc",
              backgroundColor: "#fff",
              marginBottom: 20,
            }}
          >
            <View style={{ width: "100%", paddingHorizontal: 10 }}>
              {renderInfoRow("Nome", nomeUsuario || "não informado")}
              {renderInfoRow("CEP", cepInfo.cep)}
              {renderInfoRow("Logradouro", cepInfo.logradouro)}
              {renderInfoRow("Bairro", cepInfo.bairro)}
              {renderInfoRow("Localidade", cepInfo.localidade)}
              {renderInfoRow("UF", cepInfo.uf)}
              {renderInfoRow("DDD", cepInfo.ddd)}
              {renderInfoRow(
                "Complemento",
                cepInfo.complemento === ""
                  ? "não encontrado"
                  : cepInfo.complemento
              )}
            </View>
          </View>

          {/* Botões */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "70%",
              padding: "1rem",
              alignSelf: "center",
            }}
          >
            <Button title="Salvar" onPress={saveForm} color="#324376" />
            <Button
              title="Nova Consulta"
              onPress={clearInput}
              color="#324376"
            />
            <Button title="Copiar" onPress={copyToClipboard} color="#324376" />
          </View>
        </>
      )}

      {/* Salvar o cep */}
      {isSavedCepsVisible && (
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              padding: ".5rem",
              marginTop: "2rem",
              color:"#0675B0",
            }}
          >
            CEP's Favoritos:
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
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  borderWidth: 1,
                  padding: 10,
                  borderColor: "#81a9ff",
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    marginRight: 10,
                    alignSelf:'center',
                  }}
                >
                  <Image
                    source={{ uri: "/jiji.png" }}
                    style={{
                      width: 80,
                      height: 80,
                      marginRight: 10,
                      marginTop: 5,
                      alignSelf: "center",
                    }}
                    resizeMode="contain"
                  />
              </View>
                  <View
                    style={{
                      flex: 1, 
                      flexDirection: "column",
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Nome:
                      <Text style={{ fontSize: "16px", fontWeight: "400" }}>
                        {" "}
                        {item.nomeUsuario || "Não Informado"}
                      </Text>
                    </Text>
                    <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                      CEP:
                      <Text style={{ fontSize: "16px", fontWeight: "400" }}>
                        {" "}
                        {item.cep} | {item.localidade} - {item.uf}
                      </Text>
                    </Text>
                    <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Logradouro:
                      <Text style={{ fontSize: "16px", fontWeight: "400" }}>
                        {" "}
                        {item.logradouro}, {item.bairro}
                      </Text>
                    </Text>
                    <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Complemento:
                      <Text style={{ fontSize: "16px", fontWeight: "400" }}>
                        {" "}
                        {item.complemento || "N/A"}
                      </Text>
                    </Text>
                    <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                      DDD:
                      <Text style={{ fontSize: "16px", fontWeight: "400" }}>
                        {" "}
                        {item.ddd}
                      </Text>
                    </Text>
                  </View>
                <View
        style={{
          alignSelf: "flex-start", 
          marginTop: 5, 
        }}
      >
        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          style={{
            backgroundColor: "#BB0A21",
            padding: 6,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>Excluir</Text>
        </TouchableOpacity>
      </View>
                </View>
              
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
