const sjsNet = {
  connect(url, options = {}) {
    const socket = new WebSocket(url);
  
    socket.onopen = () => {
      if (options.onOpen) options.onOpen();
    };
  
    socket.onmessage = (event) => {
      if (options.onMessage) options.onMessage(event.data);
    };
  
    socket.onerror = (err) => {
      if (options.onError) options.onError(err);
    };
  
    socket.onclose = () => {
      if (options.onClose) options.onClose();
    };
  
    return socket; // Caller can still send/close manually
  },

  setPort(port) {
    this.port = port;
  },

  getPort() {
    return this.port;
  },

  setUrl(url) {
    this.url = url;
  },

  getUrl() {
    return this.url;
  },
};