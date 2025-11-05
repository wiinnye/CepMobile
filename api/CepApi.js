const BASE_URL = 'https://viacep.com.br/ws/';

export const fetchCep = async (info) => {
  try {
    const response = await fetch(`${BASE_URL}${info}/json/`);

    if (response.status !== 200) {
      // É uma boa prática ter mensagens de erro mais específicas, mas mantendo a lógica
      throw new Error('Erro ao buscar o CEP');
    }

    if (!response.ok) {
      throw new Error('Erro ao buscar o CEP');
    }

    const data = await response.json();

    // O viacep retorna um objeto com a chave 'erro' se o CEP não for encontrado
    if (data.erro) {
      return null;
    }

    // Retorna o objeto de dados do CEP se tudo estiver correto
    return data;
  } catch (error) {
    // Em caso de erro de rede ou outro erro na busca, retorna null
    console.log(error)
    return null;
  }
}