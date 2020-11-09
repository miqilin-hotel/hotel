package com.example.hotel.mapper;


import com.example.hotel.entity.Room;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 房间 Mapper 接口
 * </p>
 */
public interface RoomMapper {

    /**
     * 查看全部房间
     * @param map
     * @return
     */
    List<Room> selectAllUserAndRoom(Map<String, Object> map);

    /**
     * 查看全部房间数量
     * @param map
     * @return
     */
    int selectAllUserAndRoomCount(Map map);




    /**
     * 未入住房间
     * @param map
     * @return
     */
    List<Room> selectAllUserAndRoomByWeiRuZhu(Map<String, Object> map);

    /**
     * 未入住房间数量
     * @param map
     * @return
     */
    int selectAllUserAndRoomCountByWeiRuZhu(Map map);

    /**
     * 已入住房间
     * @param map
     * @return
     */
    List<Room> selectAllUserAndRoomByYiRuZhu(Map<String, Object> map);

    /**
     * 已入住房间数量
     * @param map
     * @return
     */
    int selectAllUserAndRoomCountByYiRuZhu(Map map);

    /**
     * 用户住宿的时候修改room表中数据
     * @param room
     */
    void updateRoomRstatusAndUid(Room room);

    /**
     * 根据id查room所有
     * @param rid
     * @return
     */
    Room selectAllRoomById(int rid);

    /**
     * 遍历出房间类型去让客人入住
     * @param map
     * @return
     */
    List<Room> getAllByType(Map map);

    /**
     * 遍历出可用的房间供客人预定
     * @return
     */
    List<Room> getAllByTypeYuDing(Room room);

    /**
     * 遍历出每个房间类型的总量
     * @param map
     * @return
     */
    int getAllByTypeCount(Map map);

    /**
     * 修改完订单表后再来修改room表中的数据
     * @param room
     */
    void updateRoomUidAndRstateByRid(Room room);

    /**
     * 用户预定的时候修改room表中数据
     * @param room
     */
    void updateRoomRstatusAndUidYuDing(Room room);

    /**
     * 根据房间号查对应的所有
     * @param room
     * @return
     */
    Room selectAllByRserial(Room room);


}
