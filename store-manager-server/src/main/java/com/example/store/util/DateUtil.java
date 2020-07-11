package com.example.store.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class DateUtil {
    private final List<String> thisMonth = new ArrayList<String>();
    private final List<String> thisYear = new ArrayList<String>();
    private final List<String> thisDay = new ArrayList<String>();
    private final List<String> lastMonth = new ArrayList<String>();
    private final List<String> lastYear = new ArrayList<String>();
    private final List<String> lastDay = new ArrayList<String>();

    public DateUtil() {
        setMonth();
        setYear();
        setDay();
    }
    private void setYear() {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        for (int j = 0; j < 2; j++) {
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.YEAR, -j);

            cal.set(Calendar.HOUR_OF_DAY, 0);
            cal.set(Calendar.MINUTE, 0);
            cal.set(Calendar.SECOND, 0);
            cal.set(Calendar.DAY_OF_MONTH, 1);
            for (int i = 0; i <= 12; i++) {
                cal.set(Calendar.MONTH, i);
                String date = df.format(cal.getTime());
                if (j == 0) {
                    this.thisYear.add(date);
                } else {
                    this.lastYear.add(date);
                }

            }
        }

    }

    private void setMonth() {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for (int j = 0; j < 2; j++) {
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.MONTH, -j);
            cal.set(Calendar.HOUR_OF_DAY, 0);
            cal.set(Calendar.MINUTE, 0);
            cal.set(Calendar.SECOND, 0);
            int maxDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
            for (int i = 1; i <= maxDay + 1; i++) {
                cal.set(Calendar.DAY_OF_MONTH, i);
                if (j == 0) {
                    this.thisMonth.add(df.format(cal.getTime()));
                }else{
                    this.lastMonth.add(df.format(cal.getTime()));
                }
            }
        }
    }

    private void setDay() {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for (int j = 0; j < 2; j++) {
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.DAY_OF_MONTH, -j);
            cal.set(Calendar.MINUTE, 0);
            cal.set(Calendar.SECOND, 0);
            int maxHour = cal.getActualMaximum(Calendar.HOUR_OF_DAY);
            for (int i = 0; i <= maxHour + 1; i++) {
                cal.set(Calendar.HOUR_OF_DAY, i);
                if (j == 0) {
                    this.thisDay.add(df.format(cal.getTime()));
                }else{
                    this.lastDay.add(df.format(cal.getTime()));
                }
            }
        }
    }


    public List<String> getThisMonth() {
        return thisMonth;
    }

    public List<String> getThisYear() {
        return thisYear;
    }

    public List<String> getThisDay() {
        return thisDay;
    }

    public List<String> getLastMonth() {
        return lastMonth;
    }

    public List<String> getLastYear() {
        return lastYear;
    }

    public List<String> getLastDay() {
        return lastDay;
    }
}
