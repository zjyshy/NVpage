const site = localStorage.getItem("site");
const siteObject = JSON.parse(site);
let hashMap = siteObject || [
  {
    id: "1",
    siteUrl: "http://alibaba.com",
    siteName: "alibaba.com",
  },
  {
    id: "2",
    siteUrl: "http://bilibili.com",
    siteName: "baidu.com",
  },
];
load(hashMap);

//每一次载入时调用
function load(hash) {
  hash.map((ele) => {
    createTag(ele);
  });

  //监听添加按钮的点击事件
  $(".addSite").on("click", addDataToLocal);
  //监听键盘事件（快捷键）
  $("body").on("keydown", key);
  $(".siteList").on("click", ".deleteSite", deleteDataToLocal);
}

function addDataToLocal() {
  let siteUrl = prompt("请输入你要添加的网址吧~");
  let obj = {};
  let name;
  if (siteUrl && siteUrl.trim() !== "") {
    if (siteUrl.indexOf("http") === -1) {
      siteUrl = "https://" + siteUrl;
    }
    if (siteUrl.indexOf("https") !== -1) {
      name = siteUrl.replace("https://", "");
    } else if (siteUrl.indexOf("http") !== -1) {
      name = siteUrl.replace("http://", "");
    }
    let id = createId();
    Object.assign(obj, {
      id: id,
      siteUrl: siteUrl,
      siteName: name,
    });
    hashMap.push(obj);
    createTag(obj);
  }
}

function deleteDataToLocal(e) {
  let newHash = hashMap.filter((ele) => {
    console.log(e.currentTarget.dataset.id !== ele.id);
    return e.currentTarget.dataset.id !== ele.id;
  });

  hashMap = newHash;
  console.log(hashMap);
  $(e.currentTarget).parent().remove();
}
//创建一个新的标签
function createTag(content) {
  const add = $(".addSiteWrapper");
  add.before(`<li>
  <div class='deleteSite' data-id = "${
    content.id
  }"><svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-close"></use>
</svg></div>
  <a href="${content.siteUrl}">
   <div class="site">
    <div class="logo"><img src="${
      content.siteUrl
    }/favicon.ico" alt="icon"></div>
     <div class="link">${content.siteName.toLowerCase()}</div>
   </div>
 </a></li>
  
  `);
}

function key(e) {
  console.log(e.key);
  if (e.altKey && e.key === "a") {
    addDataToLocal();
  }
}

function createId() {
  let dateNow = Date.now();
  let randomN = Math.random().toString(36).substring(3);
  let id = dateNow + randomN;
  return id;
}

window.onbeforeunload = () => {
  const str = JSON.stringify(hashMap);

  localStorage.setItem("site", str);
};
