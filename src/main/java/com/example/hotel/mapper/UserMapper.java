package com.example.hotel.mapper;


import com.example.hotel.entity.User;

/**
 * <p>
 * 客户表 Mapper 接口
 * </p>
 */
public interface UserMapper {

    /**
     * 根据id查所有
     * @param user
     * @return
     */
    User selectAllUserById(User user);

    /**
     * 用户住宿的时候向user表中添加数据
     * @param user
     */
    void insertUserZhuFang(User user);

    /**
     * 根据id删除，用在已退房上
     * @param uid
     */
    void delAllUserById(int uid);

    /**
     * 根据姓名查住房人的信息
     * @param user
     * @return
     */
    User selectAllByUname(User user);

    /**
     * 根据身份证号查询所有
     * @param user
     * @return
     */
    User selectAllByIdCard(User user);

}
