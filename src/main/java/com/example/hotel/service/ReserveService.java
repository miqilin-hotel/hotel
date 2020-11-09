package com.example.hotel.service;

import com.example.hotel.entity.Reserve;

import java.util.List;

public interface ReserveService {
    /**
     * 添加预定的时间和对应的uid和rid
     * @param reserve
     */
    int insertReserveYuDing(Reserve reserve);

    /**
     * 查询所有的预定
     * @return
     */
    List<Reserve> selectAllReserveYuDing();


    /**
     * 根据ID查询所有
     * @param reserveId
     * @return
     */
    Reserve selectReserveYuDingById(int reserveId);

}
