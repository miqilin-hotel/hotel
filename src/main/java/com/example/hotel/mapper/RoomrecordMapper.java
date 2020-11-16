package com.example.hotel.mapper;


import com.example.hotel.entity.Room;
import com.example.hotel.entity.Roomrecord;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 客房记录 Mapper 接口
 * </p>
 *
 * @author lu
 * @since 2020-01-05
 */
public interface RoomrecordMapper {

    /**
     * 查看所有的已入住的房间
     * @param map
     * @return
     */
    List<Roomrecord> selectAllRoomRecordCheckIn(Map<String, Object> map);

    /**
     * 查看所有的已入住的房间总数
     * @param map
     * @return
     */
    int selectAllRoomRecordCountCheckIn(Map map);

    /**
     * 已退房
     * @param map
     * @return
     */
    List<Roomrecord> selectAllRoomRecordCheckOut(Map map);

    /**
     * 已退房数量
     * @param map
     * @return
     */
    int selectAllRoomRecordCountCheckOut(Map map);

    /**
     * 用户住宿的时候向roomrecord表中添加数据
     * @param roomrecord
     */
    void insertRoomRecordRidAndUid(Roomrecord roomrecord);

    /**
     * 用户住宿的时候修改roomrecord表中的状态
     * @param roomrecord
     */
    void updateRecordState(Roomrecord roomrecord);


    /**
     * 根据rid删除订单表中的数据
     * @param room
     */
    void  delAllRoomRecordByRid(Room room);

    /**
     * 根据id查所有
     * @param roomrecord
     * @return
     */
    Roomrecord selectAllRoomRecordById(Roomrecord roomrecord);

    /**
     * 在退房的时候首先来修改roomrecord表中的数据，然后再去修改room表中的房间状态
     * @param roomrecord
     */
    void updateChenkOutTuiRecordEndAndStateAndMoney(Roomrecord roomrecord);

    /**
     * 显示在主页的总金额
     * @return
     */
    Double selectRoomRecordMoney();
}
