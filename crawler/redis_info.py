import redis
import time

HOST = "0.0.0.0"
PORT = 6379
PASS = "douban"

KEY = "douban_user_info"

redisClient = redis.Redis(host=HOST, port=PORT, password=PASS)


def _key(uid):
    return KEY + ":" + str(uid)


def addUserInfo(uid, info):
    print('redis_info: 写入数据' + info)
    return redisClient.set(_key(uid), info)


def getUserInfo(uid):
    return redisClient.get(_key(uid))


def removeUserInfo(uid):
    return redisClient.delete(_key(uid))


if __name__ == "__main__":
    uid = "test"
    info = "[1,2,3]"
    print(_key(uid))
    addUserInfo(uid, info)
    print(getUserInfo(uid))
    removeUserInfo(uid)
    print(getUserInfo(uid))
