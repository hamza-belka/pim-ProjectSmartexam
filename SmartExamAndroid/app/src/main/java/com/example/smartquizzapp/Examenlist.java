package com.example.smartquizzapp;

import androidx.appcompat.app.AppCompatActivity;

import androidx.appcompat.widget.Toolbar;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;


import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;


import com.example.smartquizzapp.model.Exam;
import com.example.smartquizzapp.model.Module;
import com.example.smartquizzapp.retrofit.INode;
import com.example.smartquizzapp.retrofit.Retrofits;

import java.util.ArrayList;
import java.util.List;

import io.reactivex.disposables.CompositeDisposable;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class Examenlist extends AppCompatActivity {
    private final String CHANNEL_ID="notfy";
    private  final  int NOTIFICAMATION_ID=001;
    private Toolbar toolbar;

    List<Exam> lus = new ArrayList<>();
    List<Exam> lus1 = new ArrayList<>();

    CompositeDisposable compositeDisposable =new CompositeDisposable();
    INode myAPI;
    String LogiSa;
    int id;
    SharedPreferences sh;
RecyclerView recyclerView;
Adaptetrlistexam adaptetrlistexam;
Button btn;

    private INode getAPI() {
        return Retrofits.getInstance().create(INode.class);

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_examenlist);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("       My Exams ");
        getSupportActionBar().setLogo(R.drawable.logo);
        final SharedPreferences sharedPref ;
        lus1 = new ArrayList<>();
        toolbar.setOnMenuItemClickListener(new Toolbar.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                SharedPreferences sp = getSharedPreferences("shL",0);
                sp.edit().clear().commit();
                Intent logout = new Intent(Examenlist.this,LoginActivity.class);
                startActivity(logout);
                Toast.makeText(getApplicationContext(),"Deconnexion",Toast.LENGTH_SHORT).show();
                return true;
            }
        });



        sharedPref = this.getApplicationContext().getSharedPreferences("shL",0);
        LogiSa = sharedPref.getString("log","a");
        id = sharedPref.getInt("id",0);
        System.out.println(id);
        myAPI =getAPI();

        getExamenDay(id);

        System.out.println("********************"+lus1.toString());




        lus = new ArrayList<>();

        recyclerView = (RecyclerView)findViewById(R.id.listexamen);
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        adaptetrlistexam = new Adaptetrlistexam(lus,getApplicationContext());
        recyclerView.setAdapter(adaptetrlistexam);
        btn=findViewById(R.id.btn);


        Call<List<Exam>> call = myAPI.getexam(id);

        call.enqueue(new Callback<List<Exam>>() {
            @Override
            public void onResponse(Call<List<Exam>> call, Response<List<Exam>> response) {
                lus = response.body();
                Log.d("TAG","Response = "+lus);
                adaptetrlistexam.setMovieList(lus);
                System.out.println(lus);





            }

            @Override
            public void onFailure(Call<List<Exam>> call, Throwable t) {
                Log.d("TAG","Response = "+t.toString());
            }
        });
    }
    public void getExamenDay(int id ){
        Call<List<Exam>> call = myAPI.getexamday(id);

        call.enqueue(new Callback <List<Exam>> () {
            @Override
            public void onResponse(Call<List<Exam>> call, Response<List<Exam>>  response) {


                System.out.println("respons***************"+response.body());
lus1=response.body();
notfify(lus1);


            }

            @Override
            public void onFailure(Call<List<Exam>> call, Throwable t) {
                Log.d("TAG", "Response = " + t.toString());
            }
        });
    }
    public  void  notfify(List<Exam> lus1){
        for (int i=0; i<lus1.size() ; i++) {
            System.out.println(lus1.get(i).toString()+"hhhhhhhhhhhhhhhhhhhhhhhhhhh");

            NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID);
            builder.setSmallIcon(R.drawable.ic_a);
            builder.setContentTitle("notif :"+lus1.get(i).getExamname());
            builder.setContentText("vous avez un examin programme pour demain  "+lus1.get(i).getExamdate());
            builder.setPriority(NotificationCompat.PRIORITY_DEFAULT);

            NotificationManagerCompat not =NotificationManagerCompat.from(this);
            not.notify(NOTIFICAMATION_ID,builder.build());
        }
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu, menu);
        return true;

    }
}
