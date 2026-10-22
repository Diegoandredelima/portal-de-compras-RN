// Nome do cache
const CACHE_NAME = 'compras-rn-v3';

// Arquivos para cache
const urlsToCache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/carrossel.css',
  '/css/forum.css',
  '/css/news-styles.css',
  '/css/oportunidade.css',
  '/js/scripts.js',
  '/js/forum.js',
  '/js/grafico.js',
  '/js/search.js',
  '/images/logos/COMPR_logo.png',
  '/images/logos/SEAD_Logo.jpg',
  '/images/logos/NEGATIVO.png',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
  '/pages/fornecedor.html',
  '/pages/servidor.html',
  '/pages/cidadao.html',
  '/pages/capacite-se.html',
  '/pages/legislacao.html',
  '/pages/acesso-sistema.html',
  '/pages/oportunidade.html',
  '/pages/manuais.html',
  '/pages/noticias.html',
  '/pages/institucional.html',
  '/pages/forum.html',
  '/pages/faqs-perguntas.html',
  '/pages/em-construcao.html',
  '/pages/compr-ia.html'
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
