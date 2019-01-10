# system
import time
import random
# custom
import redis_info
import redis_pool as rp
import redis_info as ri
import crawler_http
import crawler_io
import crawler as cr

MAX_TIME = 10

startTime = time.time()
count = 1
validCount = 0
while 1:
    # 从用户池中获取随机用户
    userId = str(rp.getRandomUserAndRemove(), 'utf-8')
    # userId = str(rp.getRandomUser(), 'utf-8')
    if rp.isUserUsed(userId):
        print('main: 用户 {} 已爬取，跳过\n'.format(userId))
        continue

    # 抓取数据
    userInfo = cr.getUserBasicInfo(userId, count)

    # 写入数据到redis
    if userInfo:
        # 从用户池中删除 防止多进程再次被爬取
        # rp.removeUser(userId)
        # 存储信息
        ri.addUserInfo(userId, str(userInfo))
        # 放入到已爬取的用户列表中
        rp.addUserToUsed(userId)
        validCount += 1

    # 休息一会
    sleepTime = random.randint(1, MAX_TIME)
    duringTime = int(time.time() - startTime)
    usersCount = rp.getUsersCount()
    usersUsedCount = rp.getUsersUsedCount()
    print('main: 已经过 {} 秒（爬取 {} 秒/个，有效 {} 秒/个 ）, 用户池剩余 {} 个, 已爬取 {} 个, 本次爬虫有效用户 {} 个（有效比 {}%）'.format(
          duringTime, int(duringTime / count), int(duringTime / validCount), usersCount, usersUsedCount, validCount, int(100 * validCount / count)))
    print('main: 休息个' + str(sleepTime) + '秒吧\n')
    count += 1
    time.sleep(sleepTime)
