##
import json
from pprint import pprint

import cryptocompare

##
eth = cryptocompare.get_price('ETH',curr='USD',full=True)
pprint(eth)

##
eth_daily = cryptocompare.get_historical_price_day('ETH',curr='USD',limit=180)
pprint(eth_daily)

##
with open('../../public/dummy_data/eth_daily.json', 'w') as f:
    json.dump(eth_daily, f)

##
exc = cryptocompare.get_exchanges();

##
for exc_name in exc.keys():
    print(exc_name)
    avg = cryptocompare.get_avg('BTC', curr='USD', exchange=exc_name)
    break

##
avg = cryptocompare.get_avg('BTC', curr='USDT', exchange='Binance')

##
pairs = cryptocompare.get_pairs(exchange='Binance')

