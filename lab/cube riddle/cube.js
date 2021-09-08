var diy_mode = 0;

function rule_change() {
    diy_mode = 0;

    var s = document.getElementById("state_num");
    var state_num = parseInt(s.options[s.selectedIndex].value);
    var t1 = document.getElementById("txt_rule")
    if (state_num == 3) {
        t1.innerHTML = '1-3对应花瓣个数';
    } else if (state_num == 4) {
        t1.innerHTML = '北1 东2 南3 西4';
    } else {
        t1.innerHTML = '您尚未设定谜题类型';
    }

    build_select();
}

function cube_change() {
    diy_mode = 0;

    build_select();
}

function test(n) {
    var s = document.getElementById("state_num");
    var state_num = parseInt(s.options[s.selectedIndex].value);

    var s = document.getElementById("cube_num");
    var cube_num = parseInt(s.options[s.selectedIndex].value);

    var i = 0;

    // 获取方块初始值
    var m = new Array(cube_num);
    for (i = 0; i < cube_num; i++) {
        var s = document.getElementById("s" + String(i));
        m[i] = parseInt(s.options[s.selectedIndex].value);
    }

    // 获取按键初始值
    var rp = document.getElementById("rp" + String(n));
    var x = parseInt(rp.value);

    if (diy_mode == 0) {
        if (x > 0 && x < state_num) {
            for (i = (n - 1 < 0) ? 0 : n - 1; i < cube_num && i <= n + 1; i++) {
                var s = document.getElementById("s" + String(i));
                s.selectedIndex = (s.selectedIndex + 1) % state_num;
            }

            x = (x + state_num - 1) % state_num;
            rp.value = x;

            return;

        } else if (x == 0) {
            diy_mode = 1;
            document.getElementById('result').innerHTML = '自定义模式';
        } else {
            diy_mode = 1;
            document.getElementById('result').innerHTML = '自定义模式';
            for (i = 0; i < cube_num; i++) {
                var rp = document.getElementById("rp" + String(i));
                rp.value = 0;
            }
        }

    } else {

        x = (x + state_num + 1) % state_num;
        rp.value = x;

        for (i = (n - 1 < 0) ? 0 : n - 1; i < cube_num && i <= n + 1; i++) {
            var s = document.getElementById("s" + String(i));
            s.selectedIndex = (s.selectedIndex + 1) % state_num;
        }
    }
}


function build_select() {

    document.getElementById('result').innerHTML = '';
    document.getElementById("fm1").innerHTML = '';
    document.getElementById("fm2").innerHTML = '';

    var s = document.getElementById("state_num");
    var state_num = parseInt(s.options[s.selectedIndex].value);
    if (state_num == 0) {
        return
    }

    s = document.getElementById("cube_num");
    var cube_num = parseInt(s.options[s.selectedIndex].value);
    if (cube_num == 0) {
        return
    }

    var fm = document.getElementById("fm1");

    var i = 0,
        j = 0,
        im = cube_num,
        jm = state_num;
    var sel_id = '';
    while (i < im) {

        var sel = document.createElement("select");
        sel.setAttribute("id", 's' + String(i));
        sel.setAttribute("style", "width:60px;height:60px;font-size:40px");

        j = 0;
        while (j < jm) {
            var op = document.createElement("option");
            op.setAttribute("value", j);
            op.appendChild(document.createTextNode(String(j + 1)));
            sel.appendChild(op);
            j++;
        }

        fm.appendChild(sel);

        i++;
    }

    fm = document.getElementById("fm2");
    fm.innerHTML = '';

    i = 0;
    while (i < im) {

        var sel = document.createElement("input");
        sel.setAttribute("id", 'rp' + String(i));
        sel.setAttribute("type", "button");
        sel.setAttribute("value", "？");
        sel.setAttribute("style", "width:60px;height:60px;font-size:40px");
        sel.setAttribute("onclick", "test(" + String(i) + ")");
        fm.appendChild(sel);

        i++;
    }
}

