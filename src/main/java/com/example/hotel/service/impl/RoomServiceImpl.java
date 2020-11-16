package com.example.hotel.service.impl;


import com.example.hotel.entity.Room;
import com.example.hotel.mapper.RoomMapper;
import com.example.hotel.service.RoomService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 房间 服务实现类
 * </p>
 *
 * @author lu
 * @since 2019-12-29
 */
@Service
public class RoomServiceImpl implements RoomService {
    @Resource
    @Getter
    @Setter
    private RoomMapper roomMapper;
    /**
     * 查看所有的已入住的房间
     * @param map
     * @return
     */
    @Override
    public PageInfo selectAllUserAndRoom(Map<String, Object> map) {
        PageInfo page = new PageInfo();
        if (map.get("pageSize") != null) {
            int count =roomMapper.selectAllUserAndRoomCount(map);
            page.setTotal(count);
            int pageSize = Integer.parseInt(String.valueOf(map.get("pageSize")));
            page.setPageSize(pageSize);
            int currPage = Integer.parseInt(String.valueOf(map.get("pageNum")));
            page.setPageNum(currPage);

            //计算总页数
            int a;
            if (count % pageSize > 0) {
                a = count / pageSize + 1;
            } else {
                a = count / pageSize;
            }
            page.setPages(a);

            //开始分页
            PageHelper.startPage(currPage, pageSize);
            List<Room> ls = roomMapper.selectAllUserAndRoom(map);
            page.setList(ls);
        } else {
            List<Room> ls = roomMapper.selectAllUserAndRoom(map);
            page.setList(ls);
        }
        return page;
    }

    /**
     * 查看全部房间数量
     * @param map
     * @return
     */
    @Override
    public int selectAllUserAndRoomCount(Map map) {
        return roomMapper.selectAllUserAndRoomCount(map);
    }

    /**
     * 未入住房间
     * @param map
     * @return
     */
    @Override
    public PageInfo selectAllUserAndRoomByWeiRuZhu(Map<String, Object> map) {
        PageInfo page = new PageInfo();
        if (map.get("pageSize") != null) {
            int count =roomMapper.selectAllUserAndRoomCountByWeiRuZhu(map);
            page.setTotal(count);
            int pageSize = Integer.parseInt(String.valueOf(map.get("pageSize")));
            page.setPageSize(pageSize);
            int currPage = Integer.parseInt(String.valueOf(map.get("pageNum")));
            page.setPageNum(currPage);

            //计算总页数
            int a;
            if (count % pageSize > 0) {
                a = count / pageSize + 1;
            } else {
                a = count / pageSize;
            }
            page.setPages(a);

            //开始分页
            PageHelper.startPage(currPage, pageSize);
            List<Room> ls = roomMapper.selectAllUserAndRoomByWeiRuZhu(map);
            page.setList(ls);
        } else {
            List<Room> ls = roomMapper.selectAllUserAndRoomByWeiRuZhu(map);
            page.setList(ls);
        }
        return page;
    }

    /**
     * 未入住房间数量
     * @param map
     * @return
     */
    @Override
    public int selectAllUserAndRoomCountByWeiRuZhu(Map map) {
        return roomMapper.selectAllUserAndRoomCountByWeiRuZhu(map);
    }

    /**
     * 已入住房间
     * @param map
     * @return
     */
    @Override
    public PageInfo selectAllUserAndRoomByYiRuZhu(Map<String, Object> map) {
        PageInfo page = new PageInfo();
        if (map.get("pageSize") != null) {
            int count =roomMapper.selectAllUserAndRoomCountByYiRuZhu(map);
            page.setTotal(count);
            int pageSize = Integer.parseInt(String.valueOf(map.get("pageSize")));
            page.setPageSize(pageSize);
            int currPage = Integer.parseInt(String.valueOf(map.get("pageNum")));
            page.setPageNum(currPage);

            //计算总页数
            int a;
            if (count % pageSize > 0) {
                a = count / pageSize + 1;
            } else {
                a = count / pageSize;
            }
            page.setPages(a);

            //开始分页
            PageHelper.startPage(currPage, pageSize);
            List<Room> ls = roomMapper.selectAllUserAndRoomByYiRuZhu(map);
            page.setList(ls);
        } else {
            List<Room> ls = roomMapper.selectAllUserAndRoomByYiRuZhu(map);
            page.setList(ls);
        }
        return page;
    }

    /**
     * 已入住房间数量
     * @param map
     * @return
     */
    @Override
    public int selectAllUserAndRoomCountByYiRuZhu(Map map) {
        return roomMapper.selectAllUserAndRoomCountByYiRuZhu(map);
    }

    /**
     * 用户住宿的时候修改room表中数据
     * @param room
     */
    @Override
    public void updateRoomRstatusAndUid(Room room) {
        roomMapper.updateRoomRstatusAndUid(room);
    }

    /**
     * 根据id查room所有
     * @param rid
     * @return
     */
    @Override
    public Room selectAllRoomById(int rid) {
        return roomMapper.selectAllRoomById(rid);
    }

    /**
     * 遍历出房间类型去让客人入住
     * @param map
     * @return
     */
    @Override
    public PageInfo getAllByType(Map map) {
        PageInfo page = new PageInfo();
        if (map.get("pageSize") != null) {
            int count =roomMapper.getAllByTypeCount(map);
            page.setTotal(count);
            int pageSize = Integer.parseInt(String.valueOf(map.get("pageSize")));
            page.setPageSize(pageSize);
            int currPage = Integer.parseInt(String.valueOf(map.get("pageNum")));
            page.setPageNum(currPage);

            //计算总页数
            int a;
            if (count % pageSize > 0) {
                a = count / pageSize + 1;
            } else {
                a = count / pageSize;
            }
            page.setPages(a);

            //开始分页
            PageHelper.startPage(currPage, pageSize);
            List<Room> ls = roomMapper.getAllByType(map);
            page.setList(ls);
        } else {
            List<Room> ls = roomMapper.getAllByType(map);
            page.setList(ls);
        }
        return page;
    }

    /**
     * 遍历出可用房间供客人去预定
     * @param room
     * @return
     */
    @Override
    public List<Room> getAllByTypeYuDing(Room room) {
        return roomMapper.getAllByTypeYuDing(room);
    }

    /**
     * 遍历出每个房间类型的总量
     * @param map
     * @return
     */
    @Override
    public int getAllByTypeCount(Map map) {
        return roomMapper.getAllByTypeCount(map);
    }

    /**
     * 修改完订单表后再来修改room表中的数据
     * @param room
     */
    @Override
    public void updateRoomUidAndRstateByRid(Room room) {
        roomMapper.updateRoomUidAndRstateByRid(room);
    }

    /**
     * 用户预定的时候修改room表中数据
     * @param room
     */
    @Override
    public void updateRoomRstatusAndUidYuDing(Room room) {
        roomMapper.updateRoomRstatusAndUidYuDing(room);
    }

    /**
     * 根据房间号去查对应的所有
     * @param room
     * @return
     */
    @Override
    public Room selectAllByRserial(Room room) {
        return roomMapper.selectAllByRserial(room);
    }

}
