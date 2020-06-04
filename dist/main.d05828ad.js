// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var site = localStorage.getItem("site");
var siteObject = JSON.parse(site);
var hashMap = siteObject || [{
  id: "1",
  siteUrl: "http://alibaba.com",
  siteName: "alibaba.com"
}, {
  id: "2",
  siteUrl: "http://bilibili.com",
  siteName: "baidu.com"
}];
load(hashMap); //每一次载入时调用

function load(hash) {
  hash.map(function (ele) {
    createTag(ele);
  }); //监听添加按钮的点击事件

  $(".addSite").on("click", addDataToLocal); //监听键盘事件（快捷键）

  $("body").on("keydown", key);
  $(".siteList").on("click", ".deleteSite", deleteDataToLocal);
}

function addDataToLocal() {
  var siteUrl = prompt("请输入你要添加的网址吧~");
  var obj = {};
  var name;

  if (siteUrl && siteUrl.trim() !== "") {
    if (siteUrl.indexOf("http") === -1) {
      siteUrl = "https://" + siteUrl;
    }

    if (siteUrl.indexOf("https") !== -1) {
      name = siteUrl.replace("https://", "");
    } else if (siteUrl.indexOf("http") !== -1) {
      name = siteUrl.replace("http://", "");
    }

    var id = createId();
    Object.assign(obj, {
      id: id,
      siteUrl: siteUrl,
      siteName: name
    });
    hashMap.push(obj);
    createTag(obj);
  }
}

function deleteDataToLocal(e) {
  var newHash = hashMap.filter(function (ele) {
    console.log(e.currentTarget.dataset.id !== ele.id);
    return e.currentTarget.dataset.id !== ele.id;
  });
  hashMap = newHash;
  console.log(hashMap);
  $(e.currentTarget).parent().remove();
} //创建一个新的标签


function createTag(content) {
  var add = $(".addSiteWrapper");
  add.before("<li>\n  <div class='deleteSite' data-id = \"".concat(content.id, "\"><svg class=\"icon\" aria-hidden=\"true\">\n  <use xlink:href=\"#icon-close\"></use>\n</svg></div>\n  <a href=\"").concat(content.siteUrl, "\">\n   <div class=\"site\">\n    <div class=\"logo\"><img src=\"").concat(content.siteUrl, "/favicon.ico\" alt=\"icon\"></div>\n     <div class=\"link\">").concat(content.siteName.toLowerCase(), "</div>\n   </div>\n </a></li>\n  \n  "));
}

function key(e) {
  console.log(e.key);

  if (e.altKey && e.key === "a") {
    addDataToLocal();
  }
}

function createId() {
  var dateNow = Date.now();
  var randomN = Math.random().toString(36).substring(3);
  var id = dateNow + randomN;
  return id;
}

window.onbeforeunload = function () {
  var str = JSON.stringify(hashMap);
  localStorage.setItem("site", str);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.d05828ad.js.map