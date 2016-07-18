REM Working commands:

REM Join region and subregion key/value pairs to the lga objects.
topojson -q 1e5 -s 1e-10 -o lgas_regions.json -e mapping.csv --id-property=LGANAME,lga -p REGION=region -- lgas.json

REM Make a new object for regions using the region property key from the lga objects.
topojson-merge -o lgas_projects_regions.json --in-object=lgas --out-object=region --key=d.properties.REGION -- lgas_regions.json
