// Sistema de notificações para o Portal de Compras Governamentais

// Tipos de notificação
const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Cores para cada tipo de notificação
const NOTIFICATION_COLORS = {
  [NOTIFICATION_TYPES.SUCCESS]: '#5EA51D',
  [NOTIFICATION_TYPES.ERROR]: '#FF6B35',
  [NOTIFICATION_TYPES.WARNING]: '#FFCD07',
  [NOTIFICATION_TYPES.INFO]: '#3498db',
};

// Ícones para cada tipo de notificação
const NOTIFICATION_ICONS = {
  [NOTIFICATION_TYPES.SUCCESS]: 'fas fa-check-circle',
  [NOTIFICATION_TYPES.ERROR]: 'fas fa-exclamation-circle',
  [NOTIFICATION_TYPES.WARNING]: 'fas fa-exclamation-triangle',
  [NOTIFICATION_TYPES.INFO]: 'fas fa-info-circle',
};

// Classe de notificação
export class Notification {
  constructor() {
    this.container = null;
    this.notifications = [];
    this.init();
  }

  // Inicializar o sistema de notificações
  init() {
    // Criar container de notificações
    this.container = document.createElement('div');
    this.container.className = 'notification-container';
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;

    document.body.appendChild(this.container);
  }

  // Mostrar notificação
  show(message, type = NOTIFICATION_TYPES.INFO, duration = 5000) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 300px;
      max-width: 400px;
      animation: slideIn 0.3s ease-out;
    `;

    // Adicionar borda colorida
    notification.style.borderLeft = `4px solid ${NOTIFICATION_COLORS[type]}`;

    // Criar ícone
    const icon = document.createElement('i');
    icon.className = NOTIFICATION_ICONS[type];
    icon.style.cssText = `
      font-size: 1.5rem;
      color: ${NOTIFICATION_COLORS[type]};
    `;

    // Criar conteúdo
    const content = document.createElement('div');
    content.className = 'notification-content';
    content.style.cssText = `
      flex: 1;
    `;

    // Criar mensagem
    const messageElement = document.createElement('p');
    messageElement.className = 'notification-message';
    messageElement.style.cssText = `
      margin: 0;
      color: #333;
      font-size: 0.9rem;
    `;
    messageElement.textContent = message;

    // Criar botão de fechar
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.style.cssText = `
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      font-size: 1rem;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    closeButton.innerHTML = '<i class="fas fa-times"></i>';

    // Adicionar evento de clique ao botão de fechar
    closeButton.addEventListener('click', () => {
      this.hide(notification);
    });

    // Montar notificação
    content.appendChild(messageElement);
    notification.appendChild(icon);
    notification.appendChild(content);
    notification.appendChild(closeButton);

    // Adicionar ao container
    this.container.appendChild(notification);

    // Adicionar à lista de notificações
    this.notifications.push(notification);

    // Definir timeout para remover automaticamente
    if (duration > 0) {
      setTimeout(() => {
        this.hide(notification);
      }, duration);
    }

    // Adicionar estilos CSS
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .notification {
          animation: slideIn 0.3s ease-out;
        }

        .notification.hiding {
          animation: slideOut 0.3s ease-out;
        }
      `;
      document.head.appendChild(style);
    }

    return notification;
  }

  // Esconder notificação
  hide(notification) {
    if (!notification) return;

    // Adicionar classe de animação
    notification.classList.add('hiding');

    // Remover após a animação
    setTimeout(() => {
      if (notification.parentNode === this.container) {
        this.container.removeChild(notification);
      }

      // Remover da lista
      const index = this.notifications.indexOf(notification);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    }, 300);
  }

  // Esconder todas as notificações
  hideAll() {
    this.notifications.forEach(notification => {
      this.hide(notification);
    });
  }

  // Métodos de conveniência para cada tipo de notificação
  success(message, duration) {
    return this.show(message, NOTIFICATION_TYPES.SUCCESS, duration);
  }

  error(message, duration) {
    return this.show(message, NOTIFICATION_TYPES.ERROR, duration);
  }

  warning(message, duration) {
    return this.show(message, NOTIFICATION_TYPES.WARNING, duration);
  }

  info(message, duration) {
    return this.show(message, NOTIFICATION_TYPES.INFO, duration);
  }
}

// Criar instância global
const notification = new Notification();

// Exemplo de uso:
/*
// Notificação de sucesso
notification.success('Operação realizada com sucesso!');

// Notificação de erro
notification.error('Ocorreu um erro ao processar sua solicitação.');

// Notificação de aviso
notification.warning('Atenção: alguns campos estão incompletos.');

// Notificação de informação
notification.info('Nova atualização disponível.');

// Notificação personalizada
notification.show('Mensagem personalizada', 'info', 10000);

// Esconder todas as notificações
notification.hideAll();
*/
