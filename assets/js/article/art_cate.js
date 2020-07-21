$(function () {
    initArtCateList();
    // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    };
    // 为添加类别按钮绑定点击事件
    var layer = layui.layer;
    var form = layui.form;
    var indexAdd = null;
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    });
    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        // 添加分类之后禁用确认添加按钮
        // 解决连续点击，多次添加的bug
        $('#confirmAdd').attr('disabled', true);
        $('#confirmAdd').addClass('layui-btn-disabled');
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加类别失败！')
                }
                initArtCateList();
                layer.msg('添加类别成功！')
                // 关闭弹出层
                layer.close(indexAdd)
            }
        })
    });
    // 为btn-edit按钮绑定点击事件
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res);
                form.val('form-edit', res.data)
            }
        })
    });
    // 通过代理的形式，为 form-edit 表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                initArtCateList();
                layer.msg('更新分类数据成功！')
                // 关闭弹出层
                layer.close(indexEdit)
            }
        })
    });
    // 通过代理的形式，为btn-delete按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        // 提示用户是否删除
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除数据失败！')
                    }
                    layer.msg('删除数据成功！')
                    layer.close(index);
                    initArtCateList();
                }
            })
        });
    })
})