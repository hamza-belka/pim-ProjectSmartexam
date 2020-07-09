package com.example.smartquizzapp.model;

import com.google.gson.annotations.SerializedName;

public class Prof {
    @SerializedName("id")
    private int id;
    @SerializedName("email")

    private String email;
    @SerializedName("name")

    private String name;
    @SerializedName("username")



    private String encrypted_password;
    @SerializedName("salt")

    private String salt;
    @SerializedName("numtel")

    private String numtel;
    @SerializedName("adresse")

    private String adresse;

    public Prof() {
    }

    public Prof(int id, String email, String name,  String encrypted_password, String salt, String numtel, String adresse) {
        this.id = id;
        this.email = email;
        this.name = name;

        this.encrypted_password = encrypted_password;
        this.salt = salt;
        this.numtel = numtel;
        this.adresse = adresse;
    }

    @Override
    public String toString() {
        return "Prof{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +

                ", encrypted_password='" + encrypted_password + '\'' +
                ", salt='" + salt + '\'' +
                ", numtel='" + numtel + '\'' +
                ", adresse='" + adresse + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }





    public String getEncrypted_password() {
        return encrypted_password;
    }

    public void setEncrypted_password(String encrypted_password) {
        this.encrypted_password = encrypted_password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getNumtel() {
        return numtel;
    }

    public void setNumtel(String numtel) {
        this.numtel = numtel;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }
}
