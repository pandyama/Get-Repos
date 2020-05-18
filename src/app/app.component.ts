import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {MatTable} from '@angular/material/table';

export interface GitRepos{
  name: string,
  description: string,
  url: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild(MatTable) table: MatTable<GitRepos>;

  title = 'getrepos';
  value: string;

  result: any;

  dataSource: any;

  //dataSource = new MatTableDataSource<GitRepos[]>();

  displayedColumns: string[] = ['Repo', 'Description', 'Link'];

  constructor(private http: HttpClient){}

  ngOnInit(): void{
  }

  getRepo(){
    return this.http.get('http://localhost:3100/gitusers',{
      headers: {user: this.value}
    })
      .subscribe(res => {
        this.dataSource = [];
        let i = 0;
        this.result = [];

        while(res[i] != null){
          let test: GitRepos = {
            name: '',
            description: '',
            url: ''
          };

          test.name = res[i].name;
          test.description = res[i].description;
          test.url = res[i].svn_url;
          this.result.push(test);

          i++;
        }

        this.dataSource = new MatTableDataSource(this.result);

        this.dataSource.data = this.result;

        //this.dataSource = this.result;
        console.log(this.dataSource);
        /**
         * Fields
         * - name
         * - description
         * - url
         * 
         */

      })
  }

  onEnter(val: string){
    this.value = val;
    this.getRepo();
  }
}
