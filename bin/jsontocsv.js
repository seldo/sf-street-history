// read in the JSON file and turn it into CSV so I can edit it in a spreadsheet
const { convertArrayToCSV } = require('convert-array-to-csv');
const fs = require('fs')
const slides = require('../pages/slides.json')

let flattened = slides.map((slide) => {
    return [
        slide.title,
        slide.text,
        slide.location.place,
        slide.location.center.lat,
        slide.location.center.lng,
        slide.location.zoom
    ]
})

const csv = convertArrayToCSV(flattened, {
    header: [
        "Title",
        "Text",
        "Marker text",
        "Latitude",
        "Longitude",
        "Zoom Level"
    ]
})

fs.writeFileSync("./SF Street History - slides.csv",csv)