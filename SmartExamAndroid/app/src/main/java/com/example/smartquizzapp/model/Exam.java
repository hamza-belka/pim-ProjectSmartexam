package com.example.smartquizzapp.model;


import com.google.gson.annotations.SerializedName;

import java.util.Date;


public class Exam {
    @SerializedName("idex")
    private int examid;
    @SerializedName("matiere")
    private String examname;
    @SerializedName("date")
    private Date examdate;
    @SerializedName("idmodule")
    private int idmodule;
    @SerializedName("idens")
    private int  idens;
    @SerializedName("idclass")
    public int idcl;

    public Exam() {
    }

    public Exam(int examid, String examname, Date examdate, int idmodule, int idens, int idclass) {
        this.examid = examid;
        this.examname = examname;
        this.examdate = examdate;
        this.idmodule = idmodule;
        this.idens = idens;
        this.idcl = idclass;
    }

    @Override
    public String toString() {
        return "Exam{" +
                "examid=" + examid +
                ", examname='" + examname +
                ", examdate=" + examdate +
                ", idmodule=" + idmodule +
                ", idens=" + idens +
                ", idcl=" + idcl +
                '}';
    }

    public int getExamid() {
        return examid;
    }

    public void setExamid(int examid) {
        this.examid = examid;
    }

    public String getExamname() {
        return examname;
    }

    public void setExamname(String examname) {
        this.examname = examname;
    }

    public Date getExamdate() {
        return examdate;
    }

    public void setExamdate(Date examdate) {
        this.examdate = examdate;
    }

    public int getIdmodule() {
        return idmodule;
    }

    public void setIdmodule(int idmodule) {
        this.idmodule = idmodule;
    }

    public int getIdens() {
        return idens;
    }

    public void setIdens(int idens) {
        this.idens = idens;
    }

    public int getIdcl() {
        return idcl;
    }

    public void setIdcl(int idcl) {
        this.idcl = idcl;
    }
}
