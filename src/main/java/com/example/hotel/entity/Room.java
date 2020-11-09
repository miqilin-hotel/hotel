package com.example.hotel.entity;

import java.io.Serializable;

/**
 * <p>
 * 房间
 * </p>
 *
 * @author lu
 * @since 2019-12-29
 */

public class Room implements Serializable {

    private static final long serialVersionUID = 1L;

    private int rid;
    /**
     * 房间编号
     */
    private String rserial;
    /**
     * 房间图片
     */
    private String rpic;
    /**
     * 房间价格
     */
    private Double rprice;
    /**
     * 房间介绍
     */
    private String rcontent;
    /**
     * 房间状态 0为可用，1为不可用
     */
    private String rstatus;
    /**
     * 房间类型
     */
    private String rtype;

    private User user;

    public int getRid() {
        return rid;
    }

    public void setRid(int rid) {
        this.rid = rid;
    }

    public String getRserial() {
        return rserial;
    }

    public void setRserial(String rserial) {
        this.rserial = rserial;
    }

    public String getRpic() {
        return rpic;
    }

    public void setRpic(String rpic) {
        this.rpic = rpic;
    }

    public Double getRprice() {
        return rprice;
    }

    public void setRprice(Double rprice) {
        this.rprice = rprice;
    }

    public String getRcontent() {
        return rcontent;
    }

    public void setRcontent(String rcontent) {
        this.rcontent = rcontent;
    }

    public String getRstatus() {
        return rstatus;
    }

    public void setRstatus(String rstatus) {
        this.rstatus = rstatus;
    }

    public String getRtype() {
        return rtype;
    }

    public void setRtype(String rtype) {
        this.rtype = rtype;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Room{" +
        "rid=" + rid +
        ", rserial=" + rserial +
        ", rpic=" + rpic +
        ", rprice=" + rprice +
        ", rcontent=" + rcontent +
        ", rstatus=" + rstatus +
        ", rtype=" + rtype +
        "}";
    }
}
