package com.example.hotel.service.impl;

import com.example.hotel.entity.Employee;
import com.example.hotel.mapper.EmployeeMapper;
import com.example.hotel.service.EmployeeService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 员工表 服务实现类
 * </p>
 */
@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Resource
    @Getter
    @Setter
    private EmployeeMapper employeeMapper;

    /**
     *   有名字按名字查，没有差所有
     * @param map
     * @return
     */
    public List<Employee> selectAll(Map map) {
        return employeeMapper.selectAll(map);
    }

    /**
     * 有名字查名字总数，没有差所有
     * @param map
     * @return
     */
    public int selectAllEmployeeByEnameCount(Map map) {
        return employeeMapper.selectAllEmployeeByEnameCount(map);
    }

    /**
     * 点击修改后进入修改页面出现的值
     * @param eid
     * @return
     */
    @Override
    public Employee selectAllById(int eid) {
        return employeeMapper.selectAllById(eid);
    }

    /**
     * 修改员工信息
     * @param employee
     */
    @Override
    public void updateEmployeeById(Employee employee) {
         employeeMapper.updateEmployeeById(employee);
    }

    /**
     * 删除
     * @param eid
     */
    @Override
    public void delAllBId(int eid) {
        employeeMapper.delAllBId(eid);
    }

    /**
     * 添加员工
     * @param employee
     */
    @Override
    public void addEmployee(Employee employee) {
        employeeMapper.addEmployee(employee);
    }


}
