package com.example.hotel.service.impl;

import com.example.hotel.entity.Reserve;
import com.example.hotel.mapper.ReserveMapper;
import com.example.hotel.service.ReserveService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ReserveServiceImpl implements ReserveService {

    @Getter
    @Setter
    @Resource
    private ReserveMapper reserveMapper;


    /**
     * 添加预定信息及uid和rid
     * @param reserve
     */
    @Override
    public int insertReserveYuDing(Reserve reserve) {
        return reserveMapper.insertReserveYuDing(reserve);
    }


    /**
     * 查询所有的预定
     * @return
     */
    @Override
    public List<Reserve> selectAllReserveYuDing() {
        return reserveMapper.selectAllReserveYuDing();
    }


    /**
     * 根据ID查所有
     * @param reserveId
     * @return
     */
    @Override
    public Reserve selectReserveYuDingById(int reserveId) {
        return reserveMapper.selectReserveYuDingById(reserveId);
    }
}
