var diy_mode = 0;
var A;
var menu_num, state_num, cube_num;

function rule_change() {
    diy_mode = 0;

    var s = document.getElementById("menu_num");
    menu_num = parseInt(s.options[s.selectedIndex].value);
    state_num = (menu_num == 5) ? 3 : menu_num;

    var t1 = document.getElementById("txt_rule")
    if (menu_num == 3) {
        t1.innerHTML = '1-3对应花瓣个数';
    } else if (menu_num == 4) {
        t1.innerHTML = '北1 东2 南3 西4';
    } else if (menu_num == 5) {
        t1.innerHTML = '自定义状态数';
    } else {
        t1.innerHTML = '您尚未设定谜题类型';
    }

    build_ui();
}

function cube_change() {
    diy_mode = 0;

    build_ui();
}

function check() {
    var s = document.getElementById("menu_num");
    menu_num = parseInt(s.options[s.selectedIndex].value);
    if (menu_num == 0) {
        return 0;
    }

    state_num = (menu_num == 5) ? 3 : menu_num;

    s = document.getElementById("cube_num");
    cube_num = parseInt(s.options[s.selectedIndex].value);
    if (cube_num == 0) {
        return 0;
    }
    return 1;
}

function test(n) {

    if (check() == 0) { return; }

    var i = 0;

    // 获取方块初始值
    var m = new Array(cube_num);
    for (i = 0; i < cube_num; i++) {
        var s = document.getElementById("s" + String(i));
        m[i] = parseInt(s.options[s.selectedIndex].value);
    }

    // 获取n号按键初始值x
    var rp = document.getElementById("rp" + String(n));
    var x = parseInt(rp.value);

    if (diy_mode == 0) {
        if (x > 0 && x < state_num) {
            document.getElementById('result').innerHTML = '手动验证模式';

            for (i = 0; i < cube_num; i++) {
                if (A[i * cube_num + n] == 1) {
                    var s = document.getElementById("s" + String(i));
                    s.selectedIndex = (s.selectedIndex + 1) % state_num;
                }
            }

            x = (x + state_num - 1) % state_num;
            rp.value = x;
        } else if (x == 0) {

            for (i = 0; i < cube_num; i++) {
                var t = parseInt(document.getElementById("rp" + String(i)).value);
                if (t != 0) {
                    return;
                }
            }

            diy_mode = 1;
            document.getElementById('result').innerHTML = '自定义模式';
        } else {

            diy_mode = 1;
            document.getElementById('result').innerHTML = '自定义模式';
            for (i = 0; i < cube_num; i++) {
                document.getElementById("rp" + String(i)).value = 0;
            }

        }
    } else {
        // diy模式
        x = (x + state_num + 1) % state_num;
        rp.value = x;

        for (i = 0; i < cube_num; i++) {
            if (A[i * cube_num + n] == 1) {
                var s = document.getElementById("s" + String(i));
                s.selectedIndex = (s.selectedIndex + 1) % state_num;
            }
        }
    }
}

function input_A(n) {
    var s = document.getElementById("t" + String(n));
    var t = parseInt(s.value);
    if (t == 0 || t == 1) {
        A[n] = t;
    } else {
        alert('只能输入0或1\n');
    }
}

function input_state_num() {
    var t = parseInt(document.getElementById('diy_state_num').value);
    if (t < 0) {
        alert('必须是正数\n');
    } else {
        state_num = t;
    }
}

function build_ui() {

    var fm, i, j;

    // 清屏
    document.getElementById('result').innerHTML = '';
    document.getElementById("fm0").innerHTML = '';
    document.getElementById("fm1").innerHTML = '';
    document.getElementById("fm2").innerHTML = '';

    if (check() == 0) { return; }

    // 创建空白转换矩阵
    A = new Array(cube_num * cube_num);
    for (i = 0; i < cube_num; i++) {
        for (j = 0; j < cube_num; j++) {
            A[i * cube_num + j] = 0;
        }
    }

    if (menu_num < 5) {
        // 生成预设变换矩阵
        for (i = 0; i < cube_num; i++) {
            for (j = 0; j < cube_num; j++) {
                if (j >= i - 1 && j <= i + 1) {
                    A[i * cube_num + j] = 1;
                }
            }
        }
    } else {
        // 生成自定义变换矩阵输入
        fm = document.getElementById("fm0");
        fm.innerHTML += '输入自定义状态数目<br>';
        var txt = document.createElement("input");
        txt.type = "text";
        txt.id = "diy_state_num";
        txt.style = "width:30px";
        txt.setAttribute("value", 3);
        txt.setAttribute("onchange", "input_state_num()");
        fm.appendChild(txt);
        fm.innerHTML += '<br>';
        fm.innerHTML += '输入自定义变换矩阵<br>';

        for (i = 0; i < cube_num; i++) {
            for (j = 0; j < cube_num; j++) {
                var txt = document.createElement("input");
                txt.type = "text";
                txt.id = "t" + String(i * cube_num + j);
                txt.style = "width:30px";
                txt.setAttribute("value", 0);
                txt.setAttribute("onchange", "input_A(" + (i * cube_num + j) + ")");
                fm.appendChild(txt);
            }
            fm.innerHTML += '<br>';
        }
    }

    // 生成方块序列
    fm = document.getElementById("fm1");
    for (i = 0; i < cube_num; i++) {

        var sel = document.createElement("select");
        sel.setAttribute("id", 's' + String(i));
        sel.setAttribute("style", "width:60px;height:60px;font-size:40px");

        for (j = 0; j < state_num; j++) {
            var op = document.createElement("option");
            op.setAttribute("value", j);
            op.appendChild(document.createTextNode(String(j + 1)));
            sel.appendChild(op);
        }

        fm.appendChild(sel);
    }

    // 生成结果序列
    fm = document.getElementById("fm2");
    fm.innerHTML = '';

    i = 0;
    while (i < cube_num) {

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
    if (check() == 0) {
        if (state_num == 0) {
            alert('您尚未设定谜题类型\n');
            return;
        }

        if (cube_num == 0) {
            alert('您尚未设定方块数目\n');
            return;
        }
    }

    document.getElementById('result').innerHTML = '计算中...';
    diy_mode = 0;

    var i = 0,
        j = 0,
        t = 0;

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
                p[i] = state_num * 4;
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