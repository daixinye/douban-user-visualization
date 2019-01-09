#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jan  9 16:43:17 2019

@author: meldur
读写文件，添加用户数据
"""
import csv

#创建一个文件存放用户的基本信息
def create_user(filepath):
    #定义文件字段
    fields=['userid','username','userimg','create_date','residence','contact_num','rev_contact_num','book_do_num','book_wish_num','book_collect_num','movie_do_num','movie_wish_num','movie_collect_num','review_num','group_num','official_account']
    with open(filepath,'w',encoding='utf-8') as f:
        f_csv=csv.writer(f)
        f_csv.writerow(fields)
#添加一条用户数据
def add_user(filepath,all_info):
    with open(filepath,'a',encoding='utf-8') as f:
            f_csv=csv.writer(f)
            f_csv.writerow(all_info)
    
    
    
    