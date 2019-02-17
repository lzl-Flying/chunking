
var go = document.getElementById('go');
var main = document.getElementById('main');
var oInp = document.getElementsByTagName('input');
var aa = document.getElementById('aa');               
var colors = ['black', 'aqua', 'orange', 'lawngreen'];
var speed = 4;
var key = true;
var num = 0, 
    timer;
function init() {
    
    go.onclick = function () {
        if(oInp.value == 2){
            speed+= 1;
        }else if(oInp.value == 3){
            speed+= 2;
        }else{
            speed = 4;
        }
        go.style.display = 'none';
        creatDiv();
        move();
    }
}
init();

//创建小方块,并添加颜色
function creatDiv() {
    var index = Math.floor(Math.random() * 4);
    var oUl = document.createElement('ul');
    oUl.setAttribute('class', 'row');
    for (var i = 0; i < 4; i++) {
        var oLi = document.createElement('li');
        oUl.appendChild(oLi);
    }
    var len = main.childNodes.length;
    if (len == 0) {
        main.appendChild(oUl);
    } else {
        main.insertBefore(oUl, main.childNodes[0]);
    }
    var colorli = main.childNodes[0].childNodes[index];
    colorli.setAttribute('class', 'index');
    // colorli.style.backgroundColor = colors[index];
    colorli.style.backgroundColor = colors[0];
}

//运动函数
function move() {
    clearInterval(timer);
    timer = setInterval(function () {
        var Top = parseInt(main.offsetTop);
        var ispeed = Top + speed;
        main.style.top = ispeed + 'px';
        if (Top >= 0) {
            creatDiv();
            main.style.top = '-150px';
        }
        var length = main.childNodes.length;
        if (length == 6) {
            for (var i = 0; i < 4; i++) {
                // if (main.childNodes[length - 1].children[i].classList.contains('index')) {                        
                if (main.childNodes[length - 1].childNodes[i].className == 'index') {
                    alert('游戏结束，得分: ' + num);
                    clearInterval(timer);
                    key = false;
                }
            }
            main.removeChild(main.childNodes[length - 1]);
        }
    }, 20)
    bindEvent();
}


//游戏开始  点击方块
function bindEvent() {
    main.addEventListener('click', function (event) {
        if (key) {
            var tar = event.target;
            if (tar.className == 'index') {
                tar.style.backgroundColor = '#ccc';
                tar.classList.remove('index');
                num++;
                aa.innerHTML = num;
            }else{
                alert('游戏结束，得分' + num);
                    clearInterval(timer);
                    key = false;
            }
            if(num % 5 == 0){
                speed++;
            }
        }
    })
}
