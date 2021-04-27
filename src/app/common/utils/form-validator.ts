import { FormControl } from '@angular/forms';


//  字符串是否为空的校验
export function stringNullValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        let formated = control.value.replace(/\s+/g,"");
        const l = formated.length;
        return l>0 ? null : {required: true};
    }
}

//额定工时校验器
export function workfrequencyValidator(control: FormControl): any {
    let validateResult = null;
    if (control.value) {
        let reg = /^\d{2}_\d{2}_\d{2}$/;
        validateResult = reg.test(control.value)?null:{ formateError: true }
        // console.log("校验结果通过情况=", reg.test(control.value));
    }
    return validateResult;
}

//表单验证器
