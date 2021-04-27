export class CommonUtils {

    /**
     * @param {object} obj1
     * @param {object} obj2
     * @description 比较两个给定对象属性值是否完全相等
     */
    public static ObjectPropertiesIsEqual(obj1: object, obj2: object): boolean {
        if(obj1 && obj2){
            var props1 = Object.getOwnPropertyNames(obj1);
            var props2 = Object.getOwnPropertyNames(obj2);
            if(props1.length != props2.length){
                return false;
            }
            for(let i=0;i<props1.length;i++){
                let propName = props1[i];
                if(obj1[propName] !== obj2[propName]){
                    return false;
                }
            }
            return true;
        }
        else{
            return false;
        }
    }
}
