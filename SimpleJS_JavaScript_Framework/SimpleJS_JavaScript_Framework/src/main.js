/* 
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

TABLE OF CONTENTS

1. DOC REPLACEMENT
2. CONSTANTS
3. ARRAYS
4. NETWORKING
5. UTILITY
6. LOGGER

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

NOTE:

  This framework is still in development, so you may find bugs, or errors. Some elements
  may not give an error when used wrong - please be patient with SimpleJS!
  P.S, Sriram is a Nerd.

*/


// Window shortcut constants
const iHeight = innerHeight;
const oHeight = outerHeight;
const iWidth = innerWidth;
const oWidth = outerWidth;
const FALSE = false;
const TRUE = true;

// 1. DOC REPLACEMENT
// Taking document and replacing it with doc
const doc = {

  // DOM APIS
  //Why type 5 words when you can type only 3?
  getId: function(id) {
    return document.getElementById(id);
  },

  getClass(className) {
    return document.getElementsByClassName(className);
  },

  selectQuery(selector) {
    return document.querySelector(selector);
  },

  selectQueries(selectors) {
    return document.querySelectorAll(selectors);
  },

  getTagNames(tags) {
    return document.getElementsByTagName(tags);
  },

  addListener(id, event, callback) {
    const el = this.getId(id);  // Corrected function call to getId
    if (el) el.addEventListener(event, callback);
  },

  setTitle(title) {
    document.title = title;
  },

  addClass(elements, className) {
    if (!elements) return;
    if (elements.legnth !== undefined) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add(className);
      }
    } else {
      elements.classList.add(className);
    }
  },

  removeClass(elements, className) {
    if (!elements) return;
    if (elements.length !== undefined) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove(className);
      }
    } else {
      elements.classList.remove(className);
    }
  },

  setAttr(elements, attrName, attrValue) {
    if (!elements) return;
    if (elements.length !== undefined) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute(attrName, attrValue);
      }
    } else {
      elements.setAttribute(attrName, attrValue);
    }
  },

  removeAttr(elements, attrName) {
    if (!elements) return;
    if (elements.length !== undefined) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].removeAttribute(attrName);
      }
    } else {
      elements.removeAttribute(attrName);
    }
  },



  //You don't have to define an element for setText nor getText
  //Format: doc.setText("mydiv", "Hello World")
  setText(id, text) {
    const el = this.getId(id);
    if (!el) {
      console.warn(`Could not run get setText. The id "${id}" was not found!`);
      return;
    }
    el.innerText = text;
  },
  
  getText: function(id) {
    const el = this.getId(id);
    if (!el) {
      console.warn(`Could not run getText. The id "${id}" was not found!`);
      return;
    }
    el.innerText;
  },

  // CSS styling. If the ID isn't found, it throws and error.
  // Can only fit one style inside style. Be carefull with quotes.
  //I also hate having to add if statement checking if the ID was
  //found or not. It's fine I GUESS.

  setStyle(id, styleObj) {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`Failed to run setStyle. The id "${id}" was not found!`);
      return;
    }
    for (let prop in styleObj) {
      el.style[prop] = styleObj[prop];
    }
  },

  show(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = '';
    if (!el) {
      console.warn(`Failed to run show(). The id "${id}" was not found!`);
      return;
    }
  },

  hide(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
    if (!el) {
      console.warn(`Failed to run hide(). The id "${id}" was not found!`);
      return;
    }
  },

  addOnClick(id, fnStr) {
    const el = this.getId(id);
    if (!el) {
      console.warn(`Failed to run addOnClick. The id "${id}" was not found!`);
      return;
    }
  
    try {
      const fn = new Function(fnStr); // turns "function()" string into actual function
      el.addEventListener('click', fn);
    } catch (e) {
      console.error(`Failed to add onclick handler: ${e.message}`);
    }
  },

  onHover(id, enterFnStr, leaveFnStr) {
    const el = this.getId(id);
    if (!el) {
      console.warn(`Failed to run onHover(). The id "${id}" was not found!`);
      return;
    }
    try {
      el.addEventListener('mouseenter', new Function(enterFnStr));
      el.addEventListener('mouseleave', new Function(leaveFnStr));
    } catch (e) {
      console.error(`onHover error: ${e.message}`);
    }
  },

  clear(id) {
    const el = this.getId(id);
    if (el) el.innerHTML = '';
    if (!el) {
      console.warn(`Failed to run clear(). The id "${id}" was not found!`);
      return;
    }
  },

  disable(id) {
    const el = this.getId(id);
    if (el) el.disabled = true;
    if (!el) {
      console.warn(`Failed to run disable(). The id "${id}" was not found!`);
      return;
    }
  },

  enable(id) {
    const el = this.getId(id);
    if (el) el.disabled = false;
    if (!el) {
      console.warn(`Failed to run enable(). The id "${id}" was not found!`);
      return;
    }
  },

  onKey(id, key, callback) {
    const el = id ? this.getId(id) : window;
    if (el) {
      el.addEventListener("keydown", (e) => {
        if (e.key === key) callback(e);
      });
    }
    if (!el) {
      console.warn(`Failed to run onKey(). The id "${id}" was not found!`);
      return;
    }
  },

  // yes yes, just like jquery :) 
  //*clear throat* this is SimpleJS btw
  ready(callback) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  },

  scrollTo(id, behavior = "smooth") {
    const el = this.getId(id);
    if (el) el.scrollIntoView({ behavior });
    if (!el) {
      console.warn(`Failed to run scrollTo(). The id "${id}" was not found!`);
      return;
    }
  },

  setHTML(id, html) {
    const el = this.getId(id);
    if (el) el.innerHTML = html;
    if (!el) {
      console.warn(`Failed to run setHTML(). The id "${id}" was not found!`);
      return;
    }
  },

  isVisible(id) {
    const el = this.getId(id);
    if (!el) {
      console.warn(`Failed to run isVisible(). The id "${id}" was not found, and automatically set to false!`);
      return false;
    }
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;

  },

  // More CSS styling, cause why not?

  fadeOut(id, duration) {
    const el = this.getId(id);
    if (!el) return;
    el.style.transition = `opacity ${duration}ms`;
    el.style.opacity = 1;
    setTimeout(() => (el.style.opacity = 0), 10);
    setTimeout(() => (el.style.display = "none"), duration);
  },

  fadeIn(id, duration) {
    const el = this.getId(id);
    if (!el) return;
    el.style.display = "block";
    el.style.opacity = 0;
    el.style.transition = `opacity ${duration}ms`;
    setTimeout(() => (el.style.opacity = 1), 10);
  },

  getBrowserInfo() {
    const ua = navigator.userAgent;
  
    let browser = "Unknown";
    if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Edge")) browser = "Edge";
    else if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Safari")) browser = "Safari";
    else if (ua.includes("OPR") || ua.includes("Opera")) browser = "Opera";
  
    return {
      browser: browser,
      userAgent: ua,
      platform: navigator.platform,
      language: navigator.language,
      online: navigator.onLine,
    };
  },

  downloadFile(filename, content, mimeType = "text/plain") {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    URL.revokeObjectURL(url);
  },
  
  wait(ms) {
    return new Promise(res => setTimeout(res, ms));
  },

  //Weather for weather iframe
  // Weather cause why not?
  // It takes a url from a weather website (like a radar, foreast, etc...)
  // Heres one: https://embed.windy.com/embed2.html?lat=37.7749&lon=-122.4194&zoom=5&level=surface&overlay=radar&menu=&message=

  WeatherIframe(url, id, className) {
    const iframe = document.createElement('iframe');
    iframe.className = className;
    iframe.id = id;
    iframe.src = url;
  
    // Append iframe to body or a specific container
    document.body.appendChild(iframe);
  },

  appendChild(parent, child) {
    parent.appendChild(child);
  },

  removeChild(parent, child) {
    parent.removeChild(child)
  },

  createIframe(url, id, className, height, width) {
    const iframe = document.createElement('iframe');
    iframe.className = className;
    iframe.id = id;
    iframe.src = url;
    iframe.height = height;
    iframe.width = width;

    return iframe;
  },

  removeIframe(id) {
    const iframe = document.getElementById(id);
    if (iframe) {
      iframe.remove();
    }
  },

  createDiv(id, className) {
    const div = document.createElement('div');
    div.id = id;
    div.className = className;
    return div;
  },

  removeDiv(id) {
    const div = document.getElementById(id);
    if (div) {
      div.remove();
    }
  },

  createButton(id, className, text, onclick) {
    const button = document.createElement('button');
    button.id = id;
    button.className = className;
    button.innerText = text;
    button.onclick = onclick;
    return button;
  },

  removeButton(id) {
    const button = document.getElementById(id);
    if (button) {
      button.remove();
    }
  },

  createInput(id, className, type, placeholder) {
    const input = document.createElement('input');
    input.id = id;
    input.className = className;
    input.type = type;
    input.placeholder = placeholder;
    return input;
  },

  removeInput(id) {
    const input = document.getElementById(id);
    if (input) {
      input.remove();
    }
  },

  createLabel(id, className, text) {
    const label = document.createElement('label');
    label.id = id;
    label.className = className;
    label.innerText = text;
    return label;
  },

  removeLabel(id) {
    const label = document.getElementById(id);
    if (label) {
      label.remove();
    }
  },

};


