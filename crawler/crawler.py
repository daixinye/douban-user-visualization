#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jan  9 16:28:30 2019

@author: meldur
"""
import requests
import re
import crawler_http
from bs4 import BeautifulSoup
import time
import crawler_log
import json
import redis_pool as rp

# 爬取用户基本数据


def getUserBasicInfo(user_id, count):

    user_url = "https://www.douban.com/people/" + user_id + "/"
    start_time = time.time()
    crawler_log.logTime()
    print('---- 开始爬取第{}个用户'.format(count))
    print('crawler: ' + user_url)
    headers = crawler_http.get_headers()
    # 使用requests发送请求
    user = requests.get(user_url, headers=headers)
    user.encoding = 'utf-8'
    soup = BeautifulSoup(user.text, 'lxml')

    # 判断用户是否有效
    infobox = soup.select("#db-usr-profile")
    mn = soup.select("div.mn")
    if not infobox:
        print('crawler: 无法正常获取用户数据')
        return False
    if mn:
        print('crawler: 该用户账号已被停用')
        return False
    # 获取用户基本信息
    all_info = []
    # id
    userid = re.split(r'/', user_url)[-2]
    # 用户名
    img = soup.find('div', class_='pic').find('img')
    if img:
        username = img.get('alt')
    else:
        username = soup.find('div', class_='pic').find('a').get('title')
    # 头像
    userimg = soup.find('div', class_='basic-info').find('img').get('src')

    # 加入时间
    userinfo = soup.find(
        'div', class_='user-info').find('div', class_='pl').get_text()
    create_date = re.search(r'(\d{4}-\d{2}-\d{2})', userinfo).group()
    # 常居地
    residence1 = soup.find('div', class_='user-info').find('a')
    residence = residence1.get_text() if residence1 else ''
    # 是否是豆瓣官方运营帐号
    is_reason = soup.find('span', class_='reason')
    official_account = 1 if is_reason else 0
    # 书的数量
    book_do_num = 0
    book_wish_num = 0
    book_collect_num = 0
    book = soup.find('div', id='book').find('span', class_='pl')
    if book:
        books = book.find_all('a')
        for i in range(len(books)):
            has_do = re.search('/do', books[i].get('href'))
            if has_do:
                book_do_num = int(
                    re.match(r'\d+', books[i].get_text()).group())
                continue
            has_wish = re.search('/wish', books[i].get('href'))
            if has_wish:
                book_wish_num = int(
                    re.match(r'\d+', books[i].get_text()).group())
                continue
            has_collect = re.search('/collect', books[i].get('href'))
            if has_collect:
                book_collect_num = int(
                    re.match(r'\d+', books[i].get_text()).group())
                continue
    # 电影数量
    movie_do_num = 0
    movie_wish_num = 0
    movie_collect_num = 0
    movie = soup.find('div', id='movie').find('span', class_='pl')
    if movie:
        movies = movie.find_all('a')
        for i in range(len(movies)):
            has_do = re.search('/do', movies[i].get('href'))
            if has_do:
                movie_do_num = int(
                    re.match(r'\d+', movies[i].get_text()).group())
                continue
            has_wish = re.search('/wish', movies[i].get('href'))
            if has_wish:
                movie_wish_num = int(
                    re.match(r'\d+', movies[i].get_text()).group())
                continue
            has_collect = re.search('/collect', movies[i].get('href'))
            if has_collect:
                movie_collect_num = int(
                    re.match(r'\d+', movies[i].get_text()).group())
                continue
    # 评论数量
    review = soup.find('div', id='review').find('a')
    review_num = re.search(r'\d+', review.get_text()).group() if review else 0
    # 常去小组数量
    group = soup.find('div', id='group').find('h2')
    group_num = re.findall('\((\d+)\)', group.get_text())[0] if group else 0

    # 关注人数
    contact = soup.find('div', id='friend').find('a').get_text()
    contact_num = int(re.findall(r'成员(\d+)', contact)[0])  # 关注人数

    # 被关注人数
    rev_contact = soup.find('p', class_='rev-link').find('a').get_text()
    rev_contact_num = int(re.findall(r'被(\d+)', rev_contact)[0])  # 被关注人数

    all_info.extend([userid, username, userimg, create_date, residence, contact_num, rev_contact_num, book_do_num, book_wish_num,
                     book_collect_num, movie_do_num, movie_wish_num, movie_collect_num, review_num, group_num, official_account])

    crawler_log.logTime()
    print("---- 第一个用户爬取结束，用时{}s".format(time.time() - start_time))
    return all_info

# 获取用户列表


def getHappeningUserId(url):
    headers = crawler_http.get_headers()
    user = requests.get(url, headers=headers)
    user.encoding = 'utf-8'
    user = json.loads(user.text)
    soup = BeautifulSoup(user["html"], 'lxml')
    result = soup.select("li.clearfix div.action_meta a")
    userIds = []
    for i in result:
        userIds.append(i.get('href').split("/")[-2])
    return userIds


if __name__ == "__main__":
    # print(getUserBasicInfo('r...7', 1))
    url = 'https://www.douban.com/j/gallery/new_posts?start=0&count=10'
    result = getHappeningUserId(url)
    for uid in result:
        rp.addUser(uid)
