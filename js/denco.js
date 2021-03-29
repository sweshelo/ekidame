const denco = class {
    constructor(_id = -1, _name = '', _element = -1, _type = -1, _active = false, _hp = [], _ap = [], _skill = null){
        this.id      = _id;
        this.name    = _name;
        this.element = _element;
        this.type    = _type
        this.active  = _active;
        this.skill   = _skill;
        this.hp      = _hp;
        this.ap      = _ap;
    }
}

const type    = ['(null)', 'attacker', 'defender', 'supporter', 'trickstar'];
const element = ['flat', 'heat', 'cool', 'eco'];

var dencoh = [103];
var param_ap = [];
var param_hp = [];

var global_warning_message = "";

var req = new XMLHttpRequest();
req.open("get", "./data/rawdata.csv", true);
req.send(null);

req.onload = function(){
    var tmp = req.responseText.split("\n");
    for(let i=0;i<tmp.length-1;i+=2){
        param_ap.push(tmp[i].split(','));
        param_hp.push(tmp[i+1].split(','));
    }

    for(let i=0;i<101;i++){
        let ap = param_ap.shift()
        let hp = param_hp.shift()
        dencoh[i] = new denco(ap.shift(), ap.shift(), element[hp.shift()], type[hp.shift()], false, hp.map(str=>parseInt(str,10)), ap.map(str=>parseInt(str,10)));
        dencoh[i].hp.unshift(-1);
        dencoh[i].ap.unshift(-1);
    }

    /* methodの引数
    l : スキルレベル
    s : スキル(true:有効 false:無効)
    f : 編成(true:防御側 false:攻撃側)
    */

    //nozomi
    dencoh[0].skill  = (l,s,f)=>{
        if (!s) return [0,0,0,0];
        if (!f) {return [50,0,0,0]} else {return [0,-50,0,0]};
    }

    //seria

    //mero

    //luna
    dencoh[3].skill = (l,s,f)=>{
        if (battle[1]!==3||!f) return [0,0,0,0];
        let t = [-5, -10, -15, -25, -35, -40, -50];
        if(s){
            return [0, t[l], 0, 0];
        }else{
            return [0, 30, 0, 0];
        }
    }

    //miroku

    //reika
    dencoh[5].skill = (l,s,f)=>{
        if(s&&!f){
            return [(5+5*l),0,0,0];
        }else{
            return [0,0,0,0];
        }
    }

    //charlotte

    //sheena

    //saya

    //moe

    //iroha

    //shiira
    dencoh[11].skill = (l,s,f)=>{
        let t = [10, 15, 20, 25, 35, 40, 50]
        if(s&&battle[1]==11&&f){
            return [0,t[l],0,0]
        }else{
            return [0,0,0,0]
        }
    }


    //mobo

    //izuna
    dencoh[13].skill = (l,s,f)=>{
        let c=0;
        if(s&&f&&battle[f]==13){
            for(let i=0;i<block.length;i++){ if(dencoh[block[i]].type='defender'){c++;} }
            return [0,-s*c,0,0]
        }else{
            return [0,0,0,0]
        }
    }

    //fubu
    dencoh[14].skill = (l,s,f)=>{
        let t = [-4,-9,-14,-19,-24,-29,-35];
        console.log(l,s,f);
        if(s&&f){
            return [0,t[l],0,0]
        }else{
            return [0,0,0,0]
        }
    }

    //ringo
    dencoh[15].skill = (l,s,f)=>{
        let t = [8,13,18,23,28,33,38];
        if(s&&!f&&battle[0]==15) return [t[l],0,0,0];
        if(!s&&f) return [0,-30,0,0];
        return [0,0,0,0];
    }

    //nyash

    //datchu

    //ichiho

    //imura
    dencoh[19].skill = (l,s,f)=>{
        let t = [20,25,30,35,40,45,50];
        if(s&&!f&&battle[f]==19) return [t[l],0,0,0]
        return [0,0,0,0]
    }

    //nikoro

    //sigure
    dencoh[21].skill = (l,s,f)=>{
        let t = [-5,-9,-13,-17,-20,-23,-26];
        if(s&&f&&dencoh[battle[1]].type=='attacker') return [0,t[l],0,0]
        return [0,0,0,0]
    }

    //ren
    //気が向いたら実装

    //mirai
    //要る?

    //beatrice
    dencoh[24].skill = (l,s,f)=>{
        if(s&&f&&battle[1]==24){
            let r = [document.getElementById('level_0_'+battle[0]),document.getElementById('level_1_'+battle[1])]
            console.log('相手のAP:',dencoh[battle[0]].ap[r[0].value],'自分のAP:',dencoh[24].ap[r[1].value]);
            let p = 75*(dencoh[battle[0]].ap[r[0].value] - dencoh[24].ap[r[1].value])/dencoh[battle[0]].ap[r[0].value]
            return [0,p>=75?-75:-p,0,0]
        }else{
            return [0,0,0,0]
        }
    }

    //urara

    //hokone
    dencoh[26].skill = (l,s,f)=>{
        if(s&&!f&&battle[0]==26){
            if(battle[1]==25){
                global_warning_message += "スキルが発動しましたが、戦闘相手がうららだったため、ATK増加効果は無視されました。<br>";
                return [0,0,0,0]
            }else{
                let t = [30,34,38,42,46,50,55];
                return [t[l],0,0,0];
            }
        }
    }

    //yachiyo
    dencoh[27].active = true;
    dencoh[27].skill = (l,s,f)=>{
        if(f&&battle[1]==27){
            let t = [-15,-18,-21,-24,-27,-30,-35]
            return [0,t[l],0,0];
        }
    }

    //riona

    //chiko

    //reno
    dencoh[30].skill = (l,s,f)=>{
        let t = [30,35,40,45,50,55,60];
        if(s&&!f) return [t[l],0,0,0];
        if(!s&&f) return [0,-30,0,0];
        return [0,0,0,0];
    }

    //alice
    dencoh[31].skill = (l,s,f)=>{
        if(s&&!f&&battle[1]==31){
            let t = [-10,-15,-20,-25,-30,-35,-40]
            return [0,t[l],0,0]
        }else{
            return [0,0,0,0]
        }
    }

    //kotan
    dencoh[32].active = true;
    dencoh[32].addFunc = (c)=>{ if(!c) $('#a_sta_row').removeClass('hide'); }
    dencoh[32].skill = (l,s,f)=>{
        if(!f&&battle[0]==32){
            let t = [20,30,40,50,60,70,80]
            let e = document.getElementById('a_stations')
            return [(e.value>=50?50:e.value)/50*t[l],0,0,0]
        }
    }

    //eria
    //気が向いたら

    //hiiru

    //iori
    dencoh[35].active = true;
    dencoh[35].addFunc = (c)=>{console.log(c);if(c){$('<td>リンク駅数</td><td><input type="number" id="b_link_35" placeholder="『本』のつく駅に限る"></td>').appendTo('#b_table');}}
    dencoh[35].skill = (l,s,f)=>{
        if(f&&battle[1]==35){
            let p = document.getElementById('b_link_35');
            let t = [-5,-6,-7,-8,-9,-10,-11];
            return [0,(parseInt(p.value)>5?5:(parseInt(p.value)))*t[l],0,0]
        }else{
            return [0,0,0,0]
        }
    }

    //mio
    dencoh[36].skill = (l,s,f)=>{ return [0,0,0,0]; }
    dencoh[36].addFunc = (c)=>{ if(c) $('#mio_row').removeClass('hide'); }

    //mikoto
    dencoh[37].skill = (l,s,f)=>{
        if(!f&&s&&dencoh[battle[0]].type=='defender'){
            let t= [5,7,10,12,15,17,20];
            return [t[l],0,0,0];
        }else{
            return [0,0,0,0]
        }
    }

    //kuni

    //lulu

    //haru

    //nichina

    //sora
    dencoh[42].skill = (l,s,f)=>{
        if(!f&&s&&battle[0]==42){
            let t= [20,30,35,40,45,50,60]
            return [t[l],0,0,0]
        }else{
            return [0,0,0,0]
        }
    }

    //asa

    //saika
    dencoh[44].addFunc = (c)=>{ if(!c) $('#a_dest_row').removeClass('hide'); }
    dencoh[44].skill = (l,s,f)=>{
        if(!f&&s&&battle[0]==44){
            let t1=[0.16,0.20,0.24,0.28,0.32,0.36,0.40]
            let t2=[0.10,0.10,0.10,0.10,0.26,0.26,0.26]
            let p = parseInt(document.getElementById('a_distance').value)
            let a=t1[l]*(p>=100?100:p)+t2[l]*((p>=360?360:p<100?100:p)-100)
            return [a,0,0,0]
        }else{
            return [0,0,0,0];
        }
    }

    //kanon
    dencoh[45].skill = (l,s,f)=>{
        if(!f&&s&&battle[0]!=45&&attack[0]==battle[0]){
            return [15,0,0,0]
        }else{
            return [0,0,0,0]
        }
    }

    //ataru
    dencoh[46].addFunc = (c)=>{if(!c){$('<td>被ダメ回数</td><td><input type="number" id="a_special_46" placeholder="あたるのスキル専用"></td>').appendTo('#a_table');}}
    dencoh[46].skill = (l,s,f)=>{
        if(!f&&s&&battle[0]==46){
            let p = parseInt(document.getElementById('a_special_46').value)
            let t = [1.5,2.0,2.5,3.0,3.5,4.0,4.5]
            return [p*t[l],0,0,0]
        }else{
            return [0,0,0,0]
        }
    }

    //natsume

    //spica
    dencoh[48].skill = (l,s,f)=>{
        if(f&&s&&battle[1]!=48&&block[0]==battle[0]){
            let t = [14,15,16,17,18,19,20]
            return [0,-t[l],0,0]
        }else{
            return [0,0,0,0]
        }
    }

    //mei
    //計算式不明で実装不可

    //naho
    dencoh[50].skill = (l,s,f)=>{
        if(f&&s&&battle[1]==50){
            let t = [-49,-55,-61,-73,-79,-85]
            return[0,t[l],0,0]
        }else{
            return [0,0,0,0]
        }
    }

    //himegi
    //noa
    //malin
    //nayori
    //himari
    //rara
    //mizuho
    //marika
    //momiji
    //shiori
    //chitose
    //mako
    //tsumugi
    //akehi
    //hibiki
    //minamo
    dencoh[66].skill = (l,s,f)=>{
        let t = [30,45,60,75,90,105,120]
        if(battle[0]==66&&s){
            return [0,0,t[l],0]
        }else{
            return [0,0,0,0]
        }
    }
    //maze
    dencoh[67].skill = (l,s,f)=>{
        let t = [(n)=>{return 0.8*n},(n)=>{return 1.0*n},(n)=>{return 1.2*n},(n)=>{return 1.4*n},(n)=>{return 1.6*n},(n)=>{return 1.8*n},(n)=>{return 2.0*n}]
        let v = Number(document.getElementById('stations').value)
        if(f){
            let d = 0;
            if(v>=70){v=70};
            if(v>=26){d+=20};
            if(s&&battle[1]==67){d+=t[l](v)};
            return [0,0,0,d]
        }else{
            return [0,0,0,0]
        }
    }
    dencoh[67].addFunc = (c)=>{if(c) $('#b_sta_row').removeClass('hide')}
    //mitsuru
    //miyu
    //miyabi
    //ruri
    //nagisa
    //yamato
    //koyoi
    //nina
    //yunoka
    //reto
    //naru
    //shizu
    //nemo
    //you
    //yukari
    //kurogane
    //misora
    //meguru
    //minato
    //hime
    //tamaki
    //ginka
    //ai
    //yoshino
    //subaru
    //asahi
    //yuki
    //hina
    //aya
    //amane
    //mafuyu
    //otome

    //chizu

    for(let i=0;i<dencoh.length;i++){
        if(dencoh[i].skill!=null){$('#select_'+i).addClass('skill_available')}
    }
}
