import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '20s', target: 20 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<600'],
        http_req_failed:   ['rate<0.01'],
    },
};

const BASE_URL = 'https://babi-services-audit-production.up.railway.app';

export default function () {
    // PERF-01 — GET /api/services (public, sans pagination)
    const services = http.get(`${BASE_URL}/api/services`);
    check(services, {
        'services: status 200': (r) => r.status === 200,
        'services: réponse < 600ms': (r) => r.timings.duration < 600,
    });

    sleep(0.5);

    // Login admin — nécessaire pour les 2 endpoints suivants
    const login = http.post(
        `${BASE_URL}/api/login`,
        JSON.stringify({ email: 'admin@babiservices.ci', mot_de_passe: 'password' }),
        { headers: { 'Content-Type': 'application/json' } }
    );
    check(login, {
        'login: status 200': (r) => r.status === 200,
        'login: token présent': (r) => JSON.parse(r.body).token !== undefined,
        'login: réponse < 600ms': (r) => r.timings.duration < 600,
    });

    sleep(0.5);

    // Récupération du token pour les appels authentifiés
    let token = null;
    if (login.status === 200) {
        token = JSON.parse(login.body).token;
    }
    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

    // PERF-02 — GET /api/admin/missions (sans pagination ni filtre de date)
    const missions = http.get(`${BASE_URL}/api/admin/missions`, authHeaders);
    check(missions, {
        'admin/missions: status 200': (r) => r.status === 200,
        'admin/missions: réponse < 600ms': (r) => r.timings.duration < 600,
    });

    sleep(0.5);

    // PERF-03 — GET /api/admin/utilisateurs (sans pagination, withCount corrélé)
    const utilisateurs = http.get(`${BASE_URL}/api/admin/utilisateurs`, authHeaders);
    check(utilisateurs, {
        'admin/utilisateurs: status 200': (r) => r.status === 200,
        'admin/utilisateurs: réponse < 600ms': (r) => r.timings.duration < 600,
    });

    sleep(1);
}