const parseURL = (dencohName)=>{
    const version = 'v=2021070901';
    const wrapping = 'default';
    const size = 'medium';
    const part = 'face';
    const emotion = 'smile';
    return (
        "https://static.game.our-rails.ekimemo.com/"+version+"/img/partner/"+dencohName+"/"+wrapping+"/"+size+"/"+part+"_"+emotion+".png"
    )
}

const main = async ()=>{

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
                fetch (parseURL(dencoh.name_en)).then(image => {
                    zip.file(dencoh.name_en + ".png", image.blob());
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
