package com.example.hotel.service.impl;

import com.example.hotel.entity.Room;
import com.example.hotel.entity.Roomrecord;
import com.example.hotel.mapper.RoomrecordMapper;
import com.example.hotel.service.RoomrecordService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


@Service
public class RoomrecordServiceImpl implements RoomrecordService {
    @Resource
    @Getter
    @Setter
    private RoomrecordMapper roomrecordMapper;


    /**
     * 查看所有的已入住的房间
     * @param map
     * @return
     */
    @Override
    public PageInfo selectAllRoomRecordCheckIn(Map<String, Object> map) {
        PageInfo page = new PageInfo();
        if (map.get("pageSize") != null) {
            int count = roomrecordMapper.selectAllRoomRecordCountCheckIn(map);
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
            List<Roomrecord> ls = roomrecordMapper.selectAllRoomRecordCheckIn(map);
            page.setList(ls);
        } else {
            List<Roomrecord> ls = roomrecordMapper.selectAllRoomRecordCheckIn(map);
            page.setList(ls);
        }
        return page;
    }

    /**
     * 已入住房间的总数
     * @param map
     * @return
     */
    @Override
    public int selectAllRoomRecordCountCheckIn(Map map) {
        return roomrecordMapper.selectAllRoomRecordCountCheckIn(map);
    }

    /**
     * 查看所有已退房
     * @param map
     * @return
     */
    @Override
    public PageInfo selectAllRoomRecordCheckOut(Map map) {
        PageInfo page = new PageInfo();
        if (map.get("pageSize") != null) {
            int count = roomrecordMapper.selectAllRoomRecordCountCheckOut(map);
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
            List<Roomrecord> ls = roomrecordMapper.selectAllRoomRecordCheckOut(map);
            page.setList(ls);
        } else {
            List<Roomrecord> ls = roomrecordMapper.selectAllRoomRecordCheckOut(map);
            page.setList(ls);
        }
        return page;
    }

    /**
     * 所有已退房的数量
     * @param map
     * @return
     */
    @Override
    public int selectAllRoomRecordCountCheckOut(Map map) {
        return roomrecordMapper.selectAllRoomRecordCountCheckOut(map);
    }

    /**
     * 用户住宿的时候向roomrecord表中添加数据
     * @param roomrecord
     */
    @Override
    public void insertRoomRecordRidAndUid(Roomrecord roomrecord) {
        roomrecordMapper.insertRoomRecordRidAndUid(roomrecord);
    }

    /**
     * 用户住宿的时候修改roomrecord表中的状态
     * @param roomrecord
     */
    @Override
    public void updateRecordState(Roomrecord roomrecord) {
        roomrecordMapper.updateRecordState(roomrecord);
    }

    /**
     * 根据rid删除订单表中的数据
     * @param room
     */
    @Override
    public void delAllRoomRecordByRid(Room room) {
        roomrecordMapper.delAllRoomRecordByRid(room);
    }

    @Override
    public Roomrecord selectAllRoomRecordById(Roomrecord roomrecord) {
        return roomrecordMapper.selectAllRoomRecordById(roomrecord);
    }

    /**
     * 在退房的时候首先来修改roomrecord表中的数据，然后再去修改room表中的房间状态
     * @param roomrecord
     */
    @Override
    public void updateChenkOutTuiRecordEndAndStateAndMoney(Roomrecord roomrecord) {
        roomrecordMapper.updateChenkOutTuiRecordEndAndStateAndMoney(roomrecord);
    }

    /**
     * 显示在主页的总金额
     * @return
     */
    @Override
    public Double selectRoomRecordMoney() {
        return roomrecordMapper.selectRoomRecordMoney();
    }

}
