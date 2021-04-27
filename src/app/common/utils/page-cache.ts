export class PageCache {
  public static initCache(key: string, value: object) {
    if (PageCache.itemExist(key)) {
      console.log('key [%s] 已存在，本次不更新缓存', key);
      return;
    }
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public static setLocalStorageCache(key: string, value: object) {
    // if(PageCache.itemExist(key)){
    //     console.log('key [%s] 已存在，本次不更新缓存', key);
    //     return;
    // }
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getItemFromLocalStorage(key: string): any {
    // if(PageCache.itemExist(key)){
    //     console.log('key [%s] 已存在，本次不更新缓存', key);
    //     return;
    // }
    return JSON.parse(sessionStorage.getItem(key) || null);
  }

  /**
   * @description
   * 获取指定key的整个缓存对象
   *
   * @param key 缓存对象key
   *
   * @returns cache object | null
   *
   * @usageNotes
   *
   * Example:
   * let cacheObj = PageCache.getItem("key");
   * if(cacheObj){
   *  //TODO
   * }
   *
   */
  public static getItem(key: string): object | null {
    if (key) {
      return JSON.parse(sessionStorage.getItem(key) || null);
    } else {
      return null;
    }
  }

  /**
   * @description
   * 更新指定key的整个缓存对象
   *
   * @param key 缓存对象key，不存在该key的时候自动新建
   *
   * @param value 缓存对象
   *
   * @usageNotes
   *
   * Example:
   * let newCacheObj = {"field1": field1Value, "field2": field2Value};
   * PageCache.updateCache("key", newCacheObj);
   *
   */
  public static updateCache(key: string, value: object) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * @description
   * 更新指定key缓存对象的字段值，指定key缓存对象不存在的情况会自动创建
   * 缓存对象结构如let key = {field1: field1Value, field2: field2Value}
   *
   * @param key 指定要更新的缓存对象key
   *
   * @param field 要更新的字段名称
   *
   * @param field_value 新的值：可以是简单类型也可以是对象
   *
   * @usageNotes
   *
   * Example:
   * PageCache.updateItemField("key", "name", "张三");
   *
   */
  public static updateItemField(key: string, field: string, field_value: any) {
    if (!PageCache.itemExist(key)) {
      PageCache.updateCache(key, {});
    }
    let condition = PageCache.getItem(key);
    if (condition) {
      condition[field] = field_value;
      PageCache.updateCache(key, condition);
    }
  }

  /**
   * @description
   * 获取指定key指定field的值
   *
   * @param key 缓存对象key
   *
   * @param field 要获取值的的字段名称
   *
   * @returns 有指定的key则返回值 | null
   *
   * @usageNotes
   *
   * Example:
   * PageCache.getFieldValue("key", "field_name");
   *
   */
  public static getFieldValue(key: string, field: string): any {
    let fieldVal = null;
    if (PageCache.itemExist(key) && PageCache.getItem(key)[field]) {
      fieldVal = PageCache.getItem(key)[field];
    }
    return fieldVal;
  }

  /**
   * @description
   * 判定指定的key在缓存中是否存在
   *
   * @param key 缓存对象key
   *
   * @returns true | false
   *
   * @usageNotes
   *
   * Example:
   * let exist = PageCache.itemExist("key");
   * if(exist){
   *  //TODO
   * }
   *
   */
  public static itemExist(key: string): boolean {
    // let condition = PageCache.getItem(key);
    return  !!PageCache.getItem(key);
  }
}
