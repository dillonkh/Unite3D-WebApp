import axios from 'axios';

// const baseUrl = 'http://localhost:3000'

function setAuthToken(token) {
    localStorage.authToken = token;
}

export function setUser(user) {
    localStorage.user = JSON.stringify(user);
}

export async function register(email, password, first_name, last_name, isVendor) {
    await axios({
        method: 'post',
        url: 'http://localhost:8000/user/register',
        data: {
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            is_vendor: isVendor,
        },
    }).then((response) => {
        setAuthToken(response.data.token);
        setUser(response.data.user);
    });
}

// prettier-ignore
export async function registerPrinter(make, model, filaments, 
    printDimensionX, printDimensionY, printDimensionZ, dimensionUnit) {
    let response = await axios({
        method: 'post',
        url: 'http://localhost:8000/user/verify',
        data: {
            token: localStorage.authToken
        },
    });
    await axios({
        method: 'post',
        url: 'http://localhost:8000/user/printer/register',
        headers: {
             Authorization: `Bearer ${localStorage.authToken}`
          },
        data: {
            make: make,
            model: model,
            filaments: filaments,
            max_print_dimension_x: printDimensionX,
            max_print_dimension_y: printDimensionY,
            max_print_dimension_z: printDimensionZ,
            dimension_unit: dimensionUnit,
        },
    });
    return response.data.user;
}

export async function signIn(email, password) {
    await axios({
        method: 'post',
        url: 'http://localhost:8000/user/login',
        data: {
            email: email,
            password: password,
        },
    }).then((response) => {
        setAuthToken(response.data.token);
        setUser(response.data.user);
    });
}

export async function refreshJWT() {
    let response = await axios({
        method: 'post',
        url: 'http://localhost:8000/user/refresh',
        data: {
            token: localStorage.authToken,
        },
    });
    if (response.status === 200) {
        setAuthToken(response.data.token);
        return response.data.user;
    }
    return response;
}

export async function makeBid(offer, print_job_id, details) {
    let response = await axios({
        method: 'post',
        url: 'http://localhost:8000/jobs/bid',
        headers: {
            Authorization: `Bearer ${localStorage.authToken}`,
        },
        data: {
            bid: offer,
            details: details,
            print_job: print_job_id,
        },
    });
    if (response.status === 200) {
        return response.data;
    }
    return response;
}

/* MODELER API */
export async function getMyModels() {
    return await axios({
        method: 'get',
        url: 'http://localhost:8000/jobs/list',
        headers: {
            Authorization: `Bearer ${localStorage.authToken}`,
        },
    }).then((response) => {
        return response.data;
    });
}

export async function getMyOffers() {
    return await axios({
        method: 'get',
        url: 'http://localhost:8000/jobs/list?filter=offers-pending',
        headers: {
            Authorization: `Bearer ${localStorage.authToken}`,
        },
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            return [];
        });
}

export async function getMyJobsInProgress() {
    return await axios({
        method: 'get',
        url: 'http://localhost:8000/jobs/list?filter=accepted-incomplete',
        headers: {
            Authorization: `Bearer ${localStorage.authToken}`,
        },
    }).then((response) => {
        return response.data;
    });
}

export async function getMyCompletedPrints() {
    return await axios({
        method: 'get',
        url: 'http://localhost:8000/jobs/list?filter=accepted-complete',
        headers: {
            Authorization: `Bearer ${localStorage.authToken}`,
        },
    }).then((response) => {
        return response.data;
    });
}

/* VENDOR API */
export async function getNewJobs() {
    return await axios({
        method: 'get',
        url: 'http://localhost:8000/jobs/list',
        headers: {
            Authorization: `Bearer ${localStorage.authToken}`,
        },
    }).then((response) => {
        return response.data;
    });
}

export async function getMyBids() {
    return await axios({
        method: 'get',
        url: 'http://localhost:8000/jobs/list?filter=bids-pending',
        headers: {
            Authorization: `Bearer ${localStorage.authToken}`,
        },
    })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            return [];
        });
}

export async function getCurrentJobs() {
    return await axios({
        method: 'get',
        url: 'http://localhost:8000/jobs/list?filter=progress-pending',
        headers: {
            Authorization: `Bearer ${localStorage.authToken}`,
        },
    }).then((response) => {
        console.log(response.data);
        return response.data;
    });
}

export async function getPastJobs() {
    return await axios({
        method: 'get',
        url: 'http://localhost:8000/jobs/list?filter=completed',
        headers: {
            Authorization: `Bearer ${localStorage.authToken}`,
        },
    }).then((response) => {
        return response.data;
    });
}
