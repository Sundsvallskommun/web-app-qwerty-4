self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data && event.notification.data.url ? event.notification.data.url : '/';

  event.waitUntil(
    self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    }).then((clients) => {
      for (const client of clients) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }

      for (const client of clients) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }

      return undefined;
    })
  );
});
