package com.edutech.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import net.bytebuddy.agent.builder.AgentBuilder.LocationStrategy.Simple;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("OTP Verification");
        message.setText("Hello\n\nYour OTP for Let me Dine Restaurant registration is: "+ otp+"\n\nThis OTP is valid for 5 minutes\n\nDo not share this code with anyone.\n\n-Let me Dine");

        mailSender.send(message);
    }


    // public void sendResetPasswordEmail(String toEmail, String resetLink){
    //     SimpleMailMessage message = new SimpleMailMessage();
    //     message.setTo(toEmail);
    //     message.setSubject( "Reset Your password");
    //     message.setText( "Click the link below to reset your password:\n\n" + 
    //         resetLink + "\n\nThis link will expire in 15 minutes"+
    //         "\n\nIf you did not request password reset, ignore this email" + "\n\n-Let me Dine"
    //     );

    //     mailSender.send(message);
    // }


}