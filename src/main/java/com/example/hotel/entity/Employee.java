package com.example.hotel.entity;

import java.io.Serializable;

/**
 * <p>
 * 员工表
 * </p>
 *
 * @author lu
 * @since 2019-12-29
 */
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    private int eid;
    /**
     * 员工姓名
     */
    private String ename;
    /**
     * 员工年龄
     */
    private Integer eage;
    /**
     * 员工联系方式
     */
    private String ephone;
    /**
     * 员工身份证号
     */
    private String eidcard;
    /**
     * 员工职位
     */
    private String eposition;
    /**
     * 员工工资
     */
    private String emoney;
    /**
     * 员工性别
     */
    private String esex;

    public String getEsex() {
        return esex;
    }

    public void setEsex(String esex) {
        this.esex = esex;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getEid() {
        return eid;
    }

    public void setEid(Integer eid) {
        this.eid = eid;
    }

    public String getEname() {
        return ename;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }

    public Integer getEage() {
        return eage;
    }

    public void setEage(Integer eage) {
        this.eage = eage;
    }

    public String getEphone() {
        return ephone;
    }

    public void setEphone(String ephone) {
        this.ephone = ephone;
    }

    public String getEidcard() {
        return eidcard;
    }

    public void setEidcard(String eidcard) {
        this.eidcard = eidcard;
    }

    public String getEposition() {
        return eposition;
    }

    public void setEposition(String eposition) {
        this.eposition = eposition;
    }

    public String getEmoney() {
        return emoney;
    }

    public void setEmoney(String emoney) {
        this.emoney = emoney;
    }

    @Override
    public String toString() {
        return "Employee{" +
        "eid=" + eid +
        ", ename=" + ename +
        ", eage=" + eage +
        ", ephone=" + ephone +
        ", eidcard=" + eidcard +
        ", eposition=" + eposition +
        ", emoney=" + emoney +
        "}";
    }
}
