$(function () {
    var form = layui.form;
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        //数组的两个值分别代表：[正则匹配,匹配不符时的提示文字]
        oldPwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        samePwd: function (value) {
            var pwd = $('[name=oldPwd]').val();
            if (pwd == value) {
                return '新旧密码不能相同!';
            }
        },
        rePwd: function (value) {
            var newPwd = $('[name=newPwd]').val();
            if (newPwd !== value) {
                return '两次密码不一致!'
            }
        }
    });
    // 发起提交表单请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功!')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    });
})