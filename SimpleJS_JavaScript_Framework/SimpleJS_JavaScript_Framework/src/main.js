/**
 * SimpleJS v2 - Professional lightweight JS utility & reactive framework
 * Author: You
 * License: MIT
 */

const SimpleJS = (() => {
  /*** === Internal Debug Mode === ***/
  let DEBUG = false;
  function debugLog(...args) {
    if (DEBUG) console.debug('[SimpleJS DEBUG]:', ...args);
  }

  /*** === Logger === ***/
  const log = {
    info: msg => console.info(`[${new Date().toLocaleTimeString()}] INFO: ${msg}`),
    warn: msg => console.warn(`[${new Date().toLocaleTimeString()}] WARN: ${msg}`),
    err: msg => console.error(`[${new Date().toLocaleTimeString()}] ERROR: ${msg}`),
    debug: msg => debugLog(msg),
  };

  /*** === DOM Utilities === ***/
  const doc = {
    getId: id => document.getElementById(id),
    getClass: className => document.getElementsByClassName(className),
    selectQuery: selector => document.querySelector(selector),
    selectQueries: selector => document.querySelectorAll(selector),
    getTagNames: tagName => document.getElementsByTagName(tagName),

    addListener(id, event, callback) {
      const el = this.getId(id);
      if (!el) return log.warn(`addListener: Element #${id} not found`);
      el.addEventListener(event, callback);
    },

    setTitle(title) {
      document.title = title;
    },

    addClass(elements, className) {
      if (!elements) return;
      if (NodeList.prototype.isPrototypeOf(elements) || Array.isArray(elements)) {
        elements.forEach(el => el.classList.add(className));
      } else {
        elements.classList.add(className);
      }
    },

    removeClass(elements, className) {
      if (!elements) return;
      if (NodeList.prototype.isPrototypeOf(elements) || Array.isArray(elements)) {
        elements.forEach(el => el.classList.remove(className));
      } else {
        elements.classList.remove(className);
      }
    },

    setAttr(elements, attrName, attrValue) {
      if (!elements) return;
      if (NodeList.prototype.isPrototypeOf(elements) || Array.isArray(elements)) {
        elements.forEach(el => el.setAttribute(attrName, attrValue));
      } else {
        elements.setAttribute(attrName, attrValue);
      }
    },

    removeAttr(elements, attrName) {
      if (!elements) return;
      if (NodeList.prototype.isPrototypeOf(elements) || Array.isArray(elements)) {
        elements.forEach(el => el.removeAttribute(attrName));
      } else {
        elements.removeAttribute(attrName);
      }
    },

    setText(id, text) {
      const el = this.getId(id);
      if (!el) return log.warn(`setText: Element #${id} not found`);
      el.innerText = text;
    },

    getText(id) {
      const el = this.getId(id);
      if (!el) return log.warn(`getText: Element #${id} not found`), '';
      return el.innerText;
    },

    setHTML(id, html) {
      const el = this.getId(id);
      if (!el) return log.warn(`setHTML: Element #${id} not found`);
      el.innerHTML = html;
    },

    setStyle(id, styleObj) {
      const el = this.getId(id);
      if (!el) return log.warn(`setStyle: Element #${id} not found`);
      Object.entries(styleObj).forEach(([prop, val]) => (el.style[prop] = val));
    },

    show(id) {
      const el = this.getId(id);
      if (!el) return log.warn(`show: Element #${id} not found`);
      el.style.display = '';
    },

    hide(id) {
      const el = this.getId(id);
      if (!el) return log.warn(`hide: Element #${id} not found`);
      el.style.display = 'none';
    },

    addOnClick(id, fnStr) {
      const el = this.getId(id);
      if (!el) return log.warn(`addOnClick: Element #${id} not found`);
      try {
        const fn = new Function(fnStr);
        el.addEventListener('click', fn);
      } catch (e) {
        log.err(`addOnClick: Failed to add onclick handler: ${e.message}`);
      }
    },

    onHover(id, enterFnStr, leaveFnStr) {
      const el = this.getId(id);
      if (!el) return log.warn(`onHover: Element #${id} not found`);
      try {
        el.addEventListener('mouseenter', new Function(enterFnStr));
        el.addEventListener('mouseleave', new Function(leaveFnStr));
      } catch (e) {
        log.err(`onHover: ${e.message}`);
      }
    },

    clear(id) {
      const el = this.getId(id);
      if (!el) return log.warn(`clear: Element #${id} not found`);
      el.innerHTML = '';
    },

    disable(id) {
      const el = this.getId(id);
      if (!el) return log.warn(`disable: Element #${id} not found`);
      el.disabled = true;
    },

    enable(id) {
      const el = this.getId(id);
      if (!el) return log.warn(`enable: Element #${id} not found`);
      el.disabled = false;
    },

    onKey(id, key, callback) {
      const el = id ? this.getId(id) : window;
      if (!el) return log.warn(`onKey: Element #${id} not found`);
      el.addEventListener('keydown', e => {
        if (e.key === key) callback(e);
      });
    },

    ready(callback) {
      if (document.readyState !== 'loading') {
        callback();
      } else {
        document.addEventListener('DOMContentLoaded', callback);
      }
    },

    scrollTo(id, behavior = 'smooth') {
      const el = this.getId(id);
      if (!el) return log.warn(`scrollTo: Element #${id} not found`);
      el.scrollIntoView({ behavior });
    },

    isVisible(id) {
      const el = this.getId(id);
      if (!el) {
        log.warn(`isVisible: Element #${id} not found`);
        return false;
      }
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    },

    fadeOut(id, duration = 400) {
      const el = this.getId(id);
      if (!el) return;
      el.style.transition = `opacity ${duration}ms`;
      el.style.opacity = 1;
      setTimeout(() => {
        el.style.opacity = 0;
      }, 10);
      setTimeout(() => {
        el.style.display = 'none';
      }, duration);
    },

    fadeIn(id, duration = 400) {
      const el = this.getId(id);
      if (!el) return;
      el.style.display = 'block';
      el.style.opacity = 0;
      el.style.transition = `opacity ${duration}ms`;
      setTimeout(() => {
        el.style.opacity = 1;
      }, 10);
    },

    createElement(tag, { id = '', className = '', text = '', attributes = {}, onClick = null } = {}) {
      const el = document.createElement(tag);
      if (id) el.id = id;
      if (className) el.className = className;
      if (text) el.textContent = text;
      Object.entries(attributes).forEach(([key, val]) => el.setAttribute(key, val));
      if (typeof onClick === 'function') el.addEventListener('click', onClick);
      return el;
    },

    removeElement(id) {
      const el = this.getId(id);
      if (el) el.remove();
    },

    appendChild(parent, child) {
      parent.appendChild(child);
    },

    removeChild(parent, child) {
      parent.removeChild(child);
    },

    createIframe(url, { id = '', className = '', height = '', width = '' } = {}) {
      const iframe = document.createElement('iframe');
      if (id) iframe.id = id;
      if (className) iframe.className = className;
      iframe.src = url;
      if (height) iframe.height = height;
      if (width) iframe.width = width;
      return iframe;
    },

    removeIframe(id) {
      this.removeElement(id);
    },

    WeatherIframe(url, id = '', className = '') {
      const iframe = this.createIframe(url, { id, className });
      document.body.appendChild(iframe);
    },

    downloadFile(filename, content, mimeType = 'text/plain') {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    getBrowserInfo() {
      const ua = navigator.userAgent;
      let browser = 'Unknown';
      if (ua.includes('Firefox')) browser = 'Firefox';
      else if (ua.includes('Edg')) browser = 'Edge';
      else if (ua.includes('Chrome')) browser = 'Chrome';
      else if (ua.includes('Safari')) browser = 'Safari';
      else if (ua.includes('OPR') || ua.includes('Opera')) browser = 'Opera';

      return {
        browser,
        userAgent: ua,
        platform: navigator.platform,
        language: navigator.language,
        online: navigator.onLine,
      };
    },
  };

  /*** === Reactive State System === ***/
  function reactive(obj) {
    const listeners = new Map();
    function notify(key) {
      if (listeners.has(key)) {
        listeners.get(key).forEach(fn => fn(obj[key]));
      }
    }
    return new Proxy(obj, {
      set(target, key, value) {
        target[key] = value;
        notify(key);
        debugLog(`Reactive: set ${key} =`, value);
        return true;
      },
      get(target, key) {
        return target[key];
      },
      subscribe(key, fn) {
        if (!listeners.has(key)) listeners.set(key, []);
        listeners.get(key).push(fn);
      },
    });
  }

  // Extended reactive with subscribe method on proxy
  function makeReactive(obj) {
    const listeners = new Map();
    const proxy = new Proxy(obj, {
      set(target, key, value) {
        target[key] = value;
        if (listeners.has(key)) {
          listeners.get(key).forEach(fn => fn(value));
        }
        debugLog(`Reactive set: ${key} =`, value);
        return true;
      },
      get(target, key) {
        if (key === 'subscribe') {
          return (key, fn) => {
            if (!listeners.has(key)) listeners.set(key, []);
            listeners.get(key).push(fn);
          };
        }
        return target[key];
      },
    });
    return proxy;
  }

  // Bind reactive state property to element's innerText (two-way binding can be extended)
  function bind(selector, state, prop) {
    const el = document.querySelector(selector);
    if (!el) return log.warn(`bind: Element "${selector}" not found`);

    el.innerText = state[prop];
    if (typeof state.subscribe === 'function') {
      state.subscribe(prop, val => {
        el.innerText = val;
      });
    }
  }

  /*** === Simple Router (Hash-based) === ***/
  const router = {
    routes: {},
    currentRoute: '',

    add(path, callback) {
      this.routes[path] = callback;
    },

    navigate(path) {
      window.location.hash = path;
    },

    _onRouteChange() {
      this.currentRoute = window.location.hash.slice(1);
      if (this.routes[this.currentRoute]) {
        this.routes[this.currentRoute]();
      } else {
        log.warn(`Router: No route handler for "${this.currentRoute}"`);
      }
    },

    listen() {
      window.addEventListener('hashchange', () => this._onRouteChange());
      // Handle initial route
      this._onRouteChange();
    },
  };

  /*** === Async Helpers === ***/
  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  function throttle(fn, limit) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /*** === AJAX Wrapper (Fetch + Retry + Cancel) === ***/
  function ajax(url, options = {}) {
    const { retries = 0, retryDelay = 1000, signal, ...fetchOptions } = options;

    let attempts = 0;

    const fetchWithRetry = () =>
      fetch(url, { ...fetchOptions, signal }).then(res => {
        if (!res.ok) {
          if (attempts < retries) {
            attempts++;
            return new Promise(resolve =>
              setTimeout(() => resolve(fetchWithRetry()), retryDelay)
            );
          }
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res;
      });

    return fetchWithRetry();
  }

  /*** === Animation Helpers === ***/
  function animate(el, keyframes, options) {
    if (!el || !el.animate) return;
    return el.animate(keyframes, options);
  }

  /*** === Plugin System Skeleton === ***/
  const plugins = [];

  function use(pluginFn) {
    if (typeof pluginFn !== 'function') {
      throw new Error('Plugin must be a function');
    }
    pluginFn(SimpleJS);
    plugins.push(pluginFn);
  }

  /*** === Utility Functions === ***/
  const utility = {
    pick(obj, keys) {
      return keys.reduce((acc, key) => {
        if (key in obj) acc[key] = obj[key];
        return acc;
      }, {});
    },

    omit(obj, keys) {
      return Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
    },

    isEqual(a, b) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (typeof a !== 'object' || typeof b !== 'object') return false;

      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (!utility.isEqual(a[i], b[i])) return false;
        }
        return true;
      }

      if (Array.isArray(a) !== Array.isArray(b)) return false;

      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;

      for (let key of keysA) {
        if (!keysB.includes(key)) return false;
        if (!utility.isEqual(a[key], b[key])) return false;
      }

      return true;
    },
  };

  /*** === Window Utils ===***/
  const windowUtils = {
    iHeight: window.innerHeight,
    oHeight: window.outerHeight,
    iWidth: window.innerWidth,
    oWidth: window.outerWidth,
    windowHeight: () => window.innerHeight,
    windowWidth: () => window.innerWidth,
    windowSet: url => (window.location.href = url),
    openWindow: (url, args) => window.open(url, args),
    closeWindow: () => window.close(),
    timeout: (fn, delay) => setTimeout(fn, delay),
  };

  /*** === Extend Array prototype safely === */
  if (!Array.prototype.add) {
    Array.prototype.add = function (element) {
      return this.push(element);
    };
  }
  if (!Array.prototype.remove) {
    Array.prototype.remove = function () {
      return this.pop();
    };
  }

  /*** === Public API === */
  const SimpleJS = {
    DEBUG,
    setDebugMode(enabled) {
      DEBUG = !!enabled;
    },

    log,
    doc,
    reactive: makeReactive,
    bind,
    router,
    debounce,
    throttle,
    ajax,
    animate,
    use,
    utility,
    windowUtils,
  };

  return SimpleJS;
})();

// Attach to window global if available
if (typeof window !== 'undefined') window.SimpleJS = SimpleJS;

export default SimpleJS;
