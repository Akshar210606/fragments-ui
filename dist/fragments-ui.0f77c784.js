// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"2R06K":[function(require,module,exports,__globalThis) {
var _authJs = require("./auth.js");
var _fragmentsJs = require("./fragments.js");
document.getElementById("login").onclick = (0, _authJs.login);
document.getElementById("logout").onclick = (0, _authJs.logout);
document.getElementById("refresh").onclick = (0, _fragmentsJs.updateList);
document.getElementById("create").onclick = async ()=>{
    const type = document.getElementById("type").value;
    const content = document.getElementById("content").value;
    await (0, _fragmentsJs.createFragment)(type, content);
};
const user = (0, _authJs.getUser)();
const userDisplay = document.getElementById("user");
if (user) {
    userDisplay.textContent = `Logged in as ${user.email}`;
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "inline";
    (0, _fragmentsJs.updateList)();
} else {
    userDisplay.textContent = "Not logged in";
    document.getElementById("login").style.display = "inline";
    document.getElementById("logout").style.display = "none";
}

},{"./auth.js":"4f9sv","./fragments.js":"evKgp"}],"4f9sv":[function(require,module,exports,__globalThis) {
// src/auth.js
// === Your Cognito Hosted UI configuration ===
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// === Redirect to Cognito Hosted UI ===
parcelHelpers.export(exports, "login", ()=>login);
// === Logout and clear token ===
parcelHelpers.export(exports, "logout", ()=>logout);
// === Parse token from URL after login ===
parcelHelpers.export(exports, "getUserToken", ()=>getUserToken);
// === Decode user info ===
parcelHelpers.export(exports, "getUser", ()=>getUser);
const domain = "us-east-1ov4f5m5t2.auth.us-east-1.amazoncognito.com";
const clientId = "7tugjqis2m9jqalm2gmmkgjrr1";
const redirectUri = "http://localhost:1234";
const logoutUri = "http://localhost:1234";
// === Construct login/logout URLs ===
const cognitoAuthUrl = `https://${domain}/login?client_id=${clientId}&response_type=token&scope=openid+email+profile&redirect_uri=${redirectUri}`;
const cognitoLogoutUrl = `https://${domain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
function login() {
    console.log("Redirecting to:", cognitoAuthUrl);
    window.location.href = cognitoAuthUrl;
}
function logout() {
    localStorage.removeItem("idToken");
    localStorage.removeItem("user");
    window.location.href = cognitoLogoutUrl;
}
function getUserToken() {
    const hash = window.location.hash;
    if (hash.includes("id_token")) {
        const token = new URLSearchParams(hash.substring(1)).get("id_token");
        localStorage.setItem("idToken", token);
        window.history.replaceState({}, document.title, "/");
        return token;
    }
    return localStorage.getItem("idToken");
}
function getUser() {
    const token = getUserToken();
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const user = {
            email: payload.email,
            name: payload.name
        };
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    } catch  {
        return null;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"evKgp":[function(require,module,exports,__globalThis) {
// src/fragments.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateList", ()=>updateList);
parcelHelpers.export(exports, "createFragment", ()=>createFragment);
var _apiJs = require("./api.js");
async function updateList() {
    try {
        const res = await (0, _apiJs.apiRequest)("/v1/fragments?expand=1");
        const data = await res.json();
        const list = document.getElementById("list");
        list.innerHTML = "";
        if (!data.fragments || data.fragments.length === 0) {
            list.innerHTML = "<li>No fragments found</li>";
            return;
        }
        data.fragments.forEach((frag)=>{
            const li = document.createElement("li");
            li.textContent = `${frag.id} (${frag.type}, ${frag.size} bytes)`;
            list.appendChild(li);
        });
    } catch (err) {
        console.error("Error loading fragments:", err);
    }
}
async function createFragment(type, content) {
    try {
        const res = await (0, _apiJs.apiRequest)("/v1/fragments", {
            method: "POST",
            headers: {
                "Content-Type": type
            },
            body: content
        });
        if (res.ok) {
            alert("\u2705 Fragment created successfully!");
            await updateList();
        } else {
            const errorText = await res.text();
            alert(`\u{274C} Error creating fragment: ${errorText}`);
        }
    } catch (err) {
        console.error("Error creating fragment:", err);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","./api.js":"38UJz"}],"38UJz":[function(require,module,exports,__globalThis) {
// src/api.js
// Use your EC2 fragments API URL
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "API_URL", ()=>API_URL);
/**
 * Helper to make authenticated requests
 */ parcelHelpers.export(exports, "apiRequest", ()=>apiRequest);
const API_URL = "http://ec2-52-206-187-39.compute-1.amazonaws.com:8080";
async function apiRequest(path, options = {}) {
    const token = localStorage.getItem("idToken");
    const headers = options.headers || {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${API_URL}${path}`, {
        ...options,
        headers
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["2R06K"], "2R06K", "parcelRequirec284", {})

//# sourceMappingURL=fragments-ui.0f77c784.js.map
