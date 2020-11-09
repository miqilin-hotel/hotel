package com.example.hotel.entity;

import java.io.Serializable;

/**
 * <p>
 * 管理员表
 * </p>
 */
public class Admin implements Serializable {

    private static final long serialVersionUID = 1L;

    private int aid;
    /**
     * 管理员的姓名
     */
    private String aname;
    /**
     * 管理员的权限0为超管，什么都能看，1为收银员
     */
    private Integer aflag;
    /**
     * 管理员的手机号，用来登陆
     */
    private String aphone;
    /**
     * 管理员的登陆密码
     */
    private String apwd;

    public int getAid() {
        return aid;
    }

    public void setAid(int aid) {
        this.aid = aid;
    }

    public String getAname() {
        return aname;
    }

    public void setAname(String aname) {
        this.aname = aname;
    }

    public Integer getAflag() {
        return aflag;
    }

    public void setAflag(Integer aflag) {
        this.aflag = aflag;
    }

    public String getAphone() {
        return aphone;
    }

    public void setAphone(String aphone) {
        this.aphone = aphone;
    }

    public String getApwd() {
        return apwd;
    }

    public void setApwd(String apwd) {
        this.apwd = apwd;
    }

    public Admin() {
    }

    public Admin(int aid, String aname, Integer aflag, String aphone, String apwd) {
        this.aid = aid;
        this.aname = aname;
        this.aflag = aflag;
        this.aphone = aphone;
        this.apwd = apwd;
    }

    @Override
    public String toString() {
        return "Admin{" +
        "aid=" + aid +
        ", aname=" + aname +
        ", aflag=" + aflag +
        ", aphone=" + aphone +
        ", apwd=" + apwd +
        "}";
    }
}
