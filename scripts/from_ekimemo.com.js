const parseURL = (dencohName)=>{
    const version = 'v=2021102601';
    const wrapping = 'default';
    const size = 'small';
    const part = 'slot';
    const emotion = 'usual';
    return (
        "https://static.ekimemo.com/"+version+"/portal/img/common/partner/"+dencohName+"/"+wrapping+"/"+size+"/"+part+"_"+emotion+".png"
        //https://static.ekimemo.com/v=2021102601/portal/img/common/partner/dencoh/default/small/slot_usual.png
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
                fetch (parseURL(dencoh.name_en)).then(res => {
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
