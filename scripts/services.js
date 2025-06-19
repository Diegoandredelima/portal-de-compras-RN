// Serviços para o Portal de Compras Governamentais

// Configuração base da API
// Attempt to get API_BASE_URL from a global config object (e.g., injected by a build process or a script tag in HTML)
// This allows for different URLs in development, staging, and production environments.
// Example: window.APP_CONFIG = { API_BASE_URL: 'http://localhost:3001/api/v1' };
const hardcodedApiBaseUrl = 'https://api.compras.rn.gov.br/v1'; // Fallback URL

// In a future WordPress integration, this API_BASE_URL would typically point to the WordPress REST API endpoint (e.g., 'https://yourdomain.com/wp-json/').
const API_BASE_URL =
  window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL
    ? window.APP_CONFIG.API_BASE_URL
    : hardcodedApiBaseUrl;

if (API_BASE_URL === hardcodedApiBaseUrl) {
  console.warn(
    'API_BASE_URL is using the hardcoded fallback. For production/staging, ensure window.APP_CONFIG.API_BASE_URL is set.',
  );
} else {
  console.info(`API_BASE_URL is set to: ${API_BASE_URL}`);
}

// Função para fazer requisições à API
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

// Serviço de autenticação
export const authService = {
  // Login
  login: async (email, password) => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Logout
  logout: async () => {
    return fetchAPI('/auth/logout', {
      method: 'POST',
    });
  },

  // Recuperar senha
  recoverPassword: async email => {
    return fetchAPI('/auth/recover-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Verificar token
  verifyToken: async token => {
    return fetchAPI('/auth/verify-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },
};

// Serviço de licitações
export const licitacaoService = {
  // Listar licitações
  list: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/licitacoes?${queryString}`);
  },

  // Obter detalhes de uma licitação
  getById: async id => {
    return fetchAPI(`/licitacoes/${id}`);
  },

  // Criar nova licitação
  create: async data => {
    return fetchAPI('/licitacoes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Atualizar licitação
  update: async (id, data) => {
    return fetchAPI(`/licitacoes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Excluir licitação
  delete: async id => {
    return fetchAPI(`/licitacoes/${id}`, {
      method: 'DELETE',
    });
  },
};

// Serviço de contratos
export const contratoService = {
  // Listar contratos
  list: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/contratos?${queryString}`);
  },

  // Obter detalhes de um contrato
  getById: async id => {
    return fetchAPI(`/contratos/${id}`);
  },

  // Criar novo contrato
  create: async data => {
    return fetchAPI('/contratos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Atualizar contrato
  update: async (id, data) => {
    return fetchAPI(`/contratos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Excluir contrato
  delete: async id => {
    return fetchAPI(`/contratos/${id}`, {
      method: 'DELETE',
    });
  },
};

// Serviço de fornecedores
export const fornecedorService = {
  // Listar fornecedores
  list: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/fornecedores?${queryString}`);
  },

  // Obter detalhes de um fornecedor
  getById: async id => {
    return fetchAPI(`/fornecedores/${id}`);
  },

  // Criar novo fornecedor
  create: async data => {
    return fetchAPI('/fornecedores', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Atualizar fornecedor
  update: async (id, data) => {
    return fetchAPI(`/fornecedores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Excluir fornecedor
  delete: async id => {
    return fetchAPI(`/fornecedores/${id}`, {
      method: 'DELETE',
    });
  },
};

// Serviço de usuários
export const userService = {
  // Listar usuários
  list: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/usuarios?${queryString}`);
  },

  // Obter detalhes de um usuário
  getById: async id => {
    return fetchAPI(`/usuarios/${id}`);
  },

  // Criar novo usuário
  create: async data => {
    return fetchAPI('/usuarios', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Atualizar usuário
  update: async (id, data) => {
    return fetchAPI(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Excluir usuário
  delete: async id => {
    return fetchAPI(`/usuarios/${id}`, {
      method: 'DELETE',
    });
  },
};

// Serviço de notificações
export const notificationService = {
  // Listar notificações
  list: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/notificacoes?${queryString}`);
  },

  // Marcar notificação como lida
  markAsRead: async id => {
    return fetchAPI(`/notificacoes/${id}/read`, {
      method: 'PUT',
    });
  },

  // Marcar todas as notificações como lidas
  markAllAsRead: async () => {
    return fetchAPI('/notificacoes/read-all', {
      method: 'PUT',
    });
  },

  // Excluir notificação
  delete: async id => {
    return fetchAPI(`/notificacoes/${id}`, {
      method: 'DELETE',
    });
  },
};
