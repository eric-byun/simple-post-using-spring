package com.simple.board.util;

import java.security.MessageDigest;

public class PasswordUtil {

  public static String SHA256Encrypt(String password){
    StringBuffer hexString = new StringBuffer();

    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hash = digest.digest(password.getBytes("UTF-8"));


      for(int i=0; i < hash.length; i++){
        String hex = Integer.toHexString(0xff & hash[i]);
        if(hex.length() == 1) hexString.append('0');

        hexString.append(hex);
      }

    } catch(Exception e){
      throw new Error("SHA256Encrypt : 암호화 실패하였습니다.");
    }
    return hexString.toString().toUpperCase();
  }


}
