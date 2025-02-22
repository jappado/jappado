package com.hakaton.jappadoBackend.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerUtil {
    private static final LoggerUtil INSTANCE = new LoggerUtil();

    // Logger 객체
    private final Logger logger;

    // 생성자를 private으로 설정하여 외부에서 인스턴스 생성 불가
    private LoggerUtil() {
        this.logger = LoggerFactory.getLogger(LoggerUtil.class);
    }

    // 싱글턴 인스턴스를 가져오는 메서드
    public static LoggerUtil getInstance() {
        return INSTANCE;
    }

    // INFO 로그
    public void info(String message, Object... args) {
        logger.info(message, args);
    }
}
