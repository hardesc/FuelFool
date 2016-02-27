#Jason Murray
#26 February 2016
#
#Calculate the min and max of each fuel type, then print 10 intervals to a .js file
#for use in the fuel_fool.html page
#
#Merge fuel price csv file with zipcode topoJSON file for use in mapbox to create the layer

import csv 
import sys
import subprocess

with open('zips.csv') as csvfile:
	next(csvfile)  #skip header line
	min_reg = min(row[1] for row in csv.reader(csvfile))
	csvfile.seek(0) #reset csvfile iterator
	next(csvfile)  #skip header line, again

	max_reg = max(row[1] for row in csv.reader(csvfile))
	csvfile.seek(0)
	next(csvfile)

	min_mid = min(row[2] for row in csv.reader(csvfile))
	csvfile.seek(0)
	next(csvfile)

	max_mid = max(row[2] for row in csv.reader(csvfile))
	csvfile.seek(0)
	next(csvfile)

	min_prem = min(row[3] for row in csv.reader(csvfile))
	csvfile.seek(0)
	next(csvfile)

	max_prem = max(row[3] for row in csv.reader(csvfile))
	csvfile.seek(0)
	next(csvfile)

	min_diesel = min(row[4] for row in csv.reader(csvfile))
	csvfile.seek(0)
	next(csvfile)

	max_diesel = max(row[4] for row in csv.reader(csvfile))	

reg_int = (float(max_reg) - float(min_reg))/ 10
mid_int = (float(max_mid) - float(min_mid))/10
prem_int = (float(max_prem) - float(min_prem))/10
diesel_int = (float(max_diesel) - float(min_diesel))/10

reg_price_range = []
mid_price_range = []
prem_price_range = []
diesel_price_range = []

for i in range(0,10):
	reg_price_range.append("%.2f" % (float(min_reg)+float(reg_int)*i))
	mid_price_range.append("%.2f" % (float(min_mid)+float(mid_int)*i))
	prem_price_range.append("%.2f" % (float(min_prem)+float(prem_int)*i))
	diesel_price_range.append("%.2f" % (float(min_diesel)+float(diesel_int)*i))

print '(min,max) regular price: '+min_reg+'.'+max_reg
print '(min,max) mid price: '+min_mid+'.'+max_mid
print '(min,max) premium price: '+min_prem+'.'+max_prem
print '(min,max) diesel price: '+min_diesel+'.'+max_diesel	

def write():
        
	print('Creating new text file')
        name = raw_input('Enter name of text file: ')+'.js'

	try:
            file = open(name,'w')
            #file.write('var reg_int='+str(reg_price_range)+';\n')
            file.write('var reg_int=['+",".join(map(str,reg_price_range))+'];\n')
            file.write('var mid_int=['+",".join(map(str,mid_price_range))+'];\n')
            file.write('var prem_int=['+",".join(map(str,prem_price_range))+'];\n')
            file.write('var diesel_int=['+",".join(map(str,diesel_price_range))+'];\n')
            file.close()
        except:
            print('could not write values to file, exiting')
            sys.exit(0) # quit
        
def merge_prices_topoJSON():
        print('Merging csv price file with zipcode topoJSON file \n')
	csv_file = raw_input('Enter name of csv fuel price file: ')
	input_json = raw_input('Enter name of zipcode topoJSON: ')
	output_json = raw_input('Enter name of output file: ')

	
	try:
           	p = subprocess.Popen('topojson -o '+output_json+' -e "'+csv_file+'" --id-property=zip -p name=name,state=state,zip=zip,reg=+reg,mid=+mid,prem=+prem,diesel=+diesel -- "'+input_json+'"', shell=True)
           	p.wait()
           	print 'Merge complete, closing....'
           	
		
	except:
		print('Could not merge fuel prices and zipcode topoJSON, exiting.\n')
		sys.exit(0)

        
write()
merge_prices_topoJSON()

