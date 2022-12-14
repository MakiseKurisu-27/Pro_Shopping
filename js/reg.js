window.onload = function() {
    var regtel = /^1[3|4|5|7|8]\d{9}$/;
    var regqq = /^[1-9]\d{4,}$/;    // 1到9开头 加上 4个0-9的数
    var regnc = /^[\u4e00-\u9fa5]{2,8}$/;  // 汉字 一 到 最后一个汉字 ？ 2-8个
    var regmsg = /^\d{6}$/;
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;
    var tel = document.querySelector('#tel'); // 输入框
    var qq = document.querySelector('#qq');   // qq号码
    var nc = document.querySelector('#nc');   // 昵称
    var msg = document.querySelector('#msg'); // 短信验证
    var pwd = document.querySelector('#pwd');
    var surepwd = document.querySelector('#surepwd'); //
    regexp(tel, regtel);
    regexp(qq, regqq);
    regexp(nc, regnc);
    regexp(msg, regmsg);
    regexp(pwd, regpwd);
    // 表单验证的函数
    function regexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                // 输入框的下一个兄弟节点
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜你输入正确';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式不正确, 请重新输入';
            }
        }
    }

    surepwd.onblur = function() {
        if (this.value == pwd.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜你输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 两次密码不一致';
        }
    }
}