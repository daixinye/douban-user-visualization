import redis
import time

HOST = "0.0.0.0"
PORT = 6379
PASS = "douban"

KEY = "yonghuchi"
KEY_USED = "yonghuchi_used"


redisClient = redis.Redis(host=HOST, port=PORT, password=PASS)

# 加入用户到用户池中


def addUser(userId):
    # 判断是否在已爬过的用户列表中
    if not redisClient.sismember(KEY_USED, userId):
        print("redis_pool: 添加用户" + userId)
        return redisClient.sadd(KEY, userId)


# 获取随机用户
def getRandomUser():
    return redisClient.srandmember(KEY)

# 获取用户列表


def getUsers():
    return redisClient.smembers(KEY)

# 移除用户


def removeUser(userId):
    return redisClient.srem(KEY, userId)

# 获取随机用户并加入到已爬用户列表中


def getRandomUserAndRemove():
    return redisClient.spop(KEY)


def addUserToUsed(userId):
    return redisClient.sadd(KEY_USED, userId)


def getUsersUsed():
    return redisClient.smembers(KEY_USED)


def getUsersCount():
    return redisClient.scard(KEY)


def getUsersUsedCount():
    return redisClient.scard(KEY_USED)


def isUserUsed(userId):
    return redisClient.sismember(KEY_USED, userId)


if __name__ == '__main__':
    temp = time.time()
    print(isUserUsed('4908947'))
    # print(getRandomUserAndRemove())
#     print(addUser(temp))
#     print(getUsers())
#     print(getUsersUsed())
#     print(getRandomUserAndRemove())
#     print(getUsers())
#     print(getUsersUsed())
