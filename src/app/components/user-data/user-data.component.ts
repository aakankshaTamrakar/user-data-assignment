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
  public isEntryVisible :boolean;
  selectedUser: IUserdata | null = null;

  domains: string[] = [];
  genders: string[] = [];

  selectedDomain: string = '';
  selectedGender: string = '';

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
      this.extractDomainsAndGenders();
    });
  }

  private extractDomainsAndGenders(): void {
    // Extract unique domains and genders from the user data
    this.domains = Array.from(new Set(this.userRecord.map((user) => user.domain)));
    this.genders = Array.from(new Set(this.userRecord.map((user) => user.gender)));
  }
  
  applyFilters(): void {
    // Filter users based on selected domain and gender
    this.userService.getUserDataFromJson().subscribe((data:IUserdata[]) => {
      this.userRecord = data.filter(
        (user) =>
          (!this.selectedDomain || user.domain === this.selectedDomain) &&
          (!this.selectedGender || user.gender === this.selectedGender)
      );
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
