var space = '        ';

var myname = [
    'DD    ',
    'DD    ',
    'DD    ',
    'DD    ',
    'DD    ',
    'DD    ',
    'DD    ',
    'DD    ',
    '单推人'
];

var myframe = [
    '你在想$0',
    '$0管饱，一人一个',
    '我和$0贴贴，你们和$1贴贴',
    '好家伙，直接$=0',
    '啊这',
    '好家伙',
    '[图片]',
    '[转发消息]',
    '[视频]',
    '[链接]',
    '草',
    '$0在你嘴里结义',
    '\\$0/\\$0/\\$0/',
    '这里不是$0的群吗？',
    '这里不是$=0群吗？',
    '老$0了',
    '你果然是$0吧',
    '锐利的🤺，锐利的👀',
    '🤺🤺🤺🤺🤺🤺🤺',
    '我很可爱请给我钱',
    '贴贴',
    '？？？',
    '害',
    '绝了',
    'Ps，启动！',
    'Pr，启动！',
    '$#0()',
    '$#0(bushi)',
    '太草了',
    '太艹了',
    '真实',
    '我不仅现实里$=0，梦里也$=0',
    '欢迎新人',
    '欢迎新dd，入群请仔细阅读群公告，违反者随时会被击杀₍ᐢ⸝⸝› ̫ ‹⸝⸝ᐢ₎',
    '我血压高了，我不看了',
    '今天播不播？',
    '今晚22:00有音',
    '你也是$+0$0吗？',
    '我tm直呼$0',
    '我tm直接$=0',
    '[被禁言12个小时]',
    '我是$+0$0啊',
    'emmm',
    '[滑稽]',
    '年幼的目光',
    '氵',
    '我和$0隔壁床',
    '你们在说什么，$0在我床上呢',
    '草上好',
    '早上好',
    '[已保存的图片]\n' + space + '\"我只能爬\"',
    '[已保存的图片]\n' + space + '\"好，让你爽\"',
    '[已保存的图片]\n' + space + '\"你以为我会这么说吗\n' + space + '\"哈↑哈↓哈↑哈↓哈↑哈\n' + space + '\"pui\"',
    '我怎么还没被鲨',
    '我永远喜欢$=0()',
    '我永远喜欢$0',
    '我是$0单推人'
];

var myabj = [
    '1900岁的',
    '可爱的',
    '不要命的',
    '音姐的',
    '',
    '',
    '',
    ''
]

var myverb = [
    '辱音',
    '击鲨anti',
    '单推晓音',
    '吃桃子',
    '和晓音贴贴',
    '是个DD',
    '是个lsp',
    '种桃树',
    '治疗低血压',
    '在钢板上玩连连看',
    '闯入晓音酒馆',
    'DD',
    'D别的女人去了'
]

var mynorm = [
    'peach',
    '🍑',
    '🤺',
    '桃子',
    '红晓音',
    '晓音姐',
    '音姐',
    '晓音',
    '残佬',
    '桃树',
    '钢板',
    'DD',
    'anti',
    'gachi',
    '单推人',
    '晓音坡',
    'yagoo',
    'P-SP',
    '魔法少女',
    '辱音分子',
    '狂粉',
    '内行',
    'lsp',
    '桃子批发商',
    'vtb'
];

// ------------------------- //

function get_r_num (length) {
    var idx = Math.floor(Math.random() * length);
    return idx;
}

function len (str) {
    return str.length;
}

function rep (str1, flag, label) {
    var str_o = '';
    var str_n = '';

    for (var i = 0; i < 10; i++) {
        str_o = flag + i.toString();
        if (str1.indexOf(str_o) < 0) {
            continue;
        }

        if (typeof (label) != 'string')
            str_n = label[get_r_num(len(label))];
        else
            str_n = make();

        while (1) {
            if (str1.indexOf(str_o) < 0) {
                break;
            }
            str1 = str1.replace(str_o, str_n);
        }
    }

    return str1;
}

function make () {
    var idx = get_r_num(len(myframe));
    var str1 = myframe[idx];

    str1 = rep(str1, '$', mynorm);
    str1 = rep(str1, '$=', myverb);
    str1 = rep(str1, '$+', myabj);
    str1 = rep(str1, '$#', 'make');

    return str1;
}

function run () {
    var idx = 0;
    var str1 = '';
    var str2 = '';
    var str3 = '';
    var cnt = 0;

    str1 = txt.value;
    for (var i = 0; i < len(str1); i++)
        if (str1[i] == '\n')
            cnt++;

    if (cnt >= 15) {
        str1 = str1.replace('-', ' ');
        idx = str1.indexOf('-');
        str2 = str1.slice(idx);
    }
    else {
        str2 = str1;
    }

    str3 = '-' + myname[get_r_num(len(myname))] + space.slice(len(myname[0]) + 1) + make();

    txt.value = str2 + str3 + '\n';
}