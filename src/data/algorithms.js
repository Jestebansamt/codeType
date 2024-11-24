let algorithms = {
    "Sieve of Eratosthenes": {
        name: "Sieve of Eratosthenes",
        url: "https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html",
        algorithm:
            `int n;
vector<bool> is_prime(n+1, true);
is_prime[0] = is_prime[1] = false;
for (int i = 2; i <= n; i++) {
    if (is_prime[i] && i * i <= n) {
        for (int j = i * i; j <= n; j += i)
            is_prime[j] = false;
    }
} `
    },
    "Binary Exponentiation (Recursive)": {
        name: "Binary Exponentiation (Recursive)",
        url: "https://cp-algorithms.com/algebra/binary-exp.html",
        algorithm:
            `long long binpow(long long a, long long b){
    if(b == 0)
        return 1;
    long long res = binpow(a, b / 2);
    if(b % 2)
        return res * res * a;
    else
        return res * res;
}
    `
    },
    "Binary Exponentiation": {
        name: "Binary Exponentiation",
        url: "https://cp-algorithms.com/algebra/binary-exp.html",
        algorithm:
            `long long binpow(long long a, long long b){
    long long res = 1;
    while (b > 0){
        if(b & 1)
            res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}
    `
    },
    "Linear Sieve": {
        name: "Linear Sieve",
        url: "https://cp-algorithms.com/algebra/prime-sieve-linear.html",
        algorithm:
            `const int N = 1e9;
vector<int> lp(N+1);
vector<int> pr;

for(int i=2; i <= N; ++i){
    if(lp[i] == 0){
        lp[i] = i;
        pr.push_back(i);
    }
    for(int j = 0; i * pr[j] <= N; ++j){
        lp[i * pr[j]] = pr[j];
        if(pr[j] == lp[i]){
            break;
        }
    }
}`
    },
    "Interger Factorization: Trial Division": {
        name: "Interger Factorization: Trial Division",
        url: "https://cp-algorithms.com/algebra/factorization.html",
        algorithm:
            `vector<long long> trial_division1(long long n) {
    vector<long long> factorization;
    for (long long d = 2; d * d <= n; d++) {
        while (n % d == 0) {
            factorization.push_back(d);
            n /= d;
        }
    }
    if (n > 1)
        factorization.push_back(n);
    return factorization;
}`
    },
    "Euler's totient function": {
        name: "Euler's totient function",
        url: "https://cp-algorithms.com/algebra/phi-function.html",
        algorithm:
            `int phi(int n) {
    int result = n;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            while (n % i == 0)
                n /= i;
            result -= result / i;
        }
    }
    if (n > 1)
        result -= result / n;
    return result;
}
`},
    "Number of divisors": {
        name: "Number of divisors",
        url: "https://cp-algorithms.com/algebra/divisors.html",
        algorithm:
            `long long numberOfDivisors(long long num) {
    long long total = 1;
    for (int i = 2; i * i <= num; i++) {
        if (num % i == 0) {
            int e = 0;
            do {
                e++;
                num /= i;
            } while (num % i == 0);
            total *= e + 1;
        }
    }
    if (num > 1) {
        total *= 2;
    }
    return total;
}
`},
    "Modular Multiplicative Inverse": {
        name: "Modular Multiplicative Inverse",
        url: "https://cp-algorithms.com/algebra/module-inverse.html",
        algorithm:
            `int x, y;
int g = extended_euclidean(a, m, x, y);
if (g != 1) {
    cout << "No solution!";
}
else {
    x = (x % m + m) % m;
    cout << x << endl;
}
`},
    "Garner's algorithm": {
        name: "Garner's algorithm",
        url: "https://cp-algorithms.com/algebra/garners-algorithm.html",
        algorithm:
            `for (int i = 0; i < k; ++i) {
    x[i] = a[i];
    for (int j = 0; j < i; ++j) {
        x[i] = r[j][i] * (x[i] - x[j]);
        x[i] = x[i] % p[i];
        if (x[i] < 0)
            x[i] += p[i];
    }
}
`},
    "Factorial modulo p": {
        name: "Factorial modulo p",
        url: "https://cp-algorithms.com/algebra/factorial-modulo.html",
        algorithm:
            `int factmod(int n, int p) {
    vector<int> f(p);
    f[0] = 1;
    for (int i = 1; i < p; i++)
        f[i] = f[i-1] * i % p;
    int res = 1;
    while (n > 1) {
        if ((n/p) % 2)
            res = p - res;
        res = res * f[n%p] % p;
        n /= p;
    }
    return res;
}
`},
    "Montgomery reduction": {
        name: "Montgomery reduction",
        url: "https://cp-algorithms.com/algebra/montgomery_multiplication.html",
        algorithm:
            `function reduce(x){
    q = (x % r) * n % r
    a = (x - q * n) / r
    if a < 0
        a += n
    return a
}
`},
    "Gray code": {
        name: "Gray code",
        url: "https://cp-algorithms.com/algebra/gray-code.html",
        algorithm:
            `int g (int n) {
    return n ^ (n >> 1);
}
`},
    "Brian Kernighan's algorithm": {
        name: "Brian Kernighan's algorithm",
        url: "https://cp-algorithms.com/algebra/bit-manipulation.html",
        algorithm:
            `int countSetBits(int n){
    int count = 0;
    while (n){
        n = n & (n - 1);
        count++;
    }
    return count;
}
`},
    "Fibonacci sequence": {
        name: "Fibonacci sequence",
        url: "https://cp-algorithms.com/dynamic_programming/intro-to-dp.html",
        algorithm:
            `map<int, int> memo;
int f(int n) {
    if (memo.count(n)) return memo[n];
    if (n == 0) return 0;
    if (n == 1) return 1;

    return memo[n] = f(n - 1) + f(n - 2);
}
`},
"Knuth–Morris–Pratt algorithm": {
        name: "Knuth–Morris–Pratt algorithm",
        url: "https://cp-algorithms.com/string/prefix-function.html",
        algorithm:
            `vector<int> prefix_function(string s) {
    int n = (int)s.length();
    vector<int> pi(n);
    for (int i = 0; i < n; i++)
        for (int k = 0; k <= i; k++)
            if (s.substr(0, k) == s.substr(i-k+1, k))
                pi[i] = k;
    return pi;
}
`},
    "Z-function": {
        name: "Z-function",
        url: "https://cp-algorithms.com/string/z-function.html",
        algorithm:
            `vector<int> z_f(string s) {
    int n = s.size();
    vector<int> z(n);
    for (int i = 1; i < n; i++) {
        while (i + z[i] < n &&
            s[z[i]] == s[i + z[i]]) {
            z[i]++;
        }
    }
    return z;
}
`},
    "Number of divisors": {
        name: "Number of divisors",
        url: "https://cp-algorithms.com/algebra/divisors.html",
        algorithm:
            `long long f(long long num) {
    long long total = 1;
    for (int i = 2; i * i <= num; i++) {
        if (num % i == 0) {
            int e = 0;
            do {
                e++;
                num /= i;
            } while (num % i == 0);
            total *= e + 1;
        }
    }
    if (num > 1) {
        total *= 2;
    }
    return total;
}
`},
    "DFS": {
        name: "DFS",
        url: "https://cp-algorithms.com/graph/depth-first-search.html",
        algorithm:
            `vector<vector<int>> adj;
int n;
vector<bool> visited;
void dfs(int v) {
    visited[v] = true;
    for (int u : adj[v]) {
        if (!visited[u])
            dfs(u);
    }
}
`},
    "Binomial Coefficients": {
        name: "Binomial Coefficients",
        url: "https://cp-algorithms.com/combinatorics/binomial-coefficients.html",
        algorithm:
            `int C(int n, int k) {
    double res = 1;
    for (int i = 1; i <= k; ++i)
        res = res * (n - k + i) / i;
    return (int)(res + 0.01);
}
`},
};

const algorithmKeys = Object.keys(algorithms);
const randomIndex = Math.floor(Math.random() * algorithmKeys.length);
const randomAlgorithmKey = algorithmKeys[randomIndex];
const randomAlgorithm = algorithms[randomAlgorithmKey];

export default randomAlgorithm;