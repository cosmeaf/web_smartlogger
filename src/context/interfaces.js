// Interface para o usuário
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

// Interface para a resposta de autenticação
export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}
