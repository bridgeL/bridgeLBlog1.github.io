// export { Matrix_D, Matrix_Rev }

function Matrix_D(A, n) {
    var D = 0,
        j = 0,
        k = 0,
        t = 0;

    if (n == 1) {
        return A[0];
    }

    var temp = new Array(Math.pow(n - 1, 2));

    for (j = 0; j < n; j++) {
        // 提取删除1行j列的新行列式
        for (k = 0; k < n - 1; k++) {
            for (t = 0; t < n - 1; t++) {
                temp[k * (n - 1) + t] = A[(k + 1) * n + ((t >= j) ? t + 1 : t)];
            }
        }
        // 递归获得新行列式的值
        var Dt = Matrix_D(temp, n - 1);

        // 代入行列式公式
        if (j % 2 == 0) {
            D += A[j] * Dt;
        } else {
            D -= A[j] * Dt;
        }
    }
    return D;
}

function Matrix_Adj(A, n) {
    var A_star = new Array(Math.pow(n, 2));
    var i = 0,
        j = 0,
        k = 0,
        t = 0;

    var temp = new Array(Math.pow(n - 1, 2));

    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            // 提取删除i行j列的新行列式
            for (k = 0; k < n - 1; k++) {
                for (t = 0; t < n - 1; t++) {
                    temp[k * (n - 1) + t] = A[((k >= i) ? k + 1 : k) * n + ((t >= j) ? t + 1 : t)];
                }
            }
            // 递归获得新行列式的值
            var Dt = Matrix_D(temp, n - 1);

            // 代入伴随矩阵公式
            if ((i + j) % 2 == 0) {
                A_star[j * n + i] = Dt;
            } else {
                A_star[j * n + i] = -Dt;
            }
        }
    }

    return A_star;
}

function Matrix_Rev(A, n) {
    var A_Rev = new Array(Math.pow(n, 2));

    var D = Matrix_D(A, n);
    var A_star = Matrix_Adj(A, n);

    var i = 0,
        j = 0;

    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            // 代入逆矩阵公式
            A_Rev[i * n + j] = A_star[i * n + j] / D;
        }
    }

    return A_Rev;
}

// var MAX 10 //最大行(列)数
// typedef struct {
//     int m, n;
//     int a[MAX][MAX];
// }
// matrix;



// function main() {
//     matrix a, b;
//     int r;
//     input_matrix( & a);
//     r = rank_matrix(a, & b);
//     system("cls");
//     printf("The original matrix:\n");
//     output_matrix(a);
//     printf("After transforming:\n");
//     output_matrix(b);
//     printf("\nr(A)=%d\n", r);
//     getch();
// }

// function input_matrix(matrix * dat) //输入矩阵
// {
//     int i, j;
//     do {
//         printf("m(1-%d)=", MAX);
//         scanf("%d", & (dat - > m));
//     } while ((dat - > m) < 1 || (dat - > m) > MAX);
//     do {
//         printf("n(1-%d)=", MAX);
//         scanf("%d", & (dat - > n));
//     } while ((dat - > n) < 1 || (dat - > n) > MAX);
//     for (i = 0; i < (dat - > m); i++)
//         for (j = 0; j < (dat - > n); j++) {
//             printf("a(%d,%d)=", i + 1, j + 1);
//             scanf("%d", & (dat - > a[i][j]));
//         }
// }

// function output_matrix(matrix dat) //显示矩阵
// {
//     int m, n, i, j;
//     m = dat.m;
//     n = dat.n;
//     for (i = 0; i < m; i++) {
//         for (j = 0; j < n; j++)
//             printf("%-4d", dat.a[i][j]);
//         printf("\n");
//     }
// }

// function exchang_row(int * a, int * b, int n) {
//     int i, t;
//     for (i = 0; i < n; i++) {
//         t = a[i];
//         a[i] = b[i];
//         b[i] = t;
//     }
// }

// function mul_row(int * a, int k, int n) {
//     int i;
//     for (i = 0; i < n; i++)
//         a[i] *= k;
// }

// function add_row(int * a1, int * a2, int k, int n) {
//     int i;
//     for (i = 0; i < n; i++)
//         a1[i] += a2[i] * k;
// }

// function rank_matrix(matrix dat, matrix * res) //求秩(返回值为秩，第2个参数为变换得到的阶梯阵)
// {
//     int m, n, i, t;
//     int ri, ci; //行标记与列标记
//     int f_z; //某列是否全为0的标志，为1表示全为0
//     m = dat.m;
//     n = dat.n;
//     for (ri = ci = 0; ci < n; ci++) {
//         f_z = 1;
//         for (i = ri; i < m; i++)
//             if (dat.a[i][ci] != 0) {
//                 if (i != ri)
//                     if (f_z)
//                         exchang_row( & (dat.a[ri][ci]), & (dat.a[i][ci]), n - ci);
//                     else {
//                         t = dat.a[i][ci];
//                         mul_row( & (dat.a[i][ci]), dat.a[ri][ci], n - ci);
//                         add_row( & (dat.a[i][ci]), & (dat.a[ri][ci]), -t, n - ci);
//                     }
//                 f_z = 0;
//             }
//         if (!f_z) ri++;
//     } *
//     res = dat;
//     return ri;
// }