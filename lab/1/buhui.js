var space = '     ';

var myname = [
    'lh ',
    'lsh',
    'wty',
    'wyx',
    'lxy',
    'dwm'
];

var myframe = [
    '还是那句话\n' + space + '$#0',
    '还是那句话\n' + space + '少$#0',
    '有一说一\n' + space + '$#0',
    '$0',
    '不会真有人$0吧',
    '不会真有人马上要$0了还$1吧',
    '说$0也不$0',
    '不建议$0',
    '建议$0',
    '$0不$0$0',
    '这波，这波是$0',
    '叔叔我啊，是真的要$0了',
    '🈶🈚人$0',
    '$0👮，出动！',
    '👴决定$0',
    '不建议做群$0',
    '[图片]',
    '[签到]',
    '[热门微博]',
    '不建议$0内卷',
    '$0，都可以$0',
    '可以了，致死量了',
    '$0浓度太高了',
    '《$0》',
    '《$#0》',
    '我曾经在极度愤怒的情况下一拳打穿$0，人与人是不相同的，不可一概而论',
    '我曾经在极度愤怒的情况下一个人$0，人与人是不相同的，不可一概而论',
    '干了兄弟们，奥利给！',
    '守护全世界最好的$0',
    '战术$0',
    '到点了，上号！',
    '你必上今日火星周刊',
    '确实',
    '阿哲',
    '啊这',
    '就这？'
];

var myword = [
    '建议',
    '这波',
    '不建议',
    '反思',
    '就这',
    '不会吧不会吧',
    '这波',
    '勃起',
    '哈  哈',
    '打L4D2',
    '主流',
    '饭圈',
    '女拳',
    '打拳',
    '烂梗',
    '说烂梗',
    '火星',
    '⏭️',
    '文青',
    '二次元',
    '曹丕',
    '尼哥',
    ' ',
    '草',
    '牛的',
    '烂梗',
    '口癖',
    '做赘婿',
    '发tx表情包',
    'emoji',
    '冲',
    '阴阳师',
    '日本天皇',
    '假哭',
    '后仰',
    '打开网易云',
    '橄榄pilipili'
];

var first = [
    '🌿，',
    '淦，',
    '⏭️到',
    '就这？',
    'wdnmd，'
];


function get_r_num (length) {
    var idx = Math.floor(Math.random() * length);
    return idx;
}

function len (str) {
    return str.length;
}

function make () {
    var str1 = '';
    var idx = get_r_num(5 * len(first));
    if (idx < len(first)) {
        str1 = str1 + first[idx];
    }


    idx = get_r_num(len(myframe));
    str1 = str1 + myframe[idx];

    var str_o = '';
    var str_n = '';

    for (var i = 0; i < 10; i++) {
        str_o = '$' + i.toString();
        while (1) {
            if (str1.indexOf(str_o) < 0) {
                break
            }
            idx = get_r_num(len(myword));
            str_n = myword[idx];
            str1 = str1.replace(str_o, str_n);
        }
    }


    for (var i = 0; i < 10; i++) {
        str_o = '$#' + i.toString();
        while (1) {
            if (str1.indexOf(str_o) < 0) {
                break
            }
            str_n = make();
            str1 = str1.replace(str_o, str_n);
        }
    }

    return str1;
}

function run () {
    var idx = 0;
    var str1 = '';
    var str2 = '';
    var str3 = '';
    var cnt = 0;

    str1 = txt.value;
    for (var i = 0; i < str1.length; i++) {
        if (str1[i] == '\n') {
            cnt++;
        }
    }

    if (cnt >= 15) {
        str1 = str1.replace('-', ' ');
        idx = str1.indexOf('-');
        str2 = str1.slice(idx);
    }
    else {
        str2 = str1;
    }

    str3 = '-' + myname[get_r_num(len(myname))] + space.slice(4) + make();

    txt.value = str2 + str3 + '\n';
}