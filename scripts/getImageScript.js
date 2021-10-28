const parseURL = (dencohName, isOurMemo)=>{
    const version = 'v=2021102601';

    const wrapping = 'default';
    const size = 'large';
    const part = 'face';
    const emotion = 'smile';

    const domain = (isOurMemo == true) ? "static.game.our-rails.ekimemo.com" : "static.native.denco.social.mfac.jp";

    return "https://"+domain+"/"+version+"/img/partner/"+dencohName+"/"+wrapping+"/"+size+"/"+part+"_"+emotion+".png";
}

const main = async ()=>{

    const isOurMemo = (document.domain == "static.game.our-rails.ekimemo.com");

    await import('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.6.0/jszip.min.js');
    await import('https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.min.js');

    const zip = new JSZip();
    const images = [];
    const fileName = [];

    fetch("https://scripts.sweshelo.jp/dencoh_name.json", {
        mode: 'cors'
    })
        .then(res => res.json())
        .then(res => {
            Promise.all(res.map(dencoh =>(
                fetch (parseURL(dencoh.name_en, isOurMemo)).then(res => {
                    if(res.ok){
                        zip.file(dencoh.name_en + ".png", res.blob());
                    }
                })
            ))).then(()=>{
                console.log('yay!');
                zip.generateAsync({ type: 'blob' }).then(function(blob){
                    const e = document.createElement("a");
                    const url = window.URL.createObjectURL(blob);
                    document.body.appendChild(e);
                    e.href = url;
                    e.click();
                    console.log('successed!', blob);
                });
            })
        })
};

main();
