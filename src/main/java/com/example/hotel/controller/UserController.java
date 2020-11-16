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
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 客户表 前端控制器
 * </p>
 *
 * @author lu
 * @since 2019-12-29
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    @Getter
    @Setter
    private RoomService roomService;
    @Resource
    @Getter
    @Setter
    private RoomrecordService roomrecordService;

    @Resource
    @Getter
    @Setter
    private UserService userService;

    @Resource
    @Getter
    @Setter
    private ReserveService reserveService;

    /**
     * 预定转入住
     * @param reserveId
     * @param session
     * @return
     */
    @RequestMapping("/yuDingClientRuZhu")
    public List yuDingClientRuZhu(int reserveId, HttpSession session) {
        User user1 = new User();

        /**
         * 根据reserveId查询所有
         */
        Reserve reserve = reserveService.selectReserveYuDingById(reserveId);
        /**
         *  根据reserveId查出来的uid去查询对应的user表中的所有
         */
        user1.setUid(reserve.getUser().getUid());
        User user = userService.selectAllUserById(user1);

        /**
         * 根据reserveId查出来的rid去改变room表中的状态
         */
        Room room = roomService.selectAllRoomById(reserve.getRoom().getRid());    //根据rid查对应的所有
        roomService.updateRoomRstatusAndUid(room);

        /**
         * 向roomrecord表中插入数据
         */
        Roomrecord roomrecord = new Roomrecord();
        roomrecord.setRoom(room);
        roomrecord.setUser(user);

        roomrecordService.insertRoomRecordRidAndUid(roomrecord);    //向roomrecord表中添加数据

        List ls=new ArrayList();
        return ls;

    }

    /**
     * 顾客入住
     *
     * @param user
     * @param session
     * @return
     */
    @RequestMapping("/clientRuZhu")
    public List clientRuZhu(User user, HttpSession session) {
        List ls = new ArrayList();
        Roomrecord roomrecord = new Roomrecord();
        Room room = new Room();
        String Phone = DESUtil.encryptBasedDes(user.getUphone());
        String idcard = DESUtil.encryptBasedDes(user.getUidcard());
        user.setUphone(Phone);
        user.setUidcard(idcard);
        User user2 = userService.selectAllByIdCard(user);

        if (user2 != null) {
            User user1 = userService.selectAllByUname(user);      //插入后再先得到uid
            int rid = (int) session.getAttribute("rid");        //再得到layui.open打开页面时存的rid

            room.setRid(rid);                           //把rid放进room
            room.setUser(user1);
            roomrecord.setUser(user1);
            roomrecord.setRoom(room);                      //把user和room对象存进roomrecord
            roomrecordService.insertRoomRecordRidAndUid(roomrecord);    //向roomrecord表中添加数据
//        roomrecordService.updateRecordState(roomrecord);            //传个id修改订单表中的状态
            roomService.updateRoomRstatusAndUid(room);          //修改room表中的房间状态
        } else {
            user.setUphone(Phone);
            user.setUidcard(idcard);
            userService.insertUserZhuFang(user);                //向数据库先插入住房人信息
            User user1 = userService.selectAllByUname(user);      //插入后再先得到uid
            int rid = (int) session.getAttribute("rid");        //再得到layui.open打开页面时存的rid

            room.setRid(rid);                           //把rid放进room
            room.setUser(user1);
            roomrecord.setUser(user1);
            roomrecord.setRoom(room);                      //把user和room对象存进roomrecord
            roomrecordService.insertRoomRecordRidAndUid(roomrecord);    //向roomrecord表中添加数据
//        roomrecordService.updateRecordState(roomrecord);            //传个id修改订单表中的状态
            roomService.updateRoomRstatusAndUid(room);          //修改room表中的房间状态
        }
        return ls;
    }

    /**
     * 主页入口
     *
     * @return
     */
    @RequestMapping("/toIndex")
    public ModelAndView toIndex() {
        return new ModelAndView("H-ui.admin/index.html");
    }

    /**
     * 欢迎页面入口
     *
     * @return
     */
    @RequestMapping("/toWelcome")
    public ModelAndView toWelcome() {
        return new ModelAndView("H-ui.admin/welcome.html");
    }

    /**
     * 查看所有员工入口
     *
     * @return
     */
    @RequestMapping("/toRoomgAudit")
    public ModelAndView toRoomgAudit() {
        return new ModelAndView("H-ui.admin/employee_audit.html");
    }


    /**
     * 顾客入住前遍历出未入住房间页面入口
     *
     * @return
     */
    @RequestMapping("/toArticele")
    public ModelAndView toArticele() {
        return new ModelAndView("H-ui.admin/clientCheckIn.html");
    }


    /**
     * 顾客入住入口
     *
     * @return
     */
    @RequestMapping("/occupancy_index/{rid}")
    public ModelAndView occupancy_index(@PathVariable("rid") int rid, HttpSession session) {
        session.setAttribute("rid", rid);
        return new ModelAndView("H-ui.admin/occupancy_index.html");
    }


    /**
     * 去退房页面
     *
     * @return
     */
    @RequestMapping("/toTuiRoom")
    public ModelAndView toTuiRoom() {
        return new ModelAndView("/H-ui.admin/tuiRoom");
    }

    /**
     * 去前台页面的主页（预定）
     *
     * @return
     */
    @RequestMapping("/toQianTaiIndex")
    public ModelAndView toQianTaiIndex() {
        return new ModelAndView("qiantai/index");
    }


}

