##
import json
import time
from datetime import datetime

from pycoingecko import CoinGeckoAPI

cg = CoinGeckoAPI()

##
coin_list = cg.get_coins_list()

##
with open(r'../../public/dummy_data/coin_list.json', 'w') as f:
    json.dump(coin_list, f)
