const csv = require('fast-csv');
const fs = require('fs')

let flatData = []

csv
    .parseFile('./data/SF Street History - slides.csv',{headers:true})
    .on('error', error => console.error(error))
    .on('data', row => flatData.push(row))
    .on('end', rowCount => {
        let structuredData = flatData.map((row) => {
            return {
                title: row['Title'],
                text: row['Text'],
                location: {
                    place: row['Marker text'],
                    center: {
                        lat: parseFloat(row['Latitude']),
                        lng: parseFloat(row['Longitude'])
                    },
                    zoom: parseInt(row['Zoom Level'])
                }
            }
        })

        fs.writeFileSync('./data/slides.json', JSON.stringify(structuredData,null,1))
    });