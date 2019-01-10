
import MySQLdb
import redis_client
import json
import csv
import pandas


def ConnectToMysql():
    # 打开数据库连接
    conn= MySQLdb.connect("192.168.31.221", "huangzhuoyue", "123456","douban", charset='utf8' )
    # 使用cursor()方法获取操作游标   
    cursor = conn.cursor()
    # 使用execute方法执行SQL语句
    cursor.execute("SELECT VERSION()")
    # 使用 fetchone() 方法获取一条数据
    data = cursor.fetchone()
    print("Database version : %s " % data)
    return conn,cursor


 #获取用户池中所有用户ID列表
def getUsersID(poolname):
    #连接redis客户端
    redisClient=redis_client.ConnectToRedis()
    all_usersID_ls=list(redisClient.smembers(poolname))
    all_usersID=[x.decode() for x in all_usersID_ls]
    print("用户总数有：",len(all_usersID))
    return all_usersID

#redis数据写入csv文件
def redis2Csv(poolname):
    redisClient=redis_client.ConnectToRedis()
    all_usersID=getUsersID(poolname)
    for i in all_usersID:
        userInfoID='douban_user_info:'+i
        byte_str = redisClient.get(userInfoID)
        if byte_str:
            userinfo_str = str(byte_str,'UTF-8')
            userinfo=eval(userinfo_str)
            with open('./datasets/user/userBasicInfo1.csv','a',encoding='utf-8') as f:
                f_csv=csv.writer(f)
                f_csv.writerow(userinfo)

if __name__ == "__main__":
    redis2Csv("yonghuchi_used")

    

