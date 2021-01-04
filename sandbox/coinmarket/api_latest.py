import json
from pprint import pprint

from coinmarketcapapi import CoinMarketCapAPI, CoinMarketCapAPIError

from data_api.keys import API_KEYS

cmc = CoinMarketCapAPI(API_KEYS['coinmarket']['api_key'])

r = cmc.cryptocurrency_listings_latest()
latest = [dict(d, prices=d['symbol']) for d in r.data]

pprint(r.data)

with open('../../public/dummy_data/cmc_latest.json', 'w') as f:
    f.write(json.dumps(r.data))

# r2 = cmc.cryptocurrency_quotes_historical(interval='daily', count=7)
#
# pprint(r2.data)
#
# with open('../../public/dummy_data/cmc_quotes_historical.json', 'w') as f:
#     f.write(json.dumps(r2.data))

