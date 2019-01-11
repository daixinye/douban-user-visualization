
import redis_movie_do
import crawler
import time
import random

MAX_TIME = 10
count = 1
startTime = time.time()


while 1:
    # 获取yonghuchi_used中的用户信息userInfo
    userInfo = redis_movie_do.getRandUserUsedInfo()

    # 获取 userId 和 userMovieDoCount
    userId = userInfo[0]
    userMovieDoCount = userInfo[1]

    # 如果为空则不爬并移出待爬池
    if userMovieDoCount == 0:
        redis_movie_do.removeUserId(userId)
        continue

    # 爬取数据
    movieList = crawler.getUserMovieInfo(userId, userMovieDoCount, count)

    # 判断是否有效
    if movieList == False or len(movieList) == 0:
        print("main: 无效数据或数据为空，不存入\n")
        time.sleep(15)
    else:
        # sadd douban_user_do_movie
        print("main: 写入用户 {}, 数据为 {}".format(userId, movieList))
        redis_movie_do.addUserToUsed(userId)
        redis_movie_do.addMovie(userId, movieList)
        print("main: 历时 {} 秒, 已获取 {} 位, 总获取 {} 位, 平均 {} 秒/位".format(
            int(time.time() - startTime), count, redis_movie_do.getUsersCount(), int((time.time() - startTime) / count)))

        # 爬取下一个用户
        redis_movie_do.removeUserId(userId)
        count += 1

    sleepTime = random.randint(1, MAX_TIME)
    print('main: 休息个' + str(sleepTime) + '秒吧\n')
    time.sleep(sleepTime)
