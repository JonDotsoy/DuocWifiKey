var capa = document.createElement("div")
var loading = document.createElement("img")
var imglogo = document.createElement("img")
capa.id = "subcap"
capa.style.zIndex = 1000
capa.style.position = "fixed"
capa.style.width = "100%"
capa.style.height = "100%"
capa.style.backgroundColor = "#fff"
var imgload = chrome.extension.getURL('8-0.gif')
var rutalogo = chrome.extension.getURL('candado.png')
loading.src = imgload
imglogo.src = rutalogo
capa.style.textAlign = "center"
capa.appendChild(imglogo)
capa.appendChild(document.createElement("br"))
capa.appendChild(loading)
capa.style.top = "0px"
capa.style.left = "0px"

document.body.appendChild(capa)



