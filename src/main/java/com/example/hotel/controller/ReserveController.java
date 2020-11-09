package com.example.hotel.controller;

import com.example.hotel.entity.Reserve;
import com.example.hotel.entity.Room;
import com.example.hotel.entity.User;
import com.example.hotel.service.ReserveService;
import com.example.hotel.service.RoomService;
import com.example.hotel.service.RoomrecordService;
import com.example.hotel.service.UserService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//@RequestMapping("/reserve")
@RequestMapping(value = "reserve", method = RequestMethod.GET)
public class ReserveController {

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
     * 遍历出预定房间
     * @return
     */

    @RequestMapping("/bianLiYuDingRoom")
    public Map bianLiYuDingRoom(){
        Room room=new Room();
        User user=new User();
        List<Reserve> reserveList= reserveService.selectAllReserveYuDing();
//        for (Reserve r : reserveList) {
//            System.out.println("a="+r.getUser().getUid());
//            user=userService.selectAllUserById(r.getUser());
//            r.setUser(user);
//            room=roomService.selectAllRoomById(r.getRoom().getRid());
//            r.setRoom(room);
//        }

        for (int i = 0; i <reserveList.size() ; i++) {
//            System.out.println("aaaaaaaaaaa="+reserveList.size());
            user=userService.selectAllUserById(reserveList.get(i).getUser());
            reserveList.get(i).setUser(user);
            room=roomService.selectAllRoomById(reserveList.get(i).getRoom().getRid());
            reserveList.get(i).setRoom(room);
        }
//
//        for (Reserve r:
//             reserveList) {
//            System.out.println("bbbbbbbbbbbbbbb="+r.getUser().getUidcard());
//        }
        Map map=new HashMap();
        map.put("reserve",reserveList);
        return map;
    }


    /**
     * 去预定页面
     * @return
     */
    @RequestMapping("/toYuDing")
    public ModelAndView toYuDing(){
        return new ModelAndView("/H-ui.admin/toYuDing");
    }
}
