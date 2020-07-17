$(function () {
    $('#toReg').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show();
    });
    $('#toLogin').on('click', function () {
        $('.login_box').show();
        $('.reg_box').hide();
    });
    // 自定义校验规则
    var form = layui.form;
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        //数组的两个值分别代表：[正则匹配,匹配不符时的提示文字]
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            var pwd = $('.reg_box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
            console.log('注册成功!');
        }
    });
    // 获取到 layer 内置模块
    var layer = layui.layer;
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功!');
            // 模拟人的点击1行为
            $('#toLogin').click();
        })
    });
    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!');
                }
                layer.msg('登录成功!');
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = 'index.html';
            }
        })
    })

})