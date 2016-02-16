# FuelFool


<b>Gas price data</b>

Gas price data should be saved in a .csv file with the format zip,reg,mid,prem,diesel

<b>Zip code area data</b>

The zip code areas/shapes are stored in a topoJSON file (.json format).  The file used includes arcs for drawing the shaps, 
but also the zip code, state, and locale name.  This file will not change, and will be used each time new gas price data is
received.

<b>Merging gas price with the topoJSON file</b>

Vector tiles will be used for the map, where each zip code shape will have the fuel price and locale data embedded. To accomplish
this, the .csv gas prices will need to be merged with the topoJSON file.  To accomplish this merge, the command-line application "topojson"
will be used.  Not to be confused with the serialization format "topoJSON", the application should be installed from https://github.com/mbostock/topojson/wiki/Installation
Once installed, to merge the gas prices and zip codes file:

	topojson -o <outputfilename>.json -e <pricefilename>.csv --id-property=zip -p name=name,state=state,zip=zip,reg=+reg,mid=+mid,prem=+prem,diesel=+diesel -- <inputfilename>.json
	
The join is done on the property=zip. The +reg will add the reg value as a decimal value, rather than a string.

<b>Creating dataset in Mapbox</b>

After the new topoJSON file is created, now with gas price data for each zip code, the file will need to be uploaded to Mapbox to be used as a dataset.
From within the online mapbox studio:  
	
	From the left vertical toolbar->Data -> "New tileset" -> Select a file -> Upload
	
Once the topoJSON file is uploaded and processed by Mapbox, a map ID will be provided (ex: murrayja.dj84nde9), this map ID will be used in the main js to create the map.
