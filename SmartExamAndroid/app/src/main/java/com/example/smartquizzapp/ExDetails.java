package com.example.smartquizzapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.smartquizzapp.model.Classs;
import com.example.smartquizzapp.model.Exam;
import com.example.smartquizzapp.model.Module;
import com.example.smartquizzapp.retrofit.INode;
import com.example.smartquizzapp.retrofit.Retrofits;
import com.scanlibrary.ScanActivity;
import com.scanlibrary.ScanConstants;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ExDetails extends AppCompatActivity {
    INode myAPI;
    List<Exam> lus = new ArrayList<>();
    Module module;
    Classs classs;
    SharedPreferences sharedPref;


    int idS;
    int idc;
    int idm;
    String name;
    String date;
    String idexx;
    ImageView cor;
    private INode getAPI() {
        return Retrofits.getInstance().create(INode.class);

    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ex_details);
        sharedPref = getSharedPreferences("shL",0);
        myAPI =getAPI();
        idS= getIntent().getIntExtra("idex",0);
        idm= getIntent().getIntExtra("idm",0);
        idc= getIntent().getIntExtra("idc",0);
        name= getIntent().getStringExtra("name");
        date= getIntent().getStringExtra("date");

        String ch =idexx+name;
        System.out.println(ch+"************************");
        System.out.println("idm ="+idc);
        getExamenModule(idm);
        getClasss(idc);
        System.out.println(idc+"idc");
        System.out.println("name"+name);
        cor=findViewById(R.id.scan);

        TextView namex =findViewById(R.id.matiere);
        namex.setText(name);
        TextView modulle =findViewById(R.id.module);
        TextView datee=findViewById(R.id.date);
        datee.setText(date);
      //  TextView classs=findViewById(R.id.classname);



    }
    public void affexal(View view){

        Intent i = new Intent(this, RetriveImage.class);

        i.putExtra("name",name);
        i.putExtra("idex",idS);

        startActivityForResult(i,0);

    }

    public void opencamera(View view){


        int REQUEST_CODE = 99;
        int preference = ScanConstants.OPEN_CAMERA;
        Intent intent = new Intent(this, ScanActivity.class);
        intent.putExtra(ScanConstants.OPEN_INTENT_PREFERENCE, preference);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("ids",null);
        editor.commit();


        editor.putString("ids",idS+name);
        System.out.println("hello :"+idS+name);
        editor.commit();

        startActivityForResult(intent, REQUEST_CODE);

    }
    public void getExamenModule(int id ){
        Call<Module> call = myAPI.getmodule(id);

        call.enqueue(new Callback<Module>() {
            @Override
            public void onResponse(Call<Module> call, Response<Module> response) {


                System.out.println("respons"+response.body());
                TextView modulle =findViewById(R.id.module);
                modulle.setText(response.body().getLibellemodule());



            }

            @Override
            public void onFailure(Call<Module> call, Throwable t) {
                Log.d("TAG", "Response = " + t.toString());
            }
        });
    }
    public void getClasss(int id ){
        Call<Classs> call = myAPI.getclasss(id);

        call.enqueue(new Callback<Classs>() {
            @Override
            public void onResponse(Call<Classs> call, Response<Classs> response) {


                System.out.println("respons"+response.body());
                TextView classs =findViewById(R.id.classname);
                classs.setText(response.body().getClasslibelle());
                System.out.println(response.body().getClasslibelle());



            }

            @Override
            public void onFailure(Call<Classs> call, Throwable t) {
                Log.d("TAG", "Response = " + t.toString());
            }
        });
    }
    public void getModule(int id ){}

}
