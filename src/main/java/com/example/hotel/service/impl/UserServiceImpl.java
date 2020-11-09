package com.example.hotel.service.impl;

import com.example.hotel.entity.User;
import com.example.hotel.mapper.UserMapper;
import com.example.hotel.service.UserService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * <p>
 * 客户表 服务实现类
 * </p>
 */
@Service
public class UserServiceImpl implements UserService {

    @Resource
    @Getter
    @Setter
    private UserMapper userMapper;

    /**
     * 根据id查所有
     * @param user
     * @return
     */
    @Override
    public User selectAllUserById(User user) {
        return userMapper.selectAllUserById(user);
    }

    /**
     * 用户住宿的时候向user表中添加数据
     * @param user
     */
    @Override
    public void insertUserZhuFang(User user) {
        userMapper.insertUserZhuFang(user);
    }

    /**
     * 根据id删除，用在已退房上
     * @param uid
     */
    @Override
    public void delAllUserById(int uid) {
        userMapper.delAllUserById(uid);
    }

    /**
     * 根据姓名查住房人信息
     * @param user
     * @return
     */
    @Override
    public User selectAllByUname(User user) {
        return userMapper.selectAllByUname(user);
    }

    /**
     * 根据身份证号查询所有
     * @param user
     * @return
     */
    @Override
    public User selectAllByIdCard(User user) {
        return userMapper.selectAllByIdCard(user);
    }
}
