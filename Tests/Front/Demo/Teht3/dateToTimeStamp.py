import datetime

date = datetime.datetime(2025, 3, 25)

timestamp = int(date.timestamp() * 1000)

print(timestamp)