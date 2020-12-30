##
import json
import time
from datetime import datetime

from pycoingecko import CoinGeckoAPI

cg = CoinGeckoAPI()

##
coin_list = cg.get_coins_list()

##
with open(r'../../public/dummy_data/cmc_latest.json', 'r') as f:
    latest = json.load(f)

##
coin_list_symbol = [item['symbol'].lower() for item in latest]


def get_symbol_id(symbol):
    for coin in coin_list:
        if coin['symbol'] == symbol:
            return coin


filtered_coin_list = [get_symbol_id(symbol) for symbol in coin_list_symbol]


# cg.get_price(ids='bitcoin', vs_currencies='usd')


##
def get_coin_market(coin):
    try:
        coin_id = coin['id']
        coin_obj = cg.get_coin_market_chart_by_id(id=coin_id, vs_currency='usd', days=7, interval='hourly')
        time.sleep(1)
        coin_obj['symbol'] = coin['symbol'].upper()
        return coin_obj
    except (ValueError, TypeError):
        return None


coin_chart = list(filter(lambda x: x is not None, [get_coin_market(coin) for coin in filtered_coin_list]))

# for coin in coin_list:
#     coin_id = coin.get('id')
#     cg.get_coin_market_chart_by_id(coin_id, 'usd', 7, interval='daily')
##
##
with open('../../public/dummy_data/gecko_charts.json', 'w') as f:
    f.write(json.dumps(coin_chart))

##
# for price in coin_chart[0].get('prices'):
#     print(datetime.fromtimestamp(price[0] / 1000))
