from datetime import datetime
from pprint import pprint

import cryptocompare
import requests
from coinmarketcapapi import CoinMarketCapAPI
from flask import Flask, jsonify
from flask_caching import Cache
from flask_cors import cross_origin

from data_api.keys import API_KEYS
from data_api.keys import finn_hubb_key, cryptocompare_api_key

cmc = CoinMarketCapAPI(API_KEYS['coinmarket']['api_key'])

config = {
    "DEBUG": True,  # some Flask specific configs
    "CACHE_TYPE": "simple",  # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 300
}
app = Flask(__name__)
# tell Flask to use the above defined config
app.config.from_mapping(config)
cache = Cache(app)

# keys
FH_API = finn_hubb_key['api']
CC_API = cryptocompare_api_key
FH_BASE_URL = 'https://finnhub.io/api/v1/'
CC_BASE_URL = 'https://min-api.cryptocompare.com/data/v2'


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/fh/crypto/symbols')
def crypto_symbols():
    r = requests.get(f'{FH_BASE_URL}/crypto/symbol?exchange=binance&token={FH_API}')
    pprint(r.json())
    return r.text


@app.route('/fh/crypto/history/<symbol>/<resolution>/<start>/<end>')
@cache.memoize(260_000)
def fh_crypto_history(symbol, resolution, start, end):
    start_ts = datetime.timestamp(datetime.strptime(start, '%Y%m%d'))
    end_ts = datetime.timestamp(datetime.strptime(end, '%Y%m%d'))
    r = requests.get(
        f'{FH_BASE_URL}/crypto/candle?symbol=BINANCE:BTCUSDT&resolution=D&from={start_ts}&to={end_ts}&token=')
    print(r.json())
    return r.text


@app.route('/cg/history/<symbol>', defaults=dict(limit=180))
@app.route('/cg/history/<symbol>/<limit>')
@cross_origin()
@cache.memoize(260_000)
def cc_coin_history(symbol, limit=180):
    data = cryptocompare.get_historical_price_day(symbol, curr='USD', limit=limit)
    time_values = [datetime.fromtimestamp(d.get('time')) for d in data]
    time_string = [{'time': t.strftime('%Y-%m-%dT%H%M%S')} for t in time_values]
    data_mod = [{**d, **time_string[i]} for i, d in enumerate(data)]
    return jsonify(data_mod)


@app.route('/cg/historyhour/<symbol>', defaults=dict(limit=7 * 24))
@app.route('/cg/historyhour/<symbol>/<limit>')
@cross_origin()
@cache.memoize(260_000)
def cc_coin_history_hour(symbol, limit):
    return jsonify(cryptocompare.get_historical_price_hour(symbol, curr='USD', limit=7 * 24))


@app.route('/cmc/latest')
@cross_origin()
@cache.memoize(260_000)
def cmc_latest():
    r = cmc.cryptocurrency_listings_latest()
    # latest = [dict(d, prices=d['symbol']) for d in r.data]
    latest = r.data
    return jsonify(latest)


if __name__ == '__main__':
    app.run()
