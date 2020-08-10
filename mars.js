function Check () {
    let password = txt.value;
    if (password == '1') { //666214666
        let str = "密码正确 <\hr> ";
        let week1 = "<a href=\"./MarsWeek/第1周/我的朋友们.html\">Mars Week 1</a> <br/>"
        let week2 = "<a href=\"./MarsWeek/第2周/我的朋友们.html\">Mars Week 2</a> <br/>"
        document.getElementById('id').innerHTML = str + week1 + week2;
    }
    else {
        document.getElementById('id').innerHTML = "密码错误";
    }
}