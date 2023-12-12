import { Pipe, PipeTransform } from '@angular/core';
import { IUserdata } from '../model/userdata';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: IUserdata[], searchText: string): IUserdata[] {
    if (!searchText) {
      return users;
    }

    searchText = searchText.toLowerCase();

    return users.filter(user =>
      user.first_name.toLowerCase().includes(searchText) ||
      user.last_name.toLocaleLowerCase().includes(searchText)
      // ||
      // user.gender.toLowerCase().includes(searchText) ||
      // user.domain.toLowerCase().includes(searchText) ||
      // user.available.toString().includes(searchText)
    );
  }

}
