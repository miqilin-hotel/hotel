package com.example.hotel.controller;


import com.example.hotel.entity.Reserve;
import com.example.hotel.entity.Room;
import com.example.hotel.entity.Roomrecord;
import com.example.hotel.entity.User;
import com.example.hotel.service.ReserveService;
import com.example.hotel.service.RoomService;
import com.example.hotel.service.RoomrecordService;
import com.example.hotel.service.UserService;
import com.example.hotel.util.DESUtil;
import com.github.pagehelper.PageInfo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * <p>
 * 房间 前端控制器
 * </p>
 *
 * @author lu
 * @since 2019-12-29
 */
@RestController
@RequestMapping("/room")
public class RoomController {
    @Resource
    @Getter
    @Setter
    private RoomService roomService;

    @Resource
    @Getter
    @Setter
    private UserService userService;

    @Resource
    @Setter
    @Getter
    private RoomrecordService roomrecordService;

    @Resource
    @Setter
    @Getter
    private ReserveService reserveService;

    /**
     * 查看所有的房子
     *
     * @param pageNum
     * @param pageSize
     * @param rserial
     * @return
     */
    @RequestMapping("/selectAllUserAndRoom")
    public Map selectAllUserAndRoom(int pageNum, int pageSize, String rserial, String rstatus) {
        Map<String, Object> map = new HashMap<>();
        map.put("pageSize", pageSize);
        map.put("pageNum", pageNum);
        map.put("rserial", rserial);
        PageInfo page = new PageInfo();
        if (rstatus == "" || rstatus == null) {      //没有收到页面传来的状态就查全部
            page = roomService.selectAllUserAndRoom(map);

        } else if (rstatus.equals("0")) {       //页面传来的值为0，查未入住
            page = roomService.selectAllUserAndRoomByWeiRuZhu(map);

        } else if (rstatus.equals("1")) {       //页面传来的值为1，查已入住
            page = roomService.selectAllUserAndRoomByYiRuZhu(map);
        }

        List<Room> ls = page.getList();       //传入map后得到所有房间的信息


        User user = new User();
        for (int i = 0; i < ls.size(); i++) {
            if (ls.get(i).getRstatus().equals("1")) {
                user = userService.selectAllUserById(ls.get(i).getUser());
                ls.get(i).setUser(user);                 //根据ID去查对应的user表中的数据
                ls.get(i).setRstatus("已入住");
            } else {
                ls.get(i).getUser().setUname("暂无---");       //如果这个房间没人居住的话就在页面显示暂无--
                ls.get(i).setRstatus("未入住");
            }
        }
        map.put("page", ls);
        map.put("totalPage", page.getPages());
        return map;     //传到前台一个map进行解析

    }


    /**
     * 删除订单表和用户表中的数据
     *
     * @param rid
     * @return
     */
    @RequestMapping("/delRoomAllById")
    public List delRoomAllById(int rid) {
        List ls = new ArrayList();
        Room room = new Room();
        room.setRid(rid);
        roomrecordService.delAllRoomRecordByRid(room);  //删除订单表里面的东西
        Room room1 = roomService.selectAllRoomById(rid);
        userService.delAllUserById(room1.getUser().getUid());   //删除用户表中的数据
        return ls;
    }


    /**
     * 根据房间类型进行入住，此处只遍历出来了各种房间类型的空方，具体入住在userController
     *
     * @return
     */
    @RequestMapping("/roomType")
    public Map roomType(int pageNum, int pageSize, String rtype, String rserial) {
        Map<String, Object> map = new HashMap<>();
        map.put("pageNum", pageNum);
        map.put("pageSize", pageSize);
        map.put("rtype", rtype);
        map.put("rserial", rserial);

        PageInfo page = roomService.getAllByType(map);
        List<Room> ls = page.getList();
        for (int i = 0; i < ls.size(); i++) {
            String name = ls.get(i).getRpic();
            ls.get(i).setRpic("/static/image/picture/" + name);
            String flag = ls.get(i).getRstatus();
            if (flag.equals("0")) {
                ls.get(i).setRstatus("可用");
            }
        }
        map.put("page", ls);
        map.put("totalPage", page.getPages());
        return map;
    }

    /**
     * 用户预定
     * @param room
     * @return
     */
    @RequestMapping("/getAllByTypeYuDing")
    public Map getAllByTypeYuDing(Room room) {
        List<Room> roomList = roomService.getAllByTypeYuDing(room);
        Map map=new HashMap();
        map.put("room",roomList);
        return map;
    }

