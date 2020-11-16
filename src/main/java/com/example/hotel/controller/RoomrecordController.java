package com.example.hotel.controller;


import com.example.hotel.entity.Roomrecord;
import com.example.hotel.service.RoomrecordService;
import com.example.hotel.util.DESUtil;
import com.github.pagehelper.PageInfo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 客房记录 前端控制器
 * </p>
 *
 * @author lu
 * @since 2020-01-05
 */
@RestController
@RequestMapping("/roomrecord")
public class RoomrecordController {

    @Resource
    @Getter
    @Setter
    private RoomrecordService roomrecordService;

    /**
     * 正在入住
     * @param pageNum
     * @param pageSize
     * @param uname
     * @param rserial
     * @return
     */
    @RequestMapping("/selectAllRoomRecordCheckIn")
    public Map selectAllRoomRecordCheckIn(int pageNum,int pageSize,String uname,String rserial){
        Map<String, Object> map = new HashMap<>();
        map.put("pageSize", pageSize);
        map.put("uname",uname);
        map.put("pageNum", pageNum);
        map.put("rserial",rserial);
        PageInfo page=roomrecordService.selectAllRoomRecordCheckIn(map);
        List<Roomrecord> ls=page.getList();
        for (int i = 0; i < ls.size(); i++) {
            String name=ls.get(i).getRoom().getRpic();
            ls.get(i).getRoom().setRpic("/static/image/picture/" +name);
            System.out.println("sd="+ls.get(i).getRoom());
            String flag = ls.get(i).getRoom().getRstatus();
            if (flag.equals("0")) {
                ls.get(i).getRoom().setRstatus("可用");
            }
            if (flag.equals("1")) {
                ls.get(i).getRoom().setRstatus("正在使用");
            }
        }
        map.put("page", ls);
        map.put("totalPage", page.getPages());
        return map;

    }

    /**
     * 已退房
     * @param pageNum
     * @param pageSize
     * @param recordStart
     * @param recordEnd
     * @param rserial
     * @return
     */
    @RequestMapping("/selectAllRoomRecordCheckOut")
    public Map selectAllRoomRecordCheckOut(int pageNum,int pageSize,String recordStart,String recordEnd,String rserial){
        Map<String, Object> map = new HashMap<>();
        map.put("recordStart",recordStart);
        map.put("recordEnd",recordEnd);
        map.put("pageSize", pageSize);
        map.put("pageNum", pageNum);
        map.put("rserial",rserial);
        PageInfo page=roomrecordService.selectAllRoomRecordCheckOut(map);
        List<Roomrecord> ls=page.getList();
        for (int i = 0; i < ls.size(); i++) {
            String uphone= DESUtil.decryptBasedDes(ls.get(i).getUser().getUphone());
            ls.get(i).getUser().setUphone(uphone);
            String idcard= DESUtil.decryptBasedDes(ls.get(i).getUser().getUidcard());
            ls.get(i).getUser().setUidcard(idcard);
            String name=ls.get(i).getRoom().getRpic();
            ls.get(i).getRoom().setRpic("/static/image/picture/" +name);
            System.out.println("sd="+ls.get(i).getRoom());
            String flag = ls.get(i).getRoom().getRstatus();
            if (flag.equals("0")) {
                ls.get(i).getRoom().setRstatus("可用");
            }
            if (flag.equals("1")) {
                ls.get(i).getRoom().setRstatus("正在使用");
            }
        }
        map.put("page", ls);
        map.put("totalPage", page.getPages());
        return map;

    }


    /**
     * 显示在主页的总金额
     * @return
     */
    @RequestMapping("/toMoneyCount")
    public Map toMoneyCount(){
        Map map =new HashMap();
        Double money=roomrecordService.selectRoomRecordMoney();
        map.put("money",money);
        System.out.println("money=="+money);
        return map;
    }

    @RequestMapping("/toRoomRecord_list")
    public ModelAndView toRoomRecord_list(){
        return new ModelAndView("H-ui.admin/roomRecord_list");
    }
}

