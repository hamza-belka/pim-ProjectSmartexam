package com.example.smartquizzapp.retrofit;


import com.example.smartquizzapp.model.Classs;
import com.example.smartquizzapp.model.Exam;
import com.example.smartquizzapp.model.Module;

import java.util.List;

import io.reactivex.Observable;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Path;


public interface INode {

    @Multipart
    @POST("/upload")
    Call<ResponseBody> postImage(@Part MultipartBody.Part image, @Part("upload") RequestBody name);

    @POST("login")
    @FormUrlEncoded
    Observable<String> loginUser(@Field("email") String email,
                                 @Field("password") String password);

    @POST("/register")
    @FormUrlEncoded
    Observable<String> registerUser(

            @Field("email") String email,
            @Field("name") String name,
            @Field("password") String password,


            @Field("adresse") String adresse,

            @Field("numtel") String numtel


    );

    @GET("/uploads/{upload}/{place}/")

    Call<ResponseBody> getImage(@Path("upload") String n,@Path("place") String p);

    @GET("/getmodule/{f}")
    Call<Module> getmodule (@Path("f") int f);

    @GET("/getclass/{f}")
    Call<Classs> getclasss(@Path("f") int f);


    @GET("/getexamen/{f}")
    Call<List<Exam>> getexam(@Path("f") int f);

    @GET("/getexamenday/{f}")
    Call<List<Exam>> getexamday(@Path("f") int f);

}
