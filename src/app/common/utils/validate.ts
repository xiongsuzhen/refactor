import { FormControl } from '@angular/forms';
export class Validate {
  public static validator = (
    regex: string,
    required: boolean,
    maxlength?: number,
    minlength?: number
  ) => (control: FormControl) => {
    let regex_express: any;
    if (regex == 'noBlanpace') {
      //不能输入空格
      regex_express = /^[a-zA-Z0-9\u4e00-\u9fa5`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]+$/;
    } else if (regex == 'min0Max100num') {
      //只能输入0~100的数字， 且小数点后最多有三位
      regex_express = /^(\d{1,2}(\.\d{1,3})?|100)$/;
    } else if (regex == 'positiveIntNoZero') {
      //只能输入大于0的整数
      regex_express = /^[1-9]\d*$/;
    } else if (regex == 'noBlanpaceAll') {
      //不能全部输入空格
      regex_express = /^(?=.*\S).+$/;
    } else if (regex == 'noSpecialChars') {
      //不能输入/,\,?,*,[,]
      regex_express = /^[^\[\]\?\/\*\:\\]*$/;
    } else if (regex == 'positiveInt') {
      //只能输入大于等于0的正整数
      regex_express = /^[0-9]\d*$/;
    } else if (regex == 'min100max100int') {
      //只能输入1到100的整数
      regex_express = /^([1-9][0-9]{0,1}|100)$/;
    } else if (regex == 'min0num') {
      regex_express = /^[+]?\d+(.\d+)?$/;
    } else if (regex === 'pallet') {
      regex_express = /^[1-9]$|^[1-2][0-9]|^3[0-2,4-8]$/;
    }
    if (!control.value) {
      if (required) {
        return { required: true };
      }
    } else if (control.value.length > maxlength) {
      return { maxLength: true };
    } else if (control.value.length < minlength) {
      return { minLength: true };
    } else if (!control.value.match(regex_express)) {
      return { formatError: true };
    }
  };
}
