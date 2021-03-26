var clac = document.getElementById('calc');
var fill = document.getElementById('fill');

var dencos = document.getElementById('denco_selector')

var a_dencos = document.getElementById('attack');
var b_dencos = document.getElementById('block');

$('#modal').offset({top:$(window).innerHeight()/2, left:($(window).innerWidth()-$('#modal').innerWidth())/2})
$('#modal_close').on('click',()=>{$('#modal').addClass('hide')});

document.cookie = "test=0";

var attack = []
var block  = []

var pointer = [attack, block]
var targ   = []
var targ_e = [a_dencos, b_dencos]
var currentEdit = 0

var battle = [-1, -1];
var result = [];

//計算
calc.onclick = ()=>{getParam()};

//パラメータ取得
fill.onclick = ()=>{fillParam()};

var req = new XMLHttpRequest();
req.open("get", "https://dmats97.xyz/ekidame/data/data.csv", true);
req.send(null);

req.onload = function(){
    let tmp = req.responseText.split("\n");
    for(let i=0;i<tmp.length;i++){
        result[i] = tmp[i].split(',');
    }
}

//編成選択
let index = ['a', 'b'];
for(let i=0;i<2;i++){
    targ_e[i].onclick = ()=>{
        currentEdit=i;
        targ=pointer[i];
        $('#formation_'+index[i]).addClass('selected');
        $('#formation_'+index[i]).removeClass('unselected');
        $('#formation_'+index[(i+1)%2]).addClass('unselected');
        $('#formation_'+index[(i+1)%2]).removeClass('selected');
    }
}

//でんこ一覧
window.onload = ()=>{
    let baf = "";
    for(let i=0;i<100;i++){
        //if (i==17) continue;
        baf += '<div class="face" onclick="add('+i+');"><img src="face/'+i+'.png" class="select"></div>';
    }
    dencos.innerHTML = baf;
    targ = attack;
    $('#formation_a').addClass("selected");
    $('#formation_b').addClass("unselected");
    //console.log(result);
}


function getParam(){
    let init = Number(document.getElementById("init").value);
    let atk  = Number(document.getElementById("atk").value);
    let def  = Number(document.getElementById("def").value);

    let up   = Number(document.getElementById("upper").value);
    let down = Number(document.getElementById("downer").value);
    let mio  = Number(document.getElementById("mio").value);

    let damage = parseInt(calcDamage(init, atk, def, (up-down), mio, 0));
    let color  = "";
    if (init>damage)  color = 'blue';
    if (init<damage)  color = 'red';
    if (init==damage) color = 'black';

    let title  = '<h3>評価結果</h3>';
    let result = '<p>攻撃でんこの初期値 : '+init+'</p>';

    if (mio<2){
        result += '<p>ダメージ倍率 : '+(atk+def+100)/100+'倍(+'+(atk+def)+'%)</p>';
    }else{
        result += '<p>ミオのスキルが有効のため、計算式が変化</p>';
    }
        result += '<p>固定増減 : '+(up+down)+'</p>'
        result += '<p>結果 : <span class="'+color+'">'+damage+'</span></p>';

    $('#modal_body').html(title+result);
    $('#modal').removeClass('hide');
}

function sklv(_lv){
    if(_lv<5){
        return 0;
    }else if(_lv<15){
        return 1;
    }else if(_lv<30){
        return 2;
    }else if(_lv<50){
        return 3;
    }else if(_lv<60){
        return 4;
    }else if(_lv<70){
        return 5;
    }else if(_lv<80){
        return 6;
    }else if(_lv==80){
        return 7;
    }else{
        return 0;
    }
}

function fillParam(){

    //HP
    if (battle[0]==-1){
        alert('この機能はアタッカーとなるでんこを選択していた場合のみ利用できます。\n対象を選択するには、編成しているでんこのアイコンをクリックします。')
        return -1;
    }
    if (battle[0]==0){
        alert('「のぞみ」をアタッカーに指定することは出来ません。');
        return -2;
    }

    let e = document.getElementById('level_0_'+battle[0]);
    let level = parseInt(e.value);
    if (level<1 || level>80){
        alert('指定されたレベルが正常な値ではありません。');
        return -3;
    }
    if (result[battle[0]-1][level-1]==0){
        alert('申し訳ありません。\n指定されたでんこのパラメータ情報は現在存在しません。');
        return -4
    }
    document.getElementById('init').value = result[battle[0]-1][level-1];

    let p = [0, 0, 0, 0];
    let s = false;

    for(let side=0;side<2;side++){
        if(side==0){
            targFromation = attack;
        }else{
            targFromation = block;
        }

        for(let i=0;i<targFromation.length;i++){
            let sel = document.getElementById('skill_'+side+'_'+targFromation[i]);
            let l = parseInt(document.getElementById('level_'+side+'_'+targFromation[i]).value);
            if (sel!=null) {s = Boolean(sel.checked);} else {s=false}
            console.log(targFromation[i]);
            if(sklv(l)&&methods[targFromation[i]]!=null){
                let g = methods[targFromation[i]](sklv(l)-1,s,Boolean(side));
                for(let j=0;j<4;j++){p[j]+=Number(g[j])}
                console.log(i,g,side);
            }
        }
    }

    document.getElementById('atk').value    = p[0];
    document.getElementById('def').value    = p[1];
    document.getElementById('upper').value  = p[2];
    document.getElementById('downer').value = p[3];
}

function calcDamage(_init, _atk, _blk, _const, _mioHP, _elem){
    let damage;
    console.log(_init, _atk, _blk, _const, _mioHP, _elem)
    if (_mioHP > 1){
        _blk=(100+_blk)/100;
        if (_blk<=0) return 1;
        return (_init*(1+_atk/100) - (_mioHP-1))*_blk*(_elem==0 ? 1 : 1.3)+_const;
    }else{
        console.log(_atk+_blk+100)
        damage = _init*(_atk+_blk+100)/100*(_elem==0 ? 1 : 1.3)+_const;
        return damage;
    }
}

//編成に追加
function add(_id){
    let chkbox = "";
    if (targ.length >= 7){
        console.log("編成は7両以下である必要があります。");
        return -1;
    }
    if (targ.indexOf(_id)!=-1){
        console.log("当該車両は既に編成に存在します。");
        return -2;
    }
    targ.push(_id);
    if (methods[_id]!=null) {chkbox = '<input type="checkbox" class="skill" id="skill_'+currentEdit+'_'+_id+'">'}
    targ_e[currentEdit].innerHTML += '<div class="face" ><img src="face/'+_id+'.png" class="select" id="form_'+currentEdit+'_'+_id+'" onclick="select('+currentEdit+','+_id+')"><div class="control">'+chkbox+'<input type="number" value="80" class="level" id="level_'+currentEdit+'_'+_id+'"></input></div></div>';
    //$('#form_'+currentEdit+'_'+_id).click(()=>{console.log('clicked'+_id)});
    if (_id === 36 && currentEdit === 1) {$('#mio_row').removeClass('hide');}

    if (battle[currentEdit]==-1) select(currentEdit, _id);
}

//戦闘対象を選択
function select(_side, _id){
    $('#form_'+_side+'_'+battle[_side]).removeClass('selecting');
    battle[_side] = _id;
    $('#form_'+_side+'_'+_id).addClass('selecting');
}
