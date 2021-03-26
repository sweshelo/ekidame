var methods = [101];

const denco = class {
    constructor(_id = -1, _name = '', _element = -1, _active = false, _skill = (l,s,f)=>{return[0,0,0,0]}){
        this.id      = _id;
        this.name    = _name;
        this.element = _element;
        this.active  = _active;
        this.skill   = _skill;
    }
}

/* methodの引数
    l : スキルレベル
    s : スキル(true:有効 false:無効)
    f : 編成(true:防御側 false:攻撃側)
*/

//void
var v = (l,s,f) => {return [0,0,0,0];};
for(let i=0;i<101;i++){methods[i]=null};

//nozomi
methods[0] = (l,s,f)=>{
    if (!s) return [0,0,0,0];
    if (!f) {return [50,0,0,0]} else {return [0,-50,0,0]};
}

//seria

//mero

//luna
methods[3] = (l,s,f)=>{
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
methods[5] = (l,s,f)=>{
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
methods[11] = (l,s,f)=>{
    let t = [10, 15, 20, 25, 35, 40, 50]
    if(s&&battle[1]==11&&f){
        return [0,t[l],0,0]
    }else{
        return [0,0,0,0]
    }
}


//mobo
//izuna
//fubu
methods[14] = (l,s,f)=>{
    let t = [-4,-9,-14,-19,-24,-29,-35];
    console.log(l,s,f);
    if(s&&f){
        return [0,t[l],0,0]
    }else{
        return [0,0,0,0]
    }
}
//ringo
methods[15] = (l,s,f)=>{
    let t = [8,13,18,23,28,33,38];
    if(s&&!f) return [t[l],0,0,0];
    if(!s&&f) return [0,-30,0,0];
    return [0,0,0,0];
}
//nyash
//datchu
//ichiho
//imura
//nikoro
//sigure
//ren
//mirai
//beatrice
//urara
//hokone
//yachiyo
//riona
//chiko
//reno
methods[30] = (l,s,f)=>{
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
methods[36] = (l,s,f)=>{
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
methods[66] = (l,s,f)=>{
    let t = [30,45,60,75,90,105,120]
    if(battle[0]==66&&s){
        return [0,0,t[l],0]
    }else{
        return [0,0,0,0]
    }
}
//maze
methods[67] = (l,s,f)=>{
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
