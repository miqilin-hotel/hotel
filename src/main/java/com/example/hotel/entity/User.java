package com.example.hotel.entity;

import java.io.Serializable;

/**
 * <p>
 * 客户表
 * </p>
 */

public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    private int uid;
    /**
     * 用户姓名
     */
    private String uname;
    /**
     * 客户联系方式
     */
    private String uphone;
    /**
     * 客户的身份证号
     */
    private String uidcard;
    /**
     * 客户的家庭住址
     */
    private String uaddress;

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getUphone() {
        return uphone;
    }

    public void setUphone(String uphone) {
        this.uphone = uphone;
    }

    public String getUidcard() {
        return uidcard;
    }

    public void setUidcard(String uidcard) {
        this.uidcard = uidcard;
    }

    public String getUaddress() {
        return uaddress;
    }

    public void setUaddress(String uaddress) {
        this.uaddress = uaddress;
    }

    @Override
    public String toString() {
        return "User{" +
        "uid=" + uid +
        ", uname=" + uname +
        ", uphone=" + uphone +
        ", uidcard=" + uidcard +
        ", uaddress=" + uaddress +
        "}";
    }
}
