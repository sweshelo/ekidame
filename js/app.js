var button = document.getElementById('submit');
var dencos = document.getElementById('denco_selector')
button.onclick = ()=>{getParam()};

var a_dencos = document.getElementById('attack');
var b_dencos = document.getElementById('block');

var attack = []
var block = []

var targ = []
var targ_e = [a_dencos, b_dencos]

var currentEdit = 0
targ = attack

window.onload = ()=>{
    var baf = "";
    for(i=0;i<100;i++){
        if (i==17) continue;
        //baf += '<div class="face" onclick="add('+i+');"><img src="face/'+i+'.png" class="select"></div>';
    }
    dencos.innerHTML = baf;
    console.log(baf);
}

function getParam(){
    init = document.getElementById("init").value;
    atk  = document.getElementById("atk").value;
    def  = document.getElementById("def").value;

    up   = document.getElementById("upper").value;
    down = document.getElementById("downer").value;
    mio  = document.getElementById("mio").value;

    alert(calcDamage(init, atk, def, (up-down), mio, 0));
}

function calcDamage(_init, _atk, _blk, _const, _mioHP, _elem){
    console.log(_init, _atk, _blk, _const, _mioHP, _elem)
    if (_mioHP > 1){
        _blk=(100-_blk)/100;
        if (_blk<=0) return 1;
        return (_init*(1+_atk/100) - (_mioHP-1))*_blk*(_elem==0 ? 1 : 1.5)+_const;
    }else{
        damage = _init*(_atk-_blk+100)/100*(_elem==0 ? 1 : 1.5)+_const-(_mioHP-1);
        return damage;
    }
}

function add(_id){
    if (targ.length >= 7){
        console.log("編成は7両以下である必要があります。");
        return -1;
    }
    if (targ.indexOf(_id)!=-1){
        console.log("当該車両は既に編成に存在します。");
        return -2;
    }
    targ.push(_id);
    targ_e[currentEdit].innerHTML += '<div class="face"><img src="face/'+_id+'.png" class="select"></div>';
    console.log(targ);
}

