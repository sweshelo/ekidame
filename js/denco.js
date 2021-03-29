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

var dencoh = [101];
var param_ap = [];
var param_hp = [];

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
        dencoh[i] = new denco(ap.shift(), ap.shift(), element[hp.shift()], type[hp.shift()], false, ap.map(str=>parseInt(str,10)), hp.map(str=>parseInt(str,10)));
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
        if(s&&f&&battle[f].type=='attacker') return [t[l],0,0,0]
        return [0,0,0,0]
    }
    //ren
    //mirai
    //beatrice
    //urara
    //hokone
    //yachiyo
    //riona
    //chiko
    //reno
    dencoh[30].skill = (l,s,f)=>{
        let t = [30,35,40,45,50,55,60];
        if(s&&!f) return [t[l],0,0,0];
        if(s&&f) return [0,-30,0,0];
        return [0,0,0,0];
    }

    //alice
    //kotan
    //eria
    //hiiru
    //iori
    //mio
    dencoh[36].skill = (l,s,f)=>{
        return [0,0,0,0];
    }
    //mikoto
    //kuni
    //lulu
    //haru
    //nichina
    //sora
    //asa
    //saika
    //kanon
    //ataru
    //natsume
    //spica
    //mei
    //naho
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
