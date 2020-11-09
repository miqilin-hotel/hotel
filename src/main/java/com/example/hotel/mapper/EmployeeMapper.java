package com.example.hotel.mapper;


import com.example.hotel.entity.Employee;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 员工表 Mapper 接口
 * </p>
 */
@Repository
public interface EmployeeMapper {
    /**
     * 有名字按名字查，没有差所有
     * @param map
     * @return
     */
    List<Employee> selectAll(Map map);

    /**
     * 有名字查名字总数，没有差所有
     * @param map
     * @return
     */
    int selectAllEmployeeByEnameCount(Map map);

    /**
     * 点击修改后进入修改页面出现的值
     * @param eid
     * @return
     */
    Employee selectAllById(int eid);

    /**
     * 修改员工信息
     * @param employee
     * @return
     */
    void updateEmployeeById(Employee employee);

    /**
     * 根据ID删除
     * @param eid
     */
    void delAllBId(int eid);

    /**
     * 添加员工
     * @param employee
     */
    void addEmployee(Employee employee);

}
