import json

with open('../public/dummy_data/cmc_latest.json', 'r') as f:
    latest = json.load(f)

with open('../public/dummy_data/gecko_charts.json', 'r') as f:
    charts = json.load(f)


def get_chart(symbol):
    for chart in charts:
        if chart['symbol'] == symbol:
            return chart
    return {}


##
result = []
for item in latest:
    temp = item.copy()
    temp['chart'] = get_chart(item['symbol'])
    result.append(temp)

##
with open('../public/dummy_data/cmc_latest_merge.json', 'w') as f:
    f.write(json.dumps(result))