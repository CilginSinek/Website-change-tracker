import { get } from "https";
import { writeFile, existsSync, unlink, readFileSync } from "fs";

function DegistirDuzenle(data) {

    if (existsSync("./DatabaseHtml.txt")) {

        var DataBaseHtml = readFileSync("./DatabaseHtml.txt", 'utf-8');

        if (DataBaseHtml.length == data.length) {

            console.log("değişiklik yapılmadı")
            
        } else {
            //Change
            unlink('./DatabaseHtml.txt', (err) => { if (err) console.log(err); });
            writeFile('./DatabaseHtml.txt', `${data}`, 'utf-8', (err) => { if (err) console.log(err); });

            //notification
            console.log("değişiklik yapıldı")
        }

    }
    else {
        writeFile('DatabaseHtml.txt', `NewDataBaseHtml`, 'utf8', (err) => { if (err) console.log(err); })
        console.log("Yeni Oturum açıldı.")
    }

}

function Getir() {
    return new Promise((resolve, reject) => {
        var options =
        {
            host: 'vsco.co',
            port: 443,
            path: '/aydinalizadee/gallery'
        };


        get(options, function (http_res) {

            var data = "";

            http_res.on("data", function (chunk) {
                data += chunk;
            });

            http_res.on("end", function () {

                resolve(`${data}`)

            });
        })

    })
}




setInterval(async function(){
    DegistirDuzenle(await Getir())
}, 30000)