function start() {
    var s = document.getElementById("state_num");
    var state_num = parseInt(s.options[s.selectedIndex].value);
    if (state_num == 0) {
        alert('您尚未设定状态数目\n');
        return
    }

    s = document.getElementById("cube_num");
    var cube_num = parseInt(s.options[s.selectedIndex].value);
    if (cube_num == 0) {
        alert('您尚未设定方块数目\n');
        return
    }

    document.getElementById('result').innerHTML = '计算中...';
    diy_mode = 0;

    var i = 0,
        j = 0,
        t = 0;

    // 创建转换矩阵
    var A = new Array(cube_num * cube_num);
    for (i = 0; i < cube_num; i++) {
        for (j = 0; j < cube_num; j++) {
            if (j >= i - 1 && j <= i + 1) {
                A[i * cube_num + j] = 1;
            } else {
                A[i * cube_num + j] = 0;
            }
        }
    }

    // 获取方块初始值
    var m = new Array(cube_num);
    for (i = 0; i < cube_num; i++) {
        var s = document.getElementById("s" + String(i));
        m[i] = parseInt(s.options[s.selectedIndex].value);
    }

    if (Matrix_D(A, cube_num) != 0) {

        // 计算矩阵的逆
        var Ar = Matrix_Rev(A, cube_num);

        var n = new Array(cube_num);
        var p = new Array(cube_num);
        var x = new Array(cube_num * state_num);

        for (t = 0; t < state_num; t++) {
            // 设置方块最终值,并计算差值
            for (i = 0; i < cube_num; i++) {
                n[i] = t - m[i];
            }

            // 计算变换后的向量,并取模
            for (i = 0; i < cube_num; i++) {
                p[i] = state_num;
                for (j = 0; j < cube_num; j++) {
                    p[i] += Ar[i * cube_num + j] * n[j];
                }
                x[t * cube_num + i] = p[i] % state_num;
            }
        }

        // 取最优解
        var x_sum_min = state_num * cube_num;
        var x_index = 0;
        var x_sum = 0;
        for (t = 0; t < state_num; t++) {
            x_sum = 0;
            for (i = 0; i < cube_num; i++) {
                x_sum += x[t * cube_num + i];
            }
            if (x_sum < x_sum_min) {
                x_sum_min = x_sum;
                x_index = t;
            }
        }

        // 显示
        for (i = 0; i < cube_num; i++) {
            var r = document.getElementById('rp' + String(i));
            r.value = x[x_index * cube_num + i];
        }
        document.getElementById('result').innerHTML = '计算完毕';

    } else {

        // 不可逆的转换矩阵直接暴力穷举,并且不保证是最优解
        // 什么嘛,最多也就1024种

        var x = new Array(cube_num);
        var n = new Array(cube_num);

        var tm = parseInt(Math.pow(state_num, cube_num));
        for (t = 0; t < tm; t++) {
            i = t;
            for (j = 0; j < cube_num; j++) {
                x[j] = i % state_num;
                i = parseInt(i / state_num);
            }

            // 计算变换后的向量,并取模
            for (i = 0; i < cube_num; i++) {
                n[i] = m[i];
                for (j = 0; j < cube_num; j++) {
                    n[i] += A[i * cube_num + j] * x[j];
                }
                n[i] = (n[i] + state_num * 2) % state_num;
            }

            // 判断取模后全相等
            for (i = 1; i < cube_num; i++) {
                if (n[i] != n[i - 1]) {
                    break;
                }
            }
            // 如果全相等,则证明找到一个解
            if (i == cube_num) {
                break;
            }
        }

        if (t < tm) {
            // 显示
            for (i = 0; i < cube_num; i++) {
                var r = document.getElementById('rp' + String(i));
                r.value = x[i];
            }
            document.getElementById('result').innerHTML = '计算完毕';

        } else {
            for (i = 0; i < cube_num; i++) {
                var r = document.getElementById('rp' + String(i));
                r.value = "？";
            }
            document.getElementById('result').innerHTML = '似乎无解呢~';
        }
    }
};