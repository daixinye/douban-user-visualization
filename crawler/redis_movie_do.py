import redis_client

redisClient = redis_client.ConnectToRedis()

KEY_YONGHUCHI_USED = "yonghuchi_used"
KEY_YONGHUCHI_MOVIE_DO_USED = "yonghuchi_movie_do_used_1"
KEY_USER_MOVIE_DO = "douban_user_movie_do:"


def _key(userId):
    return KEY_USER_MOVIE_DO + userId

# 加入用户到已经爬取的列表


def addUserToUsed(userId):
    return redisClient.sadd(KEY_YONGHUCHI_MOVIE_DO_USED, userId)

# 判断用户是否已经被爬取


def isUserUsed(userId):
    return redisClient.sismember(KEY_YONGHUCHI_MOVIE_DO_USED, userId)


def addMovie(userId, movieIdList):
    return redisClient.set(_key(userId), str(movieIdList))


def getRandUserUsedInfo():
    userId = str(redisClient.srandmember(KEY_YONGHUCHI_USED), 'utf-8')
    while isUserUsed(userId):
        print('redis_movide_do: {} 已被爬取，换一个...'.format(userId))
        userId = str(redisClient.srandmember(KEY_YONGHUCHI_USED), 'utf-8')
    userInfo = str(redisClient.get("douban_user_info:" + userId), 'utf-8')
    userInfo = eval(userInfo)

    return [userInfo[0], userInfo[-6]]


def getUsersCount():
    return redisClient.scard(KEY_YONGHUCHI_MOVIE_DO_USED)


def removeUserId(userId):
    return redisClient.srem(KEY_YONGHUCHI_USED, userId)


if __name__ == "__main__":
    # addUserToUsed('test')
    # print(isUserUsed('test'))
    # addMovie('test', [[1, 2], [3, 4]])
    # print(getRandUserUsedInfo())
    print(getUsersCount())
    print(getRandUserUsedInfo())
