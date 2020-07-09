package com.example.smartquizzapp;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.widget.ImageView;

import com.example.smartquizzapp.retrofit.INode;
import com.example.smartquizzapp.retrofit.Retrofits;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RetriveImage extends AppCompatActivity {
    INode myAPI;
    String name;
    int idexxx;
    private INode getAPI() {
        return Retrofits.getInstance().create(INode.class);

    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_retrive_image);

        myAPI =getAPI();
        getExamen();

    }
    public void getExamen(){
        name= getIntent().getStringExtra("name");
        idexxx= getIntent().getIntExtra("idex",0);
        System.out.println("name"+name +"id"+idexxx);

        Call<ResponseBody> call = myAPI.getImage("DOC-sujet.pdf",idexxx+name);
        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.isSuccessful()) {
                    if (response.body() != null) {
                        // display the image data in a ImageView or save it
                        Bitmap bmp = BitmapFactory.decodeStream(response.body().byteStream());
                        ImageView imgg= (ImageView)findViewById(R.id.imagholder);
                        imgg.setImageBitmap(bmp);

                        System.out.println(imgg +"image*************");
                    } else {
                        System.out.println("fuck");
                        // TODO
                    }
                } else {

                }}

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                // TODO
            }
        });





}}
