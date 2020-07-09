package com.example.smartquizzapp.model;

import com.google.gson.annotations.SerializedName;

public class Classs {

    @SerializedName("id")
    private int id;
    @SerializedName("pseudoclass")
    private String classlibelle;

    public Classs(int id, String classlibelle) {
        this.id = id;
        this.classlibelle = classlibelle;
    }

    @Override
    public String toString() {
        return "Classs{" +
                "id=" + id +
                ", classlibelle='" + classlibelle + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getClasslibelle() {
        return classlibelle;
    }

    public void setClasslibelle(String classlibelle) {
        this.classlibelle = classlibelle;
    }
}