    /**
     * 预定的时候向表中插入数据
     * @param rserial
     * @param uidcard
     * @param uaddress
     * @param uname
     * @param reserveBeginTime
     * @param reserveEndTime
     * @param uphone
     * @return
     */
    @RequestMapping("/toYuDingChaShuJu")
    public Map yuDingChaShuJu(String rserial,String uidcard,String uaddress,String uname,String reserveBeginTime,String reserveEndTime,String uphone){
        User user=new User();
        Room room=new Room();
        Reserve reserve=new Reserve();

        String aa=rserial.substring(0,3);
        System.out.println("aa="+aa);

        user.setUname(uname);
        user.setUidcard(DESUtil.encryptBasedDes(uidcard));
        user.setUphone(DESUtil.encryptBasedDes(uphone));
        user.setUaddress(uaddress);

        room.setRserial(rserial);       //room表根据房间号改变房间的状态


        User user2=userService.selectAllByIdCard(user);
        User user3=new User();
        if (user2!=null){
            room.setUser(user2);
            roomService.updateRoomRstatusAndUidYuDing(room);    //修改房间的状态和添加uid
        }else {
            userService.insertUserZhuFang(user);    //如果查的user为空就向user表中添加住房的数据
            user3=userService.selectAllByIdCard(user);  //添加后再查出来所有，主要查UID
            room.setUser(user3);
            roomService.updateRoomRstatusAndUidYuDing(room);    //修改房间的状态
        }

       User user1=userService.selectAllByIdCard(user);      //根据姓名去查询对应的所有，此处用来查id

       Room room1= roomService.selectAllByRserial(room);   //根据房间号查对应的所有
        reserve.setUser(user1);
        reserve.setRoom(room1);
        reserve.setReserveBeginTime(reserveBeginTime);
        reserve.setReserveEndTime(reserveEndTime);
        int result= reserveService.insertReserveYuDing(reserve);

        Map map=new HashMap();
        String msg="";
        if (result>0){
            msg="1";        //等于1时为成功
        }else {
            msg="2";        //等于2时失败
        }
        msg="1";
        map.put("msg",msg);
        return map;
    }

    @RequestMapping("/jiezhang")
    public Map jiezhang(HttpSession session) {
        Map map = (Map) session.getAttribute("jiezhang");
        return map;
    }


    /**
     * 结账页面加载就执行的方法
     *
     * @param recordId
     * @param rid
     * @return
     */
    @RequestMapping("/tuiRoom/{recordId}/{rid}")
    public ModelAndView tuiRoom(@PathVariable("recordId") int recordId, @PathVariable("rid") int rid, HttpSession session) {
        System.out.println("recordId===" + recordId);
        System.out.println("rid===" + rid);
        Map map = new HashMap();
        Roomrecord roomrecord = new Roomrecord();
        roomrecord.setRecordId(recordId);
        Roomrecord roomrecord1 = roomrecordService.selectAllRoomRecordById(roomrecord);       //查出了日期
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        String endTime = roomrecord1.getRecordStart();
        String beginTime = sdf.format(date);

        try {
            Date begin = sdf.parse(beginTime);
            Date end = sdf.parse(endTime);
            long fristBegin = begin.getTime();
            long secondEnd = end.getTime();

            long aa = fristBegin - secondEnd;
            //毫秒转化为秒
            double totalSeconds = aa / 1000;
            int time = (int) Math.ceil(totalSeconds / 60 / 60 / 24); //住了多少天，按小时计算
            int time2 = (int) Math.ceil(totalSeconds / 60 / 60); //住了多少小时，按小时计算
            Room room = roomService.selectAllRoomById(rid);
            Double money = room.getRprice();        //房间每日价钱
            Double mm = time * money;

            session.setAttribute("rid", rid);
            session.setAttribute("recordId", recordId);
            session.setAttribute("time", time);
            session.setAttribute("time2", time2);
            session.setAttribute("dayMoney", money);
            session.setAttribute("mm", mm);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ModelAndView("H-ui.admin/tuiRoomOpen");
    }


    /**
     * 退房时修改订单表和房间表
     *
     * @param recordMoney
     * @param session
     * @return
     */
    @RequestMapping("/toSettleAccounts")
    public List toSettleAccounts(Double recordMoney, HttpSession session) {
        List ls = new ArrayList();
        Roomrecord roomrecord = new Roomrecord();
        Room room = new Room();
        int recordId = (int) session.getAttribute("recordId");
        int rid = (int) session.getAttribute("rid");
        roomrecord.setRecordId(recordId);
        roomrecord.setRecordMoney(recordMoney);
        roomrecordService.updateChenkOutTuiRecordEndAndStateAndMoney(roomrecord);       //修改roomrecord订单表中的数据

        room.setRid(rid);
        roomService.updateRoomUidAndRstateByRid(room);      //根据id修改room房间表中的状态

        /**
         * 销毁session
         */
        session.removeAttribute("rid");
        session.removeAttribute("recordId");
        session.removeAttribute("time");
        session.removeAttribute("time2");
        session.removeAttribute("dayMoney");
        session.removeAttribute("mm");
        return ls;
    }

    /**
     * 前往正在入住的页面
     *
     * @return
     */
    @RequestMapping("/toCheckInRoom")
    public ModelAndView toCheckInRoom() {
        return new ModelAndView("H-ui.admin/checkInRoom");
    }

    /**
     * 前往已退出的页面
     *
     * @return
     */
    @RequestMapping("/toCheckOutRoom")
    public ModelAndView toCheckOutRoom() {
        return new ModelAndView("H-ui.admin/checkOutRoom");
    }


}

