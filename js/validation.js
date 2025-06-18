// Validação de formulários para o Portal de Compras Governamentais

// Regras de validação
const rules = {
  // Validação de CPF
  cpf: {
    validate: (value) => {
      value = value.replace(/[^\d]/g, '');

      if (value.length !== 11) return false;

      if (/^(\d)\1{10}$/.test(value)) return false;

      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(value.charAt(i)) * (10 - i);
      }
      let rest = 11 - (sum % 11);
      let digit1 = rest > 9 ? 0 : rest;

      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(value.charAt(i)) * (11 - i);
      }
      rest = 11 - (sum % 11);
      let digit2 = rest > 9 ? 0 : rest;

      return digit1 === parseInt(value.charAt(9)) && digit2 === parseInt(value.charAt(10));
    },
    message: 'CPF inválido',
  },

  // Validação de CNPJ
  cnpj: {
    validate: (value) => {
      value = value.replace(/[^\d]/g, '');

      if (value.length !== 14) return false;

      if (/^(\d)\1{13}$/.test(value)) return false;

      let size = value.length - 2;
      let numbers = value.substring(0, size);
      let digits = value.substring(size);
      let sum = 0;
      let pos = size - 7;

      for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
      }

      let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (result !== parseInt(digits.charAt(0))) return false;

      size = size + 1;
      numbers = value.substring(0, size);
      sum = 0;
      pos = size - 7;

      for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
      }

      result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      return result === parseInt(digits.charAt(1));
    },
    message: 'CNPJ inválido',
  },

  // Validação de email
  email: {
    validate: (value) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(value);
    },
    message: 'Email inválido',
  },

  // Validação de senha
  password: {
    validate: (value) => {
      // Mínimo 8 caracteres, pelo menos uma letra maiúscula, uma minúscula e um número
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return re.test(value);
    },
    message: 'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números',
  },

  // Validação de telefone
  phone: {
    validate: (value) => {
      const re = /^\(\d{2}\) \d{5}-\d{4}$/;
      return re.test(value);
    },
    message: 'Telefone inválido. Use o formato (XX) XXXXX-XXXX',
  },

  // Validação de CEP
  cep: {
    validate: (value) => {
      const re = /^\d{5}-\d{3}$/;
      return re.test(value);
    },
    message: 'CEP inválido. Use o formato XXXXX-XXX',
  },

  // Validação de data
  date: {
    validate: (value) => {
      const re = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!re.test(value)) return false;

      const [day, month, year] = value.split('/').map(Number);
      const date = new Date(year, month - 1, day);

      return date.getDate() === day &&
             date.getMonth() === month - 1 &&
             date.getFullYear() === year;
    },
    message: 'Data inválida. Use o formato DD/MM/AAAA',
  },

  // Validação de valor monetário
  currency: {
    validate: (value) => {
      const re = /^R\$ \d{1,3}(\.\d{3})*,\d{2}$/;
      return re.test(value);
    },
    message: 'Valor monetário inválido. Use o formato R$ X.XXX,XX',
  },

  // Validação de número
  number: {
    validate: (value) => {
      return !isNaN(value) && isFinite(value);
    },
    message: 'Valor deve ser um número',
  },

  // Validação de texto não vazio
  required: {
    validate: (value) => {
      return value !== null && value !== undefined && value.toString().trim() !== '';
    },
    message: 'Campo obrigatório',
  },

  // Validação de tamanho mínimo
  minLength: {
    validate: (value, min) => {
      return value.toString().length >= min;
    },
    message: (min) => `Mínimo de ${min} caracteres`,
  },

  // Validação de tamanho máximo
  maxLength: {
    validate: (value, max) => {
      return value.toString().length <= max;
    },
    message: (max) => `Máximo de ${max} caracteres`,
  },
};

// Classe de validação
export class Validator {
  constructor(form) {
    this.form = form;
    this.errors = {};
  }

  // Validar campo
  validateField(field, value, fieldRules) {
    this.errors[field] = [];

    for (const rule of fieldRules) {
      const ruleName = typeof rule === 'string' ? rule : rule.name;
      const ruleParam = typeof rule === 'string' ? null : rule.param;

      if (rules[ruleName]) {
        const isValid = rules[ruleName].validate(value, ruleParam);

        if (!isValid) {
          const message = typeof rules[ruleName].message === 'function'
            ? rules[ruleName].message(ruleParam)
            : rules[ruleName].message;

          this.errors[field].push(message);
        }
      }
    }

    return this.errors[field].length === 0;
  }

  // Validar formulário
  validateForm(fields) {
    let isValid = true;

    for (const [field, fieldRules] of Object.entries(fields)) {
      const value = this.form[field].value;
      const fieldValid = this.validateField(field, value, fieldRules);

      if (!fieldValid) {
        isValid = false;
      }
    }

    return isValid;
  }

  // Obter erros
  getErrors() {
    return this.errors;
  }

  // Limpar erros
  clearErrors() {
    this.errors = {};
  }
}

// Exemplo de uso:
/*
const form = document.getElementById('myForm');
const validator = new Validator(form);

const fields = {
  cpf: ['required', 'cpf'],
  email: ['required', 'email'],
  password: ['required', 'password'],
  phone: ['required', 'phone'],
  cep: ['required', 'cep'],
  date: ['required', 'date'],
  currency: ['required', 'currency'],
  number: ['required', 'number'],
  text: ['required', { name: 'minLength', param: 3 }, { name: 'maxLength', param: 50 }],
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (validator.validateForm(fields)) {
    // Formulário válido, enviar dados
    console.log('Formulário válido');
  } else {
    // Formulário inválido, mostrar erros
    console.log('Erros:', validator.getErrors());
  }
});
*/
