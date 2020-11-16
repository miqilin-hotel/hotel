package com.example.hotel.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {
    @RequestMapping("/qiantai/index")
    public ModelAndView login(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/qiantai/index");
        return modelAndView;
    }
    @RequestMapping("/H-ui.admin/index")
    public ModelAndView welcome(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/H-ui.admin/index");
        return modelAndView;
    }

}
