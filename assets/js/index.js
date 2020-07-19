$(function () {
    getUserInfo();
    var layer = layui.layer;
    // 退出功能
    $('#btnLogOut').on('click', function () {
        layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            // 1.清空本地存储中的token
            localStorage.removeItem('token');
            // 跳转到login.html
            location.href = 'login.html';
            // 关闭弹出层
            layer.close(index);
        })
    })
});
// 封装获取用户信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用渲染头像的函数
            renderAvatar(res.data)
        },
        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function (res) {
        //     console.log(res);
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (!res.responseJSON) {
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
        //         // 1.强制清空token
        //         localStorage.removeItem('token');
        //         // 2.强制跳转到登录页面
        //         location.href = 'login.html';
        //     }
        // }
    })
};

// 封装渲染用户头像的函数
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username;
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
};