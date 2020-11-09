package com.example.hotel.entity;

import java.io.Serializable;

/**
 * <p>
 * 客房记录
 * </p>
 */
public class Roomrecord implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer recordId;
    private Room room;
    private User user;
    /**
     * 开始入住时间
     */
    private String recordStart;
    private String recordEnd;
    /**
     * 入住结账时间
     */
    private String recordDay;

    /**
     * 房间状态：0为已退   1为正在入住
     */
    private String recordState;

    private Double recordMoney;

    public Double getRecordMoney() {
        return recordMoney;
    }

    public void setRecordMoney(Double recordMoney) {
        this.recordMoney = recordMoney;
    }

    public Integer getRecordId() {
        return recordId;
    }

    public void setRecordId(Integer recordId) {
        this.recordId = recordId;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRecordStart() {
        return recordStart;
    }

    public void setRecordStart(String recordStart) {
        this.recordStart = recordStart;
    }

    public String getRecordEnd() {
        return recordEnd;
    }

    public void setRecordEnd(String recordEnd) {
        this.recordEnd = recordEnd;
    }

    public String getRecordDay() {
        return recordDay;
    }

    public void setRecordDay(String recordDay) {
        this.recordDay = recordDay;
    }

    public String getRecordState() {
        return recordState;
    }

    public void setRecordState(String recordState) {
        this.recordState = recordState;
    }
}
