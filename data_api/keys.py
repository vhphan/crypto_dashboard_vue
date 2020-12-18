oanda_keys = dict(account_id='101-011-11222080-001',
                  access_token='a6879b7bd7b3331b3d35c347dd068794-aee8fc4bdce29806ff852bcd24a67d10')

cryptocompare_api_key = '153f94af96533c8cc41cb9e333d0c433104730243eeda66429fe3f63cb1ee626'

binance_keys = dict(api='PqB9fwcZhBrGdQVVWf5MacRlgumS8LI0OuKYqlEgVJ79sVkRFuMaUltykMQ7dBx0',
                    secret_key='rMDGDckPw0VTTCgSxrbDsT97N39Ao6JW1oHIPMYfLXeaWQmPoa0fFjuSYNkX8zVz')

binance_paper_keys = dict(api='k2YwU0mm2b57427Kgh8LW1GDFIGzcvMBeA0sCdyBBE3S50Zn5PtmRNTmsjnZ8udj',
                          secret_key='OXMVp4NutaFoDnJLG7AfQ6pBXlYATfLjN0d5srlNcoJ2bYT871KBDh2JZwqlW1AM')

quandl_keys = dict(api='nK-9Cxx3Yqj7GxBMwzwF')

cryptodatum_key = dict(api='b556e112-15ae-11ea-bc3a-0e5f332f7b42')

alpha_vantage_key = dict(api='8KY3UI8JO81IAJMS')

finn_hubb_key = dict(api='bs4p6vnrh5rb6mgk8r30')

alpaca_key = dict(api_key='PKB40DZENPJ0EILC5JV1', secret_key='OGZ8JXmI5KCjnBKYScZzrBO3F0ltEcRasICSpxvW')

ep_fx_keys = dict(host='eprojecttrackers.com', user='eproject_fxuser', password='UL,^Akk3{XF8', db='eproject_fx')

connection_strings = dict(
    ep_fx=f"postgresql://{ep_fx_keys['user']}:{ep_fx_keys['password']}@{ep_fx_keys['host']}:5432/{ep_fx_keys['db']}")

fxcm_keys = dict(TOKEN='533c0786644cca65f38111694921a0605986f333')

FLASK_MAIL_USER = 'eri_portal@eprojecttrackers.com'
FLASK_MAIL_PASSWORD = 'qRc1)doe&4;3'

coin_market_cap_keys = dict(api_key='f42f8bf6-b147-49f5-9aba-c97effc7ffff')

intrinio_keys = dict(sb_key='OmI1NDRlOGY1NzA3OTA2YzcyY2U4ZmM0ODAyMWRmZjBj',
                     pr_key='OmNjNzk0YzMxYmQ2YTA3NGYxMmEyMjFhMWE2ODM1OWQ1')

DEFAULT_EMAIL_RECIPIENT = 'phanveehuen@gmail.com'

API_KEYS = {
    'binance': binance_keys,
    'coinmarket': coin_market_cap_keys
}
