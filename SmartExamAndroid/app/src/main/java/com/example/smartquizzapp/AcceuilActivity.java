package com.example.smartquizzapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import com.example.smartquizzapp.model.Module;
import com.example.smartquizzapp.retrofit.INode;
import com.example.smartquizzapp.retrofit.Retrofits;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AcceuilActivity extends AppCompatActivity {
    INode myAPI;
  private Toolbar toolbar;
    private INode getAPI() {
        return Retrofits.getInstance().create(INode.class);

    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_acceuil);
        Toolbar toolbar = findViewById(R.id.toolbar);
        toolbar.setLogo(R.drawable.ic_a);
        toolbar.setTitle("       MyExamen  ");
        setSupportActionBar(toolbar);






        Intent i = new Intent(this, Examenlist.class);
        startActivity(i);


        toolbar.setOnMenuItemClickListener(new Toolbar.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                SharedPreferences sp = getSharedPreferences("shL",0);
                sp.edit().clear().commit();
                Intent logout = new Intent(AcceuilActivity.this,LoginActivity.class);
                startActivity(logout);
                Toast.makeText(getApplicationContext(),"Deconnexion",Toast.LENGTH_SHORT).show();
                return true;
            }
        });

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu, menu);
        return true;

    }



}
