export const login = async (email, password) => {
  // Simulação de uma requisição de login
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === "a" && password === "a") {
        resolve({ status: "success", message: "Login efetuado com sucesso!" });
      } else {
        resolve({ status: "error", message: "Credenciais inválidas" });
      }
    }, 2000);
  });
};

export const createAccount = async (email, password, phone, cpf) => {
  // Simulação de uma requisição de criação de conta
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email && password && phone && cpf) {
        resolve({ status: "success", message: "Conta criada com sucesso!" });
      } else {
        resolve({
          status: "error",
          message: "Erro ao criar conta, tente novamente.",
        });
      }
    }, 2000);
  });
};
