package com.example.hotel.util;

import org.apache.tomcat.util.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import java.security.SecureRandom;


public class DESUtil {


    private final static String DES = "DES";

    private static final byte[] DES_KEY = { 21, 1, -110, 82, -32, -85, -128, -65 };

    /**
     * 加密
     * @param data
     * @return
     */
    public static String encryptBasedDes(String data) {
        String encryptedData = null;
        try {
            // DES算法要求有一个可信任的随机数源
            SecureRandom sr = new SecureRandom();
            DESKeySpec deskey = new DESKeySpec(DES_KEY);

            // 创建一个密匙工厂，然后用它把DESKeySpec转换成一个SecretKey对象
            SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(DES);
            SecretKey key = keyFactory.generateSecret(deskey);
            // 加密对象
            Cipher cipher = Cipher.getInstance(DES);

            //用密钥初始化Cipher对象
            cipher.init(Cipher.ENCRYPT_MODE, key, sr);

            // 加密，并把字节数组编码成字符串
            encryptedData = Base64.encodeBase64String((cipher.doFinal(data.getBytes())));

        } catch (Exception e) {
            throw new RuntimeException("加密错误，错误信息：", e);
        }
        return encryptedData;
    }




    /**
     * 数据解密，算法（DESUtil）
     *
     * @param cryptData
     *            加密数据
     * @return 解密后的数据
     */
    public static String decryptBasedDes(String cryptData) {
        String decryptedData = null;
        try {
            // 生成一个可信任的随机数源
            SecureRandom sr = new SecureRandom();

            //从原始密钥数据创建DESKeySpec对象
            DESKeySpec deskey = new DESKeySpec(DES_KEY);

            // 创建一个密匙工厂，然后用它把DESKeySpec转换成一个SecretKey对象
            SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(DES);
            SecretKey key = keyFactory.generateSecret(deskey);

            // 解密对象
            Cipher cipher = Cipher.getInstance(DES);

            //用密钥初始化Cipher对象
            cipher.init(Cipher.DECRYPT_MODE, key, sr);

            // 把字符串解码为字节数组，并解密
            decryptedData = new String(cipher.doFinal(Base64.decodeBase64(cryptData)));

        } catch (Exception e) {
            throw new RuntimeException("解密错误，错误信息：", e);
        }
        return decryptedData;
    }
}