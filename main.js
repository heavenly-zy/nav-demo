// 1. 初始化数据
var hashA = init()
var keys = hashA['keys']
var hash = hashA['hash']


// 2. 生成键盘
// 遍历 keys，生成 kbd 标签
generateKeyboard(keys, hash)

// 3. 监听用户动作
listenToUser(hash)


//下面是工具函数
function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || 'null')
}

function tag(tagName, attributes) {
    return document.createElement(tagName)
    // var element = document.createElement(tagName)
    // for (var key in attributes) {  // key为 className、id、textContent
    //     element[key] = attributes[key]
    // }
    // return element
}
function createSpan(textContent) {
    var span = tag('span')
    span.textContent = textContent
    span.className = 'text'
    return span
}
function createButton(id) {
    var button = tag('button')
    button.textContent = 'edit'
    button.id = id
    button.onclick = function (aaaa) {
        // aaaa['target']就是用户点击的元素
        var button2 = aaaa['target']
        var img2 = button2.previousSibling
        var key = button2['id']  //拿到用户点击按钮之后的取值 q w e r t...
        var x = prompt('请给我一个网址好吗@_@')
        hash[key] = x  // hash变更
        if (/https/.test(x)) {
            img2.src = x + '/favicon.ico'
        } else {
            img2.src = 'https://' + x + '/favicon.ico'
        }
        img2.onerror = function (xxx) {
            xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
        }
        //存档：将用户设置的key存到浏览器的'zzz'中
        localStorage.setItem('zzz', JSON.stringify(hash))
        console.log(hash)
    }
    return button
}
function createImage(domain) {
    var img = tag('img')
    if (domain) {
        img.src = 'https://' + domain + '/favicon.ico'
    } else {
        img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    img.onerror = function (xxx) {
        xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    return img
}
function init() {
    var keys = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ]
    // 下面这个哈希不是数组，不需要有length
    var hash = {
        'b': 'bilibili.com', 'a': 'www.acfun.cn', 'z': 'zhihu.com', 'j': 'www.jianshu.com',
        'm': 'aidn.jp/mikutap/', 'g': 'github.com', 'y': 'ygocore.ys168.com', 'w': 'wallhaven.cc',
        'i': 'iconfont.cn', 'c': 'css-tricks.com', 'j': 'javascript.ruanyifeng.com'
    }
    //读档：取出 localStorage 中的 zzz 对应的 hash
    var hashInLocalStorage = getFromLocalStorage('zzz')
    if (hashInLocalStorage) {
        hash = hashInLocalStorage
    }
    return {
        "keys": keys,
        "hash": hash
    }
}
function generateKeyboard(keys, hash) {
    for (var index = 0; index < keys['length']; index = index + 1) {//提取出while循环的三部分
        var div = tag('div')
        div.className = 'row'

        main.appendChild(div)

        var row = keys[index]  // 第一个数组 第二个数组 第三个数组
        for (var index2 = 0; index2 < row['length']; index2 = index2 + 1) {
            var span = createSpan(row[index2])

            var button = createButton(row[index2])

            var img = createImage(hash[row[index2]])

            var kbd = tag('kbd')
            kbd.className = 'key'

            kbd.appendChild(span)
            kbd.appendChild(img)
            kbd.appendChild(button)

            div.appendChild(kbd)
        }
    }
}
function listenToUser(hash) {
    document.onkeypress = function (aaaa) {
        var key = aaaa['key']  // 拿到用户按下的键q w e r t...
        var website = hash[key]  // 得到按下键对应的网站
        if (website) { // 保证网址存在
            if (/https/.test(website)) { // 用正则判断网址内是否存在'https'
                window.open(website)
            } else { // 网址内不存在'https'
                // location.href = 'http://' + website  
                window.open('https://' + website, '_blank')
            }
        } else {
            alert(`你还没有绑定网址，请先编辑网址。。。`)

        }
    }
    let kbdClick = document.getElementsByClassName('key')
    for (i = 0; i < kbdClick.length; i++) {
        let b = kbdClick[i]
        b.addEventListener('click', (e) => {
            let key = e.currentTarget.firstChild.innerText.toLowerCase()
            let website = hash[key]
            if (website) {
                if (/https/.test(website)) {
                    window.open(website)
                } else {
                    window.open('https://' + website, '_blank')
                }
            } else {
                alert(`你还没有绑定网址，请先编辑网址。。。`)
            }
        }, false)
    }
}
