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