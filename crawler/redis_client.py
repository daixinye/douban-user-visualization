
import redis
import redis_client




def ConnectToRedis():
    #HOST = "192.168.31.221"
    HOST="172.20.10.7"
    PORT = 6379
    PASS = "douban"

    redisClient = redis.Redis(host=HOST, port=PORT, password=PASS)
    return redisClient
