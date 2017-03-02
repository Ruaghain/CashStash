import { Injectable } from "@angular/core";
import { BaseService } from "../shared/base.service";
import { Http } from "@angular/http";

@Injectable()
export class AccountService extends BaseService {

  constructor(private http: Http) {
    super()
  }
}
