package com.example.smartquizzapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;


import com.example.smartquizzapp.model.Exam;

import java.util.List;


public class Adaptetrlistexam  extends RecyclerView.Adapter<Adaptetrlistexam.MyViewHolder> {
    List<Exam> personList;
    private Context mContext;
     SharedPreferences shPref;

    public Adaptetrlistexam(List<Exam> personList, Context context) {

        this.personList =  personList;
        this.mContext = context;
    }

    public void setMovieList(List<Exam> personList) {
        this.personList = personList;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public Adaptetrlistexam.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.singlrowexamen,parent,false);
        return new Adaptetrlistexam.MyViewHolder(itemView);
    }



    @Override
    public void onBindViewHolder(@NonNull final MyViewHolder holder, int position) {
        holder.exname.setText(personList.get(position).getExamname());
        holder.examdate.setText(personList.get(position).getExamdate().toString());
        holder.ids = personList.get(position).getExamid();
        holder.idclass = personList.get(position).getIdcl();
        holder.idm = personList.get(position).getIdmodule();
        holder.nameex = personList.get(position).getExamname();
        holder.dateex = personList.get(position).getExamdate().toString();
holder.idex=personList.get(position).getExamid();


        //  holder.btn.setText(personList.get(position).getNumtel());









            }





    @Override
    public int getItemCount() {
        return personList.size();
    }

    public class MyViewHolder extends RecyclerView.ViewHolder {

        public TextView exname,examdate;
        public Button btn;
        public int ids;
        public int idm;
        public int idclass;
        public String nameex;
        public String dateex;
        public int idex;


        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            exname=itemView.findViewById(R.id.nameex);
            examdate=itemView.findViewById(R.id.date);
            btn=itemView.findViewById(R.id.btn);

            btn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent i = new Intent(v.getContext(), ExDetails.class);
                    //i.putExtra("idex",ids);
                    i.putExtra("idc",idclass);
                    i.putExtra("idm",idm);
                    i.putExtra("date",dateex);
                    i.putExtra("name",nameex);
                    i.putExtra("idex",idex);
                    v.getContext().startActivity(i);
                }
            });

        }


          /*  itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(v.getContext(), DetailoffreActivity.class);
                    intent.putExtra("idS",ids);

                    v.getContext().startActivity(intent);
                }
            });
        }*/
    }
}