// 2. CONSTANTS
//Just someting fun to mess around with
const windowHeight = function() {return window.innerHeight};
const windowWidth = function() {return window.innerWidth};
const windowSet = function(url) {return window.location.href = url;};
const openWindow = function(url, args) {window.open(url, args)};
const closeWindow = function(url, args) {window.close()}
const fn = function() {return "function";}
const timeout  = function(func, delay){return setTimeout(func, delay)}


//3. ARRAYS 
//Push -> .add Pop - > .remove. 
//Possibly done incorrectly. 
Array.prototype.add = function(element) {
  return this.push(element);
};

Array.prototype.remove = function() {
  return this.pop();
};



//5. UTILITY

const utility = {
  pick: function(obj, keys) {
    return keys.reduce((acc, key) => {
      if (key in obj) acc[key] = obj[key];
      return acc;
    }, {});
  },

  omit: function(obj, keys) {
    return Object.fromEntries(
      Object.entries(obj).filter(([k]) => !keys.includes(k))
    );
  },

  isEqual: function(a, b) {
    if (a === b) return true;

    if (a == null || b == null) return false;
    if (typeof a !== 'object' || typeof b !== 'object') return false;

    // Compare arrays
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!utility.isEqual(a[i], b[i])) return false;
      }
      return true;
    }

    // If one is array, other is not
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    // Compare objects
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!utility.isEqual(a[key], b[key])) return false;
    }

    return true;
  }
}


//6. LOGGER


const log = {
  info: function(msg) {
    console.log(`[${new Date().toLocaleTimeString()}] INFO: ` + msg);
  },

  warn: function(msg) {
    console.warn(`[${new Date().toLocaleTimeString()}] WARNING: ` + msg);
  },

  err: function(msg) {
    console.log(`[${new Date().toLocaleTimeString()}] ERROR: ` + msg);
  },

  debug: function(msg) {
    console.log(`[${new Date().toLocaleTimeString()}] DEBUG:` + msg);
  }
};