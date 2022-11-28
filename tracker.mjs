var host = '';
var port = "";
var path = '';

// www.example.com/myport ; host= example.com path = /myport

import { get } from "https";
import { writeFile, existsSync, unlink, readFileSync } from "fs";

// I use get for pull html, I use fs for verify old data and save


function VerifyChangeAndSaveHtml(data) {

    // If u have not a database txt, create a new txt

    if (existsSync("./DatabaseHtml.txt")) {

        var DataBaseHtml = readFileSync("./DatabaseHtml.txt", 'utf-8');

        if (DataBaseHtml.length == data.length) {

            console.log("No change has been made")
            
        } else {
            //Change
            unlink('./DatabaseHtml.txt', (err) => { if (err) console.log(err); });
            writeFile('./DatabaseHtml.txt', `${data}`, 'utf-8', (err) => { if (err) console.log(err); });

            //notification
            console.log("A change has been made")
        }

    }
    else {
        writeFile('DatabaseHtml.txt', `NewDataBaseHtml`, 'utf8', (err) => { if (err) console.log(err); })
        console.log("New txt created.")
    }

}

function PullHtml(host, port, path) {
    return new Promise((resolve, reject) => {
        var options =
        {
            host: host,
            port: parseInt(port),
            path: path
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
    VerifyChangeAndSaveHtml(await PullHtml(host,port,path))
}, 30000)
