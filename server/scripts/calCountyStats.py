import requests
from bs4 import BeautifulSoup
import re
import sys

url = 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_California'
r = requests.get(url, allow_redirects=True)

soup = BeautifulSoup(r.text, 'html.parser')

county = sys.argv[1]
county_row_raw = ((soup.find( "a", {"title": county + " County, California"})).parent).parent

county_row_processed = []
for column in county_row_raw.find_all("td")[:-2]:
    toString = str(column.contents[0])
    try:
        intValue = int(toString)
    except:
        intValue = 0
    county_row_processed.append(intValue)

print(county_row_processed)
sys.stdout.flush()
