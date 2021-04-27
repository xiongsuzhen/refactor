import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/config';

import { Observable, of } from 'rxjs';
export interface DICITEM {
  create_time: string;
  create_user: null;
  dic_id: number;
  is_delete: number;
  item_code: string;
  item_id: number;
  item_name: string;
  item_sort_value: number;
  item_status: number;
}

export interface Warehouse {
  code: string;
  id: number;
  name: string;
  warehouse_id: number;
}
export interface Area {
  code: string;
  id: number;
  name: string;
  children: Array<{
    code: string;
    id: number;
    name: string;
    children: Warehouse[];
  }>;
}
@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  public codeList =
    '/dictionary/pub/v1/dictItem/dicItemList/codeList?codeList=';
  public area = '/warehouse/pub/v1/position/cascade/nouser';
  private baseUrl = config.api_url;
  constructor(private http: HttpClient) {}
  getCodeList(
    dicCode
  ): Observable<{ code: number; data: DICITEM[]; msg: 'success' | 'error' }> {
    return this.http.get<{
      code: number;
      data: DICITEM[];
      msg: 'success' | 'error';
    }>(this.baseUrl + this.codeList + dicCode);
  }

  getArea(): Observable<{
    code: number;
    data: Area[];
    msg: 'success' | 'error';
  }> {
    return this.http.get<{
      code: number;
      data: Area[];
      msg: 'success' | 'error';
    }>(this.baseUrl + this.area);
  }

  //  根据单位id获取单位名称
  returnUnitName(unit, unitList: DICITEM[]) {
    let unitName: string;
    unitList.forEach((element) => {
      if (element.item_id === unit) {
        unitName = element.item_name;
      }
    });
    if (unitName !== undefined) {
      return unitName;
    }
  }

  //  根据返回的区域id查询区域名字,
  returnWorkShopName(
    workshop_id,
    warehouse_id,
    position_id,
    data: Area[]
  ): string {
    let workshopName: string;
    let warehousName: string;
    let positionName: string;
    data.forEach((item) => {
      if (item.id === workshop_id) {
        workshopName = item.name;
        if (!!item.children && item.children.length > 0  ) {
          for (let i = 0; i < item.children['length']; i++) {
            if (item['children'][i]['id'] == warehouse_id) {
              warehousName = item['children'][i]['name'];
              if (item['children'][i]['children'] != undefined) {
                for (
                  let j = 0;
                  j < item['children'][i]['children']['length'];
                  j++
                ) {
                  if (item['children'][i]['children'][j]['id'] == position_id) {
                    positionName = item['children'][i]['children'][j]['name'];
                  }
                }
              }
            }
          }
        }
      }
    });
    if (!warehousName) {
      return workshopName;
    } else {
      if (!positionName) {
        return workshopName + '/' + warehousName;
      } else {
        return workshopName + '/' + warehousName + '/' + positionName;
      }
    }
  }
}
