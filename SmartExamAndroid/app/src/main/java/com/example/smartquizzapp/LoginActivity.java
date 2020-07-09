package com.example.smartquizzapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.smartquizzapp.model.Prof;
import com.scanlibrary.retrofit.INode;
import com.scanlibrary.retrofit.RetrofitClient;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;
import retrofit2.Retrofit;

public class LoginActivity extends AppCompatActivity {
    INode myapi;
    SharedPreferences sharedPref ;
    static Prof uu = new Prof();

    CompositeDisposable compositeDisposable=new CompositeDisposable();
    EditText email,password;
    Button btnlog;

    @Override
    protected void onDestroy() {
        compositeDisposable.clear();
        super.onDestroy();

    }

    @Override
    protected void onStop() {
        compositeDisposable.clear();
        super.onStop();

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_login);

        Retrofit retrofit= RetrofitClient.getInstance();
        myapi=retrofit.create(INode.class);

        email=findViewById(R.id.etLogGmail);
        password=findViewById(R.id.etLoginPassword);
        btnlog=findViewById(R.id.btnLogin);
        sharedPref = getSharedPreferences("shL",0);
        String LogiSa = sharedPref.getString("email","");

        if (!LogiSa.equals("")){
            Intent intent = new Intent(getApplicationContext(), AcceuilActivity.class);

            startActivity(intent);
        }


        btnlog.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                compositeDisposable.add(myapi.loginUser(email.getText().toString(),password.getText().toString()).subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread()).subscribe(new Consumer<String>() {
                    @Override
                    public void accept(String s) throws Exception {
                        System.out.println(s);

                        if(s.contains("encrypted_password")){

                            Toast.makeText(LoginActivity.this,"login with succes",Toast.LENGTH_LONG).show();
                            Intent i = new Intent(LoginActivity.this, AcceuilActivity.class);
                            startActivity(i);
                            uu =changeStringUser(s);
                            sharedPref = getApplicationContext().getSharedPreferences("shL",0);

                            SharedPreferences.Editor editor = sharedPref.edit();


                            editor.putInt("id",uu.getId());

                            editor.putString("email",uu.getEmail());
                            editor.putString("nom",uu.getName());
                            editor.putString("tel",uu.getNumtel());
                            editor.putString("adr",uu.getAdresse());
                            editor.putString("mdp",uu.getEncrypted_password());
                            editor.commit();

                        }
                        else {
                            Toast.makeText(LoginActivity.this,"login with wrong",Toast.LENGTH_LONG).show();
                        }
                    }
                }));
            }
        });
    }
    private Prof changeStringUser(String s){
        Prof uu = new Prof();
        uu.setId(Integer.parseInt(s.substring(s.indexOf(":")+1,s.indexOf(","))));
        s=s.substring(s.indexOf(",")+1);

        uu.setEmail(s.substring(s.indexOf(":")+2,s.indexOf(",")-1));
        s=s.substring(s.indexOf(",")+1);

        uu.setName(s.substring(s.indexOf(":")+2,s.indexOf(",")-1));
        s=s.substring(s.indexOf(",")+1);



        return uu;
    }

}
