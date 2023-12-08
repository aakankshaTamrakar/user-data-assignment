import { Component } from '@angular/core';
import { IUserdata } from 'src/app/model/userdata';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {
  public userRecord: IUserdata[];
  public searchText!: string;
  selectedUser: IUserdata | null = null;
  public isEntryVisible :boolean;

  pageSize = 20;
  currentPage = 1;

  getUser(): IUserdata[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.userRecord.slice(startIndex, startIndex + this.pageSize);
  }

  setPage(page: number): void {
    this.currentPage = page;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.userRecord.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  constructor(public userService: UserService){
    this.userRecord = [];
    this.isEntryVisible= false;
  }

  public ngOnInit():void{
    this.userService.getUserDataFromJson().subscribe((data:IUserdata[]) => {
      this.userRecord = data;
    });
  }

  showDetails(user: IUserdata): void {
    this.selectedUser = user;
    this.isEntryVisible= true;
  }
  
  // public showEntry(){
  //   this.isEntryVisible= true;
  // }

  public hideEntry(){
    this.isEntryVisible= false;
  }

}
