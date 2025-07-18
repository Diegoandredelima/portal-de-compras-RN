// Nome do cache
const CACHE_NAME = 'compras-rn-v2';

// Arquivos para cache
const urlsToCache = [
  '/',
  '/Index.html',
  '/css/main.css',
  '/js/scripts.js',
  '/js/forum.js',
  '/images/compr-logo.png',
  '/images/rn-governo-logo.png',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
  '/pages/Fornecedor.html',
  '/pages/Servidor.html',
  '/pages/Cidadao.html',
  '/pages/Capacite-se.html',
  '/pages/Legislacao.html',
  '/pages/Acesso-sistema.html',
  '/pages/Oportunidade.html',
  '/pages/Manuais.html',
  '/pages/Noticias.html',
  '/pages/Institucional.html',
  '/pages/Forum.html',
  '/pages/FAQs-perguntas.html',
  '/pages/Em-construcao.html',
  '/pages/Compr-ia.html',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Cache antigo removido:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retorna a resposta do cache
        if (response) {
          return response;
        }

        // Clone da requisição
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Verifica se recebemos uma resposta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone da resposta
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Sincronização em segundo plano
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

// Função para sincronizar dados
async function syncData() {
  try {
    // Implementar lógica de sincronização aqui
    console.log('Sincronizando dados...');
  } catch (error) {
    console.error('Erro na sincronização:', error);
  }
}

// Notificações push
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/img/icon-192x192.png',
    badge: '/img/badge.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver mais',
        icon: '/img/checkmark.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/img/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Portal de Compras Governamentais - RN', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
