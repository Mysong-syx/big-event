$(function () {
    getUserInfo();
    // 封装获取用户信息的函数
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token') || '',
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取信息失败!')
                }
                // 调用渲染头像的函数
                renderAvatar(res.data);
            }
            // // 不论成功还是失败，最终都会调用 complete 回调函数
            // complete: function (res) {
            //     console.log(res);
            //     if(!responseJSON) {
            //         console.log('此时出现没有responseJSON 我们做一个错误判断');
            //         let jsondata = JSON.parse(res.responseText);
            //         if (jsondata.message === '身份认证失败！' && jsondata.status === 1) {
            //             // 1.强制清空token
            //             localStorage.removeItem('token');
            //             // 2.强制跳转到登录页面
            //             location.href = 'login.html';
            //         }
            //     }
            //     if (res.responseJSON.message === '身份认证失败！' && res.responseJSON.status === 1) {
            //         localStorage.removeItem('token');
            //         location.href = 'login.html';
            //     }
            // }
        })
    }
    // 封装渲染头像的函数
    function renderAvatar(user) {
        // 判断用户是否有nickname 如果有作为欢迎词 如果没有就用 username
        // 判断是否有 user_pic 属性 如果有 就让img标签显示 并且设置src属性值 为 user_pic
        // 如果没有 user_pic 属性 就取username的第一个字符 如果英文就改成大写 让 文字头像显示

        // 1.获取用户的名称
        var name = user.nickname || user.username;
        // 2.设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        // 3.按需渲染用户的头像
        if (user.user_pic !== null) {
            // 3.1 渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {
            // 3.2 渲染文本头像
            $('.layui-nav-img').hide();
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first).show();
        }
    }
    // 退出
    var layer = layui.layer;
    $('#btnLogOut').on('click', function () {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清除token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = 'login.html';
            // 关闭弹出层
            layer.close(index);
        });
    })
})