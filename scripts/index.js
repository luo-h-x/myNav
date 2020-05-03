
  let search = document.getElementById('search')
  let keyword = document.getElementById('keyword')
  let keys = document.getElementsByClassName('key')
  let keysPress = [...keys]
  // console.log(keysPress[0].children[2]['innerText'].toLowerCase())

  let hash = {
    r: 'www.ruanyifeng.com',
    i: 'www.iqiyi.com',
    g: 'gitee.com',
    z: 'zhihu.com',
    b: 'baidu.com',
    m: 'developer.mozilla.org',
  }

  let hashInlocalStrage = JSON.parse(
    localStorage.getItem('Website') || 'null'
  )
  if (hashInlocalStrage) {
    hash = hashInlocalStrage
  }

  //改变favicon.icp图片
  function changeImg(el, Website) {
    if (Website) {
      el.src = 'http://' + Website + '/favicon.ico'
    } else {
      el.src = './imgs/alticon.jpg'
    }
    el.onerror = function (err) {
      err.target.src = './imgs/alticon.jpg'
    }
  }
  //改变网站
  function editWebsite(el) {
    let key = el.children[2]['innerText'].toLowerCase()
    let webName = window.prompt('添加一个您心意的网站!!   例如：www.baidu.com')
    if (webName != '' && webName != null) {
      hash[key] = webName
      changeImg(el.children[0], webName)
    }

  }
  //移除class-->active
  function removeEqual(el, className) {
    el.map((v) => {
      v.classList.remove(className)
    })
  }

  //添加class-->active
  function addClass(el, className) {
    if (el.id === '' && el.length > 0) {
      el.map((v) => {
        v.classList.add(className)
      })
    }
    el.classList.add(className)
  }

  //按键特效--可有可无
  function pressShow(el) {
    addClass(el, 'active')
    setTimeout(() => {
      removeEqual(keysPress, 'active')
    }, 1000)
  }

  //百度搜索
  function toBaiDu() {
    let stringBaidu = 'https://www.baidu.com/s?wd='
    let query = document.getElementById('keyword').value.toString()
    stringBaidu = stringBaidu.concat(query)
    window.open((url = `${stringBaidu}`), (target = '_blank'))
  }

  //“按键”事件绑定
  keysPress.map((v,i) => {
    v.addEventListener('click', () => {
      pressShow(v)
      editWebsite(v)
      localStorage.setItem('Website', JSON.stringify(hash))
      console.log(JSON.parse(localStorage.getItem('Website')));
      
    })
    //浏览器重新打开或者刷新
    changeImg(v.children[0], JSON.parse(localStorage.getItem('Website'))[v.children[2]['innerText'].toLowerCase()])
  })

  //按键事件绑定-->跳转目标网站
  document.addEventListener('keypress', (e) => {
    let key = e['key']
    let website = hash[key]
    window.open('http://' + website, '_blank')
  })

  //“关键词搜索”事件绑定
  keyword.addEventListener('keypress', function (e) {
    e.stopPropagation()
    if (e.keyCode == 13) {
      toBaiDu()
    }
  })

  //百度一下
  search.onclick = function (e) {
    toBaiDu()
  }

