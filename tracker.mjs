const url = 'https://corsproxy.io/?' + encodeURIComponent('www.example.com');
// Your url

const myfetch = await fetch(url).then(response => response.text())


import { writeFile, existsSync, unlink, readFileSync } from "fs";
import fetch from 'node-fetch';

//I use fs for verify old data and save


function VerifyChangeAndSaveHtml(data) {

    // If u have not a database txt, create a new txt

    if (existsSync("./DatabaseHtml.txt")) {

        let DataBaseHtml = readFileSync("./DatabaseHtml.txt", 'utf-8');

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


setInterval(async function () {
    VerifyChangeAndSaveHtml(myfetch)
}, 30000)
