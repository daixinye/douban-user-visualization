import time


def logTime():
    print("---- " + time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
