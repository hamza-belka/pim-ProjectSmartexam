package com.example.smartquizzapp.model;

import com.google.gson.annotations.SerializedName;

public class Module {
    @SerializedName("id")
    private int id;
    @SerializedName("modulename")
    private String libellemodule;

    public Module(int id, String libellemodule) {
        this.id = id;
        this.libellemodule = libellemodule;
    }

    @Override
    public String toString() {
        return "Module{" +
                "id=" + id +
                ", libellemodule='" + libellemodule + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLibellemodule() {
        return libellemodule;
    }

    public void setLibellemodule(String libellemodule) {
        this.libellemodule = libellemodule;
    }
}
